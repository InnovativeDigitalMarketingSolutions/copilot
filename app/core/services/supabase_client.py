from supabase import create_client, Client
from app.core.config.settings import settings
from app.core.logging.logger import setup_logger


LOGGER = setup_logger(__name__)


class SupabaseClient:
    def __init__(self, logger=None):
        if not settings.supabase_url or not settings.supabase_key:
            raise ValueError("Supabase URL and/or KEY missing in settings")

        self.logger = logger or LOGGER
        self.client: Client = create_client(
            settings.supabase_url, settings.supabase_key
        )
        self.logger.info("Supabase client initialized")

    def insert(self, table: str, data: dict):
        import json
        from datetime import datetime

        # Ensure data is a list of dicts
        if isinstance(data, dict):
            data = [data]
        # Add standard fields
        for row in data:
            row.setdefault("created_at", datetime.utcnow().isoformat())
            row.setdefault("source", "default")
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
