import React, { useEffect, useState } from "react";

import KpiCard from "../components/KpiCard";
import RecentAlerts from "../components/RecentAlerts";

import {
  fetchSignals,
  fetchVendors,
  fetchOpportunities,
  fetchAlerts,
  runDemoIngestion,
} from "../api/apiClient";

type Signal = {
  id: number;
  type: string;
  impact_score: number;
  likelihood: number;
  confidence: number;
  source_url: string;
  status: string;
};

type Vendor = {
  id: number;
  name: string;
  risk_score: number;
  category: string;
  alerts: string;
};

type Opportunity = {
  id: number;
  title: string;
  value: number;
  confidence: number;
  priority: string;
};

type AlertItem = {
  id: number;
  message: string;
  severity: string;
};

type IngestedSignal = {
  source: string;
  title: string;
  type: string;
  severity: string;
  entity: string;
  category: string;
  source_url: string;
  impact_score: number;
  likelihood: number;
  confidence: number;
  status: string;
  collected_at: string;
};

type IngestionResult = {
  status: string;
  provider: string;
  mode: string;
  run_id: string;
  started_at: string;
  signals_collected: number;
  tools_used: string[];
  summary: string;
  signals: IngestedSignal[];
};

const staticDecisions = [
  {
    title: "Review CloudNova Systems vendor exposure",
    amount: "$1.42M renewal impact",
    priority: "High",
    due: "Due today",
  },
  {
    title: "Evaluate APAC logistics alternative vendors",
    amount: "$980K opportunity",
    priority: "High",
    due: "Due in 1d",
  },
  {
    title: "Prioritize cloud spend optimization",
    amount: "$1.85M savings potential",
    priority: "Medium",
    due: "Due in 2d",
  },
  {
    title: "Review EU vendor compliance update",
    amount: "14 vendors impacted",
    priority: "Medium",
    due: "Due in 3d",
  },
];

function formatCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }

  return `$${value.toLocaleString()}`;
}

