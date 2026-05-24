from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    signals,
    vendors,
    opportunities,
    alerts,
    copilot,
    ingestion,
    module_analyzer,
)

app = FastAPI(
    title="OmniSignal AI Backend",
    description="Backend API for OmniSignal AI enterprise intelligence dashboard",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(signals.router)
app.include_router(vendors.router)
app.include_router(opportunities.router)
app.include_router(alerts.router)
app.include_router(copilot.router)
app.include_router(ingestion.router)
app.include_router(module_analyzer.router)


@app.get("/")
def root():
    return {
        "message": "OmniSignal AI Backend Running",
        "status": "ok",
        "available_routes": [
            "/signals/",
            "/vendors/",
            "/opportunities/",
            "/alerts/",
            "/copilot/query",
            "/ingestion/status",
            "/ingestion/run-demo",
            "/module/analyze",
            "/docs",
        ],
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "OmniSignal AI Backend",
    }


