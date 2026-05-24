import React from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const marketKpis = [
  {
    title: "Competitor Moves",
    value: "31",
    change: "+12.4%",
    color: "text-purple-400",
  },
  {
    title: "Pricing Changes",
    value: "9",
    change: "+4 detected",
    color: "text-orange-400",
  },
  {
    title: "Market Signals",
    value: "126",
    change: "+18.2%",
    color: "text-cyan-400",
  },
  {
    title: "Product Launches",
    value: "7",
    change: "This week",
    color: "text-blue-400",
  },
  {
    title: "Threat Level",
    value: "High",
    change: "AI platforms",
    color: "text-red-400",
  },
  {
    title: "Opportunity Index",
    value: "84",
    change: "+9.7%",
    color: "text-emerald-400",
  },
];

const competitorMoves = [
  {
    company: "ProcureAI Labs",
    move: "Launched AI procurement automation suite",
    category: "Product Launch",
    impact: "High",
    confidence: "91%",
  },
  {
    company: "CloudNova Systems",
    move: "Changed enterprise cloud pricing model",
    category: "Pricing",
    impact: "High",
    confidence: "88%",
  },
  {
    company: "DataBridge Analytics",
    move: "Announced embedded analytics partner program",
    category: "Partnership",
    impact: "Medium",
    confidence: "84%",
  },
  {
    company: "SecureStack Identity",
    move: "Published new compliance automation feature",
    category: "Security",
    impact: "Medium",
    confidence: "81%",
  },
  {
    company: "WorkSphere Suite",
    move: "Expanded AI assistant for enterprise workflows",
    category: "Product",
    impact: "Medium",
    confidence: "79%",
  },
];

const marketThemes = [
  {
    theme: "AI procurement automation",
    strength: "Strong",
    description: "Multiple competitors are positioning AI as procurement control layer.",
  },
  {
    theme: "Cloud cost volatility",
    strength: "High",
    description: "Pricing movement creates savings and renewal negotiation opportunities.",
  },
  {
    theme: "Compliance automation",
    strength: "Medium",
    description: "Security and governance features are becoming competitive differentiators.",
  },
  {
    theme: "Enterprise RFP growth",
    strength: "High",
    description: "Public RFP signals show increasing AI infrastructure modernization demand.",
  },
];

function badgeClass(value: string) {
  if (value === "High" || value === "Strong") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (value === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function MarketsCompetitorsPage() {
  return (
    <>
      <AIModuleInput
        moduleName="Markets & Competitors"
        placeholder="Paste competitor announcement, pricing page URL, market note, product launch text, website, or article. Example: ProcureAI Labs launched a new AI procurement automation suite targeting enterprise buyers."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {marketKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Competitor Movement Monitor
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tracks competitor launches, pricing changes, partnerships, positioning, and market signals.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              Scan Market
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-blue-900/50">
                <tr>
                  <th className="text-left py-3 pr-4">Company</th>
                  <th className="text-left py-3 pr-4">Move</th>
                  <th className="text-left py-3 pr-4">Category</th>
                  <th className="text-left py-3 pr-4">Impact</th>
                  <th className="text-left py-3 pr-4">Confidence</th>
                  <th className="text-left py-3 pr-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {competitorMoves.map((item) => (
                  <tr
                    key={`${item.company}-${item.move}`}
                    className="border-b border-blue-900/30 hover:bg-blue-950/20 transition"
                  >
                    <td className="py-3 pr-4 text-white font-medium">
                      {item.company}
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{item.move}</td>
                    <td className="py-3 pr-4 text-cyan-300">{item.category}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                          item.impact
                        )}`}
                      >
                        {item.impact}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-emerald-400">
                      {item.confidence}
                    </td>
                    <td className="py-3 pr-4 text-cyan-400">Analyze</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            AI Market Notes
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>• AI procurement automation is emerging as a strong competitive theme.</p>
            <p>• Cloud pricing changes create both threat and savings opportunities.</p>
            <p>• Module AI Assistant can analyze competitor URLs, pricing pages, launch notes, and market articles.</p>
          </div>
        </div>

        <div className="xl:col-span-7 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Market Themes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketThemes.map((theme) => (
              <div
                key={theme.theme}
                className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
              >
                <div className="flex justify-between gap-3">
                  <p className="font-semibold text-white">{theme.theme}</p>
                  <span
                    className={`h-fit px-2 py-1 rounded-full border text-xs ${badgeClass(
                      theme.strength
                    )}`}
                  >
                    {theme.strength}
                  </span>
                </div>

                <p className="text-sm text-slate-400 mt-3 leading-6">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Strategic Response Queue
          </h3>

          <div className="space-y-4">
            {[
              ["Update competitive positioning for AI procurement category", "High"],
              ["Review pricing response to cloud market volatility", "High"],
              ["Prepare brief on enterprise RFP growth", "Medium"],
              ["Monitor compliance automation feature launches", "Medium"],
            ].map(([task, priority]) => (
              <div
                key={task}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <p className="text-sm text-slate-300">{task}</p>
                <span
                  className={`h-fit px-2 py-1 rounded-full border text-xs ${badgeClass(
                    priority
                  )}`}
                >
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketsCompetitorsPage;


