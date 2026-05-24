import React, { useState } from "react";
import KpiCard from "../components/KpiCard";
import AIModuleInput from "../components/AIModuleInput";

const integrationKpis = [
  {
    title: "Connected Apps",
    value: "12",
    change: "+4 this month",
    color: "text-cyan-400",
  },
  {
    title: "Active Syncs",
    value: "248",
    change: "+18.6%",
    color: "text-emerald-400",
  },
  {
    title: "Failed Syncs",
    value: "3",
    change: "Needs review",
    color: "text-red-400",
  },
  {
    title: "Webhook Events",
    value: "8.4K",
    change: "+31.2%",
    color: "text-purple-400",
  },
  {
    title: "Avg Sync Time",
    value: "1.8s",
    change: "-12.4%",
    color: "text-blue-400",
  },
  {
    title: "Integration Health",
    value: "97%",
    change: "Operational",
    color: "text-orange-400",
  },
];

const integrations = [
  {
    name: "Bright Data",
    category: "Live Web Data",
    status: "Connected",
    health: "Operational",
    description:
      "SERP API, Web Unlocker, Web Scraper API, Scraping Browser, and MCP-powered ingestion.",
    dataFlow: "Public web signals → ingestion pipeline → AI scoring",
    icon: "🌐",
  },
  {
    name: "Salesforce",
    category: "CRM",
    status: "Connected",
    health: "Operational",
    description:
      "Push qualified opportunities, account intelligence, and buying intent signals into CRM workflows.",
    dataFlow: "Opportunities → CRM account records → sales actions",
    icon: "☁️",
  },
  {
    name: "Slack",
    category: "Communication",
    status: "Connected",
    health: "Operational",
    description:
      "Send high-priority alerts, executive summaries, and workflow notifications to team channels.",
    dataFlow: "Alerts → Slack channels → team response",
    icon: "💬",
  },
  {
    name: "ServiceNow",
    category: "ITSM / Risk",
    status: "Connected",
    health: "Operational",
    description:
      "Create incident tickets and risk review tasks when critical vendor or compliance signals appear.",
    dataFlow: "Risk signals → tickets → investigation queue",
    icon: "🛠️",
  },
  {
    name: "Jira",
    category: "Workflow",
    status: "Connected",
    health: "Operational",
    description:
      "Convert AI recommendations into actionable engineering, security, and procurement tasks.",
    dataFlow: "AI actions → Jira tasks → owner tracking",
    icon: "📌",
  },
  {
    name: "Snowflake",
    category: "Data Warehouse",
    status: "Available",
    health: "Ready",
    description:
      "Export structured signals, vendor intelligence, opportunity data, and audit history for analytics.",
    dataFlow: "Structured intelligence → warehouse → BI dashboards",
    icon: "❄️",
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    status: "Available",
    health: "Ready",
    description:
      "Deliver risk escalations, opportunity briefs, and executive intelligence summaries to Teams.",
    dataFlow: "Alerts → Teams → business owners",
    icon: "👥",
  },
  {
    name: "Coupa",
    category: "Procurement",
    status: "Available",
    health: "Ready",
    description:
      "Send vendor risk, renewal intelligence, and negotiation recommendations into procurement workflows.",
    dataFlow: "Vendor insights → procurement records → negotiation action",
    icon: "📦",
  },
];

const syncEvents = [
  {
    time: "1m ago",
    app: "Bright Data",
    event: "5 web intelligence signals ingested from demo pipeline",
    status: "Success",
  },
  {
    time: "4m ago",
    app: "Slack",
    event: "Critical vendor alert sent to #risk-ops",
    status: "Success",
  },
  {
    time: "8m ago",
    app: "Salesforce",
    event: "High-confidence opportunity pushed to enterprise account",
    status: "Success",
  },
  {
    time: "15m ago",
    app: "ServiceNow",
    event: "Vendor risk investigation ticket created",
    status: "Success",
  },
  {
    time: "22m ago",
    app: "Jira",
    event: "Contract renewal action assigned to procurement owner",
    status: "Success",
  },
  {
    time: "34m ago",
    app: "Snowflake",
    event: "Warehouse sync skipped because connector is not enabled",
    status: "Pending",
  },
];

