import React, { useEffect, useState } from "react";
import { fetchAlerts } from "../api/apiClient";

type AlertItem = {
  id: number;
  message: string;
  severity: string;
};

function severityBadge(severity: string) {
  if (severity === "Critical") return "bg-red-500/20 text-red-400 border-red-500/30";
  if (severity === "High") return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  if (severity === "Medium") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-blue-500/20 text-blue-300 border-blue-500/30";
}

function RecentAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAlerts() {
    try {
      setLoading(true);
      setError("");

      const data = await fetchAlerts();

      if (Array.isArray(data)) {
        setAlerts(data);
      } else {
        setAlerts([]);
        setError("Backend response is not an array.");
      }
    } catch (err) {
      console.error("Alerts API error:", err);
      setError("Failed to load alerts.");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-bold text-cyan-300">Recent Alerts</h3>
          <p className="text-xs text-slate-500 mt-1">From backend: /alerts/</p>
        </div>

        <button onClick={loadAlerts} className="text-xs text-cyan-400">
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="h-32 flex items-center justify-center text-slate-400">
          Loading alerts...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      ) : alerts.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-slate-400">
          No alerts found.
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex justify-between gap-3 border-b border-blue-900/40 pb-3">
              <div>
                <span className={`inline-block mb-1 px-2 py-0.5 rounded text-xs border ${severityBadge(alert.severity)}`}>
                  {alert.severity}
                </span>

                <p className="text-sm">{alert.message}</p>
              </div>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                Live
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentAlerts;



