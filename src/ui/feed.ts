import "../css/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<main class="feed-container">
      <section id="create-post-section">
        <h2>New Entry</h2>
        <form id="create-post-form">
          <input id="post-title" type="text" placeholder="Title" required />
          <textarea
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
          <button type="submit" id="create-post-button">Post</button>
        </form>
      </section>

      <section id="feed-section">
        <article class="post-card" data-day="14">
          <h3><a href="">Title</a></h3>
          <p>Content</p>
          <p class="author">Author</p>
          <p class="image"><img src="#" alt="Post image" /></p>
          <p class="date">Date</p>
        </article>
      </section>
</main>
`;
