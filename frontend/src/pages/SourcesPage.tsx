import React, { useEffect, useState } from "react";
import { fetchIngestionStatus, runDemoIngestion } from "../api/apiClient";

type IngestionStatus = {
  status: string;
  provider: string;
  mode: string;
  pipeline: string;
  available_tools: string[];
  last_run: string | null;
  message: string;
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

function severityBadge(severity: string) {
  if (severity === "Critical") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (severity === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (severity === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function SourcesPage() {
  const [status, setStatus] = useState<IngestionStatus | null>(null);
  const [result, setResult] = useState<IngestionResult | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  async function loadStatus() {
    try {
      setLoadingStatus(true);
      setError("");

      const data = await fetchIngestionStatus();
      setStatus(data);
    } catch (err) {
      console.error("Ingestion status error:", err);
      setError("Failed to load ingestion status. Please check backend /ingestion/status.");
    } finally {
      setLoadingStatus(false);
    }
  }

  async function handleRunDemo() {
    try {
      setRunning(true);
      setError("");

      const data = await runDemoIngestion();
      setResult(data);
    } catch (err) {
      console.error("Run ingestion error:", err);
      setError("Failed to run demo ingestion. Please check backend /ingestion/run-demo.");
    } finally {
      setRunning(false);
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  const tools = result?.tools_used || status?.available_tools || [];

  return (
    <>
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          <p className="font-semibold">Pipeline Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-6">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-cyan-400">
                BRIGHT DATA PIPELINE
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Live Web Intelligence Ingestion
              </h3>

              <p className="text-slate-400 mt-2 leading-6">
                Collect public web signals using Bright Data infrastructure,
                normalize them into enterprise intelligence objects, score risk
                and opportunity impact, then send them into OmniSignal AI.
              </p>
            </div>

            <button
              onClick={handleRunDemo}
              disabled={running}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? "Running Ingestion..." : "Run Demo Ingestion"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
              <p className="text-slate-400 text-sm">Provider</p>
              <p className="text-xl font-bold text-cyan-300 mt-1">
                {status?.provider || "Bright Data"}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
              <p className="text-slate-400 text-sm">Mode</p>
              <p className="text-xl font-bold text-purple-300 mt-1">
                {status?.mode || "demo"}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
              <p className="text-slate-400 text-sm">Status</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                {loadingStatus ? "Loading" : status?.status || "ready"}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
              <p className="text-slate-400 text-sm">Signals Collected</p>
              <p className="text-xl font-bold text-orange-400 mt-1">
                {result?.signals_collected || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-6">
          <h3 className="font-bold text-cyan-300 mb-4">
            Bright Data Tools Used
          </h3>

          <div className="space-y-3">
            {tools.map((tool) => (
              <div
                key={tool}
                className="flex justify-between items-center border-b border-blue-900/40 pb-3"
              >
                <span className="text-sm text-slate-300">{tool}</span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  Ready
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-5">
            Demo mode simulates Bright Data powered collection. Real API keys can
            later connect SERP API, Web Unlocker, Web Scraper API, Scraping
            Browser, and MCP workflows.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Collected Web Intelligence Signals
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Output from POST /ingestion/run-demo
              </p>
            </div>

            <button
              onClick={loadStatus}
              className="text-xs px-4 py-2 rounded-lg border border-blue-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300"
            >
              Refresh Status
            </button>
          </div>

          {!result ? (
            <div className="h-64 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              Run demo ingestion to collect simulated Bright Data web signals.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 border-b border-blue-900/50">
                  <tr>
                    <th className="text-left py-3 pr-4">Source</th>
                    <th className="text-left py-3 pr-4">Entity</th>
                    <th className="text-left py-3 pr-4">Signal</th>
                    <th className="text-left py-3 pr-4">Category</th>
                    <th className="text-left py-3 pr-4">Severity</th>
                    <th className="text-left py-3 pr-4">Impact</th>
                    <th className="text-left py-3 pr-4">Confidence</th>
                  </tr>
                </thead>

                <tbody>
                  {result.signals.map((signal) => (
                    <tr
                      key={`${signal.source}-${signal.title}`}
                      className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                    >
                      <td className="py-3 pr-4 text-cyan-300">
                        {signal.source}
                      </td>

                      <td className="py-3 pr-4 text-slate-300">
                        {signal.entity}
                      </td>

                      <td className="py-3 pr-4 text-white font-medium">
                        {signal.type}
                      </td>

                      <td className="py-3 pr-4 text-slate-300">
                        {signal.category}
                      </td>

                      <td className="py-3 pr-4">
                        <span
                          className={`px-2 py-1 rounded-full border text-xs ${severityBadge(
                            signal.severity
                          )}`}
                        >
                          {signal.severity}
                        </span>
                      </td>

                      <td className="py-3 pr-4 text-orange-300 font-semibold">
                        {signal.impact_score}
                      </td>

                      <td className="py-3 pr-4 text-emerald-400">
                        {Math.round(signal.confidence * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Ingestion Run Summary
          </h3>

          {!result ? (
            <div className="space-y-4 text-sm text-slate-300 leading-6">
              <p>• Pipeline is ready for demo ingestion.</p>
              <p>• Click Run Demo Ingestion to simulate live web collection.</p>
              <p>• Signals will be normalized and scored automatically.</p>
            </div>
          ) : (
            <div className="space-y-4 text-sm text-slate-300 leading-6">
              <p>
                <span className="text-slate-500">Run ID:</span>{" "}
                {result.run_id}
              </p>

              <p>
                <span className="text-slate-500">Status:</span>{" "}
                <span className="text-emerald-400">{result.status}</span>
              </p>

              <p>
                <span className="text-slate-500">Signals Collected:</span>{" "}
                {result.signals_collected}
              </p>

              <p>
                <span className="text-slate-500">Summary:</span>{" "}
                {result.summary}
              </p>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                <p className="text-cyan-300 font-semibold">
                  Demo Story for Judges
                </p>
                <p className="text-sm text-slate-300 mt-2">
                  Bright Data unlocks public web sources, OmniSignal AI converts
                  them into scored enterprise signals, then the dashboard and AI
                  Copilot turn those signals into decisions.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="xl:col-span-12 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Ingestion Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            {[
              ["1", "Bright Data", "SERP API, Web Unlocker, Scraper API"],
              ["2", "Collection", "Fetch public web pages and search signals"],
              ["3", "Normalization", "Convert raw web items into structured signals"],
              ["4", "AI Scoring", "Impact, likelihood, confidence, severity"],
              ["5", "OmniSignal UI", "Dashboard, alerts, copilot, decision queue"],
            ].map(([step, title, desc]) => (
              <div
                key={step}
                className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                  {step}
                </div>

                <p className="font-semibold text-white mt-4">{title}</p>
                <p className="text-xs text-slate-400 mt-2 leading-5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SourcesPage;


