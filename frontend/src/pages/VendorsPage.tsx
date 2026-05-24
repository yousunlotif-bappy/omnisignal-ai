import React, { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";
import { fetchVendors } from "../api/apiClient";

type Vendor = {
  id: number;
  name: string;
  risk_score: number;
  category: string;
  alerts: string;
};

function getRiskLevel(score: number) {
  if (score >= 80) return "Critical";
  if (score >= 65) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

function riskBadge(risk: string) {
  if (risk === "Critical") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (risk === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (risk === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}

function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadVendors() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchVendors();

      if (Array.isArray(data)) {
        setVendors(data);
      } else {
        setVendors([]);
        setError("Backend response is not an array.");
      }
    } catch (err) {
      console.error("Vendors API error:", err);
      setError("Failed to load vendors from backend.");
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVendors();
  }, []);

  const totalVendors = vendors.length;
  const highRiskVendors = vendors.filter(
    (vendor) => vendor.risk_score >= 65
  ).length;
  const averageRisk =
    vendors.length > 0
      ? Math.round(
          vendors.reduce((sum, vendor) => sum + vendor.risk_score, 0) /
            vendors.length
        )
      : 0;

  const vendorKpis = [
    {
      title: "Total Vendors",
      value: String(totalVendors),
      change: "Live API data",
      color: "text-cyan-400",
    },
    {
      title: "High-Risk Vendors",
      value: String(highRiskVendors),
      change: "Risk score ≥ 65",
      color: "text-red-400",
    },
    {
      title: "Average Risk",
      value: String(averageRisk),
      change: "Calculated from backend",
      color: "text-orange-400",
    },
    {
      title: "Categories",
      value: String(new Set(vendors.map((v) => v.category)).size),
      change: "Unique categories",
      color: "text-purple-400",
    },
    {
      title: "Vendor Health",
      value: averageRisk < 50 ? "Good" : "Watch",
      change: "AI assessment",
      color: averageRisk < 50 ? "text-emerald-400" : "text-yellow-400",
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
        moduleName="Vendors"
        placeholder="Paste vendor website, vendor profile, supplier report, risk note, company name, PDF/DOC reference, or public web signal. Example: CloudNova Systems has security exposure, pricing volatility, and possible service disruption."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {vendorKpis.map((kpi) => (
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
                Vendor Intelligence Overview
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Data loaded from FastAPI backend endpoint: /vendors/
              </p>
            </div>

            <button
              onClick={loadVendors}
              disabled={loading}
              className="text-xs px-4 py-2 rounded-lg border border-blue-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh Vendors"}
            </button>
          </div>

          {loading ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              Loading vendors from backend...
            </div>
          ) : vendors.length === 0 ? (
            <div className="h-52 flex items-center justify-center rounded-xl border border-blue-900/40 bg-blue-950/20 text-slate-400">
              No vendors found from backend.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-400 border-b border-blue-900/50">
                  <tr>
                    <th className="text-left py-3 pr-4">ID</th>
                    <th className="text-left py-3 pr-4">Vendor</th>
                    <th className="text-left py-3 pr-4">Category</th>
                    <th className="text-left py-3 pr-4">Risk Score</th>
                    <th className="text-left py-3 pr-4">Risk Level</th>
                    <th className="text-left py-3 pr-4">Alert</th>
                    <th className="text-left py-3 pr-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.map((vendor) => {
                    const risk = getRiskLevel(vendor.risk_score);

                    return (
                      <tr
                        key={vendor.id}
                        className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                      >
                        <td className="py-3 pr-4 text-slate-300">
                          {vendor.id}
                        </td>
                        <td className="py-3 pr-4 text-white font-medium">
                          {vendor.name}
                        </td>
                        <td className="py-3 pr-4 text-slate-300">
                          {vendor.category}
                        </td>
                        <td className="py-3 pr-4 text-cyan-300 font-semibold">
                          {vendor.risk_score}
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`px-2 py-1 rounded-full border text-xs ${riskBadge(
                              risk
                            )}`}
                          >
                            {risk}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-slate-300">
                          {vendor.alerts}
                        </td>
                        <td className="py-3 pr-4 text-cyan-400">Review</td>
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
            AI Vendor Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Vendor data is connected directly from backend API.</p>
            <p>• Risk level is calculated automatically from backend risk score.</p>
            <p>• Module AI Assistant can analyze vendor website, PDF note, URL, or company name.</p>
          </div>
        </div>

        <div className="xl:col-span-12 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Vendor Risk Monitor
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {vendors.map((vendor) => {
              const risk = getRiskLevel(vendor.risk_score);

              return (
                <div
                  key={vendor.id}
                  className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="font-semibold">{vendor.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {vendor.category}
                      </p>
                    </div>

                    <span
                      className={`px-2 py-1 rounded-full border text-xs ${riskBadge(
                        risk
                      )}`}
                    >
                      {risk}
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-cyan-300 mt-5">
                    {vendor.risk_score}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {vendor.alerts}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default VendorsPage;



