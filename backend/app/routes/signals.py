from fastapi import APIRouter

router = APIRouter(prefix="/signals", tags=["Signals"])


@router.get("/")
def get_signals():
    return [
        {
            "id": 1,
            "type": "Supplier Cybersecurity Incident",
            "impact_score": 92,
            "likelihood": 0.84,
            "confidence": 0.93,
            "source_url": "https://example.com/security-incident",
            "status": "active",
        },
        {
            "id": 2,
            "type": "Cloud Pricing Increase Detected",
            "impact_score": 78,
            "likelihood": 0.72,
            "confidence": 0.89,
            "source_url": "https://example.com/cloud-pricing-update",
            "status": "monitoring",
        },
        {
            "id": 3,
            "type": "New Enterprise RFP Published",
            "impact_score": 71,
            "likelihood": 0.68,
            "confidence": 0.87,
            "source_url": "https://example.com/enterprise-rfp",
            "status": "active",
        },
        {
            "id": 4,
            "type": "Competitor AI Product Launch",
            "impact_score": 83,
            "likelihood": 0.76,
            "confidence": 0.91,
            "source_url": "https://example.com/competitor-ai-launch",
            "status": "active",
        },
        {
            "id": 5,
            "type": "Regulatory Change Impacting EU Vendors",
            "impact_score": 69,
            "likelihood": 0.74,
            "confidence": 0.86,
            "source_url": "https://example.com/eu-vendor-regulation",
            "status": "monitoring",
        },
        {
            "id": 6,
            "type": "Vendor Leadership Change",
            "impact_score": 58,
            "likelihood": 0.61,
            "confidence": 0.82,
            "source_url": "https://example.com/vendor-leadership-change",
            "status": "watching",
        },
        {
            "id": 7,
            "type": "SaaS License Underutilization Signal",
            "impact_score": 74,
            "likelihood": 0.79,
            "confidence": 0.9,
            "source_url": "https://example.com/saas-usage-benchmark",
            "status": "active",
        },
        {
            "id": 8,
            "type": "Supply Chain Delay Warning",
            "impact_score": 88,
            "likelihood": 0.81,
            "confidence": 0.92,
            "source_url": "https://example.com/supply-chain-delay",
            "status": "active",
        },
    ]


