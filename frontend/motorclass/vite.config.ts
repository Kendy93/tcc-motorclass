import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup"
import rehypeSlug from "rehype-slug";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    mdx({
      rehypePlugins: [
          rehypeSlug
      ]
    })
  ],
})
