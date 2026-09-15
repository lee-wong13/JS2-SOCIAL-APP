import "../../css/style.css";

import type { RegisterData } from "../../api/auth.ts";
import { registerUser } from "../../api/auth.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="register-container">
      <h1>COMMONS</h1>
      <form class="register-form" action="javascript:void(0);" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <div id="username-error" class="error-message"></div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" pattern=".*@stud.noroff.no" title="Use your @stud.noroff.no email address" required />
        <div id="email-error" class="error-message">! Invalid Email</div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <div id="password-error" class="error-message">
          ! Password must be at least 8 characters long and contain at least one
          uppercase letter, one lowercase letter, and one number
        </div>
        <button type="submit" id="register-btn">REGISTER</button>
        <div id="register-error" class="error-message"></div>
      </form>
      <p>Already have an account? <a href="login.html">Login</a></p>
    </main>
    `;

const form = document.querySelector<HTMLFormElement>(
  ".register-form",
) as HTMLFormElement;
const errorMessage = document.querySelector<HTMLDivElement>(
  "#register-error",
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

  const name = (formData.get("username") as string).trim();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email.endsWith("@stud.noroff.no")) {
    showError("Use your @stud.noroff.no email address");
    return;
  }

  if (name.length < 3) {
    showError("Username must be at least 3 characters long");
    return;
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    showError(
      "Password must be at least 8 characters and contain uppercase, lowercase, and a number",
    );
    return;
  }

  const userData: RegisterData = {
    name,
    email,
    password,
  };

  try {
    await registerUser(userData);
    alert("Registration successful!");
    window.location.assign("login.html");
  } catch (error) {
    if (error instanceof Error) {
      showError(error.message);
    }
  }
});
