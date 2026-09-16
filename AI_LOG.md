# AI LOG

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

### 2026-09-11

Prompt: Try wiring up the real single-post fetch.

Answer:

- Added a `getPostById()` function in `src/api/posts.ts` (calling `GET /social/posts/:id?_author=true`) and updated `src/ui/post.ts` to read the `?id=` query string and call it, with loading/error states.

### 2026-09-13

Prompt: The image is overflowing the container.

Answer:

- Diagnosed that the existing CSS constrained `max-width` on the `<p class="image">` wrapper but not on the `<img>` element itself, and added `#feed-section .post-card .image img { max-width: 100%; height: auto; }`

### 2026-09-16

Prompt: I tried to log in it said _failed to create API_ what could fo wrong here?

Answer:

- The error was caused by the login flow trying to create a new API key every time you logged in: await createApiKey(response.data.accessToken)
- Your project already has an application API key in constants.ts, and Noroff recommends reusing one API key for the whole app. I updated login.ts to use that existing key instead of calling /auth/create-api-key.

CoPilot
