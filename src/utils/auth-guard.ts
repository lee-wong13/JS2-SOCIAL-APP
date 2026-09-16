// Redirect unauthenticated users to the login page

import { loadToken } from "./storages.ts";

export function authGuard(): void {
  if (!loadToken()) {
    window.location.href = "/pages/auth/login.html";
  }
}
