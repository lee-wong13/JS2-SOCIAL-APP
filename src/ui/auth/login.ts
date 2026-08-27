import "../../css/style.css";

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
