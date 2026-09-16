import {
  followUser,
  getProfile,
  unfollowUser,
  updateProfile,
  type UpdateProfileData,
} from "../api/profiles.ts";
import { createPost, type CreatePostData } from "../api/posts.ts";
import { renderHeader } from "./header.ts";
import { loadProfile } from "../utils/storages.ts";
import { renderPostCard } from "../utils/render.ts";
import type { Profile } from "../types.ts";
import fallbackBanner from "../assets/hero.png";
import { authGuard } from "../utils/auth-guard.ts";

authGuard();

const app = document.querySelector<HTMLDivElement>("#app")!;
app.append(renderHeader());
app.insertAdjacentHTML(
  "beforeend",
  `
<main class="profile-container profile-page">
  <div class="profile-banner">
    <img id="profile-banner-image" src="${fallbackBanner}" alt="" />
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
`,
);

const username =
  new URLSearchParams(window.location.search).get("name") ??
  loadProfile()?.username;
const profileName = document.querySelector<HTMLElement>("#username");
const profileBio = document.querySelector<HTMLElement>("#bio");
const profileStats = document.querySelector<HTMLElement>("#profile-stats");
const postsCountLabel = document.querySelector<HTMLElement>("#posts-count");
const followersCountButton =
  document.querySelector<HTMLButtonElement>("#followers-count");
const followingCountButton =
  document.querySelector<HTMLButtonElement>("#following-count");
const profileAvatar =
  document.querySelector<HTMLImageElement>("#profile-avatar");
const profileBanner = document.querySelector<HTMLImageElement>(
  "#profile-banner-image",
);
const profilePosts = document.querySelector<HTMLElement>("#profile-post-list");
const followButton = document.querySelector<HTMLButtonElement>("#follow-btn");
const unfollowButton =
  document.querySelector<HTMLButtonElement>("#unfollow-btn");
const editProfileButton =
  document.querySelector<HTMLButtonElement>("#edit-profile-btn");
const followError = document.querySelector<HTMLElement>("#follow-error");
const createPostSection = document.querySelector<HTMLElement>(
  "#create-post-section",
);
const createPostToggle = document.querySelector<HTMLButtonElement>(
  "#toggle-create-post",
);
const createPostForm =
  document.querySelector<HTMLFormElement>("#create-post-form");
const createPostError =
  document.querySelector<HTMLElement>("#create-post-error");

createPostToggle?.addEventListener("click", () => {
  if (!createPostForm) return;
  const isExpanded = createPostToggle.getAttribute("aria-expanded") === "true";
  createPostToggle.setAttribute("aria-expanded", String(!isExpanded));
  createPostForm.hidden = isExpanded;
});

