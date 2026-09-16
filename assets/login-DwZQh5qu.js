import"./style-D_OV_7b4.js";import{n as e}from"./constants-CXi6abxn.js";import{t}from"./auth-tDa62Ev2.js";import{a as n,o as r}from"./storages-Bs5-gApI.js";document.querySelector(`#app`).innerHTML=`
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
`;var i=document.querySelector(`.login-form`),a=document.querySelector(`#login-error`);function o(e){a.textContent=e,a.style.display=`block`}i.addEventListener(`submit`,async s=>{s.preventDefault(),a.textContent=``,a.style.display=`none`;let c=new FormData(i),l={email:c.get(`email`),password:c.get(`password`)};try{let i=await t(l);n(e),r(i.data.accessToken,{id:i.data.name,username:i.data.name,email:i.data.email}),alert(`Login successful!`),window.location.assign(`../feed/index.html`)}catch(e){e instanceof Error&&o(e.message)}});