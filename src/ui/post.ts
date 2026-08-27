import "../css/style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<header>
      <nav></nav>
    </header>
    <main class="post-container">
      <a href="../feed/index.html" class="back-link">&larr; Feed</a>

      <article class="post">
        <h1 class="post-title">Post Title</h1>
        <p class="post-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <img
          src="../../src/images/post-image.jpg"
          alt="Post Image"
          class="post-image"
        />
        <p class="author" id="post-author">by Author Name</p>
        <div id="tags">
          <p>
            Tags:
            <a href="../feed/index.html?tag=html">HTML</a>,
            <a href="../feed/index.html?tag=css">CSS</a>,
            <a href="../feed/index.html?tag=javascript">JavaScript</a>
          </p>
        </div>
        <div class="post-actions">
          <button id="edit-btn">EDIT</button>
          <button id="delete-btn">DELETE</button>
        </div>
      </article>
    </main>
`;
