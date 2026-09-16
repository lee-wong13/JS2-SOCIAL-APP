# AI LOG

## Project: JS2 Social App

This project is a Vite + TypeScript frontend for a social media app using the Noroff API. The app is structured as a multi-page frontend with shared API, UI, and utility modules.

### Core idea

- Frontend only: HTML pages + TypeScript modules
- Auth flow with login/register and token storage
- Feed page with posts
- Post detail page
- Profile page for viewing user profiles and their content
- Shared API layer and guarded routes

### Current project structure

- pages/
  - auth/login.html
  - auth/register.html
  - feed/index.html
  - post/index.html
  - profile/index.html
- src/
  - api/
    - auth.ts
    - constants.ts
    - header.ts
    - posts.ts
    - profiles.ts
  - ui/
    - feed.ts
    - main.ts
    - post.ts
    - profile.ts
    - auth/login.ts
    - auth/register.ts
  - utils/
    - auth-guard.ts
    - render.ts
    - storages.ts
  - types.ts

### Project decisions

- Keep the app modular instead of putting everything in one file.
- Separate API calls from UI rendering.
- Use localStorage for auth/session persistence.
- Use a shared auth guard so protected pages redirect to login if no token exists.
- Keep page HTML templates in pages/ and JS logic in src/ui/.

### Build status

- Last verified successfully with: npm run build
- Exit code: 0

---

## Conversation / prompt log

### 2026-08-27

Prompt: Could you help me with building a folder structure for the project?

Answer:

- Proposed a clean app structure with pages/, css/, and js/ or src/ modules
- Suggested separate folders for API, UI, utilities, and page templates
- Emphasized one page = one HTML file + one logic file

### 2026-08-27

Prompt: Give me an idea of what I should do first.

Answer:

- Start with the API key and backend configuration
- Make sure auth is working before building the UI around it
- Then move into login/register, feed, post, and profile flows

### 2026-08-27

Prompt: I'm writing the UI for the page but I'm not sure where to put them.

Answer:

- Each screen should have its own HTML page in pages/
- Its script logic should live in src/ui/ or the matching UI folder
- Shared rendering helpers go in src/utils/

### 2026-09-03

Promtp: Why is there red line under import and it is unable to import or find values?

Answer:

- Because some value are imported by type
- Or the values are not being written correctly

### 2026-09-03

Prompt: Where can I find my API_KEY?

Answer:

- By logging in Noroff API
