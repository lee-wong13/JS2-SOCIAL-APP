// Functions for handling user authentication and API key creation

import { API_AUTH } from "./constants.ts";
import type { LoginResponse, ApiError } from "../types.ts";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiKeyResponse {
  data: {
    key: string;
  };
}

function getApiErrorMessage(json: ApiError, fallback: string): string {
  return json.errors?.[0]?.message ?? json.error?.[0]?.message ?? fallback;
}

export async function registerUser(
  userData: RegisterData,
): Promise<LoginResponse> {
  const response = await fetch(API_AUTH.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const json = await response.json();
  if (!response.ok) {
    const error = json as ApiError;
    throw new Error(
      `Failed to register: ${getApiErrorMessage(error, "Unknown error")}`,
    );
  }
  return json;
}

export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(API_AUTH.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const json = await response.json();
  if (!response.ok) {
    const error = json as ApiError;
    throw new Error(
      `Failed to login: ${getApiErrorMessage(error, "Unknown error")}`,
    );
  }
  return json as LoginResponse;
}

export async function createApiKey(token: string): Promise<string> {
  const response = await fetch(API_AUTH.createApiKey, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const json = (await response.json()) as ApiKeyResponse | ApiError;

  if (!response.ok) {
    const error = json as ApiError;
    throw new Error(
      `Failed to create API key: ${getApiErrorMessage(error, "Unknown error")}`,
    );
  }

  return (json as ApiKeyResponse).data.key;
}
