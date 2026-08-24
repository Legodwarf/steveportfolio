# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single static portfolio website (no monorepo, no backend, no database). It ships plain HTML/CSS/JS plus a small Node-based static-site generator. See `USAGE_GUIDE.md` for the authoring workflow.

### Toolchain / dependencies
- No package manager, lockfile, or third-party dependencies. The only runtime needs are Node.js (for the build step) and Python 3 (for a convenient local static server); both are present in the environment. There is nothing to `npm install`.

### Build
- Run the generator from the repo root: `node build.js`. It reads `data/projects.json` + `data/homepages.json` and `templates/*.html`, then writes `projects/*.html`, `index.html`, and each employer homepage (e.g. `acme-corp.html`).

### Run / serve
- Serve the static files from the repo root, e.g. `python3 -m http.server 8000`, then open `http://localhost:8000/index.html`. A real HTTP server (rather than `file://`) is recommended so the `?from=` back-link params handled in `script.js` behave correctly.

### Lint / test
- None configured (no ESLint/Prettier, no test framework). Verify changes by rebuilding and viewing the generated pages in a browser.

### Important gotcha
- `node build.js` OVERWRITES the generated HTML files (`index.html`, employer homepages like `acme-corp.html`, and everything in `projects/`). Some committed generated files contain hand-edited customizations that are NOT in the templates — e.g. `acme-corp.html` has a "Hello Acme Corp," greeting that the template does not produce. Running the build silently reverts such manual edits. After running `node build.js`, always check `git diff` and restore any intended manual customizations, or move the customization into the templates/data so it survives a rebuild.
