import React from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const savingsKpis = [
  {
    title: "Savings Identified",
    value: "$3.23M",
    change: "+26.8%",
    color: "text-emerald-400",
  },
  {
    title: "Unused Licenses",
    value: "1,248",
    change: "Across 14 apps",
    color: "text-orange-400",
  },
  {
    title: "Cloud Waste",
    value: "$1.85M",
    change: "Optimization ready",
    color: "text-cyan-400",
  },
  {
    title: "Overlap Tools",
    value: "18",
    change: "Consolidation possible",
    color: "text-purple-400",
  },
  {
    title: "Renewal Savings",
    value: "$1.42M",
    change: "Next 60 days",
    color: "text-pink-400",
  },
  {
    title: "Confidence",
    value: "89%",
    change: "AI assessed",
    color: "text-blue-400",
  },
];

const savingsItems = [
  {
    title: "Cloud spend optimization across underutilized workloads",
    category: "Cloud Infrastructure",
    value: "$1.85M",
    confidence: "91%",
    priority: "High",
    action: "Resize workloads and remove idle capacity",
  },
  {
    title: "Renegotiate CloudNova enterprise agreement before renewal",
    category: "Contract Renewal",
    value: "$1.42M",
    confidence: "88%",
    priority: "High",
    action: "Use vendor risk and pricing movement as leverage",
  },
  {
    title: "Consolidate overlapping collaboration and meeting tools",
    category: "SaaS Consolidation",
    value: "$760K",
    confidence: "84%",
    priority: "Medium",
    action: "Retire duplicate tools across departments",
  },
  {
    title: "Reduce unused SaaS licenses across sales and finance teams",
    category: "License Optimization",
    value: "$620K",
    confidence: "89%",
    priority: "Medium",
    action: "Reclaim inactive seats before renewal",
  },
  {
    title: "Optimize database support contracts before Q4 renewal",
    category: "Support Contract",
    value: "$510K",
    confidence: "81%",
    priority: "Medium",
    action: "Benchmark support levels and renegotiate terms",
  },
];

const wasteSignals = [
  ["Inactive users in paid SaaS tools", "High", "$620K"],
  ["Idle cloud workloads", "High", "$1.85M"],
  ["Duplicate collaboration tools", "Medium", "$760K"],
  ["Premium support underutilized", "Medium", "$510K"],
];

const actionPlan = [
  {
    step: "Audit usage data",
    owner: "FinOps",
    impact: "$1.85M",
  },
  {
    step: "Review renewal contracts",
    owner: "Procurement",
    impact: "$1.42M",
  },
  {
    step: "Consolidate duplicate SaaS tools",
    owner: "IT",
    impact: "$760K",
  },
  {
    step: "Reclaim inactive seats",
    owner: "Finance",
    impact: "$620K",
  },
];

function badgeClass(value: string) {
  if (value === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (value === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  if (value === "Low") {
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function SavingsAnalyzerPage() {
  return (
    <>
      <AIModuleInput
        moduleName="Savings Analyzer"
        placeholder="Paste SaaS spend, license usage data, cloud cost note, CSV reference, renewal pricing, or waste/optimization text. Example: 1,248 unused SaaS licenses across sales and finance teams with renewal due in 60 days."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {savingsKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Savings Opportunity Board
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                AI-assisted cost optimization across SaaS, cloud, vendor contracts, renewals, and support agreements.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              Run Savings Scan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-blue-900/50">
                <tr>
                  <th className="text-left py-3 pr-4">Opportunity</th>
                  <th className="text-left py-3 pr-4">Category</th>
                  <th className="text-left py-3 pr-4">Value</th>
                  <th className="text-left py-3 pr-4">Confidence</th>
                  <th className="text-left py-3 pr-4">Priority</th>
                  <th className="text-left py-3 pr-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {savingsItems.map((item) => (
                  <tr
                    key={item.title}
                    className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                  >
                    <td className="py-3 pr-4 text-white font-medium">
                      {item.title}
                    </td>

                    <td className="py-3 pr-4 text-slate-300">
                      {item.category}
                    </td>

                    <td className="py-3 pr-4 text-emerald-400 font-semibold">
                      {item.value}
                    </td>

                    <td className="py-3 pr-4 text-cyan-300">
                      {item.confidence}
                    </td>

                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3 pr-4 text-slate-300">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            AI Savings Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Cloud workload optimization is the largest savings opportunity.</p>
            <p>• Renewal timing creates negotiation leverage for CloudNova Systems.</p>
            <p>• Module AI Assistant can analyze SaaS spend notes, CSV references, license data, and cloud cost text.</p>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-emerald-300 font-semibold">Top Savings Area</p>
            <p className="text-sm text-slate-300 mt-2">
              Cloud spend optimization can potentially unlock $1.85M in savings.
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Waste Signals
          </h3>

          <div className="space-y-4">
            {wasteSignals.map(([signal, severity, value]) => (
              <div
                key={signal}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <div>
                  <p className="text-sm text-slate-300">{signal}</p>
                  <p className="text-xs text-emerald-400 mt-1">{value}</p>
                </div>

                <span
                  className={`h-fit px-2 py-1 rounded-full border text-xs ${badgeClass(
                    severity
                  )}`}
                >
                  {severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Recommended Action Plan
          </h3>

          <div className="space-y-4">
            {actionPlan.map((item, index) => (
              <div
                key={item.step}
                className="flex gap-3 border-b border-blue-900/40 pb-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{item.step}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500">
                      Owner: {item.owner}
                    </span>
                    <span className="text-xs text-emerald-400">
                      {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Savings Logic
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Savings are detected from usage gaps, duplicate tools, contract timing, and cloud waste.</p>
            <p>• Confidence is based on signal strength and estimated business value.</p>
            <p>• High-value savings are pushed into procurement and finance workflows.</p>
            <p>• Downloadable AI reports can support executive cost optimization review.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SavingsAnalyzerPage;



