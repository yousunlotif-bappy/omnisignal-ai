import React, { useState } from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const workflowKpis = [
  {
    title: "Active Workflows",
    value: "14",
    change: "+5 this week",
    color: "text-cyan-400",
  },
  {
    title: "Automated Decisions",
    value: "248",
    change: "+31.4%",
    color: "text-emerald-400",
  },
  {
    title: "Pending Reviews",
    value: "32",
    change: "Needs action",
    color: "text-orange-400",
  },
  {
    title: "Escalations",
    value: "9",
    change: "High priority",
    color: "text-red-400",
  },
  {
    title: "Avg Response Time",
    value: "4.8m",
    change: "-22.1%",
    color: "text-purple-400",
  },
  {
    title: "Automation Health",
    value: "96%",
    change: "Operational",
    color: "text-blue-400",
  },
];

const workflows = [
  {
    name: "Vendor Risk Review",
    trigger: "Vendor risk score ≥ 80",
    owner: "Procurement + Security",
    status: "Active",
    priority: "Critical",
    steps: [
      "Detect high-risk vendor signal",
      "Enrich with public web intelligence",
      "Score impact and likelihood",
      "Create review task",
      "Send executive alert",
    ],
  },
  {
    name: "Bright Data Signal Triage",
    trigger: "New live web signal collected",
    owner: "AI Intelligence Agent",
    status: "Active",
    priority: "High",
    steps: [
      "Collect signal from Bright Data pipeline",
      "Normalize web data",
      "Classify category",
      "Calculate confidence score",
      "Push to dashboard and Copilot",
    ],
  },
  {
    name: "Opportunity Qualification",
    trigger: "Opportunity confidence ≥ 85%",
    owner: "Revenue Operations",
    status: "Active",
    priority: "High",
    steps: [
      "Detect buying intent",
      "Estimate pipeline value",
      "Score confidence",
      "Assign GTM owner",
      "Generate account brief",
    ],
  },
  {
    name: "Contract Renewal Watch",
    trigger: "Renewal window opens within 60 days",
    owner: "Finance + Legal",
    status: "Monitoring",
    priority: "Medium",
    steps: [
      "Detect upcoming renewal",
      "Check vendor risk",
      "Identify savings opportunity",
      "Recommend negotiation action",
      "Add to decision queue",
    ],
  },
  {
    name: "Executive Brief Generator",
    trigger: "Critical alert or weekly report cycle",
    owner: "AI Copilot",
    status: "Active",
    priority: "Medium",
    steps: [
      "Summarize signals",
      "Rank risks and opportunities",
      "Generate recommended actions",
      "Attach sources used",
      "Prepare leadership-ready brief",
    ],
  },
];

const automationEvents = [
  {
    time: "2m ago",
    event: "CloudNova Systems escalated to vendor risk workflow",
    severity: "Critical",
  },
  {
    time: "6m ago",
    event: "Bright Data signal triaged from Web Unlocker source",
    severity: "High",
  },
  {
    time: "12m ago",
    event: "Cloud optimization opportunity assigned to Finance",
    severity: "High",
  },
  {
    time: "24m ago",
    event: "Contract renewal watch triggered for enterprise agreement",
    severity: "Medium",
  },
  {
    time: "41m ago",
    event: "Executive brief generated for leadership review",
    severity: "Medium",
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

function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);

  return (
    <>
      <AIModuleInput
        moduleName="Workflows"
        placeholder="Paste workflow instruction, automation rule, alert routing logic, or business process. Example: When vendor risk score is above 80, create ServiceNow ticket, notify Slack, and assign procurement owner."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {workflowKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                AI Workflow Automation Center
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enterprise workflows triggered by live signals, Bright Data ingestion,
                vendor risk, opportunities, and contract events.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              + Create Workflow
            </button>
          </div>

          <div className="space-y-4">
            {workflows.map((workflow) => (
              <button
                key={workflow.name}
                onClick={() => setSelectedWorkflow(workflow)}
                className={`w-full text-left rounded-2xl border p-4 transition ${
                  selectedWorkflow.name === workflow.name
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-blue-900/40 bg-blue-950/20 hover:border-blue-500"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{workflow.name}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      Trigger: {workflow.trigger}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                        workflow.status
                      )}`}
                    >
                      {workflow.status}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                        workflow.priority
                      )}`}
                    >
                      {workflow.priority}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>Owner: {workflow.owner}</span>
                  <span>Steps: {workflow.steps.length}</span>
                  <span>Automation: Enabled</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Workflow Detail
          </h3>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 mb-5">
            <p className="font-semibold text-white">{selectedWorkflow.name}</p>
            <p className="text-sm text-slate-300 mt-2">
              {selectedWorkflow.trigger}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              <span
                className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                  selectedWorkflow.status
                )}`}
              >
                {selectedWorkflow.status}
              </span>

              <span
                className={`px-2 py-1 rounded-full border text-xs ${badgeClass(
                  selectedWorkflow.priority
                )}`}
              >
                {selectedWorkflow.priority}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-3">Workflow Steps</p>

          <div className="space-y-3">
            {selectedWorkflow.steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-3 border-b border-blue-900/40 pb-3"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-3 rounded-xl border border-blue-700 text-cyan-300 hover:bg-blue-950/40">
            Run Workflow Simulation
          </button>
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Workflow Execution Feed
          </h3>

          <div className="space-y-4">
            {automationEvents.map((item) => (
              <div
                key={`${item.time}-${item.event}`}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <div>
                  <span
                    className={`inline-block mb-2 px-2 py-0.5 rounded text-xs border ${badgeClass(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>

                  <p className="text-sm text-slate-300">{item.event}</p>
                </div>

                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Automation Logic
          </h3>

          <div className="space-y-4 text-sm text-slate-300 leading-6">
            <p>
              • Bright Data signals trigger ingestion and classification workflows.
            </p>
            <p>
              • High-risk vendors automatically create procurement and security
              review tasks.
            </p>
            <p>
              • High-confidence opportunities are pushed into GTM and finance
              decision queues.
            </p>
            <p>
              • AI Copilot generates briefs with source-backed recommended actions.
            </p>
          </div>
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Enterprise Value
          </h3>

          <div className="space-y-4">
            {[
              ["Faster Risk Response", "72%"],
              ["Manual Research Reduced", "84%"],
              ["Decision Latency Improved", "4.8x"],
              ["Procurement Savings Lift", "$3.23M"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-blue-900/40 pb-3"
              >
                <span className="text-sm text-slate-300">{label}</span>
                <span className="text-sm font-semibold text-emerald-400">
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

export default WorkflowsPage;


