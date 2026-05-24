import React, { useState } from "react";
import KpiCard from "../components/KpiCard";
import { queryCopilot } from "../api/apiClient";

const copilotKpis = [
  { title: "Copilot Queries", value: "1,248", change: "+23.4%", color: "text-cyan-400" },
  { title: "Active Investigations", value: "28", change: "+7", color: "text-emerald-400" },
  { title: "Insights Generated", value: "342", change: "+31.6%", color: "text-purple-400" },
  { title: "Recommended Actions", value: "76", change: "+18.2%", color: "text-orange-400" },
  { title: "Confidence Score", value: "92%", change: "+4.7%", color: "text-blue-400" },
  { title: "Automations", value: "19", change: "+5", color: "text-cyan-300" },
];

const suggestedQuestions = [
  "What are the top risks right now?",
  "What are the top vendor risks right now?",
  "Show me savings opportunities.",
  "Which opportunities should we prioritize?",
  "What alerts require immediate attention?",
];

type ChatMessage = {
  role: "User" | "AI";
  text: string;
  actions?: string[];
  confidence?: number;
  sources?: string[];
};

function AICopilotPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "AI",
      text: "Hello. I am OmniSignal AI Copilot. Ask me about risks, vendors, opportunities, savings, contracts, or alerts.",
    },
  ]);

  async function handleAskCopilot(questionText?: string) {
    const question = questionText || message;

    if (!question.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "User",
      text: question,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const result = await queryCopilot(question);

      const aiMessage: ChatMessage = {
        role: "AI",
        text: result.answer,
        actions: result.recommended_actions || [],
        confidence: result.confidence,
        sources: result.sources_used || [],
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Copilot API error:", error);

      const errorMessage: ChatMessage = {
        role: "AI",
        text: "Sorry, I could not connect to the AI Copilot backend. Please check if FastAPI is running and /copilot/query is available.",
      };

      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {copilotKpis.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-cyan-300 text-lg">
                AI Copilot Conversation
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Connected to FastAPI backend endpoint: POST /copilot/query
              </p>
            </div>

            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              Backend Connected
            </span>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
            {chatMessages.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 border ${
                  item.role === "AI"
                    ? "bg-blue-950/30 border-blue-500/30"
                    : "bg-slate-900/40 border-slate-700/40"
                }`}
              >
                <p className="text-xs text-slate-400 mb-1">{item.role}</p>

                <p className="text-sm text-slate-200 leading-6">{item.text}</p>

                {item.actions && item.actions.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-cyan-300 font-semibold mb-2">
                      Recommended Actions
                    </p>

                    <ul className="space-y-2">
                      {item.actions.map((action) => (
                        <li key={action} className="text-xs text-slate-300">
                          • {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {typeof item.confidence === "number" && (
                  <p className="text-xs text-emerald-400 mt-4">
                    Confidence: {Math.round(item.confidence * 100)}%
                  </p>
                )}

                {item.sources && item.sources.length > 0 && (
                  <p className="text-xs text-slate-500 mt-2">
                    Sources used: {item.sources.join(", ")}
                  </p>
                )}
              </div>
            ))}

            {loading && (
              <div className="rounded-2xl p-4 border bg-blue-950/30 border-blue-500/30">
                <p className="text-xs text-slate-400 mb-1">AI</p>
                <p className="text-sm text-slate-300">
                  Thinking across signals, vendors, opportunities, and alerts...
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col md:flex-row gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAskCopilot();
                }
              }}
              placeholder="Ask anything about enterprise intelligence..."
              className="flex-1 rounded-xl border border-blue-900/60 bg-[#020817] px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />

            <button
              onClick={() => handleAskCopilot()}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>

        <div className="xl:col-span-3 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">AI Workspace</h3>

          <div className="space-y-3 text-sm">
            {[
              "Executive Brief — Current Outlook",
              "Vendor Risk Summary",
              "Opportunity Report",
              "Alerts Review",
              "Savings Action Plan",
            ].map((item) => (
              <div
                key={item}
                className="flex justify-between border-b border-blue-900/40 pb-3"
              >
                <span>{item}</span>
                <span className="text-cyan-400">→</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-3 rounded-xl border border-blue-700 text-cyan-300 hover:bg-blue-950/40">
            + Create new artifact
          </button>
        </div>

        <div className="xl:col-span-2 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">Suggested Questions</h3>

          <div className="space-y-3">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleAskCopilot(question)}
                disabled={loading}
                className="w-full text-left text-sm rounded-xl border border-blue-900/40 bg-blue-950/20 p-3 hover:border-cyan-400 disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">Connected Context</h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Signals Intel", "Live"],
              ["Opportunities", "2"],
              ["Risk & Compliance", "Active"],
              ["Vendors", "2"],
              ["Alerts", "2"],
              ["Command Center", "Live"],
            ].map(([name, value]) => (
              <div
                key={name}
                className="rounded-xl bg-blue-950/30 border border-blue-900/40 p-4"
              >
                <p className="text-slate-400">{name}</p>
                <p className="text-cyan-300 font-semibold mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">AI Analyst Notes</h3>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-red-400 font-semibold">Live Copilot Enabled</p>
            <p className="text-sm text-slate-300 mt-2">
              The AI Copilot page is now connected with the backend POST route.
              It can analyze current demo signals, vendors, opportunities, and alerts.
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-blue-900/50 bg-[#071426] p-5">
          <h3 className="font-bold text-cyan-300 mb-4">Recent Copilot Sessions</h3>

          <div className="space-y-3 text-sm">
            <p className="border-b border-blue-900/40 pb-3">
              Vendor Risk Question — just now
            </p>
            <p className="border-b border-blue-900/40 pb-3">
              Opportunity Review — 18m ago
            </p>
            <p className="border-b border-blue-900/40 pb-3">
              Savings Analysis — 32m ago
            </p>
            <p className="border-b border-blue-900/40 pb-3">
              Alert Investigation — 1h ago
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AICopilotPage;


