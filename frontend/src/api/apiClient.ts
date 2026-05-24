import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchSignals() {
  const response = await apiClient.get("/signals/");
  return response.data;
}

export async function fetchVendors() {
  const response = await apiClient.get("/vendors/");
  return response.data;
}

export async function fetchOpportunities() {
  const response = await apiClient.get("/opportunities/");
  return response.data;
}

export async function fetchAlerts() {
  const response = await apiClient.get("/alerts/");
  return response.data;
}

export async function queryCopilot(question: string) {
  const response = await apiClient.post("/copilot/query", {
    question,
  });

  return response.data;
}

export async function fetchIngestionStatus() {
  const response = await apiClient.get("/ingestion/status");
  return response.data;
}

export async function runDemoIngestion() {
  const response = await apiClient.post("/ingestion/run-demo");
  return response.data;
}

export async function analyzeModule(input: {
  module: string;
  input_type: string;
  content: string;
  file_name?: string | null;
}) {
  const response = await apiClient.post("/module/analyze", input);
  return response.data;
}


