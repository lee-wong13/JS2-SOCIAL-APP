// Functions for interacting with the social headers API

import { loadApiKey, loadToken } from "../utils/storages.ts";

export function authHeaders(includeContentType = true): HeadersInit {
  const token = loadToken();
  const apiKey = loadApiKey();

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (apiKey) {
    headers["X-Noroff-API-KEY"] = apiKey;
  }
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}
