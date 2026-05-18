const { createServer } = require("https");
const { parse } = require("url");
const fs = require("fs");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const localDomain = process.env.LOCAL_DOMAIN || "local.xss-playground.com";
const port = parseInt(process.env.LOCAL_HTTPS_PORT || "443", 10);
const keyFile = process.env.LOCAL_HTTPS_KEY || "local.xss-playground-key.pem";
const certFile = process.env.LOCAL_HTTPS_CERT || "local.xss-playground.pem";
const displayUrl =
  port === 443 ? `https://${localDomain}` : `https://${localDomain}:${port}`;

const app = next({ dev });
const handle = app.getRequestHandler();

const missingCertMessage = [
  `Missing local HTTPS certificate files: ${keyFile}, ${certFile}`,
  "Run `yarn setup` once, then start the dev server again.",
].join("\n");

if (!fs.existsSync(keyFile) || !fs.existsSync(certFile)) {
  console.error(missingCertMessage);
  process.exit(1);
}

app.prepare().then(() => {
  const server = createServer(
    {
      key: fs.readFileSync(keyFile),
      cert: fs.readFileSync(certFile),
    },
    async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error("Error occurred handling", req.url, error);
        res.statusCode = 500;
        res.end("internal server error");
      }
    }
  );

  server.on("error", error => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
      console.error("Stop the process using the port or set LOCAL_HTTPS_PORT.");
      process.exit(1);
    }
    if (error.code === "EACCES") {
      console.error(`Port ${port} requires elevated privileges.`);
      console.error("Run with `yarn dev` so sudo is applied.");
      process.exit(1);
    }
    throw error;
  });

  server.listen(port, () => {
    console.log(`> Server started on ${displayUrl}`);
  });
});
