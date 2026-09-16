import"./style-D_OV_7b4.js";import{r as e}from"./storages-Bs5-gApI.js";import{f as t,l as n,n as r,r as i,t as a,u as o}from"./auth-guard-C5xE-l6d.js";a();var s=document.querySelector(`#app`);s.append(i()),s.insertAdjacentHTML(`beforeend`,`
    <main class="post-container">
      <a href="../feed/index.html" class="back-link">&larr; Feed</a>

      <article class="post-card">
        <div id="post-content"><p>Loading post...</p></div>
        <div class="post-actions">
          <button id="edit-btn">EDIT</button>
          <button id="delete-btn">DELETE</button>
          <p id="delete-error" class="error-message"></p>
        </div>
      </article>
    </main>
    `);var c=document.querySelector(`#post-content`),l=document.querySelector(`.post-actions`),u=document.querySelector(`#edit-btn`),d=document.querySelector(`#delete-btn`),f=document.querySelector(`#delete-error`),p=new URLSearchParams(window.location.search),m=Number(p.get(`id`)),h=p.get(`edit`)===`true`,g=null;function _(){if(!c||!g)return;let e=g;c.innerHTML=`
    <form id="edit-post-form" class="edit-post-form">
      <label for="edit-title">Title</label>
      <input id="edit-title" name="title" type="text" required />
      <label for="edit-body">Content</label>
      <textarea id="edit-body" name="body" required></textarea>
      <label for="edit-media">Image URL</label>
      <input id="edit-media" name="media" type="url" />
      <p id="edit-error" class="error-message"></p>
      <button type="submit">SAVE</button>
      <button type="button" id="cancel-edit-btn">CANCEL</button>
    </form>
  `;let n=document.querySelector(`#edit-post-form`),i=document.querySelector(`#edit-title`),a=document.querySelector(`#edit-body`),o=document.querySelector(`#edit-media`),s=document.querySelector(`#edit-error`);!n||!i||!a||!o||!s||(i.value=e.title,a.value=e.body??``,o.value=e.media?.url??``,document.querySelector(`#cancel-edit-btn`)?.addEventListener(`click`,()=>{c.replaceChildren(r(e))}),n.addEventListener(`submit`,async e=>{e.preventDefault(),s.textContent=``,s.style.display=`none`;let i=new FormData(n),a=i.get(`media`).trim(),o={title:i.get(`title`).trim(),body:i.get(`body`).trim()};a&&(o.media={url:a,alt:o.title});try{g=await t(m,o),c.replaceChildren(r(g))}catch(e){s.textContent=e instanceof Error?e.message:`Failed to update post.`,s.style.display=`block`}}))}async function v(){if(c){if(!Number.isInteger(m)||m<=0){c.textContent=`Invalid post ID.`;return}try{if(g=await o(m),c.replaceChildren(r(g)),(e()?.username)?.toLowerCase()!==g.author?.name?.toLowerCase()){l?.remove();return}h&&_(),u?.addEventListener(`click`,_),d?.addEventListener(`click`,async()=>{if(window.confirm(`Are you sure you want to delete this post?`)){f&&(f.textContent=``,f.style.display=`none`),d.disabled=!0;try{await n(m),window.location.assign(`../feed/index.html`)}catch(e){f&&(f.textContent=e instanceof Error?e.message:`Failed to delete post.`,f.style.display=`block`),d.disabled=!1}}})}catch(e){c.textContent=e instanceof Error?e.message:`Failed to load post.`}}}v();