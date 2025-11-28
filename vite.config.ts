import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ADD THE BUILD CONFIGURATION HERE
  build: {
    // This setting prevents Vite from generating the Source Map (.map) files
    // in your production build, which effectively hides your original 
    // source file structure (like src/components/ui/Navbar.tsx) in DevTools.
    sourcemap: false,
    
    // Optional: You can also specify the minifier (Terser is the default for Vite)
    // to ensure max obfuscation for the final JS bundle.
    // minify: 'terser', 
  },
}));