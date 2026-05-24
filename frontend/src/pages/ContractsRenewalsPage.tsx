import React from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const contractKpis = [
  {
    title: "Active Contracts",
    value: "148",
    change: "+12 tracked",
    color: "text-cyan-400",
  },
  {
    title: "Renewals at Risk",
    value: "$1.93M",
    change: "Next 60 days",
    color: "text-pink-400",
  },
  {
    title: "Upcoming Renewals",
    value: "27",
    change: "Next quarter",
    color: "text-orange-400",
  },
  {
    title: "Savings Potential",
    value: "$2.74M",
    change: "+18.2%",
    color: "text-emerald-400",
  },
  {
    title: "Negotiation Leverage",
    value: "High",
    change: "AI assessed",
    color: "text-purple-400",
  },
  {
    title: "Contract Health",
    value: "82%",
    change: "Operational",
    color: "text-blue-400",
  },
];

const contracts = [
  {
    vendor: "CloudNova Systems",
    contract: "Enterprise Cloud Agreement",
    value: "$1.42M",
    renewalWindow: "30 days",
    risk: "Critical",
    recommendation: "Renegotiate pricing and security terms",
  },
  {
    vendor: "Global Logistics Ltd",
    contract: "APAC Logistics Master Service Agreement",
    value: "$980K",
    renewalWindow: "45 days",
    risk: "High",
    recommendation: "Review alternative logistics suppliers",
  },
  {
    vendor: "WorkSphere Suite",
    contract: "Collaboration SaaS License",
    value: "$620K",
    renewalWindow: "60 days",
    risk: "Medium",
    recommendation: "Reduce unused licenses before renewal",
  },
  {
    vendor: "DataBridge Analytics",
    contract: "Analytics Platform Subscription",
    value: "$510K",
    renewalWindow: "75 days",
    risk: "Medium",
    recommendation: "Benchmark support and pricing",
  },
  {
    vendor: "Northstar Consulting",
    contract: "Professional Services Retainer",
    value: "$340K",
    renewalWindow: "90 days",
    risk: "Low",
    recommendation: "Renew with standard terms",
  },
];

const negotiationActions = [
  {
    action: "Request updated security disclosure from CloudNova Systems",
    owner: "Security",
    priority: "Critical",
  },
  {
    action: "Benchmark alternative APAC logistics providers",
    owner: "Procurement",
    priority: "High",
  },
  {
    action: "Audit SaaS usage before WorkSphere renewal",
    owner: "Finance",
    priority: "Medium",
  },
  {
    action: "Prepare pricing comparison for DataBridge Analytics",
    owner: "Vendor Management",
    priority: "Medium",
  },
];

const renewalTimeline = [
  ["0-30 days", "5 contracts", "$1.42M exposed"],
  ["31-60 days", "9 contracts", "$1.60M exposed"],
  ["61-90 days", "13 contracts", "$2.20M exposed"],
  ["90+ days", "121 contracts", "$14.8M monitored"],
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

  if (value === "Low") {
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function ContractsRenewalsPage() {
  return (
    <>
      <AIModuleInput
        moduleName="Contracts & Renewals"
        placeholder="Paste contract terms, renewal note, vendor agreement, pricing clause, PDF/DOC reference, or negotiation issue. Example: CloudNova enterprise agreement renews in 30 days with pricing increase and security concerns."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {contractKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Contract Renewal Intelligence
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                AI-assisted renewal monitoring across vendor agreements, contract risks, pricing exposure, and negotiation windows.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              + Add Contract
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-blue-900/50">
                <tr>
                  <th className="text-left py-3 pr-4">Vendor</th>
                  <th className="text-left py-3 pr-4">Contract</th>
                  <th className="text-left py-3 pr-4">Value</th>
                  <th className="text-left py-3 pr-4">Renewal Window</th>
                  <th className="text-left py-3 pr-4">Risk</th>
                  <th className="text-left py-3 pr-4">Recommendation</th>
                  <th className="text-left py-3 pr-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {contracts.map((contract) => (
                  <tr
                    key={`${contract.vendor}-${contract.contract}`}
                    className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                  >
                    <td className="py-3 pr-4 text-white font-medium">
                      {contract.vendor}
                    </td>

                    <td className="py-3 pr-4 text-slate-300">
                      {contract.contract}
                    </td>

                    <td className="py-3 pr-4 text-emerald-400 font-semibold">
                      {contract.value}
                    </td>

                    <td className="py-3 pr-4 text-cyan-300">
                      {contract.renewalWindow}
                    </td>

                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                          contract.risk
                        )}`}
                      >
                        {contract.risk}
                      </span>
                    </td>

                    <td className="py-3 pr-4 text-slate-300">
                      {contract.recommendation}
                    </td>

                    <td className="py-3 pr-4 text-cyan-400">Review</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            AI Renewal Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• CloudNova renewal has critical exposure due to pricing and security risk.</p>
            <p>• APAC logistics renewal should be compared against alternative providers.</p>
            <p>• Module AI Assistant can analyze contract text, renewal notes, PDF references, and vendor agreements.</p>
          </div>

          <div className="mt-5 rounded-2xl border border-pink-500/30 bg-pink-500/10 p-4">
            <p className="text-pink-300 font-semibold">Top Renewal Risk</p>
            <p className="text-sm text-slate-300 mt-2">
              CloudNova Systems renewal window opens in 30 days with $1.42M exposure.
            </p>
          </div>
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Negotiation Action Queue
          </h3>

          <div className="space-y-4">
            {negotiationActions.map((item) => (
              <div
                key={item.action}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <div>
                  <p className="text-sm text-slate-300">{item.action}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Owner: {item.owner}
                  </p>
                </div>

                <span
                  className={`h-fit px-2 py-1 rounded-full border text-xs ${badgeClass(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Renewal Timeline
          </h3>

          <div className="space-y-4">
            {renewalTimeline.map(([window, count, value]) => (
              <div
                key={window}
                className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
              >
                <div className="flex justify-between">
                  <p className="font-semibold text-white">{window}</p>
                  <p className="text-cyan-300 text-sm">{count}</p>
                </div>
                <p className="text-xs text-slate-400 mt-2">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Contract Intelligence Logic
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• Renewal risk is calculated from time window, vendor score, and pricing exposure.</p>
            <p>• Contract recommendations are routed into procurement workflows.</p>
            <p>• High-value renewals trigger negotiation review automatically.</p>
            <p>• Downloadable AI reports support executive and legal review.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContractsRenewalsPage;