function getVendorRiskLabel(score: number) {
  if (score >= 80) return "Critical";
  if (score >= 65) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

function riskColor(risk: string) {
  if (risk === "Critical") {
    return "text-red-400 bg-red-500/15 border-red-500/30";
  }

  if (risk === "High") {
    return "text-orange-400 bg-orange-500/15 border-orange-500/30";
  }

  if (risk === "Medium") {
    return "text-yellow-400 bg-yellow-500/15 border-yellow-500/30";
  }

  return "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
}

function priorityColor(priority: string) {
  if (priority === "High") {
    return "text-red-400";
  }

  return "text-yellow-400";
}

function highRiskVendorCount(vendors: Vendor[]) {
  return vendors.filter((vendor) => vendor.risk_score >= 65).length;
}

function CommandCenterPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ingestionRunning, setIngestionRunning] = useState(false);
  const [ingestionResult, setIngestionResult] =
    useState<IngestionResult | null>(null);
  const [ingestionError, setIngestionError] = useState("");

  async function loadDashboardData() {
    try {
      setLoading(true);
      setError("");

      const [signalsData, vendorsData, opportunitiesData, alertsData] =
        await Promise.all([
          fetchSignals(),
          fetchVendors(),
          fetchOpportunities(),
          fetchAlerts(),
        ]);

      setSignals(Array.isArray(signalsData) ? signalsData : []);
      setVendors(Array.isArray(vendorsData) ? vendorsData : []);
      setOpportunities(Array.isArray(opportunitiesData) ? opportunitiesData : []);
      setAlerts(Array.isArray(alertsData) ? alertsData : []);
    } catch (err) {
      console.error("Command Center API error:", err);
      setError("Failed to load dashboard data from backend.");
      setSignals([]);
      setVendors([]);
      setOpportunities([]);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRunIngestion() {
    try {
      setIngestionRunning(true);
      setIngestionError("");

      const result = await runDemoIngestion();
      setIngestionResult(result);
    } catch (err) {
      console.error("Bright Data ingestion error:", err);
      setIngestionError(
        "Failed to run Bright Data demo ingestion. Please check /ingestion/run-demo."
      );
    } finally {
      setIngestionRunning(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const activeSignals = signals.length;

  const pipelineValue = opportunities.reduce(
    (sum, opportunity) => sum + opportunity.value,
    0
  );

  const highestVendorRiskScore =
    vendors.length > 0
      ? Math.max(...vendors.map((vendor) => vendor.risk_score))
      : 0;

  const vendorRiskLabel = getVendorRiskLabel(highestVendorRiskScore);

  const competitorMoves = signals.filter(
    (signal) =>
      signal.type.toLowerCase().includes("competitor") ||
      signal.type.toLowerCase().includes("product launch")
  ).length;

  const renewalsAtRiskValue = opportunities
    .filter(
      (opportunity) =>
        opportunity.title.toLowerCase().includes("renewal") ||
        opportunity.title.toLowerCase().includes("agreement") ||
        opportunity.title.toLowerCase().includes("contract")
    )
    .reduce((sum, opportunity) => sum + opportunity.value, 0);

  const savingsIdentified = opportunities
    .filter(
      (opportunity) =>
        opportunity.title.toLowerCase().includes("optimization") ||
        opportunity.title.toLowerCase().includes("saving") ||
        opportunity.title.toLowerCase().includes("reduce") ||
        opportunity.title.toLowerCase().includes("consolidate")
    )
    .reduce((sum, opportunity) => sum + opportunity.value, 0);

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "Critical" || alert.severity === "High"
  ).length;

  //const uniqueSources = new Set(signals.map((signal) => signal.source_url)).size;

  const brightDataSignals = ingestionResult?.signals_collected || 0;

  const dynamicKpis = [
    {
      title: "Active Signals",
      value: loading ? "..." : String(activeSignals),
      change: "Live from /signals/",
      color: "text-cyan-400",
    },
    {
      title: "Pipeline Value",
      value: loading ? "..." : formatCurrency(pipelineValue),
      change: "Live from /opportunities/",
      color: "text-green-400",
    },
    {
      title: "Vendor Risk",
      value: loading ? "..." : vendorRiskLabel,
      change: `Top score ${highestVendorRiskScore}`,
      color:
        vendorRiskLabel === "Critical"
          ? "text-red-400"
          : vendorRiskLabel === "High"
          ? "text-orange-400"
          : vendorRiskLabel === "Medium"
          ? "text-yellow-400"
          : "text-emerald-400",
    },
    {
      title: "Competitor Moves",
      value: loading ? "..." : String(competitorMoves),
      change: "Detected from signal types",
      color: "text-purple-400",
    },
    {
      title: "Renewals at Risk",
      value: loading ? "..." : formatCurrency(renewalsAtRiskValue),
      change: "Agreement / renewal related",
      color: "text-pink-400",
    },
    {
      title: "Savings Identified",
      value: loading ? "..." : formatCurrency(savingsIdentified),
      change: "Optimization opportunities",
      color: "text-emerald-400",
    },
  ];

  const topOpportunities = [...opportunities]
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const criticalVendors = [...vendors]
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 5);

  const liveFeedItems = [
    ...(ingestionResult?.signals.slice(0, 2).map((signal) => ({
      title: signal.type,
      type: `Bright Data · ${signal.source}`,
      time: "New",
      icon:
        signal.severity === "Critical"
          ? "🔴"
          : signal.severity === "High"
          ? "🟠"
          : "📡",
    })) || []),
    ...alerts.slice(0, 3).map((alert) => ({
      title: alert.message,
      type: alert.severity,
      time: "Live",
      icon:
        alert.severity === "Critical"
          ? "🔴"
          : alert.severity === "High"
          ? "🟠"
          : alert.severity === "Medium"
          ? "🟡"
          : "🔵",
    })),
    ...signals.slice(0, 2).map((signal) => ({
      title: signal.type,
      type: signal.status,
      time: "API",
      icon: "📡",
    })),
  ].slice(0, 5);

  return (
    <>
      {/* Dynamic API Status */}
      <div className="mb-6 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-bold text-cyan-300">
              Command Center Data Status
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {loading
                ? "Loading live backend intelligence..."
                : error
                ? error
                : "Dashboard KPIs are calculated from FastAPI backend data."}
            </p>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="text-xs px-4 py-2 rounded-lg border border-blue-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Dashboard"}
          </button>
        </div>
      </div>

      {/* Bright Data Pipeline Card */}
      <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#071426] via-[#071426] to-blue-950/40 p-5">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-bold text-cyan-300 text-lg">
                Bright Data Live Web Pipeline
              </h3>

              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {ingestionResult ? "Completed" : "Ready"}
              </span>

              <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Demo Mode
              </span>
            </div>

            <p className="text-sm text-slate-400 mt-2 max-w-4xl">
              Simulates Bright Data SERP API, Web Unlocker, Web Scraper API,
              Scraping Browser, and MCP Server collecting public web signals,
              normalizing them, scoring impact, then sending them into OmniSignal
              AI.
            </p>

            {ingestionError && (
              <p className="text-sm text-red-400 mt-3">{ingestionError}</p>
            )}

            {ingestionResult && (
              <p className="text-sm text-slate-300 mt-3">
                Last run:{" "}
                <span className="text-cyan-300">{ingestionResult.run_id}</span>{" "}
                · Signals collected:{" "}
                <span className="text-emerald-400">
                  {ingestionResult.signals_collected}
                </span>{" "}
                · Tools: {ingestionResult.tools_used.join(", ")}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRunIngestion}
              disabled={ingestionRunning}
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {ingestionRunning ? "Running Pipeline..." : "Run Bright Data Demo"}
            </button>

            <button
              onClick={loadDashboardData}
              className="px-5 py-3 rounded-xl border border-blue-700 text-cyan-300 hover:bg-blue-950/40"
            >
              Sync Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
          <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
            <p className="text-slate-400 text-sm">Provider</p>
            <p className="text-xl font-bold text-cyan-300 mt-1">Bright Data</p>
          </div>

          <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
            <p className="text-slate-400 text-sm">Pipeline Status</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">
              {ingestionRunning
                ? "Running"
                : ingestionResult
                ? "Completed"
                : "Ready"}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
            <p className="text-slate-400 text-sm">Web Signals</p>
            <p className="text-xl font-bold text-orange-400 mt-1">
              {brightDataSignals}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
            <p className="text-slate-400 text-sm">Tools Used</p>
            <p className="text-xl font-bold text-purple-300 mt-1">
              {ingestionResult?.tools_used.length || 5}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {dynamicKpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            color={kpi.color}
          />
        ))}
      </section>

      {/* Main Dashboard Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Live Signal Network */}
        <div className="xl:col-span-7 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-cyan-400 text-sm font-semibold">
                  LIVE SIGNAL NETWORK
                </p>

                <span className="text-xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-1 rounded-full">
                  Backend Connected
                </span>
              </div>

              <h3 className="text-2xl font-bold mt-3">
                Global Signal Activity
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Streaming activity across markets, vendors, opportunities, and alerts
              </p>
            </div>

            <button
              onClick={loadDashboardData}
              className="px-4 py-2 rounded-lg bg-blue-600/30 border border-blue-500 text-sm hover:bg-blue-600/50 transition"
            >
              Refresh Live Map
            </button>
          </div>

          <div className="h-72 rounded-2xl bg-gradient-to-br from-blue-950 via-[#061122] to-black border border-blue-800/40 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,#00d4ff,transparent_45%)]" />

            <div className="absolute top-8 left-8 space-y-5 text-sm">
              <div>
                <p className="text-slate-400">Backend Signals</p>
                <p className="text-2xl font-bold">{activeSignals}</p>
              </div>

              <div>
                <p className="text-slate-400">Bright Data Signals</p>
                <p className="text-2xl font-bold text-cyan-300">
                  {brightDataSignals}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-400">
                  {criticalAlerts}
                </p>
              </div>
            </div>

            <div className="text-center z-10">
              <div className="text-7xl mb-4">🌍</div>

              <p className="text-cyan-300 text-lg font-semibold">
                Live Web Intelligence Map
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Bright Data · Signals · Vendors · Opportunities · Alerts
              </p>
            </div>
          </div>
        </div>

        {/* Live Intelligence Feed */}
        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-cyan-300">Live Intelligence Feed</h3>

            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              API
            </span>
          </div>

          <div className="space-y-4">
            {liveFeedItems.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="border-b border-blue-900/40 pb-3"
              >
                <div className="flex gap-3">
                  <span>{item.icon}</span>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>

                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-cyan-400">
                        {item.type}
                      </span>

                      <span className="text-xs text-slate-500">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {!loading && liveFeedItems.length === 0 && (
              <p className="text-sm text-slate-400">No live feed items found.</p>
            )}
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="xl:col-span-2 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-cyan-300">Risk Matrix</h3>
            <span className="text-xs text-slate-400">Live</span>
          </div>

          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`h-12 rounded flex items-center justify-center text-sm font-bold ${
                  i > 10
                    ? "bg-red-500/35 border border-red-500/30"
                    : i > 6
                    ? "bg-purple-500/30 border border-purple-500/30"
                    : "bg-blue-500/20 border border-blue-500/25"
                }`}
              >
                {i === 3
                  ? criticalAlerts
                  : i === 8
                  ? highRiskVendorCount(vendors)
                  : i === 14
                  ? competitorMoves
                  : ""}
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 mt-4">
            Top Risk: {criticalVendors[0]?.name || "No vendor risk"}
          </p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${riskColor(
              vendorRiskLabel
            )}`}
          >
            {vendorRiskLabel}
          </span>
        </div>

        {/* Opportunity Board */}
        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">Opportunity Board</h3>

          <div className="space-y-3">
            {topOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex justify-between items-center border-b border-blue-900/40 pb-3 gap-3"
              >
                <div>
                  <p className="text-sm font-medium">{opportunity.title}</p>
                  <p className="text-xs text-slate-500">
                    Confidence {Math.round(opportunity.confidence * 100)}%
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">
                    {formatCurrency(opportunity.value)}
                  </p>

                  <p
                    className={`text-xs ${
                      opportunity.priority === "High"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {opportunity.priority}
                  </p>
                </div>
              </div>
            ))}

            {!loading && topOpportunities.length === 0 && (
              <p className="text-sm text-slate-400">No opportunities found.</p>
            )}
          </div>

          <button className="mt-4 text-sm text-cyan-400 hover:text-cyan-300">
            View all opportunities →
          </button>
        </div>

        {/* Decision Queue */}
        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">Decision Queue</h3>

          <div className="space-y-4">
            {staticDecisions.map((item) => (
              <div
                key={item.title}
                className="border-b border-blue-900/40 pb-3"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {item.amount}
                    </p>
                  </div>

                  <span className={`text-xs ${priorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>

                <span className="inline-block mt-2 text-xs text-blue-300 bg-blue-500/15 px-2 py-1 rounded">
                  {item.due}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-4 text-sm text-cyan-400 hover:text-cyan-300">
            View full queue →
          </button>
        </div>

        {/* Critical Vendor Monitor */}
        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">
            Critical Vendor Monitor
          </h3>

          <div className="space-y-3">
            {criticalVendors.map((vendor) => {
              const risk = getVendorRiskLabel(vendor.risk_score);

              return (
                <div
                  key={vendor.id}
                  className="flex items-center justify-between text-sm border-b border-blue-900/40 pb-3 gap-3"
                >
                  <div>
                    <p>{vendor.name}</p>

                    <p className="text-xs text-slate-500">
                      Risk Score {vendor.risk_score}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded-full border text-xs ${riskColor(
                        risk
                      )}`}
                    >
                      {risk}
                    </span>
                  </div>
                </div>
              );
            })}

            {!loading && criticalVendors.length === 0 && (
              <p className="text-sm text-slate-400">No vendor data found.</p>
            )}
          </div>

          <button className="mt-4 text-sm text-cyan-400 hover:text-cyan-300">
            View all vendors →
          </button>
        </div>

        {/* Executive AI Brief */}
        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-cyan-300">Executive AI Brief</h3>
            <span className="text-xs text-slate-500">Live backend</span>
          </div>

          <p className="text-sm text-slate-300 leading-6">
            OmniSignal AI detected {activeSignals} backend signals,{" "}
            {brightDataSignals} Bright Data web signals,{" "}
            {highRiskVendorCount(vendors)} high-risk vendors,{" "}
            {opportunities.length} opportunities worth{" "}
            {formatCurrency(pipelineValue)}, and {alerts.length} active alerts.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Top vendor risk: {criticalVendors[0]?.name || "N/A"}.</li>
            <li>• Savings identified: {formatCurrency(savingsIdentified)}.</li>
            <li>• Critical or high alerts: {criticalAlerts}.</li>
          </ul>

          <button className="mt-5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-500 transition">
            Ask AI Copilot ✨
          </button>
        </div>

        {/* Recent Alerts from Backend */}
        <RecentAlerts />
      </section>
    </>
  );
}

export default CommandCenterPage;


