import "../css/style.css";
import {
  deletePost,
  getPostById,
  updatePost,
  type UpdatePostData,
} from "../api/posts.ts";
import { renderHeader } from "./header.ts";
import type { Post } from "../types.ts";
import { renderPostCard } from "../utils/render.ts";
import { loadProfile } from "../utils/storages.ts";
import { authGuard } from "../utils/auth-guard.ts";

authGuard();

const app = document.querySelector<HTMLDivElement>("#app")!;
app.append(renderHeader());
app.insertAdjacentHTML(
  "beforeend",
  `
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
    `,
);

const postContent = document.querySelector<HTMLElement>("#post-content");
const postActions = document.querySelector<HTMLElement>(".post-actions");
const editButton = document.querySelector<HTMLButtonElement>("#edit-btn");
const deleteButton = document.querySelector<HTMLButtonElement>("#delete-btn");
const deleteError = document.querySelector<HTMLElement>("#delete-error");
const searchParams = new URLSearchParams(window.location.search);
const postId = Number(searchParams.get("id"));
const editMode = searchParams.get("edit") === "true";
let loadedPost: Post | null = null;

function renderEditForm(): void {
  if (!postContent || !loadedPost) {
    return;
  }

  const post = loadedPost;

  postContent.innerHTML = `
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
  `;

  const form = document.querySelector<HTMLFormElement>("#edit-post-form");
  const titleInput = document.querySelector<HTMLInputElement>("#edit-title");
  const bodyInput = document.querySelector<HTMLTextAreaElement>("#edit-body");
  const mediaInput = document.querySelector<HTMLInputElement>("#edit-media");
  const errorMessage = document.querySelector<HTMLElement>("#edit-error");

  if (!form || !titleInput || !bodyInput || !mediaInput || !errorMessage) {
    return;
  }

  titleInput.value = post.title;
  bodyInput.value = post.body ?? "";
  mediaInput.value = post.media?.url ?? "";

  document
    .querySelector<HTMLButtonElement>("#cancel-edit-btn")
    ?.addEventListener("click", () => {
      postContent.replaceChildren(renderPostCard(post));
    });

  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    const formData = new FormData(form);
    const mediaUrl = (formData.get("media") as string).trim();
    const postData: UpdatePostData = {
      title: (formData.get("title") as string).trim(),
      body: (formData.get("body") as string).trim(),
    };

    if (mediaUrl) {
      postData.media = { url: mediaUrl, alt: postData.title };
    }

    try {
      loadedPost = await updatePost(postId, postData);
      postContent.replaceChildren(renderPostCard(loadedPost));
    } catch (error) {
      errorMessage.textContent =
        error instanceof Error ? error.message : "Failed to update post.";
      errorMessage.style.display = "block";
    }
  });
}

async function renderPost(): Promise<void> {
  if (!postContent) {
    return;
  }

  if (!Number.isInteger(postId) || postId <= 0) {
    postContent.textContent = "Invalid post ID.";
    return;
  }

  try {
    loadedPost = await getPostById(postId);
    postContent.replaceChildren(renderPostCard(loadedPost));

    const loggedInUsername = loadProfile()?.username;
    const isOwnPost =
      loggedInUsername?.toLowerCase() ===
      loadedPost.author?.name?.toLowerCase();

    if (!isOwnPost) {
      postActions?.remove();
      return;
    }

    if (editMode) {
      renderEditForm();
    }
    editButton?.addEventListener("click", renderEditForm);
    deleteButton?.addEventListener("click", async () => {
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      if (deleteError) {
        deleteError.textContent = "";
        deleteError.style.display = "none";
      }
      deleteButton.disabled = true;

      try {
        await deletePost(postId);
        window.location.assign("../feed/index.html");
      } catch (error) {
        if (deleteError) {
          deleteError.textContent =
            error instanceof Error ? error.message : "Failed to delete post.";
          deleteError.style.display = "block";
        }
        deleteButton.disabled = false;
      }
    });
  } catch (error) {
    postContent.textContent =
      error instanceof Error ? error.message : "Failed to load post.";
  }
}

void renderPost();
