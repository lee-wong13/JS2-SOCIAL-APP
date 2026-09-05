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
      </form>
      <p>Already have an account? <a href="login.html">Login</a></p>
    </main>
    `;

const form = document.querySelector<HTMLFormElement>(
  ".register-form",
) as HTMLFormElement;
const errorMessage = document.querySelector<HTMLDivElement>(
  ".error-message",
) as HTMLDivElement;

form.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();
  errorMessage.textContent = "";

  const formData = new FormData(form);

  const email = formData.get("email") as string;

  if (!email.endsWith("@stud.noroff.no")) {
    errorMessage.textContent = "Use your @stud.noroff.no email address";
    return;
  }

  const userData: RegisterData = {
    name: formData.get("username") as string,
    email,
    password: formData.get("password") as string,
  };

  try {
    await registerUser(userData);
    alert("Registration successful!");
    window.location.href = "./login.html";
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.textContent = error.message;
    }
  }
});
