import React, { useEffect, useState } from "react";
import { fetchSignals, fetchVendors, fetchOpportunities, fetchAlerts } from "../api/apiClient";

function BackendConnectionTest() {
  const [status, setStatus] = useState("Checking backend connection...");
  const [counts, setCounts] = useState({
    signals: 0,
    vendors: 0,
    opportunities: 0,
    alerts: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [signals, vendors, opportunities, alerts] = await Promise.all([
          fetchSignals(),
          fetchVendors(),
          fetchOpportunities(),
          fetchAlerts(),
        ]);

        setCounts({
          signals: signals.length,
          vendors: vendors.length,
          opportunities: opportunities.length,
          alerts: alerts.length,
        });

        setStatus("Backend connected successfully");
      } catch (error) {
        console.error(error);
        setStatus("Backend connection failed");
      }
    }

    loadData();
  }, []);

  return (
    <div className="mb-6 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-bold text-cyan-300">Backend API Status</h3>
          <p className="text-sm text-slate-400 mt-1">{status}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="rounded-xl bg-blue-950/40 border border-blue-900/40 p-3">
            <p className="text-slate-400">Signals</p>
            <p className="text-xl font-bold text-cyan-400">{counts.signals}</p>
          </div>

          <div className="rounded-xl bg-blue-950/40 border border-blue-900/40 p-3">
            <p className="text-slate-400">Vendors</p>
            <p className="text-xl font-bold text-emerald-400">{counts.vendors}</p>
          </div>

          <div className="rounded-xl bg-blue-950/40 border border-blue-900/40 p-3">
            <p className="text-slate-400">Opportunities</p>
            <p className="text-xl font-bold text-purple-400">{counts.opportunities}</p>
          </div>

          <div className="rounded-xl bg-blue-950/40 border border-blue-900/40 p-3">
            <p className="text-slate-400">Alerts</p>
            <p className="text-xl font-bold text-orange-400">{counts.alerts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackendConnectionTest;


