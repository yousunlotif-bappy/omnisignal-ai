import React, { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";
import { fetchOpportunities } from "../api/apiClient";

type Opportunity = {
  id: number;
  title: string;
  value: number;
  confidence: number;
  priority: string;
};

function priorityBadge(priority: string) {
  if (priority === "High") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (priority === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}

function formatCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }

  return `$${value.toLocaleString()}`;
}

function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOpportunities() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchOpportunities();

      if (Array.isArray(data)) {
        setOpportunities(data);
      } else {
        setOpportunities([]);
        setError("Backend response is not an array.");
      }
    } catch (err) {
      console.error("Opportunities API error:", err);
      setError("Failed to load opportunities from backend.");
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOpportunities();
  }, []);

  const totalOpportunities = opportunities.length;
  const totalValue = opportunities.reduce((sum, item) => sum + item.value, 0);
  const highPriority = opportunities.filter(
    (item) => item.priority === "High"
  ).length;
  const averageConfidence =
    opportunities.length > 0
      ? Math.round(
          (opportunities.reduce((sum, item) => sum + item.confidence, 0) /
            opportunities.length) *
            100
        )
      : 0;

  const opportunityKpis = [
    {
      title: "Total Opportunities",
      value: String(totalOpportunities),
      change: "Live API data",
      color: "text-cyan-400",
    },
    {
      title: "Pipeline Value",
      value: formatCurrency(totalValue),
      change: "Backend value",
      color: "text-emerald-400",
    },
    {
      title: "High Priority",
      value: String(highPriority),
      change: "Priority = High",
      color: "text-red-400",
    },
    {
      title: "Avg Confidence",
      value: `${averageConfidence}%`,
      change: "Calculated from backend",
      color: "text-purple-400",
    },
    {
      title: "Active Deals",
      value: String(totalOpportunities),
      change: "Currently tracked",
      color: "text-blue-400",
    },
    {
      title: "API Status",
      value: loading ? "Loading" : "Live",
      change: error ? "Connection issue" : "Backend connected",
      color: error ? "text-red-400" : "text-cyan-300",
    },
  ];

  return (
    <>
      <AIModuleInput
        moduleName="Opportunities"
        placeholder="Paste RFP text, account note, buying intent signal, URL, website, company name, or market opportunity. Example: A large enterprise account published an RFP for AI infrastructure modernization."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {opportunityKpis.map((kpi) => (
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
                Opportunity Pipeline Board
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Data loaded from FastAPI backend endpoint: /opportunities/
              </p>
            </div>

            <button
              onClick={loadOpportunities}
              disabled={loading}
              className="text-xs px-4 py-2 rounded-lg border border-blue-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh Opportunities"}
            </button>
          </div>

          {loading ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              Loading opportunities from backend...
            </div>
          ) : opportunities.length === 0 ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              No opportunities found from backend.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 border-b border-blue-900/50">
                  <tr>
                    <th className="text-left py-3 pr-4">ID</th>
                    <th className="text-left py-3 pr-4">Opportunity</th>
                    <th className="text-left py-3 pr-4">Value</th>
                    <th className="text-left py-3 pr-4">Confidence</th>
                    <th className="text-left py-3 pr-4">Priority</th>
                    <th className="text-left py-3 pr-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {opportunities.map((opportunity) => (
                    <tr
                      key={opportunity.id}
                      className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                    >
                      <td className="py-3 pr-4 text-slate-300">
                        {opportunity.id}
                      </td>
                      <td className="py-3 pr-4 text-white font-medium">
                        {opportunity.title}
                      </td>
                      <td className="py-3 pr-4 text-emerald-400 font-semibold">
                        {formatCurrency(opportunity.value)}
                      </td>
                      <td className="py-3 pr-4 text-cyan-300">
                        {Math.round(opportunity.confidence * 100)}%
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`px-2 py-1 rounded-full border text-xs ${priorityBadge(
                            opportunity.priority
                          )}`}
                        >
                          {opportunity.priority}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-cyan-400">Review</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            AI Opportunity Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Opportunity data is connected from backend API.</p>
            <p>• Pipeline value and confidence are calculated dynamically.</p>
            <p>• Module AI Assistant can analyze RFPs, market notes, URLs, and account intelligence.</p>
          </div>
        </div>

        <div className="xl:col-span-12 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Opportunity Cards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
              >
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">{opportunity.title}</p>
                  <span
                    className={`px-2 py-1 rounded-full border text-xs h-fit ${priorityBadge(
                      opportunity.priority
                    )}`}
                  >
                    {opportunity.priority}
                  </span>
                </div>

                <p className="text-3xl font-bold text-emerald-400 mt-5">
                  {formatCurrency(opportunity.value)}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Confidence: {Math.round(opportunity.confidence * 100)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default OpportunitiesPage;



