import React from "react";
import { sidebarItems } from "../data/mockData";

type SidebarProps = {
  activeItem: string;
  onSelectItem: (item: string) => void;
};

function getItemIcon(item: string) {
  if (item === "Command Center") return "⌘";
  if (item === "Signals Intel") return "◉";
  if (item === "Opportunities") return "◎";
  if (item === "Risk & Compliance") return "盾";
  if (item === "Vendors") return "▣";
  if (item === "Markets & Competitors") return "▥";
  if (item === "Contracts & Renewals") return "▤";
  if (item === "Savings Analyzer") return "◇";
  if (item === "AI Copilot") return "✦";
  if (item === "Sources") return "🌐";
  if (item === "Workflows") return "⚙";
  if (item === "Integrations") return "⛓";
  return "•";
}

function Sidebar({ activeItem, onSelectItem }: SidebarProps) {
  return (
    <aside className="w-[280px] shrink-0 min-h-screen bg-[#06111f] border-r border-blue-900/40 p-4 flex flex-col overflow-y-auto">
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-16 h-16 rounded-full border border-blue-500/60 bg-blue-950/30 flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
          <img
            src="/logo main.png"
            alt="OmniSignal AI Logo"
            className="w-14 h-14 rounded-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            OmniSignal <span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const isActive = activeItem === item;

          return (
            <button
              key={item}
              onClick={() => onSelectItem(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-blue-950/50 hover:text-white"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs border ${
                  isActive
                    ? "bg-blue-500/40 border-blue-300/40 text-white"
                    : "bg-blue-950/40 border-blue-800/50 text-slate-400"
                }`}
              >
                {getItemIcon(item)}
              </span>

              <span className="font-medium">{item}</span>
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="mt-6 rounded-2xl border border-blue-900/50 bg-[#071426] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            System Status
          </p>

          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
        </div>

        <p className="text-sm text-slate-300">All systems operational</p>

        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Uptime</span>
            <span className="text-emerald-400">99.98%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden">
            <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </div>
        </div>

        <button className="mt-4 text-xs text-cyan-400 hover:text-cyan-300">
          View system status →
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;


