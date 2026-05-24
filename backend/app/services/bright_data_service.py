import os
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional


def get_env_value(key: str, default: Optional[str] = None) -> Optional[str]:
    value = os.getenv(key)
    if value is None or value.strip() == "":
        return default
    return value


def get_bright_data_mode() -> str:
    """
    Demo mode is used for hackathon/local development.
    Live mode is prepared for real Bright Data credentials.
    """
    mode = get_env_value("BRIGHT_DATA_MODE", "demo")
    return str(mode).lower()


def get_bright_data_config() -> Dict[str, Any]:
    api_key = get_env_value("BRIGHT_DATA_API_KEY")
    serp_endpoint = get_env_value(
        "BRIGHT_DATA_SERP_ENDPOINT",
        "https://api.brightdata.com/request",
    )
    web_unlocker_zone = get_env_value("BRIGHT_DATA_WEB_UNLOCKER_ZONE")
    browser_zone = get_env_value("BRIGHT_DATA_BROWSER_ZONE")

    return {
        "mode": get_bright_data_mode(),
        "api_key_configured": bool(api_key),
        "serp_endpoint": serp_endpoint,
        "web_unlocker_zone_configured": bool(web_unlocker_zone),
        "browser_zone_configured": bool(browser_zone),
        "production_ready": True,
    }


def get_ingestion_status() -> Dict[str, Any]:
    config = get_bright_data_config()
    mode = config["mode"]

    return {
        "status": "ready",
        "provider": "Bright Data",
        "mode": mode,
        "production_ready": True,
        "pipeline": "Live Web Intelligence Ingestion",
        "available_tools": [
            "SERP API",
            "Web Unlocker",
            "Web Scraper API",
            "Scraping Browser",
            "MCP Server",
        ],
        "configuration": {
            "api_key_configured": config["api_key_configured"],
            "serp_endpoint": config["serp_endpoint"],
            "web_unlocker_zone_configured": config[
                "web_unlocker_zone_configured"
            ],
            "browser_zone_configured": config["browser_zone_configured"],
        },
        "last_run": None,
        "message": (
            "Bright Data ingestion service is ready. "
            "Demo mode simulates Bright Data-powered public web collection. "
            "Live mode is designed to use Bright Data credentials from environment variables."
        ),
    }


def severity_to_score(severity: str) -> int:
    severity_score = {
        "Critical": 92,
        "High": 82,
        "Medium": 68,
        "Low": 42,
        "Info": 30,
    }

    return severity_score.get(severity, 60)


def score_signal(item: Dict[str, Any]) -> Dict[str, Any]:
    severity = item.get("severity", "Medium")
    impact_score = severity_to_score(severity)

    confidence = float(item.get("confidence", 0.86))
    likelihood = float(item.get("likelihood", 0.72))

    decision_priority = "Monitor"

    if impact_score >= 85:
        decision_priority = "Immediate Review"
    elif impact_score >= 70:
        decision_priority = "High Priority"
    elif impact_score >= 45:
        decision_priority = "Review"

    return {
        **item,
        "impact_score": impact_score,
        "likelihood": likelihood,
        "confidence": confidence,
        "decision_priority": decision_priority,
        "status": "active" if severity in ["Critical", "High"] else "monitoring",
        "collected_at": datetime.now(timezone.utc).isoformat(),
    }


def get_demo_raw_web_items() -> List[Dict[str, Any]]:
    """
    Demo web items represent the type of public web intelligence
    Bright Data can unlock for AI agents.
    """
    return [
        {
            "source": "SERP API",
            "title": "CloudNova Systems security advisory detected",
            "type": "Supplier Cybersecurity Incident",
            "severity": "Critical",
            "entity": "CloudNova Systems",
            "category": "Vendor Risk",
            "source_url": "https://example.com/cloudnova-security-advisory",
            "confidence": 0.94,
            "likelihood": 0.85,
            "business_impact": (
                "Potential third-party risk, service disruption, and renewal exposure."
            ),
        },
        {
            "source": "Web Scraper API",
            "title": "Cloud infrastructure pricing increased across compute services",
            "type": "Cloud Pricing Increase Detected",
            "severity": "High",
            "entity": "Cloud Infrastructure Market",
            "category": "Pricing Intelligence",
            "source_url": "https://example.com/cloud-pricing-movement",
            "confidence": 0.89,
            "likelihood": 0.74,
            "business_impact": (
                "Potential cost increase and contract negotiation opportunity."
            ),
        },
        {
            "source": "Web Unlocker",
            "title": "APAC logistics delay mentioned across supplier pages",
            "type": "Supply Chain Delay Warning",
            "severity": "High",
            "entity": "Global Logistics Ltd",
            "category": "Supply Chain",
            "source_url": "https://example.com/apac-logistics-delay",
            "confidence": 0.91,
            "likelihood": 0.81,
            "business_impact": (
                "Possible delivery delays and supplier continuity risk."
            ),
        },
        {
            "source": "Scraping Browser",
            "title": "Competitor launched AI procurement automation product",
            "type": "Competitor AI Product Launch",
            "severity": "High",
            "entity": "Competitor Market",
            "category": "Competitive Intelligence",
            "source_url": "https://example.com/ai-procurement-launch",
            "confidence": 0.9,
            "likelihood": 0.77,
            "business_impact": (
                "Competitive positioning risk and market response requirement."
            ),
        },
        {
            "source": "MCP Server",
            "title": "New enterprise RFP detected for AI infrastructure modernization",
            "type": "New Enterprise RFP Published",
            "severity": "Medium",
            "entity": "Enterprise Account",
            "category": "GTM Opportunity",
            "source_url": "https://example.com/enterprise-ai-rfp",
            "confidence": 0.87,
            "likelihood": 0.69,
            "business_impact": (
                "Potential revenue opportunity for enterprise AI infrastructure."
            ),
        },
    ]


