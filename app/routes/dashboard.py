from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from datetime import datetime

# Template locatie
templates = Jinja2Templates(directory="app/templates")
router = APIRouter()


@router.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    # Mock data – later vervangen door echte bronnen
    tasks = [
        {"title": "Dispatcher scaffolding", "status": "done"},
        {"title": "ProjectAgent MVP", "status": "todo"},
        {"title": "Fallback router", "status": "in_progress"},
    ]
    stats = {
        "total": len(tasks),
        "done": sum(1 for t in tasks if t["status"] == "done"),
        "todo": sum(1 for t in tasks if t["status"] == "todo"),
        "in_progress": sum(1 for t in tasks if t["status"] == "in_progress"),
    }
    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "stats": stats,
            "tasks": tasks,
            "timestamp": datetime.now(),
        },
    )
