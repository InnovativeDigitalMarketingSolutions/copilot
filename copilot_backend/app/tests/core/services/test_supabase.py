from supabase import create_client
import os
import pytest
from dotenv import load_dotenv
from unittest.mock import MagicMock

load_dotenv()


@pytest.fixture
def mock_logger():
    return MagicMock()


url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

client = create_client(url, key)
print(client.auth)
