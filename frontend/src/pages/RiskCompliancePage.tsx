import React from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const riskKpis = [
  {
    title: "Open Risks",
    value: "24",
    change: "+6 this week",
    color: "text-red-400",
  },
  {
    title: "Critical Issues",
    value: "5",
    change: "Needs review",
    color: "text-orange-400",
  },
  {
    title: "Compliance Items",
    value: "18",
    change: "+4 monitored",
    color: "text-cyan-400",
  },
  {
    title: "Policy Changes",
    value: "7",
    change: "Detected",
    color: "text-purple-400",
  },
  {
    title: "Avg Risk Score",
    value: "78",
    change: "High exposure",
    color: "text-yellow-400",
  },
  {
    title: "Response SLA",
    value: "92%",
    change: "On track",
    color: "text-emerald-400",
  },
];

const riskItems = [
  {
    title: "Supplier cybersecurity incident",
    category: "Third-party Risk",
    severity: "Critical",
    owner: "Security",
    status: "Investigation",
  },
  {
    title: "EU vendor sustainability update",
    category: "Regulatory",
    severity: "High",
    owner: "Compliance",
    status: "Review",
  },
  {
    title: "Cloud data residency requirement",
    category: "Policy",
    severity: "High",
    owner: "Legal",
    status: "Monitoring",
  },
  {
    title: "Vendor incident disclosure delay",
    category: "Operational Risk",
    severity: "Medium",
    owner: "Procurement",
    status: "Open",
  },
  {
    title: "Audit evidence gap in SaaS vendor",
    category: "Audit",
    severity: "Medium",
    owner: "Risk Team",
    status: "Pending",
  },
];

const complianceRules = [
  {
    rule: "Critical vendor incident must be reviewed within 24 hours",
    status: "Active",
  },
  {
    rule: "Regulatory updates must be mapped to impacted vendors",
    status: "Active",
  },
  {
    rule: "High-risk supplier must have alternative sourcing review",
    status: "Active",
  },
  {
    rule: "Security exposure must trigger executive alert",
    status: "Active",
  },
];

function badgeClass(value: string) {
  if (value === "Critical") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (value === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (value === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  if (value === "Active") {
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function RiskCompliancePage() {
  return (
    <>
      <AIModuleInput
        moduleName="Risk & Compliance"
        placeholder="Paste regulation text, compliance update, policy PDF note, audit finding, vendor risk alert, or URL. Example: EU sustainability compliance update may impact 14 vendors."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {riskKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Risk & Compliance Register
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                AI-assisted risk triage across vendors, regulations, security, and compliance signals.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              + Add Risk Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-blue-900/50">
                <tr>
                  <th className="text-left py-3 pr-4">Risk</th>
                  <th className="text-left py-3 pr-4">Category</th>
                  <th className="text-left py-3 pr-4">Severity</th>
                  <th className="text-left py-3 pr-4">Owner</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {riskItems.map((item) => (
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
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                          item.severity
                        )}`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{item.owner}</td>
                    <td className="py-3 pr-4 text-cyan-300">{item.status}</td>
                    <td className="py-3 pr-4 text-cyan-400">Review</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            AI Compliance Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Critical supplier cybersecurity incident should be reviewed immediately.</p>
            <p>• EU sustainability update may require vendor-level compliance mapping.</p>
            <p>• Module AI Assistant can analyze policy text, regulation URLs, audit notes, and PDF references.</p>
          </div>
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Compliance Automation Rules
          </h3>

          <div className="space-y-4">
            {complianceRules.map((rule) => (
              <div
                key={rule.rule}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <p className="text-sm text-slate-300">{rule.rule}</p>
                <span
                  className={`h-fit px-2 py-1 rounded-full border text-xs ${badgeClass(
                    rule.status
                  )}`}
                >
                  {rule.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Risk Heatmap Summary
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className={`h-14 rounded-xl border flex items-center justify-center text-sm font-bold ${
                  index > 11
                    ? "bg-red-500/30 border-red-500/30"
                    : index > 7
                    ? "bg-orange-500/25 border-orange-500/30"
                    : index > 3
                    ? "bg-purple-500/25 border-purple-500/30"
                    : "bg-blue-500/20 border-blue-500/30"
                }`}
              >
                {index === 14 ? "5" : index === 9 ? "8" : index === 4 ? "11" : ""}
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 mt-4">
            Top exposure: Supplier cybersecurity and regulatory vendor impact.
          </p>
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Response Priority
          </h3>

          <div className="space-y-4">
            {[
              ["Immediate", "5"],
              ["This week", "12"],
              ["Monitor", "18"],
              ["Resolved", "41"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-blue-900/40 pb-3"
              >
                <span className="text-sm text-slate-300">{label}</span>
                <span className="text-sm font-semibold text-cyan-300">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default RiskCompliancePage;


