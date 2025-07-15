from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from app.api.routes import health
from app.api.routes import input
from app.agents.agent_loader import load_all_agents
from app.dashboard.routes import router as dashboard_router


app = FastAPI(title="CoPilot AI Business Suite")

# Load all AI agents
load_all_agents()

# CORS (voor frontend toegang)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Beperk in productie!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates configureren
templates = Jinja2Templates(directory="app/dashboard/templates")

# Routers registreren
app.include_router(dashboard_router)
app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(input.router, prefix="/input", tags=["input"])
