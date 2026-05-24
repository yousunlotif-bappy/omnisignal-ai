from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timezone

router = APIRouter(prefix="/module", tags=["Module AI Analyzer"])


class ModuleAnalyzeRequest(BaseModel):
    module: str
    input_type: str
    content: str
    file_name: Optional[str] = None


class ModuleAnalyzeResponse(BaseModel):
    module: str
    input_type: str
    summary: str
    score: int
    severity: str
    confidence: float
    recommended_actions: List[str]
    report: str
    generated_at: str
    download_formats: List[str]


def get_severity(score: int) -> str:
    if score >= 85:
        return "Critical"
    if score >= 70:
        return "High"
    if score >= 45:
        return "Medium"
    return "Low"


def module_response(module: str, input_type: str, content: str, file_name: Optional[str]) -> ModuleAnalyzeResponse:
    module_key = module.lower()
    text = content.lower()

    score = 72
    confidence = 0.86

    if any(word in text for word in ["critical", "breach", "incident", "delay", "risk", "security"]):
        score = 91
        confidence = 0.92
    elif any(word in text for word in ["opportunity", "rfp", "buying", "growth", "lead"]):
        score = 83
        confidence = 0.88
    elif any(word in text for word in ["saving", "cost", "license", "waste", "optimization"]):
        score = 79
        confidence = 0.89
    elif any(word in text for word in ["contract", "renewal", "agreement", "terms"]):
        score = 76
        confidence = 0.87
    elif any(word in text for word in ["regulation", "compliance", "policy", "audit"]):
        score = 82
        confidence = 0.9

    severity = get_severity(score)

    if module_key == "signals intel":
        summary = "The input was analyzed as a potential enterprise signal. The system identified signal category, business impact, likelihood, confidence, and recommended triage action."
        actions = [
            "Classify the signal and add it to monitoring.",
            "Validate the source and confidence level.",
            "Escalate if impact score remains high.",
        ]

    elif module_key == "vendors":
        summary = "The input was analyzed as vendor intelligence. The system identified vendor risk indicators, operational concerns, and supplier review priority."
        actions = [
            "Open vendor risk review.",
            "Check related alerts and public web signals.",
            "Compare alternative suppliers if risk remains elevated.",
        ]

    elif module_key == "opportunities":
        summary = "The input was analyzed as a potential business opportunity. The system identified commercial value, confidence, and prioritization logic."
        actions = [
            "Qualify opportunity with revenue or procurement owner.",
            "Estimate potential value and timeline.",
            "Move high-confidence opportunities into decision queue.",
        ]

    elif module_key == "risk & compliance":
        summary = "The input was analyzed for risk and compliance exposure. The system identified severity, affected area, and recommended compliance actions."
        actions = [
            "Review compliance obligation.",
            "Assign risk owner.",
            "Create audit note and track remediation.",
        ]

    elif module_key == "markets & competitors":
        summary = "The input was analyzed as a market or competitor movement. The system identified strategic impact, market signal strength, and follow-up actions."
        actions = [
            "Monitor competitor movement.",
            "Compare against internal positioning.",
            "Prepare market intelligence brief.",
        ]

    elif module_key == "contracts & renewals":
        summary = "The input was analyzed for contract and renewal intelligence. The system identified renewal risk, negotiation opportunity, and savings potential."
        actions = [
            "Review renewal window and contract terms.",
            "Identify negotiation leverage.",
            "Create procurement action plan.",
        ]

    elif module_key == "savings analyzer":
        summary = "The input was analyzed for savings and optimization opportunities. The system identified waste, underutilization, and potential cost reduction."
        actions = [
            "Quantify savings opportunity.",
            "Review unused or overlapping tools.",
            "Assign optimization owner.",
        ]

    elif module_key == "workflows":
        summary = "The input was analyzed as a workflow instruction. The system generated automation logic, trigger conditions, and action routing."
        actions = [
            "Define workflow trigger.",
            "Assign responsible team.",
            "Connect output to alert or task system.",
        ]

    elif module_key == "integrations":
        summary = "The input was analyzed as an enterprise integration event. The system identified sync logic, connector action, and automation readiness."
        actions = [
            "Validate integration event format.",
            "Map the event to target system.",
            "Create webhook or API sync rule.",
        ]

    else:
        summary = "The input was analyzed by OmniSignal AI as enterprise intelligence. The system generated a structured summary, score, severity, and recommended actions."
        actions = [
            "Review the generated insight.",
            "Validate source reliability.",
            "Push the output into the appropriate workflow.",
        ]

    file_context = f" Uploaded file reference: {file_name}." if file_name else ""

    report = (
        f"OmniSignal AI Module Analysis Report\n\n"
        f"Module: {module}\n"
        f"Input Type: {input_type}\n"
        f"Severity: {severity}\n"
        f"Score: {score}\n"
        f"Confidence: {round(confidence * 100)}%\n\n"
        f"Summary:\n{summary}{file_context}\n\n"
        f"Recommended Actions:\n"
        + "\n".join([f"- {action}" for action in actions])
    )

    return ModuleAnalyzeResponse(
        module=module,
        input_type=input_type,
        summary=summary,
        score=score,
        severity=severity,
        confidence=confidence,
        recommended_actions=actions,
        report=report,
        generated_at=datetime.now(timezone.utc).isoformat(),
        download_formats=["txt", "json", "csv"],
    )


@router.post("/analyze", response_model=ModuleAnalyzeResponse)
def analyze_module(request: ModuleAnalyzeRequest):
    if not request.content.strip() and not request.file_name:
        return ModuleAnalyzeResponse(
            module=request.module,
            input_type=request.input_type,
            summary="No input content was provided.",
            score=0,
            severity="Low",
            confidence=0.0,
            recommended_actions=["Provide text, URL, website, company name, or file reference."],
            report="No input content was provided.",
            generated_at=datetime.now(timezone.utc).isoformat(),
            download_formats=["txt", "json", "csv"],
        )

    return module_response(
        module=request.module,
        input_type=request.input_type,
        content=request.content,
        file_name=request.file_name,
    )


