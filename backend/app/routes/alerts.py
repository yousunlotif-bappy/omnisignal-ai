from fastapi import APIRouter

router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.get("/")
def get_alerts():
    return [
        {
            "id": 1,
            "message": "Critical supplier cybersecurity incident detected at CloudNova Systems",
            "severity": "Critical",
        },
        {
            "id": 2,
            "message": "High-risk logistics delay detected across APAC shipping routes",
            "severity": "High",
        },
        {
            "id": 3,
            "message": "Cloud service pricing increased by 8.4% in monitored regions",
            "severity": "High",
        },
        {
            "id": 4,
            "message": "New enterprise RFP detected for AI infrastructure modernization",
            "severity": "Medium",
        },
        {
            "id": 5,
            "message": "SaaS license utilization below 52% across two departments",
            "severity": "Medium",
        },
        {
            "id": 6,
            "message": "EU sustainability compliance update may impact 14 vendors",
            "severity": "Medium",
        },
        {
            "id": 7,
            "message": "Competitor launched new AI procurement automation product",
            "severity": "High",
        },
        {
            "id": 8,
            "message": "Contract renewal window opens in 30 days for CloudNova Systems",
            "severity": "Info",
        },
    ]



