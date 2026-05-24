import React from "react";

type KpiCardProps = {
  title: string;
  value: string;
  change: string;
  color: string;
};

function KpiCard({ title, value, change, color }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-blue-900/50 bg-[#071426] p-4 shadow-lg shadow-blue-950/30">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h3>

      <p className="text-xs text-emerald-400 mt-2">{change} vs last 7 days</p>

      <div className="h-8 mt-3 rounded bg-gradient-to-r from-blue-500/25 via-cyan-400/10 to-transparent" />
    </div>
  );
}

export default KpiCard;