const webhookRules = [
  {
    name: "Critical vendor risk",
    trigger: "vendor.risk_score >= 80",
    action: "Create ServiceNow ticket + Slack alert",
  },
  {
    name: "High-confidence opportunity",
    trigger: "opportunity.confidence >= 0.85",
    action: "Push to Salesforce + notify RevOps",
  },
  {
    name: "Bright Data ingestion completed",
    trigger: "ingestion.status = completed",
    action: "Update dashboard + send executive summary",
  },
  {
    name: "Contract renewal risk",
    trigger: "renewal.window <= 60 days",
    action: "Create procurement workflow",
  },
];

function statusBadge(status: string) {
  if (status === "Connected" || status === "Success") {
    return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
  }

  if (status === "Available" || status === "Pending") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-red-500/20 text-red-400 border-red-500/30";
}

function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState(integrations[0]);

  return (
    <>
      <AIModuleInput
        moduleName="Integrations"
        placeholder="Paste integration event, webhook payload, CRM note, Slack alert, Jira ticket, connector requirement, or API sync issue. Example: When Bright Data ingestion completes, update dashboard, notify Slack, and push high-confidence opportunities to Salesforce."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {integrationKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                Enterprise Integration Hub
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Connect OmniSignal AI with CRM, procurement, security, data
                warehouse, workflow, and communication tools.
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm">
              + Add Integration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <button
                key={integration.name}
                onClick={() => setSelectedIntegration(integration)}
                className={`text-left rounded-2xl border p-4 transition ${
                  selectedIntegration.name === integration.name
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-blue-900/40 bg-blue-950/20 hover:border-blue-500"
                }`}
              >
                <div className="flex justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-700 flex items-center justify-center text-xl">
                      {integration.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {integration.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {integration.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`h-fit px-2 py-1 rounded-full border text-xs ${statusBadge(
                      integration.status
                    )}`}
                  >
                    {integration.status}
                  </span>
                </div>

                <p className="text-sm text-slate-400 mt-3 leading-5">
                  {integration.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Integration Detail
          </h3>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-700 flex items-center justify-center text-2xl">
                {selectedIntegration.icon}
              </div>

              <div>
                <p className="font-semibold text-white">
                  {selectedIntegration.name}
                </p>
                <p className="text-xs text-slate-400">
                  {selectedIntegration.category}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span
                className={`px-2 py-1 rounded-full border text-xs ${statusBadge(
                  selectedIntegration.status
                )}`}
              >
                {selectedIntegration.status}
              </span>

              <span className="px-2 py-1 rounded-full border text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                {selectedIntegration.health}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-2">Description</p>
          <p className="text-sm text-slate-300 leading-6 mb-5">
            {selectedIntegration.description}
          </p>

          <p className="text-sm text-slate-400 mb-2">Data Flow</p>
          <div className="rounded-xl border border-blue-900/40 bg-blue-950/20 p-4 text-sm text-cyan-300">
            {selectedIntegration.dataFlow}
          </div>

          <button className="w-full mt-5 py-3 rounded-xl border border-blue-700 text-cyan-300 hover:bg-blue-950/40">
            Configure Connector
          </button>
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Integration Activity Feed
          </h3>

          <div className="space-y-4">
            {syncEvents.map((item) => (
              <div
                key={`${item.time}-${item.event}`}
                className="flex justify-between gap-3 border-b border-blue-900/40 pb-3"
              >
                <div>
                  <span
                    className={`inline-block mb-2 px-2 py-0.5 rounded text-xs border ${statusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  <p className="text-sm text-slate-300">{item.event}</p>
                  <p className="text-xs text-cyan-400 mt-1">{item.app}</p>
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
            Webhook & Automation Rules
          </h3>

          <div className="space-y-4">
            {webhookRules.map((rule) => (
              <div
                key={rule.name}
                className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4"
              >
                <p className="font-semibold text-white text-sm">{rule.name}</p>
                <p className="text-xs text-slate-400 mt-2">
                  Trigger:{" "}
                  <span className="text-cyan-300">{rule.trigger}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Action:{" "}
                  <span className="text-emerald-400">{rule.action}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 text-lg mb-4">
            Enterprise Readiness
          </h3>

          <div className="space-y-4">
            {[
              ["OAuth / API Keys", "Ready"],
              ["Role-based Access", "Planned"],
              ["Audit Logs", "Ready"],
              ["Webhook Rules", "Ready"],
              ["Data Export", "Ready"],
              ["SOC2-style Controls", "Planned"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-blue-900/40 pb-3"
              >
                <span className="text-sm text-slate-300">{label}</span>
                <span
                  className={`text-sm font-semibold ${
                    value === "Ready" ? "text-emerald-400" : "text-yellow-400"
                  }`}
                >
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

export default IntegrationsPage;



