# AI LOG

27 august 2026

Prompt: Could you help me with bulding a folder structure for the project?

social-app/
├── index.html → redirects to /auth/login or /feed depending on auth state
├── README.md
├── .gitignore
│
├── /css
│ └── style.css → single basic stylesheet (shared across pages)
│
├── /pages
│ ├── /auth
│ │ ├── login.html
│ │ └── register.html
│ ├── /feed
│ │ └── index.html → posts/feed page
│ ├── /post
│ │ └── index.html → individual post page (?id=123)
│ └── /profile
│ └── index.html → own profile + other users' profiles (?user=username)
│
└── /js
├── /api
│ ├── constants.js → BASE_URL, endpoints, API key
│ ├── headers.js → builds auth headers (token + API key)
│ ├── auth.js → register(), login()
│ ├── posts.js → getPosts(), getPost(), createPost(), updatePost(), deletePost(), searchPosts()
│ └── profiles.js → getProfile(), getUserPosts(), follow(), unfollow()
│
├── /ui
│ ├── /auth
│ │ ├── register.js → form handler for register page
│ │ └── login.js → form handler for login page
│ ├── /post
│ │ ├── create.js
│ │ ├── update.js
│ │ └── delete.js
│ └── /profile
│ └── follow.js
│
├── /utilities
│ ├── storage.js → save/load/clear token+profile in localStorage
│ ├── auth-guard.js → redirect to login if no token present
│ └── render.js → shared DOM-rendering helpers (post card, etc.)
│
└── /router or entry points per page

Claude AI

27 august 2026

Prompt: Give me an idea of what I should do first

- Get API key, since nothing else in the app will actually work without it.

Claude AI

27 august 2026

Prompt: I'm writing the UI for the page but I'm not sure where to put them.

- Each visual page = one HTML file in /pages/ + one JS file that powers it.
