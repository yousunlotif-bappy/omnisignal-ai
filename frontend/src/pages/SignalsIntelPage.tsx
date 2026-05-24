import React, { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";
import { fetchSignals } from "../api/apiClient";

type Signal = {
  id: number;
  type: string;
  impact_score: number;
  likelihood: number;
  confidence: number;
  source_url: string;
  status: string;
};

function getSeverity(score: number) {
  if (score >= 80) return "Critical";
  if (score >= 65) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

function severityClass(severity: string) {
  if (severity === "Critical") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (severity === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (severity === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}

function formatPercent(value: number) {
  if (typeof value !== "number") return "0%";
  return `${Math.round(value * 100)}%`;
}

function SignalsIntelPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSignals() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchSignals();

      if (Array.isArray(data)) {
        setSignals(data);
      } else {
        setSignals([]);
        setError("Backend response is not an array.");
      }
    } catch (err) {
      console.error("Signals API error:", err);
      setError("Failed to load signals from backend. Please check FastAPI server.");
      setSignals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSignals();
  }, []);

  const totalSignals = signals.length;

  const criticalSignals = signals.filter(
    (signal) => signal.impact_score >= 80
  ).length;

  const averageImpact =
    totalSignals > 0
      ? Math.round(
          signals.reduce((sum, signal) => sum + signal.impact_score, 0) /
            totalSignals
        )
      : 0;

  const averageConfidence =
    totalSignals > 0
      ? Math.round(
          (signals.reduce((sum, signal) => sum + signal.confidence, 0) /
            totalSignals) *
            100
        )
      : 0;

  const activeSources = new Set(signals.map((signal) => signal.source_url)).size;

  const signalKpis = [
    {
      title: "Total Signals",
      value: String(totalSignals),
      change: "Live API data",
      color: "text-cyan-400",
    },
    {
      title: "Critical Signals",
      value: String(criticalSignals),
      change: "Impact score ≥ 80",
      color: "text-red-400",
    },
    {
      title: "Average Impact",
      value: String(averageImpact),
      change: "Calculated from backend",
      color: "text-orange-400",
    },
    {
      title: "AI Confidence",
      value: `${averageConfidence}%`,
      change: "Average confidence",
      color: "text-emerald-400",
    },
    {
      title: "Active Sources",
      value: String(activeSources),
      change: "Unique source URLs",
      color: "text-purple-400",
    },
    {
      title: "API Status",
      value: loading ? "Loading" : "Live",
      change: error ? "Connection issue" : "Backend connected",
      color: error ? "text-red-400" : "text-blue-400",
    },
  ];

  return (
    <>
      <AIModuleInput
        moduleName="Signals Intel"
        placeholder="Paste a news article, URL, vendor update, public web signal, PDF note, or raw text. Example: CloudNova Systems reported a critical security incident and possible service disruption."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {signalKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          <p className="font-semibold">API Connection Warning</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Live Signal Feed
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Data loaded from FastAPI backend endpoint: /signals/
              </p>
            </div>

            <button
              onClick={loadSignals}
              disabled={loading}
              className="text-xs px-4 py-2 rounded-lg border border-blue-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Refreshing..." : "Refresh Signals"}
            </button>
          </div>

          {loading ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              Loading signals from backend...
            </div>
          ) : signals.length === 0 ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              No signals found from backend.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 border-b border-blue-900/50">
                  <tr>
                    <th className="text-left py-3 pr-4">ID</th>
                    <th className="text-left py-3 pr-4">Signal Type</th>
                    <th className="text-left py-3 pr-4">Impact</th>
                    <th className="text-left py-3 pr-4">Likelihood</th>
                    <th className="text-left py-3 pr-4">Confidence</th>
                    <th className="text-left py-3 pr-4">Severity</th>
                    <th className="text-left py-3 pr-4">Status</th>
                    <th className="text-left py-3 pr-4">Source</th>
                  </tr>
                </thead>

                <tbody>
                  {signals.map((signal) => {
                    const severity = getSeverity(signal.impact_score);

                    return (
                      <tr
                        key={signal.id}
                        className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                      >
                        <td className="py-3 pr-4 text-slate-300">
                          {signal.id}
                        </td>

                        <td className="py-3 pr-4 text-white font-medium">
                          {signal.type}
                        </td>

                        <td className="py-3 pr-4 text-cyan-300 font-semibold">
                          {signal.impact_score}
                        </td>

                        <td className="py-3 pr-4 text-slate-300">
                          {formatPercent(signal.likelihood)}
                        </td>

                        <td className="py-3 pr-4 text-emerald-400">
                          {formatPercent(signal.confidence)}
                        </td>

                        <td className="py-3 pr-4">
                          <span
                            className={`px-2 py-1 rounded-full border text-xs ${severityClass(
                              severity
                            )}`}
                          >
                            {severity}
                          </span>
                        </td>

                        <td className="py-3 pr-4">
                          <span className="px-2 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs">
                            {signal.status}
                          </span>
                        </td>

                        <td className="py-3 pr-4">
                          <a
                            href={signal.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Signal Analysis
          </h3>

          {signals.length === 0 && !loading ? (
            <p className="text-sm text-slate-400">
              No backend signal data available.
            </p>
          ) : (
            <div className="space-y-5">
              {signals.map((signal) => {
                const severity = getSeverity(signal.impact_score);

                return (
                  <div
                    key={signal.id}
                    className="border-b border-blue-900/40 pb-4"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <p className="text-sm font-semibold text-white">
                        {signal.type}
                      </p>

                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${severityClass(
                          severity
                        )}`}
                      >
                        {severity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-3 leading-5">
                      Impact score {signal.impact_score}, likelihood{" "}
                      {formatPercent(signal.likelihood)}, confidence{" "}
                      {formatPercent(signal.confidence)}.
                    </p>

                    <p className="text-xs text-cyan-400 mt-2">
                      Recommended action: Review and prioritize based on severity.
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SignalsIntelPage;


