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

Reflection:

- I had to check if the value is being written correctly, and if there is interface declaration.

### 2026-09-03

Prompt: Where can I find my API_KEY?

Answer:

- By logging in Noroff API

### 2026-09-05

Prompt: How to design a centralised API client for
calling the Noroff Social API (auth headers, error handling, timeouts)
based on lessons on reusable API services and advanced fetch config

Answer:

- Suggested a TypeScript structure using generics,
  AbortController for request timeouts, and a custom ApiError class
  extending Error. I adapted this to my own file structure (api/,
  utils/, types.ts) and wrote the final implementation myself.

Claude AI

### 2026-09-11

Prompt: Try wiring up the real single-post fetch.

Answer:

- Added a `getPostById()` function in `src/api/posts.ts` (calling `GET /social/posts/:id?_author=true`) and updated `src/ui/post.ts` to read the `?id=` query string and call it, with loading/error states.

Reflection:

- Ran `npm run build` to check TypeScript myself, and manually opened the real URL to confirm the post loaded was genuine API data, not the old mock object.

CoPilot

### 2026-09-13

Prompt: The image is overflowing the container.

Answer:

- Diagnosed that the existing CSS constrained `max-width` on the `<p class="image">` wrapper but not on the `<img>` element itself, and added `#feed-section .post-card .image img { max-width: 100%; height: auto; }`

Reflection:

- Verified myself that the actual DOM structure came from `src/utils/render.ts` (rather than trusting the guessed selector blindly) before confirming the fix targeted the right element.

CoPilot

### 2026-09-14

Prompt: How do I create header that shows logged in username and fetching logged in user?

Answer:

- Created `src/ui/header.ts` (the `renderHeader()` function), added `getProfile()` in `src/api/profiles.ts` (`GET /social/profiles/:name?_posts=true`), and updated `profile.ts` to read `?name=` from the URL or fall back to the currently logged-in user.

Reflection:

- Tested opening both my own profile and another user's profile to confirm the fallback logic worked correctly in both cases.

CoPilot

### 2026-09-15

Prompt: How do I make my CSS resuable for post and feed?

Answer:

- Unified the card styling rules (border, shadow, padding) across all three pages instead of having them duplicated with slightly different values.

Reflection:

- Compared the actual rendered pages side by side in the browser to confirm none of them fell out of style.

CoPilot

### 2026-09-15

Prompt: Why it show "Unknown author" instead of the author's name?

Answer:

- the `GET /social/profiles/:name?_posts=true` endpoint does not attach an `author` field to each post (unlike the general posts endpoint), so the author data was manually filled in from the profile itself before passing posts to `renderPostCard()`.

Reflection:

- Had to inspect the actual response in the Network tab to confirm the field really was missing before concluding this needed a data patch rather than a rendering bug fix.

CoPilot

### 2026-09-16

Prompt: I tried to log in it said _failed to create API_ what could fo wrong here?

Answer:

- The error was caused by the login flow trying to create a new API key every time you logged in: await createApiKey(response.data.accessToken)
- Your project already has an application API key in constants.ts, and Noroff recommends reusing one API key for the whole app. I updated login.ts to use that existing key instead of calling /auth/create-api-key.

Reflection:

- Had to inspect `localStorage` directly in DevTools to confirm this hypothesis before asking the AI to apply the fix, rather than accepting the AI's first guess at face value.

CoPilot

### 2026-09-16

Prompt: Profile page is blank, and after fixing it, it is still the same.

Answer:

- Found two separate causes: (1) `profile.ts` had a duplicate `import "../css/style.css"` that conflicted with the HTML already loading the stylesheet, tripping up the dev server
- (2) the CSS file had an unclosed `{ ... }` block, which made Vite fail to process the stylesheet and return a 500 error for the entire file

Reflection:

- Had to open the real browser and inspect the actual network error (`500 Internal Server Error`) before realizing the problem wasn't JavaScript logic at all, but invalid CSS syntax — a debugging skill that required reading the browser's own error output rather than just asking the AI to guess.

CoPilot
