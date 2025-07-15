from supabase import create_client
from app.core.config.settings import settings
from app.core.logging.logger import setup_logger
import os
import logging

LOGGER = setup_logger(__name__)


class SupabaseClient:
    def __init__(self, logger=None):

        self.logger = logger or logging.getLogger(__name__)

        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")

        if not url or not key:
            raise ValueError("Missing Supabase credentials")

        self.client = create_client(url, key)

        self.logger.info("SupabaseClient initialized.")

    def table(self, name: str):
        return self.client.table(name)

    @staticmethod
    def _get_supabase_credentials():
        url = settings.supabase_url or os.getenv("SUPABASE_URL")
        key = settings.supabase_key or os.getenv("SUPABASE_KEY")

        if not url or not key:
            raise ValueError("Missing Supabase credentials")

        return url, key

    def insert(self, table: str, data: dict):
        import json
        from datetime import datetime, timezone

        # Ensure data is a list of dicts
        if isinstance(data, dict):
            data = [data]
        # Add standard fields
        for row in data:
            row["created_at"] = datetime.now(timezone.utc).isoformat()
            row.setdefault("source", "default")
        # Ensure all datetime fields are stringified for JSON serialization
        for row in data:
            for k, v in row.items():
                if isinstance(v, datetime):
                    row[k] = v.isoformat()
        # Check JSON serializability of the list
        try:
            json.dumps(data)
        except TypeError as e:
            raise ValueError(f"Data is not JSON serializable: {e}")

        result = self.client.table(table).insert(data).execute()
        return result

    def select(self, table: str, filters: dict = None):
        query = self.client.table(table).select("*")
        if filters:
            for key, value in filters.items():
                query = query.eq(key, value)
        self.logger.debug(f"Selecting from {table} with filters: {filters}")
        return query.execute()

    def update(self, table: str, filters: dict, data: dict):
        if not data:
            raise ValueError("Update data cannot be empty")
        query = self.client.table(table).update(data)
        for key, value in filters.items():
            query = query.eq(key, value)
        self.logger.debug(f"Updating {table} where {filters} with {data}")
        return query.execute()

    def delete(self, table: str, filters: dict):
        if not filters:
            self.logger.warning("Delete called without filters — operation skipped.")
            return
        query = self.client.table(table).delete()
        for key, value in filters.items():
            query = query.eq(key, value)
        self.logger.debug(f"Deleting from {table} where {filters}")
        return query.execute()

    def call_rpc(self, fn_name: str, params: dict = None):
        self.logger.debug(f"Calling RPC '{fn_name}' with params: {params}")
        return self.client.rpc(
            fn_name, params if params is not None else None
        ).execute()
