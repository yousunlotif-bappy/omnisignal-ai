from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any

from app.services.bright_data_service import get_latest_ingestion_context

router = APIRouter(prefix="/copilot", tags=["AI Copilot"])


class CopilotQueryRequest(BaseModel):
    question: str


class CopilotQueryResponse(BaseModel):
    answer: str
    recommended_actions: List[str]
    confidence: float
    sources_used: List[str]
    context_used: Dict[str, Any]


DEMO_SIGNALS = [
    {
        "id": 1,
        "type": "Supplier Cybersecurity Incident",
        "impact_score": 92,
        "likelihood": 0.84,
        "confidence": 0.93,
        "status": "active",
    },
    {
        "id": 2,
        "type": "Cloud Pricing Increase Detected",
        "impact_score": 78,
        "likelihood": 0.72,
        "confidence": 0.89,
        "status": "monitoring",
    },
    {
        "id": 3,
        "type": "New Enterprise RFP Published",
        "impact_score": 71,
        "likelihood": 0.68,
        "confidence": 0.87,
        "status": "active",
    },
    {
        "id": 4,
        "type": "Competitor AI Product Launch",
        "impact_score": 83,
        "likelihood": 0.76,
        "confidence": 0.91,
        "status": "active",
    },
    {
        "id": 5,
        "type": "SaaS License Underutilization Signal",
        "impact_score": 74,
        "likelihood": 0.79,
        "confidence": 0.9,
        "status": "active",
    },
    {
        "id": 6,
        "type": "Regulatory Change Impacting EU Vendors",
        "impact_score": 69,
        "likelihood": 0.74,
        "confidence": 0.86,
        "status": "monitoring",
    },
    {
        "id": 7,
        "type": "Vendor Leadership Change",
        "impact_score": 58,
        "likelihood": 0.61,
        "confidence": 0.82,
        "status": "watching",
    },
    {
        "id": 8,
        "type": "Supply Chain Delay Warning",
        "impact_score": 88,
        "likelihood": 0.81,
        "confidence": 0.92,
        "status": "active",
    },
]

