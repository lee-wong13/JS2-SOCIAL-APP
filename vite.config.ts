import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "pages/auth/login.html"),
        register: resolve(__dirname, "pages/auth/register.html"),
        feed: resolve(__dirname, "pages/feed/index.html"),
        post: resolve(__dirname, "pages/post/index.html"),
        profile: resolve(__dirname, "pages/profile/index.html"),
      },
    },
  },
});
