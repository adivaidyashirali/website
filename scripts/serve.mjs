/**
 * Minimal static server that behaves like a typical static host
 * (Netlify / Cloudflare Pages / nginx `try_files $uri $uri/ =404`):
 *   /about  → dist/about/index.html
 *   unknown → dist/404.html with status 404
 * Usage: node scripts/serve.mjs [port]
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const candidates = [path.join(dist, clean), path.join(dist, clean, "index.html")];
  return candidates.find((f) => f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile());
}

http
  .createServer((req, res) => {
    const file = resolve(req.url || "/");
    const target = file ?? path.join(dist, "404.html");
    const type = TYPES[path.extname(target)] ?? "application/octet-stream";
    const immutable = target.includes(`${path.sep}assets${path.sep}`);
    res.writeHead(file ? 200 : 404, {
      "Content-Type": type,
      "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
    });
    fs.createReadStream(target).pipe(res);
  })
  .listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
