import React, { useState } from "react";
import { analyzeModule } from "../api/apiClient";
import {
  downloadTextFile,
  downloadJsonFile,
  downloadCsvFile,
} from "../utils/download";

type AIModuleInputProps = {
  moduleName: string;
  placeholder?: string;
};

type AnalysisResult = {
  module: string;
  input_type: string;
  summary: string;
  score: number;
  severity: string;
  confidence: number;
  recommended_actions: string[];
  report: string;
  generated_at: string;
  download_formats: string[];
};

const inputTypes = [
  "Text",
  "URL",
  "Website",
  "Company Name",
  "Manual Note",
  "PDF",
  "DOC",
  "CSV",
  "JSON",
];

function severityClass(severity: string) {
  if (severity === "Critical") {
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  if (severity === "High") {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30";
  }

  if (severity === "Medium") {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }

  return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
}

function formatFileName(moduleName: string, extension: string) {
  const safeName = moduleName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${safeName || "omnisignal"}-analysis.${extension}`;
}

function buildCsvRow(result: AnalysisResult) {
  return [
    {
      module: result.module,
      input_type: result.input_type,
      score: result.score,
      severity: result.severity,
      confidence: `${Math.round(result.confidence * 100)}%`,
      summary: result.summary,
      recommended_actions: result.recommended_actions.join(" | "),
      generated_at: result.generated_at,
    },
  ];
}

function AIModuleInput({ moduleName, placeholder }: AIModuleInputProps) {
  const [inputType, setInputType] = useState("Text");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [actionMessage, setActionMessage] = useState("");

  async function handleAnalyze() {
    try {
      setLoading(true);
      setError("");
      setActionMessage("");

      const data = await analyzeModule({
        module: moduleName,
        input_type: inputType,
        content,
        file_name: fileName,
      });

      setResult(data);
    } catch (err) {
      console.error("AI module analysis error:", err);
      setError("Failed to analyze input. Please check backend /module/analyze.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setContent("");
    setFileName(null);
    setResult(null);
    setError("");
    setActionMessage("");
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setFileName(file.name);
    setContent(
      `Uploaded file reference: ${file.name}. File type: ${
        file.type || "unknown"
      }. File size: ${file.size} bytes.`
    );
  }

  function downloadTxt() {
    if (!result) return;

    downloadTextFile(formatFileName(moduleName, "txt"), result.report);
  }

  function downloadJson() {
    if (!result) return;

    downloadJsonFile(formatFileName(moduleName, "json"), result);
  }

  function downloadCsv() {
    if (!result) return;

    downloadCsvFile(formatFileName(moduleName, "csv"), buildCsvRow(result));
  }

  function exportPdfReport() {
    if (!result) return;

    const reportHtml = `
      <!doctype html>
      <html>
        <head>
          <title>OmniSignal AI Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 32px;
              color: #0f172a;
              line-height: 1.6;
            }
            .header {
              border-bottom: 2px solid #0ea5e9;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            h1 {
              margin: 0;
              color: #0369a1;
            }
            .meta {
              margin-top: 12px;
              font-size: 14px;
              color: #475569;
            }
            .badge {
              display: inline-block;
              padding: 6px 10px;
              border-radius: 999px;
              background: #e0f2fe;
              color: #0369a1;
              font-size: 13px;
              margin-right: 8px;
            }
            .section {
              margin-top: 24px;
            }
            .score {
              font-size: 24px;
              font-weight: bold;
              color: #0f766e;
            }
            ul {
              padding-left: 20px;
            }
            pre {
              white-space: pre-wrap;
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>OmniSignal AI Module Analysis Report</h1>
            <div class="meta">
              Module: ${result.module}<br />
              Input Type: ${result.input_type}<br />
              Generated At: ${result.generated_at}
            </div>
          </div>

          <div>
            <span class="badge">Severity: ${result.severity}</span>
            <span class="badge">Score: ${result.score}</span>
            <span class="badge">Confidence: ${Math.round(
              result.confidence * 100
            )}%</span>
          </div>

          <div class="section">
            <h2>Summary</h2>
            <p>${result.summary}</p>
          </div>

          <div class="section">
            <h2>Recommended Actions</h2>
            <ul>
              ${result.recommended_actions
                .map((action) => `<li>${action}</li>`)
                .join("")}
            </ul>
          </div>

          <div class="section">
            <h2>Full Report</h2>
            <pre>${result.report}</pre>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      setActionMessage("Popup blocked. Please allow popups to export PDF report.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(reportHtml);
    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 300);
  }

  function addToDecisionQueue() {
    if (!result) return;

    setActionMessage(
      `${result.module} analysis added to Decision Queue with ${result.severity} priority.`
    );
  }

  function createWorkflow() {
    if (!result) return;

    setActionMessage(
      `Workflow draft created from ${result.module} analysis and recommended actions.`
    );
  }

  function copyReport() {
    if (!result) return;

    navigator.clipboard
      .writeText(result.report)
      .then(() => {
        setActionMessage("AI report copied to clipboard.");
      })
      .catch(() => {
        setActionMessage("Could not copy report. Please try again.");
      });
  }

  return (
    <section className="mb-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#071426] via-[#071426] to-blue-950/30 p-5">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="font-bold text-cyan-300 text-lg">
              {moduleName} AI Assistant
            </h3>

            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Module-Aware
            </span>

            <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              Input + Output
            </span>

            <span className="text-xs text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Action Ready
            </span>
          </div>

          <p className="text-sm text-slate-400 mb-4">
            Paste text, URL, website, company name, manual note, or upload a file
            reference. OmniSignal AI will generate module-specific analysis,
            recommended actions, and downloadable output.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            <select
              value={inputType}
              onChange={(event) => setInputType(event.target.value)}
              className="rounded-xl border border-blue-900/60 bg-[#020817] px-4 py-3 text-sm outline-none focus:border-cyan-400"
            >
              {inputTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.csv,.json"
              onChange={handleFileChange}
              className="lg:col-span-3 rounded-xl border border-blue-900/60 bg-[#020817] px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white"
            />
          </div>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            placeholder={
              placeholder ||
              `Paste ${moduleName} related text, URL, company name, document note, or analysis context...`
            }
            className="mt-3 w-full rounded-xl border border-blue-900/60 bg-[#020817] px-4 py-3 text-sm outline-none focus:border-cyan-400 resize-none"
          />

          {fileName && (
            <p className="text-xs text-cyan-400 mt-2">
              Attached file reference: {fileName}
            </p>
          )}

          {error && <p className="text-sm text-red-400 mt-3">{error}</p>}

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Analyzing..." : "Analyze with AI"}
            </button>

            <button
              onClick={handleClear}
              className="px-5 py-3 rounded-xl border border-blue-700 text-cyan-300 hover:bg-blue-950/40"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="xl:w-[360px] rounded-2xl border border-blue-900/40 bg-blue-950/20 p-4">
          <h4 className="font-semibold text-cyan-300 mb-3">
            Supported Inputs
          </h4>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {inputTypes.map((type) => (
              <span
                key={type}
                className="rounded-lg border border-blue-900/40 bg-[#020817] px-3 py-2 text-slate-300"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
            <p className="text-xs text-emerald-300 font-semibold">
              Output Support
            </p>
            <p className="text-xs text-slate-400 mt-1">
              TXT, JSON, CSV, and printable PDF report.
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-purple-500/20 bg-purple-500/10 p-3">
            <p className="text-xs text-purple-300 font-semibold">
              Enterprise Actions
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Add to Decision Queue, Create Workflow, or Copy Report.
            </p>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-blue-900/50 bg-[#020817] p-5">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-bold text-white">AI Output Report</h4>

                <span
                  className={`px-2 py-1 rounded-full border text-xs ${severityClass(
                    result.severity
                  )}`}
                >
                  {result.severity}
                </span>

                <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-full border border-cyan-500/20">
                  Score {result.score}
                </span>

                <span className="text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  Confidence {Math.round(result.confidence * 100)}%
                </span>
              </div>

              <p className="text-sm text-slate-300 mt-4 leading-6">
                {result.summary}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold text-cyan-300 mb-2">
                  Recommended Actions
                </p>

                <ul className="space-y-2 text-sm text-slate-300">
                  {result.recommended_actions.map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>

              {actionMessage && (
                <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <p className="text-sm text-emerald-300">{actionMessage}</p>
                </div>
              )}
            </div>

            <div className="lg:w-[220px] space-y-3">
              <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-3">
                <p className="text-xs font-semibold text-cyan-300 mb-3">
                  Download Output
                </p>

                <div className="space-y-2">
                  <button
                    onClick={downloadTxt}
                    className="w-full px-4 py-2 rounded-lg border border-blue-700 text-cyan-300 hover:bg-blue-950/40 text-sm"
                  >
                    Download TXT
                  </button>

                  <button
                    onClick={downloadJson}
                    className="w-full px-4 py-2 rounded-lg border border-blue-700 text-cyan-300 hover:bg-blue-950/40 text-sm"
                  >
                    Download JSON
                  </button>

                  <button
                    onClick={downloadCsv}
                    className="w-full px-4 py-2 rounded-lg border border-blue-700 text-cyan-300 hover:bg-blue-950/40 text-sm"
                  >
                    Download CSV
                  </button>

                  <button
                    onClick={exportPdfReport}
                    className="w-full px-4 py-2 rounded-lg border border-purple-600 text-purple-300 hover:bg-purple-950/30 text-sm"
                  >
                    Export PDF Report
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-900/40 bg-blue-950/20 p-3">
                <p className="text-xs font-semibold text-orange-300 mb-3">
                  Enterprise Actions
                </p>

                <div className="space-y-2">
                  <button
                    onClick={addToDecisionQueue}
                    className="w-full px-4 py-2 rounded-lg border border-orange-600 text-orange-300 hover:bg-orange-950/30 text-sm"
                  >
                    Add to Decision Queue
                  </button>

                  <button
                    onClick={createWorkflow}
                    className="w-full px-4 py-2 rounded-lg border border-emerald-600 text-emerald-300 hover:bg-emerald-950/30 text-sm"
                  >
                    Create Workflow
                  </button>

                  <button
                    onClick={copyReport}
                    className="w-full px-4 py-2 rounded-lg border border-blue-700 text-cyan-300 hover:bg-blue-950/40 text-sm"
                  >
                    Copy Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AIModuleInput;


