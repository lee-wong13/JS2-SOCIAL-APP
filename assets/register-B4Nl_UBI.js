import"./style-D_OV_7b4.js";import{n as e}from"./auth-tDa62Ev2.js";document.querySelector(`#app`).innerHTML=`
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
    `;var t=document.querySelector(`.register-form`),n=document.querySelector(`#register-error`);function r(e){n.textContent=e,n.style.display=`block`}t.addEventListener(`submit`,async i=>{i.preventDefault(),n.textContent=``,n.style.display=`none`;let a=new FormData(t),o=a.get(`username`).trim(),s=a.get(`email`).trim().toLowerCase(),c=a.get(`password`);if(!s.endsWith(`@stud.noroff.no`)){r(`Use your @stud.noroff.no email address`);return}if(o.length<3){r(`Username must be at least 3 characters long`);return}if(c.length<8||!/[A-Z]/.test(c)||!/[a-z]/.test(c)||!/[0-9]/.test(c)){r(`Password must be at least 8 characters and contain uppercase, lowercase, and a number`);return}let l={name:o,email:s,password:c};try{await e(l),alert(`Registration successful!`),window.location.assign(`login.html`)}catch(e){e instanceof Error&&r(e.message)}});