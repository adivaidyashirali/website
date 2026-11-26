import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export { pages, absoluteUrl, ogImageFor } from "./content/seo";
export { site } from "./content/site";

/** Renders one route to static HTML at build time. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
