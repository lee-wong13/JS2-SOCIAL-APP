// Constants used for API requests

export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_KEY = "a58b5e82-f17e-483e-8075-062d94ca6724";

export const API_AUTH = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  createApiKey: `${API_BASE_URL}/auth/create-api-key`,
};

export const API_SOCIAL = {
  posts: `${API_BASE_URL}/social/posts`,
  users: `${API_BASE_URL}/social/profiles`,
};
