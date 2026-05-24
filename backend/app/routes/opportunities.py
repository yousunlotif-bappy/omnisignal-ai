from fastapi import APIRouter

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])


@router.get("/")
def get_opportunities():
    return [
        {
            "id": 1,
            "title": "Cloud spend optimization across underutilized workloads",
            "value": 1850000,
            "confidence": 0.91,
            "priority": "High",
        },
        {
            "id": 2,
            "title": "Renegotiate CloudNova enterprise agreement before renewal",
            "value": 1420000,
            "confidence": 0.88,
            "priority": "High",
        },
        {
            "id": 3,
            "title": "Consolidate overlapping collaboration and meeting tools",
            "value": 760000,
            "confidence": 0.84,
            "priority": "Medium",
        },
        {
            "id": 4,
            "title": "Alternative vendor sourcing for APAC logistics lanes",
            "value": 980000,
            "confidence": 0.82,
            "priority": "High",
        },
        {
            "id": 5,
            "title": "Reduce unused SaaS licenses across sales and finance teams",
            "value": 620000,
            "confidence": 0.89,
            "priority": "Medium",
        },
        {
            "id": 6,
            "title": "Target enterprise account showing new AI infrastructure intent",
            "value": 2400000,
            "confidence": 0.86,
            "priority": "High",
        },
        {
            "id": 7,
            "title": "Vendor compliance automation for EU regulatory changes",
            "value": 430000,
            "confidence": 0.78,
            "priority": "Medium",
        },
        {
            "id": 8,
            "title": "Optimize database support contracts before Q4 renewal",
            "value": 510000,
            "confidence": 0.81,
            "priority": "Medium",
        },
    ]



