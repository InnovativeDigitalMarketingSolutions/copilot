from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from datetime import datetime


router = APIRouter()
templates = Jinja2Templates(directory="app/dashboard/templates")


@router.post
@router.get("/dashboard")
async def get_dashboard(request: Request):
    stats = {
        "done": 12,
        "pending": 5,
        "failed": 2,
    }

    return templates.TemplateResponse(
        "dashboard.html",
        {
            "request": request,
            "timestamp": datetime.now(),
            "stats": stats,  # 🔧 Voeg deze toe
        },
    )


@router.get("/admin", response_class=HTMLResponse)
async def get_admin(request: Request):
    return templates.TemplateResponse("admin.html", {"request": request})
