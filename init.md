# React + JavaScript Project Template with Tailwind and DaisyUI

This process will create a basic multi-view website template with a navigation bar.
Find reference samples of the project configuration files at the bottom of this doc.

## 1. Create React Template

Create a new React JS project with Vite:

```bash
npm create vite@latest . -- --template react
```

## 2. Install and Configure Tailwind CSS

Install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add content configuration to `tailwind.config.js`:

```javascript
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
```

Add Tailwind directives to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Test Tailwind by using this html:

```html
<h1 className="text-3xl font-bold underline">
  if this is big n bold n underlined tailwind is working
</h1>
```

## 3. Install React Router

Add React Router for page navigation:

```bash
npm i react-router-dom
```

## 4. Install and Configure DaisyUI

Install DaisyUI:

```bash
npm i -D daisyui@latest
```

Test DaisyUI by using this html:

```html
<p>
  The button below should be big blue and have a hover effect if daisyUI is
  working
</p>
<button className="btn btn-primary w-64">Big Blue Button</button>
```

## Configuration Files

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

//needed to fix definition error for __dirname
//https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
```

### package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.17",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.22",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.13.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.3"
  }
}
```
