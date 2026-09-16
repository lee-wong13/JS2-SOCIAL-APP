// Utility functions for handling local storage operations

const TOKEN_KEY = "access_token";
const API_KEY_STORAGE_KEY = "api_key";
const PROFILE_KEY = "profile";

interface StoredProfile {
  id: string;
  username: string;
  email: string;
}

export function saveSession(token: string, profile: StoredProfile): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
}

export function loadApiKey(): string | null {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

export function loadProfile(): StoredProfile | null {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
}
