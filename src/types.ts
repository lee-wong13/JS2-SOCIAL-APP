export interface LoginResponse {
  data: {
    accessToken: string;
    name: string;
    email: string;
  };
}

export interface ApiError {
  error?: {
    message?: string;
  }[];
  errors?: {
    message?: string;
  }[];
}

export interface Media {
  url: string;
  alt: string;
}

export interface Author {
  name: string;
  email?: string;
  bio?: string;
}

export interface Profile {
  name: string;
  email?: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  _count?: {
    followers: number;
    following: number;
    posts: number;
  };
  followers?: Profile[];
  following?: Profile[];
  posts?: Post[];
}

export interface Post {
  id: number;
  title: string;
  body?: string;
  tags?: string[];
  media?: Media;
  created?: string;
  updated?: string;
  author?: Author;
  _count?: {
    comments: number;
    reactions: number;
  };
}
