from fastapi import APIRouter

router = APIRouter(prefix="/vendors", tags=["Vendors"])


@router.get("/")
def get_vendors():
    return [
        {
            "id": 1,
            "name": "CloudNova Systems",
            "risk_score": 91,
            "category": "Cloud Infrastructure",
            "alerts": "Critical security advisory and pricing volatility detected",
        },
        {
            "id": 2,
            "name": "Global Logistics Ltd",
            "risk_score": 84,
            "category": "Logistics",
            "alerts": "Shipment delay risk across APAC routes",
        },
        {
            "id": 3,
            "name": "Alpha Components",
            "risk_score": 72,
            "category": "Manufacturing",
            "alerts": "Supplier capacity reduction detected",
        },
        {
            "id": 4,
            "name": "SecureStack Identity",
            "risk_score": 67,
            "category": "Cybersecurity",
            "alerts": "Increased incident mentions across public sources",
        },
        {
            "id": 5,
            "name": "DataBridge Analytics",
            "risk_score": 54,
            "category": "Data Platform",
            "alerts": "Support response complaints increased",
        },
        {
            "id": 6,
            "name": "WorkSphere Suite",
            "risk_score": 46,
            "category": "Productivity SaaS",
            "alerts": "License utilization below benchmark",
        },
        {
            "id": 7,
            "name": "Northstar Consulting",
            "risk_score": 39,
            "category": "Professional Services",
            "alerts": "Stable vendor performance",
        },
        {
            "id": 8,
            "name": "GreenGrid Energy",
            "risk_score": 61,
            "category": "Facilities & Energy",
            "alerts": "New sustainability compliance requirement detected",
        },
    ]



