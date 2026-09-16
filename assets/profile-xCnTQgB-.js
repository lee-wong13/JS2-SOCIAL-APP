import"./style-D_OV_7b4.js";import{r as e}from"./storages-Bs5-gApI.js";import{a as t,c as n,i as r,n as i,o as a,r as o,s,t as c}from"./auth-guard-CoWEjUP7.js";var l=`/JS2-SOCIAL-APP/assets/hero-CLDdwZDr.png`;c();var u=document.querySelector(`#app`);u.append(o()),u.insertAdjacentHTML(`beforeend`,`
<main class="profile-container profile-page">
  <div class="profile-banner">
    <img id="profile-banner-image" src="${l}" alt="" />
  </div>
  <section class="profile-header">
    <img class="profile-avatar" id="profile-avatar" alt="" />
    <div class="profile-info">
      <h1 id="username">Loading profile...</h1>
      <div id="profile-stats" class="profile-stats">
        <span id="posts-count"></span>
        <button id="followers-count" type="button"></button>
        <button id="following-count" type="button"></button>
      </div>
      <p id="bio"></p>
      <div class="profile-actions">
        <button id="follow-btn" type="button">FOLLOW</button>
        <button id="unfollow-btn" type="button">UNFOLLOW</button>
        <button id="edit-profile-btn" type="button">EDIT PROFILE</button>
      </div>
      <p id="follow-error" class="error-message"></p>
    </div>
  </section>
  <section id="profile-posts">
    <h2 class="profile-posts-title">Posts</h2>
    <section id="create-post-section" hidden>
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
    <div id="profile-post-list"><p>Loading posts...</p></div>
  </section>
</main>
`);var d=new URLSearchParams(window.location.search).get(`name`)??e()?.username,f=document.querySelector(`#username`),p=document.querySelector(`#bio`),m=document.querySelector(`#profile-stats`),h=document.querySelector(`#posts-count`),g=document.querySelector(`#followers-count`),_=document.querySelector(`#following-count`),v=document.querySelector(`#profile-avatar`),y=document.querySelector(`#profile-banner-image`),b=document.querySelector(`#profile-post-list`),x=document.querySelector(`#follow-btn`),S=document.querySelector(`#unfollow-btn`),C=document.querySelector(`#edit-profile-btn`),w=document.querySelector(`#follow-error`),T=document.querySelector(`#create-post-section`),E=document.querySelector(`#toggle-create-post`),D=document.querySelector(`#create-post-form`),O=document.querySelector(`#create-post-error`);E?.addEventListener(`click`,()=>{if(!D)return;let e=E.getAttribute(`aria-expanded`)===`true`;E.setAttribute(`aria-expanded`,String(!e)),D.hidden=e});function k(e,t){return t??`https://ui-avatars.com/api/?name=${encodeURIComponent(e)}&background=3f5b4a&color=ffffff`}function A(e,t){let n=document.createElement(`div`);n.className=`people-modal-overlay`;let r=document.createElement(`section`);r.className=`people-modal`,r.setAttribute(`role`,`dialog`),r.setAttribute(`aria-modal`,`true`);let i=document.createElement(`div`);i.className=`people-modal__heading`;let a=document.createElement(`h2`);a.textContent=e;let o=document.createElement(`button`);o.className=`people-modal__close`,o.type=`button`,o.textContent=`×`,o.setAttribute(`aria-label`,`Close`),i.append(a,o);let s=document.createElement(`input`);s.className=`people-modal__search`,s.type=`search`,s.placeholder=`Search`;let c=document.createElement(`div`);c.className=`people-modal__list`;let l=(e=``)=>{let n=t.filter(t=>t.name.toLowerCase().includes(e.trim().toLowerCase()));c.replaceChildren(...n.length>0?n.map(e=>{let t=document.createElement(`a`);t.className=`people-modal__person`,t.href=`./index.html?name=${encodeURIComponent(e.name)}`;let n=document.createElement(`img`);n.src=k(e.name,e.avatar?.url),n.alt=`${e.name} profile picture`;let r=document.createElement(`span`);return r.textContent=e.name,t.append(n,r),t}):[document.createTextNode(`No users found.`)])},u=()=>n.remove();s.addEventListener(`input`,()=>l(s.value)),o.addEventListener(`click`,u),n.addEventListener(`click`,e=>{e.target===n&&u()}),l(),r.append(i,s,c),n.append(r),document.body.append(n),s.focus()}function j(e){if(document.querySelector(`#edit-profile-overlay`))return;let t=document.createElement(`div`);t.id=`edit-profile-overlay`,t.className=`people-modal-overlay`,t.innerHTML=`
    <section class="people-modal edit-profile-modal" role="dialog" aria-modal="true" aria-label="Edit profile">
      <div class="people-modal__heading">
        <h2>Edit Profile</h2>
        <button type="button" class="people-modal__close" id="close-profile-edit" aria-label="Close">×</button>
      </div>
      <form id="edit-profile-form" class="edit-profile-form">
        <label for="edit-bio">Bio</label>
        <textarea id="edit-bio" name="bio" maxlength="160"></textarea>
        <label for="edit-avatar">Avatar URL</label>
        <input id="edit-avatar" name="avatar" type="url" />
        <label for="edit-banner">Banner URL</label>
        <input id="edit-banner" name="banner" type="url" />
        <p id="edit-profile-error" class="error-message"></p>
        <div class="edit-profile-form__actions">
          <button type="submit">SAVE</button>
          <button type="button" id="cancel-profile-edit">CANCEL</button>
        </div>
      </form>
    </section>
  `,document.body.append(t);let n=t.querySelector(`#edit-profile-form`),r=t.querySelector(`#edit-bio`),i=t.querySelector(`#edit-avatar`),a=t.querySelector(`#edit-banner`),o=t.querySelector(`#edit-profile-error`);if(!n||!r||!i||!a||!o)return;r.value=e.bio??``,i.value=e.avatar?.url??``,a.value=e.banner?.url??``;let c=()=>t.remove();t.querySelector(`#cancel-profile-edit`)?.addEventListener(`click`,c),t.querySelector(`#close-profile-edit`)?.addEventListener(`click`,c),t.addEventListener(`click`,e=>{e.target===t&&c()}),n.addEventListener(`submit`,async t=>{t.preventDefault();let r=new FormData(n),i={bio:String(r.get(`bio`)).trim()},a=String(r.get(`avatar`)).trim(),c=String(r.get(`banner`)).trim();a&&(i.avatar={url:a,alt:`${e.name} profile picture`}),c&&(i.banner={url:c,alt:`${e.name} profile banner`});let l=n.querySelector(`[type=submit]`);l&&(l.disabled=!0);try{await s(e.name,i),window.location.reload()}catch(e){o.textContent=e instanceof Error?e.message:`Failed to update profile.`,o.style.display=`block`,l&&(l.disabled=!1)}})}function M(e){!x||!S||(x.hidden=e,S.hidden=!e)}async function N(){if(!(!f||!p||!m||!v||!y||!b)){if(!d){f.textContent=`No profile selected.`,b.textContent=`Log in to view your profile.`;return}try{let o=await t(d),s=o._count,c=e()?.username,l=c?.toLowerCase()===o.name.toLowerCase(),u=s?.followers??0,m=!1,E=s?.following??0,N=s?.posts??o.posts?.length??0,P=o.followers??[],F=o.following??[];!l&&c&&(m=(await t(c)).following?.some(e=>e.name.toLowerCase()===o.name.toLowerCase())??!1),f.textContent=o.name,p.textContent=o.bio||`No bio yet.`,h.textContent=`${N} posts`,g.textContent=`${u} followers`,_.textContent=`${E} following`,v.src=k(o.name,o.avatar?.url),v.alt=`${o.name} profile picture`,y.src=o.banner?.url??`/JS2-SOCIAL-APP/assets/hero-CLDdwZDr.png`,y.alt=o.banner?.alt??`${o.name} profile banner`;let I=(o.posts??[]).map(e=>({...e,author:e.author??{name:o.name,avatar:o.avatar}}));b.replaceChildren(...I.length>0?I.map(i):[document.createTextNode(`This user has no posts yet.`)]),x?.toggleAttribute(`hidden`,l),S?.toggleAttribute(`hidden`,l),C?.toggleAttribute(`hidden`,!l),T?.toggleAttribute(`hidden`,!l),l&&D?.addEventListener(`submit`,async e=>{if(e.preventDefault(),!D||!O)return;O.textContent=``,O.style.display=`none`;let t=new FormData(D),r=t.get(`title`).trim(),a=t.get(`body`).trim(),s=t.get(`media`).trim(),c={title:r,body:a};s&&(c.media={url:s,alt:r});let l=document.querySelector(`#create-post-button`);l&&(l.disabled=!0);try{let e=await n(c);D.reset(),b.firstChild?.nodeType===Node.TEXT_NODE&&b.firstChild.remove(),b.prepend(i({...e,author:e.author??{name:o.name,avatar:o.avatar}}))}catch(e){O.textContent=e instanceof Error?e.message:`Failed to create post.`,O.style.display=`block`}finally{l&&(l.disabled=!1)}}),l||M(m),C?.addEventListener(`click`,()=>j(o)),g?.addEventListener(`click`,()=>A(`Followers`,P)),_?.addEventListener(`click`,()=>A(`Following`,F)),x?.addEventListener(`click`,async()=>{if(!(!d||m)){x.disabled=!0;try{await r(d),m=!0,u+=1,g.textContent=`${u} followers`,M(m)}catch(e){w&&(w.textContent=e instanceof Error?e.message:`Failed to follow profile.`,w.style.display=`block`)}finally{x.disabled=!1}}}),S?.addEventListener(`click`,async()=>{if(!(!d||!m)){S.disabled=!0;try{await a(d),m=!1,u=Math.max(0,u-1),g.textContent=`${u} followers`,M(m)}catch(e){w&&(w.textContent=e instanceof Error?e.message:`Failed to unfollow profile.`,w.style.display=`block`)}finally{S.disabled=!1}}})}catch(e){f.textContent=`Unable to load profile`,b.textContent=e instanceof Error?e.message:`Failed to load profile.`}}}N();