function avatarUrl(name: string, url?: string): string {
  return (
    url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3f5b4a&color=ffffff`
  );
}

function openPeopleModal(title: string, people: Profile[]): void {
  const overlay = document.createElement("div");
  overlay.className = "people-modal-overlay";
  const modal = document.createElement("section");
  modal.className = "people-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  const heading = document.createElement("div");
  heading.className = "people-modal__heading";
  const headingText = document.createElement("h2");
  headingText.textContent = title;
  const closeButton = document.createElement("button");
  closeButton.className = "people-modal__close";
  closeButton.type = "button";
  closeButton.textContent = "×";
  closeButton.setAttribute("aria-label", "Close");
  heading.append(headingText, closeButton);
  const search = document.createElement("input");
  search.className = "people-modal__search";
  search.type = "search";
  search.placeholder = "Search";
  const list = document.createElement("div");
  list.className = "people-modal__list";
  const renderPeople = (query = ""): void => {
    const matches = people.filter((person) =>
      person.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
    list.replaceChildren(
      ...(matches.length > 0
        ? matches.map((person) => {
            const link = document.createElement("a");
            link.className = "people-modal__person";
            link.href = `./index.html?name=${encodeURIComponent(person.name)}`;
            const avatar = document.createElement("img");
            avatar.src = avatarUrl(person.name, person.avatar?.url);
            avatar.alt = `${person.name} profile picture`;
            const name = document.createElement("span");
            name.textContent = person.name;
            link.append(avatar, name);
            return link;
          })
        : [document.createTextNode("No users found.")]),
    );
  };
  const closeModal = (): void => overlay.remove();
  search.addEventListener("input", () => renderPeople(search.value));
  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });
  renderPeople();
  modal.append(heading, search, list);
  overlay.append(modal);
  document.body.append(overlay);
  search.focus();
}

function renderEditProfileModal(profile: Profile): void {
  if (document.querySelector("#edit-profile-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "edit-profile-overlay";
  overlay.className = "people-modal-overlay";
  overlay.innerHTML = `
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
  `;
  document.body.append(overlay);
  const form = overlay.querySelector<HTMLFormElement>("#edit-profile-form");
  const bioInput = overlay.querySelector<HTMLTextAreaElement>("#edit-bio");
  const avatarInput = overlay.querySelector<HTMLInputElement>("#edit-avatar");
  const bannerInput = overlay.querySelector<HTMLInputElement>("#edit-banner");
  const errorMessage = overlay.querySelector<HTMLElement>(
    "#edit-profile-error",
  );
  if (!form || !bioInput || !avatarInput || !bannerInput || !errorMessage)
    return;
  bioInput.value = profile.bio ?? "";
  avatarInput.value = profile.avatar?.url ?? "";
  bannerInput.value = profile.banner?.url ?? "";
  const closeModal = (): void => overlay.remove();
  overlay
    .querySelector<HTMLButtonElement>("#cancel-profile-edit")
    ?.addEventListener("click", closeModal);
  overlay
    .querySelector<HTMLButtonElement>("#close-profile-edit")
    ?.addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });
  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();
    const data = new FormData(form);
    const profileData: UpdateProfileData = {
      bio: String(data.get("bio")).trim(),
    };
    const avatar = String(data.get("avatar")).trim();
    const banner = String(data.get("banner")).trim();
    if (avatar)
      profileData.avatar = {
        url: avatar,
        alt: `${profile.name} profile picture`,
      };
    if (banner)
      profileData.banner = {
        url: banner,
        alt: `${profile.name} profile banner`,
      };
    const saveButton = form.querySelector<HTMLButtonElement>("[type=submit]");
    if (saveButton) saveButton.disabled = true;
    try {
      await updateProfile(profile.name, profileData);
      window.location.reload();
    } catch (error) {
      errorMessage.textContent =
        error instanceof Error ? error.message : "Failed to update profile.";
      errorMessage.style.display = "block";
      if (saveButton) saveButton.disabled = false;
    }
  });
}

function renderFollowState(isFollowing: boolean): void {
  if (!followButton || !unfollowButton) return;
  followButton.hidden = isFollowing;
  unfollowButton.hidden = !isFollowing;
}

async function renderProfile(): Promise<void> {
  if (
    !profileName ||
    !profileBio ||
    !profileStats ||
    !profileAvatar ||
    !profileBanner ||
    !profilePosts
  )
    return;
  if (!username) {
    profileName.textContent = "No profile selected.";
    profilePosts.textContent = "Log in to view your profile.";
    return;
  }
  try {
    const profile = await getProfile(username);
    const counts = profile._count;
    const loggedInUsername = loadProfile()?.username;
    const isOwnProfile =
      loggedInUsername?.toLowerCase() === profile.name.toLowerCase();
    let followers = counts?.followers ?? 0;
    let isFollowing = false;
    const followingCount = counts?.following ?? 0;
    const postsCount = counts?.posts ?? profile.posts?.length ?? 0;
    const followersList = profile.followers ?? [];
    const followingList = profile.following ?? [];
    if (!isOwnProfile && loggedInUsername) {
      const loggedInProfile = await getProfile(loggedInUsername);
      isFollowing =
        loggedInProfile.following?.some(
          (person) => person.name.toLowerCase() === profile.name.toLowerCase(),
        ) ?? false;
    }
    profileName.textContent = profile.name;
    profileBio.textContent = profile.bio || "No bio yet.";
    postsCountLabel!.textContent = `${postsCount} posts`;
    followersCountButton!.textContent = `${followers} followers`;
    followingCountButton!.textContent = `${followingCount} following`;
    profileAvatar.src = avatarUrl(profile.name, profile.avatar?.url);
    profileAvatar.alt = `${profile.name} profile picture`;
    profileBanner.src = profile.banner?.url ?? fallbackBanner;
    profileBanner.alt = profile.banner?.alt ?? `${profile.name} profile banner`;
    const posts = (profile.posts ?? []).map((post) => ({
      ...post,
      author: post.author ?? { name: profile.name, avatar: profile.avatar },
    }));
    profilePosts.replaceChildren(
      ...(posts.length > 0
        ? posts.map(renderPostCard)
        : [document.createTextNode("This user has no posts yet.")]),
    );
    followButton?.toggleAttribute("hidden", isOwnProfile);
    unfollowButton?.toggleAttribute("hidden", isOwnProfile);
    editProfileButton?.toggleAttribute("hidden", !isOwnProfile);
    createPostSection?.toggleAttribute("hidden", !isOwnProfile);
    if (isOwnProfile) {
      createPostForm?.addEventListener("submit", async (event: SubmitEvent) => {
        event.preventDefault();
        if (!createPostForm || !createPostError) return;
        createPostError.textContent = "";
        createPostError.style.display = "none";
        const formData = new FormData(createPostForm);
        const title = (formData.get("title") as string).trim();
        const body = (formData.get("body") as string).trim();
        const mediaUrl = (formData.get("media") as string).trim();
        const postData: CreatePostData = { title, body };
        if (mediaUrl) postData.media = { url: mediaUrl, alt: title };
        const submitButton = document.querySelector<HTMLButtonElement>(
          "#create-post-button",
        );
        if (submitButton) submitButton.disabled = true;
        try {
          const newPost = await createPost(postData);
          createPostForm.reset();
          if (profilePosts.firstChild?.nodeType === Node.TEXT_NODE) {
            profilePosts.firstChild.remove();
          }
          profilePosts.prepend(
            renderPostCard({
              ...newPost,
              author: newPost.author ?? {
                name: profile.name,
                avatar: profile.avatar,
              },
            }),
          );
        } catch (error) {
          createPostError.textContent =
            error instanceof Error ? error.message : "Failed to create post.";
          createPostError.style.display = "block";
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });
    }
    if (!isOwnProfile) renderFollowState(isFollowing);
    editProfileButton?.addEventListener("click", () =>
      renderEditProfileModal(profile),
    );
    followersCountButton?.addEventListener("click", () =>
      openPeopleModal("Followers", followersList),
    );
    followingCountButton?.addEventListener("click", () =>
      openPeopleModal("Following", followingList),
    );
    followButton?.addEventListener("click", async () => {
      if (!username || isFollowing) return;
      followButton.disabled = true;
      try {
        await followUser(username);
        isFollowing = true;
        followers += 1;
        followersCountButton!.textContent = `${followers} followers`;
        renderFollowState(isFollowing);
      } catch (error) {
        if (followError) {
          followError.textContent =
            error instanceof Error
              ? error.message
              : "Failed to follow profile.";
          followError.style.display = "block";
        }
      } finally {
        followButton.disabled = false;
      }
    });
    unfollowButton?.addEventListener("click", async () => {
      if (!username || !isFollowing) return;
      unfollowButton.disabled = true;
      try {
        await unfollowUser(username);
        isFollowing = false;
        followers = Math.max(0, followers - 1);
        followersCountButton!.textContent = `${followers} followers`;
        renderFollowState(isFollowing);
      } catch (error) {
        if (followError) {
          followError.textContent =
            error instanceof Error
              ? error.message
              : "Failed to unfollow profile.";
          followError.style.display = "block";
        }
      } finally {
        unfollowButton.disabled = false;
      }
    });
  } catch (error) {
    profileName.textContent = "Unable to load profile";
    profilePosts.textContent =
      error instanceof Error ? error.message : "Failed to load profile.";
  }
}

void renderProfile();
