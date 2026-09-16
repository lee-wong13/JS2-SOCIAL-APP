// API functions for handling posts

import { API_SOCIAL } from "./constants.ts";
import type { ApiError, Post } from "../types.ts";
import { loadApiKey, loadToken } from "../utils/storages.ts";

interface PostsResponse {
  data: Post[];
}

interface PostResponse {
  data: Post;
}

export interface CreatePostData {
  title: string;
  body: string;
  media?: {
    url: string;
    alt: string;
  };
}

export interface UpdatePostData {
  title: string;
  body: string;
  media?: {
    url: string;
    alt: string;
  };
}

export async function getPosts(): Promise<Post[]> {
  const token = loadToken();

  if (!token) {
    throw new Error("You must be logged in to view posts.");
  }

  const apiKey = loadApiKey();

  if (!apiKey) {
    throw new Error("No Noroff API key found. Please log in again.");
  }

  const response = await fetch(`${API_SOCIAL.posts}?_author=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const json = (await response.json()) as PostsResponse | ApiError;

  if (!response.ok) {
    const error = json as ApiError;
    const message = error.errors?.[0]?.message ?? error.error?.[0]?.message;
    throw new Error(`Failed to load posts: ${message ?? response.statusText}`);
  }

  return (json as PostsResponse).data;
}

export async function createPost(postData: CreatePostData): Promise<Post> {
  const token = loadToken();

  if (!token) {
    throw new Error("You must be logged in to create a post.");
  }

  const apiKey = loadApiKey();

  if (!apiKey) {
    throw new Error("No Noroff API key found. Please log in again.");
  }

  const response = await fetch(API_SOCIAL.posts, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const json = (await response.json()) as PostResponse | ApiError;

  if (!response.ok) {
    const error = json as ApiError;
    const message = error.errors?.[0]?.message ?? error.error?.[0]?.message;
    throw new Error(`Failed to create post: ${message ?? response.statusText}`);
  }

  return (json as PostResponse).data;
}

export async function getPostById(postId: number): Promise<Post> {
  const token = loadToken();

  if (!token) {
    throw new Error("You must be logged in to view this post.");
  }

  const apiKey = loadApiKey();

  if (!apiKey) {
    throw new Error("No Noroff API key found. Please log in again.");
  }

  const response = await fetch(`${API_SOCIAL.posts}/${postId}?_author=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  const json = (await response.json()) as PostResponse | ApiError;

  if (!response.ok) {
    const error = json as ApiError;
    const message = error.errors?.[0]?.message ?? error.error?.[0]?.message;
    throw new Error(`Failed to load post: ${message ?? response.statusText}`);
  }

  return (json as PostResponse).data;
}

export async function updatePost(
  postId: number,
  postData: UpdatePostData,
): Promise<Post> {
  const token = loadToken();

  if (!token) {
    throw new Error("You must be logged in to edit this post.");
  }

  const apiKey = loadApiKey();

  if (!apiKey) {
    throw new Error("No Noroff API key found. Please log in again.");
  }

  const response = await fetch(`${API_SOCIAL.posts}/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const json = (await response.json()) as PostResponse | ApiError;

  if (!response.ok) {
    const error = json as ApiError;
    const message = error.errors?.[0]?.message ?? error.error?.[0]?.message;
    throw new Error(`Failed to update post: ${message ?? response.statusText}`);
  }

  return (json as PostResponse).data;
}

export async function deletePost(postId: number): Promise<void> {
  const token = loadToken();

  if (!token) {
    throw new Error("You must be logged in to delete this post.");
  }

  const apiKey = loadApiKey();

  if (!apiKey) {
    throw new Error("No Noroff API key found. Please log in again.");
  }

  const response = await fetch(`${API_SOCIAL.posts}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const json = (await response.json()) as ApiError;
    const message = json.errors?.[0]?.message ?? json.error?.[0]?.message;
    throw new Error(`Failed to delete post: ${message ?? response.statusText}`);
  }
}
