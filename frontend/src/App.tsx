import React, { useState } from "react";
import "./index.css";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import CommandCenterPage from "./pages/CommandCenterPage";
import SignalsIntelPage from "./pages/SignalsIntelPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import RiskCompliancePage from "./pages/RiskCompliancePage";
import VendorsPage from "./pages/VendorsPage";
import MarketsCompetitorsPage from "./pages/MarketsCompetitorsPage";
import ContractsRenewalsPage from "./pages/ContractsRenewalsPage";
import SavingsAnalyzerPage from "./pages/SavingsAnalyzerPage";
import AICopilotPage from "./pages/AICopilotPage";
import SourcesPage from "./pages/SourcesPage";
import WorkflowsPage from "./pages/WorkflowsPage";
import IntegrationsPage from "./pages/IntegrationsPage";

function getPageTitle(activeItem: string) {
  if (activeItem === "Command Center") {
    return "Intelligence Operations Hub";
  }

  if (activeItem === "Sources") {
    return "Sources & Bright Data Pipeline";
  }

  if (activeItem === "Workflows") {
    return "Workflow Automation Center";
  }

  if (activeItem === "Integrations") {
    return "Enterprise Integrations";
  }

  return activeItem;
}

function getPageSubtitle(activeItem: string) {
  if (activeItem === "Signals Intel") {
    return "Monitor, analyze, and prioritize live signals across companies, markets, competitors, and vendors.";
  }

  if (activeItem === "Opportunities") {
    return "Discover, qualify, and prioritize revenue opportunities across accounts and strategic initiatives.";
  }

  if (activeItem === "Risk & Compliance") {
    return "Monitor critical risks, regulatory exposure, compliance obligations, and third-party threats.";
  }

  if (activeItem === "Vendors") {
    return "Track vendor health, risk, performance, reliability, and third-party exposure in real time.";
  }

  if (activeItem === "Markets & Competitors") {
    return "Track market shifts, competitor moves, pricing changes, and strategic signals across sectors.";
  }

  if (activeItem === "Contracts & Renewals") {
    return "Manage contracts, renewal risk, negotiation timing, and vendor agreement intelligence.";
  }

  if (activeItem === "Savings Analyzer") {
    return "Identify cost-saving opportunities, license waste, overlapping tools, and renewal optimization.";
  }

  if (activeItem === "AI Copilot") {
    return "Ask questions, generate executive insights, and orchestrate decisions across enterprise intelligence workflows.";
  }

  if (activeItem === "Sources") {
    return "Run Bright Data powered web intelligence ingestion, normalize live signals, and push them into OmniSignal AI workflows.";
  }

  if (activeItem === "Workflows") {
    return "Automate vendor reviews, opportunity qualification, alert triage, contract actions, and executive brief generation.";
  }

  if (activeItem === "Integrations") {
    return "Connect OmniSignal AI with enterprise systems including CRM, procurement, security, communication, and data platforms.";
  }

  return "Live AI-driven intelligence for faster, smarter enterprise decisions.";
}

function renderPage(activeItem: string) {
  if (activeItem === "Signals Intel") {
    return <SignalsIntelPage />;
  }

  if (activeItem === "Opportunities") {
    return <OpportunitiesPage />;
  }

  if (activeItem === "Risk & Compliance") {
    return <RiskCompliancePage />;
  }

  if (activeItem === "Vendors") {
    return <VendorsPage />;
  }

  if (activeItem === "Markets & Competitors") {
    return <MarketsCompetitorsPage />;
  }

  if (activeItem === "Contracts & Renewals") {
    return <ContractsRenewalsPage />;
  }

  if (activeItem === "Savings Analyzer") {
    return <SavingsAnalyzerPage />;
  }

  if (activeItem === "AI Copilot") {
    return <AICopilotPage />;
  }

  if (activeItem === "Sources") {
    return <SourcesPage />;
  }

  if (activeItem === "Workflows") {
    return <WorkflowsPage />;
  }

  if (activeItem === "Integrations") {
    return <IntegrationsPage />;
  }

  return <CommandCenterPage />;
}

function App() {
  const [activeItem, setActiveItem] = useState("Command Center");

  return (
    <div className="min-h-screen bg-[#020817] text-white flex overflow-hidden">
      <Sidebar activeItem={activeItem} onSelectItem={setActiveItem} />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
        <Topbar />

        <section className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {getPageTitle(activeItem)}
          </h2>

          <p className="text-slate-400 mt-2">{getPageSubtitle(activeItem)}</p>

          <div className="flex items-center gap-2 mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />

            <span className="text-sm text-slate-300">
              Live Intelligence Feed Active
            </span>
          </div>
        </section>

        {renderPage(activeItem)}
      </main>
    </div>
  );
}

export default App;


