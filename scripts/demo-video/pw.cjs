// Playwright from PLAYWRIGHT_PATH, the local node_modules, or the devcontainer workspace.
const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', '/workspace/node_modules/playwright'].filter(Boolean);
for (const t of tries) { try { module.exports = require(t); return; } catch (e) {} }
throw new Error('playwright not found; set PLAYWRIGHT_PATH or `npm i --no-save playwright`');
