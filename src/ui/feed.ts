import "../css/style.css";
import { createPost, getPosts, type CreatePostData } from "../api/posts.ts";
import { renderHeader } from "./header.ts";
import { renderPostCard } from "../utils/render.ts";
import { authGuard } from "../utils/auth-guard.ts";

authGuard();

const app = document.querySelector<HTMLDivElement>("#app")!;
app.append(renderHeader());
app.insertAdjacentHTML(
  "beforeend",
  `
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
`,
);

const postList = document.querySelector<HTMLElement>("#post-list");
const postSearch = document.querySelector<HTMLInputElement>("#post-search");
const createPostForm =
  document.querySelector<HTMLFormElement>("#create-post-form");
const createPostError =
  document.querySelector<HTMLElement>("#create-post-error");
const createPostToggle = document.querySelector<HTMLButtonElement>(
  "#toggle-create-post",
);
let allPosts: Awaited<ReturnType<typeof getPosts>> = [];

createPostToggle?.addEventListener("click", () => {
  if (!createPostForm) {
    return;
  }

  const isExpanded = createPostToggle.getAttribute("aria-expanded") === "true";
  createPostToggle.setAttribute("aria-expanded", String(!isExpanded));
  createPostForm.hidden = isExpanded;
});

function renderPosts(posts: typeof allPosts): void {
  if (!postList) {
    return;
  }

  if (posts.length === 0) {
    postList.replaceChildren(document.createTextNode("No posts found."));
    return;
  }

  postList.replaceChildren(...posts.map(renderPostCard));
}

function searchPosts(query: string): void {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    renderPosts(allPosts);
    return;
  }

  renderPosts(
    allPosts.filter((post) => {
      const searchableText = [
        post.title,
        post.body ?? "",
        ...(post.tags ?? []),
        post.author?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    }),
  );
}

async function renderFeed(): Promise<void> {
  if (!postList) {
    return;
  }

  try {
    allPosts = await getPosts();
    searchPosts(postSearch?.value ?? "");
  } catch (error) {
    postList.textContent =
      error instanceof Error ? error.message : "Failed to load posts.";
  }
}

void renderFeed();
postSearch?.addEventListener("input", () => searchPosts(postSearch.value));

createPostForm?.addEventListener("submit", async (event: SubmitEvent) => {
  event.preventDefault();

  if (!createPostError) {
    return;
  }

  createPostError.textContent = "";
  createPostError.style.display = "none";

  const formData = new FormData(createPostForm);
  const title = (formData.get("title") as string).trim();
  const body = (formData.get("body") as string).trim();
  const mediaUrl = (formData.get("media") as string).trim();
  const postData: CreatePostData = { title, body };

  if (mediaUrl) {
    postData.media = { url: mediaUrl, alt: title };
  }

  try {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#create-post-button",
    );
    if (submitButton) {
      submitButton.disabled = true;
    }

    await createPost(postData);
    createPostForm.reset();
    await renderFeed();
  } catch (error) {
    createPostError.textContent =
      error instanceof Error ? error.message : "Failed to create post.";
    createPostError.style.display = "block";
  } finally {
    const submitButton = document.querySelector<HTMLButtonElement>(
      "#create-post-button",
    );
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
});
