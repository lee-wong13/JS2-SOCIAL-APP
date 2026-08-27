import "../css/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="profile-container">
      <section class="profile-header">
        <div class="profile-avatar"></div>
        <div class="profile-info">
          <h1 id="username">Username</h1>
          <p id="followers-posts">0 followers | 0 following | 0 posts</p>
          <p id="bio">This is the user's bio.</p>
          <div class="profile-actions">
            <button id="follow-btn" method="PUT">FOLLOW</button>
            <button id="unfollow-btn" method="PUT">UNFOLLOW</button>
            <button id="edit-profile-btn" method="PUT">EDIT PROFILE</button>
          </div>
        </div>
      </section>

      <section id="profile-posts">
        <article class="post" method="GET">
          <div class="post-header">
            <div class="post-info">
              <h2><a href="">Post Title</a></h2>
              <p>Posted by User on Date</p>
            </div>
          </div>
          <p class="post-content">This is the content of the post.</p>
          <p class="author">Author: User</p>
        </article>
      </section>
    </main>
`;
