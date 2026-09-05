import "../../css/style.css";

import type { LoginCredentials } from "../../api/auth.ts";
import { loginUser } from "../../api/auth.ts";
import { saveSession } from "../../utils/storages.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="login-container">
      <h1>COMMONS</h1>
      <form class="login-form" action="../../js/ui/auth/login.js" method="POST">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <div id="email-error" class="error-message">! Invalid Email</div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <div id="password-error" class="error-message">! Invalid Password</div>
        <button type="submit" id="login-btn">LOGIN</button>
      </form>
      <p>New here? <a href="register.html">Register</a></p>
</main>
`;

const form = document.querySelector<HTMLFormElement>(
  ".login-form",
) as HTMLFormElement;

const errorMessage = document.querySelector<HTMLDivElement>(
  ".error-message",
) as HTMLDivElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const credentials: LoginCredentials = {
    email,
    password,
  };

  try {
    const response = await loginUser(credentials);
    saveSession(response.data.accessToken, {
      id: response.data.name,
      username: response.data.name,
      email: response.data.email,
    });

    alert("Login successful!");
    window.location.href = "pages/feed/index.html";
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message;
    }
  }
});
