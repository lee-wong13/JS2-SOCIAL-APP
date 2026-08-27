import "../../css/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="register-container">
      <h1>COMMONS</h1>
      <form class="register-form" action="javascript:void(0);" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <div id="username-error" class="error-message"></div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
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