DEMO_VENDORS = [
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

DEMO_OPPORTUNITIES = [
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

DEMO_ALERTS = [
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


def format_currency(value: int) -> str:
    if value >= 1_000_000:
        return f"${value / 1_000_000:.2f}M"
    return f"${value:,.0f}"


def build_context() -> Dict[str, Any]:
    bright_data_context = get_latest_ingestion_context()

    high_risk_vendors = [
        vendor for vendor in DEMO_VENDORS if vendor["risk_score"] >= 65
    ]

    critical_signals = [
        signal for signal in DEMO_SIGNALS if signal["impact_score"] >= 80
    ]

    high_priority_opportunities = [
        opportunity
        for opportunity in DEMO_OPPORTUNITIES
        if opportunity["priority"].lower() == "high"
    ]

    critical_or_high_alerts = [
        alert
        for alert in DEMO_ALERTS
        if alert["severity"] in ["Critical", "High"]
    ]

    total_opportunity_value = sum(
        opportunity["value"] for opportunity in DEMO_OPPORTUNITIES
    )

    savings_value = sum(
        opportunity["value"]
        for opportunity in DEMO_OPPORTUNITIES
        if any(
            keyword in opportunity["title"].lower()
            for keyword in ["optimization", "reduce", "consolidate", "renegotiate"]
        )
    )

    top_vendor = max(DEMO_VENDORS, key=lambda vendor: vendor["risk_score"])
    top_opportunity = max(DEMO_OPPORTUNITIES, key=lambda opportunity: opportunity["value"])
    top_signal = max(DEMO_SIGNALS, key=lambda signal: signal["impact_score"])

    return {
        "bright_data": bright_data_context,
        "counts": {
            "backend_signals": len(DEMO_SIGNALS),
            "vendors": len(DEMO_VENDORS),
            "opportunities": len(DEMO_OPPORTUNITIES),
            "alerts": len(DEMO_ALERTS),
            "bright_data_web_signals": bright_data_context["signals_collected"],
            "high_risk_vendors": len(high_risk_vendors),
            "critical_signals": len(critical_signals),
            "high_priority_opportunities": len(high_priority_opportunities),
            "critical_or_high_alerts": len(critical_or_high_alerts),
        },
        "financials": {
            "total_opportunity_value": total_opportunity_value,
            "savings_value": savings_value,
        },
        "top_items": {
            "top_vendor": top_vendor,
            "top_opportunity": top_opportunity,
            "top_signal": top_signal,
        },
    }


def build_copilot_answer(question: str) -> CopilotQueryResponse:
    question_lower = question.lower()
    context = build_context()

    counts = context["counts"]
    financials = context["financials"]
    bright_data = context["bright_data"]
    top_vendor = context["top_items"]["top_vendor"]
    top_opportunity = context["top_items"]["top_opportunity"]
    top_signal = context["top_items"]["top_signal"]

    bright_data_sentence = (
        f"This response uses {counts['backend_signals']} backend signals, "
        f"{counts['bright_data_web_signals']} Bright Data web intelligence signals, "
        f"{counts['vendors']} vendor records, {counts['opportunities']} opportunities, "
        f"and {counts['alerts']} active alerts. Bright Data tools represented: "
        f"{', '.join(bright_data['tools_used'])}."
    )

    if any(keyword in question_lower for keyword in ["risk", "vendor", "supplier"]):
        answer = (
            f"{bright_data_sentence} "
            f"I found {counts['high_risk_vendors']} high-risk vendors and "
            f"{counts['critical_signals']} critical enterprise signals. "
            f"The highest-risk vendor is {top_vendor['name']} with a risk score of "
            f"{top_vendor['risk_score']}. The main concern is: {top_vendor['alerts']}. "
            f"The strongest related signal is '{top_signal['type']}' with an impact score "
            f"of {top_signal['impact_score']} and confidence of "
            f"{round(top_signal['confidence'] * 100)}%. "
            f"This should be escalated into vendor risk review and procurement workflow."
        )

        recommended_actions = [
            f"Open immediate vendor risk review for {top_vendor['name']}.",
            "Notify procurement, security, and operations teams.",
            "Compare alternative suppliers for high-risk categories.",
            "Use Bright Data web signal monitoring for continuous vendor surveillance.",
            "Create a workflow task for executive vendor exposure review.",
        ]

        confidence = 0.93

    elif any(
        keyword in question_lower
        for keyword in ["opportunity", "pipeline", "sales", "gtm", "rfp", "revenue"]
    ):
        answer = (
            f"{bright_data_sentence} "
            f"I found {counts['opportunities']} active enterprise opportunities "
            f"with total estimated value of "
            f"{format_currency(financials['total_opportunity_value'])}. "
            f"The largest opportunity is '{top_opportunity['title']}', valued at "
            f"{format_currency(top_opportunity['value'])} with "
            f"{round(top_opportunity['confidence'] * 100)}% confidence. "
            f"There are {counts['high_priority_opportunities']} high-priority opportunities "
            f"that should be reviewed this week."
        )

        recommended_actions = [
            f"Prioritize '{top_opportunity['title']}' for executive review.",
            "Push high-confidence opportunities into CRM or GTM workflow.",
            "Generate account briefs for AI infrastructure intent signals.",
            "Use Bright Data monitoring to detect new RFP and buying intent signals.",
            "Assign opportunity owners by value and confidence score.",
        ]

        confidence = 0.91

    elif any(
        keyword in question_lower
        for keyword in ["saving", "savings", "cost", "license", "waste", "optimization"]
    ):
        answer = (
            f"{bright_data_sentence} "
            f"OmniSignal AI identified savings-related opportunities worth approximately "
            f"{format_currency(financials['savings_value'])}. "
            f"The strongest savings areas are cloud spend optimization, contract renegotiation, "
            f"SaaS license reduction, and collaboration tool consolidation. "
            f"These signals should be routed to finance, procurement, and FinOps owners."
        )

        recommended_actions = [
            "Prioritize cloud spend optimization across underutilized workloads.",
            "Renegotiate high-value contracts before renewal windows close.",
            "Audit unused SaaS licenses across departments.",
            "Consolidate duplicate collaboration and meeting tools.",
            "Create a savings workflow and export the analysis report.",
        ]

        confidence = 0.9

    elif any(keyword in question_lower for keyword in ["alert", "incident", "urgent"]):
        answer = (
            f"{bright_data_sentence} "
            f"There are {counts['alerts']} active alerts, including "
            f"{counts['critical_or_high_alerts']} critical or high-severity alerts. "
            f"The most urgent alert is: '{DEMO_ALERTS[0]['message']}'. "
            f"This alert is connected to vendor risk, cybersecurity exposure, "
            f"and possible service disruption."
        )

        recommended_actions = [
            "Escalate the critical supplier cybersecurity alert.",
            "Validate affected vendor exposure.",
            "Create incident review workflow.",
            "Notify security, procurement, and executive stakeholders.",
            "Continue Bright Data-powered monitoring for related public web updates.",
        ]

        confidence = 0.92

    elif any(
        keyword in question_lower
        for keyword in ["brief", "summary", "executive", "overview", "board"]
    ):
        answer = (
            f"Executive summary: {bright_data_sentence} "
            f"OmniSignal AI detected {counts['critical_signals']} critical enterprise signals, "
            f"{counts['high_risk_vendors']} high-risk vendors, "
            f"{counts['opportunities']} opportunities worth "
            f"{format_currency(financials['total_opportunity_value'])}, and "
            f"{counts['critical_or_high_alerts']} critical or high alerts. "
            f"Immediate attention should focus on CloudNova Systems, APAC logistics risk, "
            f"cloud pricing increases, supplier cybersecurity exposure, and AI infrastructure "
            f"opportunity signals."
        )

        recommended_actions = [
            "Review CloudNova Systems as the top vendor risk.",
            "Prioritize cloud spend optimization and contract renegotiation.",
            "Monitor APAC logistics delay indicators.",
            "Route critical supplier cybersecurity signals into escalation workflow.",
            "Prepare leadership brief using downloaded AI reports.",
        ]

        confidence = 0.94

    else:
        answer = (
            f"{bright_data_sentence} "
            f"OmniSignal AI analyzed current enterprise intelligence across live web signals, "
            f"vendors, opportunities, alerts, workflows, and integrations. "
            f"The most important themes are supplier cybersecurity risk, cloud pricing volatility, "
            f"APAC logistics disruption, SaaS underutilization, contract renewal exposure, "
            f"and AI infrastructure buying intent."
        )

        recommended_actions = [
            "Ask about vendor risks, opportunities, savings, alerts, or executive summary.",
            "Review critical supplier cybersecurity exposure.",
            "Prioritize high-confidence opportunities.",
            "Continue Bright Data-powered web signal monitoring.",
            "Push important insights into workflows and integrations.",
        ]

        confidence = 0.89

    return CopilotQueryResponse(
        answer=answer,
        recommended_actions=recommended_actions,
        confidence=confidence,
        sources_used=[
            "/signals/",
            "/vendors/",
            "/opportunities/",
            "/alerts/",
            "/ingestion/run-demo",
            "Bright Data: SERP API",
            "Bright Data: Web Unlocker",
            "Bright Data: Web Scraper API",
            "Bright Data: Scraping Browser",
            "Bright Data: MCP Server",
        ],
        context_used=context,
    )


@router.post("/query", response_model=CopilotQueryResponse)
def query_copilot(request: CopilotQueryRequest):
    if not request.question.strip():
        context = build_context()

        return CopilotQueryResponse(
            answer="Please ask a valid enterprise intelligence question.",
            recommended_actions=[
                "Ask about vendor risks, opportunities, savings, alerts, or executive summary.",
                "Example: Give me an executive summary.",
                "Example: What are the top vendor risks right now?",
            ],
            confidence=0.0,
            sources_used=[],
            context_used=context,
        )

    return build_copilot_answer(request.question)