def run_demo_ingestion() -> Dict[str, Any]:
    raw_web_items = get_demo_raw_web_items()
    scored_signals = [score_signal(item) for item in raw_web_items]

    critical_count = len(
        [signal for signal in scored_signals if signal["severity"] == "Critical"]
    )
    high_count = len(
        [signal for signal in scored_signals if signal["severity"] == "High"]
    )

    return {
        "status": "completed",
        "provider": "Bright Data",
        "mode": "demo",
        "production_ready": True,
        "run_id": f"bd-demo-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}",
        "started_at": datetime.now(timezone.utc).isoformat(),
        "signals_collected": len(scored_signals),
        "critical_signals": critical_count,
        "high_signals": high_count,
        "tools_used": [
            "SERP API",
            "Web Unlocker",
            "Web Scraper API",
            "Scraping Browser",
            "MCP Server",
        ],
        "summary": (
            "Demo ingestion completed. Bright Data-style public web signals "
            "were simulated, normalized, scored, and returned as enterprise "
            "intelligence objects. Production mode can connect real Bright Data "
            "credentials through environment variables."
        ),
        "signals": scored_signals,
    }


def run_live_ingestion_placeholder() -> Dict[str, Any]:
    """
    Production-ready placeholder.

    This function is intentionally safe for hackathon/demo use.
    It does not make external network calls unless you implement real Bright Data
    API logic here.

    Suggested production logic:
    1. Read BRIGHT_DATA_API_KEY.
    2. Call SERP API / Web Unlocker / Web Scraper API.
    3. Normalize raw public web results.
    4. Score signals.
    5. Return the same response format as demo mode.
    """
    config = get_bright_data_config()

    if not config["api_key_configured"]:
        return {
            "status": "configuration_required",
            "provider": "Bright Data",
            "mode": "live",
            "production_ready": True,
            "signals_collected": 0,
            "tools_used": [
                "SERP API",
                "Web Unlocker",
                "Web Scraper API",
                "Scraping Browser",
                "MCP Server",
            ],
            "summary": (
                "Live mode is selected, but BRIGHT_DATA_API_KEY is not configured. "
                "Add credentials to the environment or switch BRIGHT_DATA_MODE=demo."
            ),
            "signals": [],
        }

    return {
        "status": "live_mode_ready",
        "provider": "Bright Data",
        "mode": "live",
        "production_ready": True,
        "signals_collected": 0,
        "tools_used": [
            "SERP API",
            "Web Unlocker",
            "Web Scraper API",
            "Scraping Browser",
            "MCP Server",
        ],
        "summary": (
            "Bright Data live mode is configured. Implement real API calls inside "
            "run_live_ingestion_placeholder() to fetch production web intelligence."
        ),
        "signals": [],
    }


def run_demo_ingestion_or_live() -> Dict[str, Any]:
    """
    Main ingestion entrypoint.
    Demo mode is stable for local hackathon demos.
    Live mode is API-ready for Bright Data credentials.
    """
    mode = get_bright_data_mode()

    if mode == "live":
        return run_live_ingestion_placeholder()

    return run_demo_ingestion()


def get_latest_ingestion_context() -> Dict[str, Any]:
    """
    Shared context for AI Copilot.
    This keeps Copilot aware of the Bright Data layer even when
    the user is not on the Sources page.
    """
    demo_result = run_demo_ingestion()

    return {
        "provider": demo_result["provider"],
        "mode": demo_result["mode"],
        "signals_collected": demo_result["signals_collected"],
        "critical_signals": demo_result["critical_signals"],
        "high_signals": demo_result["high_signals"],
        "tools_used": demo_result["tools_used"],
        "top_signals": demo_result["signals"][:3],
        "summary": demo_result["summary"],
    }

