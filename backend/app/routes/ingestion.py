from fastapi import APIRouter
from app.services.bright_data_service import (
    get_ingestion_status,
    run_demo_ingestion_or_live,
)

router = APIRouter(prefix="/ingestion", tags=["Bright Data Ingestion"])


@router.get("/status")
def ingestion_status():
    return get_ingestion_status()


@router.post("/run-demo")
def run_ingestion_demo():
    return run_demo_ingestion_or_live()


