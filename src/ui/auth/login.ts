import "../../css/style.css";

import type { LoginCredentials } from "../../api/auth.ts";
import { createApiKey, loginUser } from "../../api/auth.ts";
import { loadApiKey, saveApiKey, saveSession } from "../../utils/storages.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="login-container">
      <h1>COMMONS</h1>
      <form class="login-form" action="../../js/ui/auth/login.js" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit" id="login-btn">LOGIN</button>
        <div id="login-error" class="error-message"></div>
      </form>
      <p>New here? <a href="register.html">Register</a></p>
</main>
`;

const form = document.querySelector<HTMLFormElement>(
  ".login-form",
) as HTMLFormElement;

const errorMessage = document.querySelector<HTMLDivElement>(
  "#login-error",
) as HTMLDivElement;

function showError(message: string): void {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorMessage.textContent = "";
  errorMessage.style.display = "none";

  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const credentials: LoginCredentials = {
    email,
    password,
  };

  try {
    const response = await loginUser(credentials);
    const apiKey =
      loadApiKey() ?? (await createApiKey(response.data.accessToken));

    saveApiKey(apiKey);
    saveSession(response.data.accessToken, {
      id: response.data.name,
      username: response.data.name,
      email: response.data.email,
    });

    alert("Login successful!");
    window.location.assign("/pages/feed/index.html");
  } catch (error) {
    if (error instanceof Error) {
      showError(error.message);
    }
  }
});
