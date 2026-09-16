import"./style-D_OV_7b4.js";import{c as e,d as t,n,r,t as i}from"./auth-guard-CoWEjUP7.js";i();var a=document.querySelector(`#app`);a.append(r()),a.insertAdjacentHTML(`beforeend`,`
<main class="feed-container">
      <section id="create-post-section">
        <button id="toggle-create-post" class="create-post-toggle" type="button" aria-expanded="false" aria-controls="create-post-form">
          <span>New Entry</span>
          <span aria-hidden="true">+</span>
        </button>
        <form id="create-post-form" hidden>
          <input id="post-title" name="title" type="text" placeholder="Title" required />
          <textarea
            name="body"
            id="post-content"
            placeholder="What's on your mind?"
            required
          ></textarea>
          <input
            type="url"
            name="media"
            id="post-img"
            placeholder="Image URL"
          />
          <p id="create-post-error" class="error-message"></p>
          <button type="submit" id="create-post-button">Post</button>
        </form>
      </section>

      <section id="feed-section">
        <div class="feed-search">
          <label for="post-search">Search posts</label>
          <input id="post-search" type="search" placeholder="Search posts..." />
        </div>
        <div id="post-list"><p>Loading posts...</p></div>
      </section>
</main>
`);var o=document.querySelector(`#post-list`),s=document.querySelector(`#post-search`),c=document.querySelector(`#create-post-form`),l=document.querySelector(`#create-post-error`),u=document.querySelector(`#toggle-create-post`),d=[];u?.addEventListener(`click`,()=>{if(!c)return;let e=u.getAttribute(`aria-expanded`)===`true`;u.setAttribute(`aria-expanded`,String(!e)),c.hidden=e});function f(e){if(o){if(e.length===0){o.replaceChildren(document.createTextNode(`No posts found.`));return}o.replaceChildren(...e.map(n))}}function p(e){let t=e.trim().toLowerCase();if(!t){f(d);return}f(d.filter(e=>[e.title,e.body??``,...e.tags??[],e.author?.name??``].join(` `).toLowerCase().includes(t)))}async function m(){if(o)try{d=await t(),p(s?.value??``)}catch(e){o.textContent=e instanceof Error?e.message:`Failed to load posts.`}}m(),s?.addEventListener(`input`,()=>p(s.value)),c?.addEventListener(`submit`,async t=>{if(t.preventDefault(),!l)return;l.textContent=``,l.style.display=`none`;let n=new FormData(c),r=n.get(`title`).trim(),i=n.get(`body`).trim(),a=n.get(`media`).trim(),o={title:r,body:i};a&&(o.media={url:a,alt:r});try{let t=document.querySelector(`#create-post-button`);t&&(t.disabled=!0),await e(o),c.reset(),await m()}catch(e){l.textContent=e instanceof Error?e.message:`Failed to create post.`,l.style.display=`block`}finally{let e=document.querySelector(`#create-post-button`);e&&(e.disabled=!1)}});