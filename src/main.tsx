import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/plus-jakarta-sans/index.css";
import "./styles/index.css";

import App from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Production pages are pre-rendered (see scripts/prerender.mjs) and hydrated;
// the dev server renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
