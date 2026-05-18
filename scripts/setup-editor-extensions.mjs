import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

import { homedir } from "node:os";
import { join } from "node:path";

const extensionsPath = new URL("../.vscode/extensions.json", import.meta.url);
const extensions = JSON.parse(
  readFileSync(extensionsPath, "utf8")
).recommendations;
const cliCandidates = [
  "antigravity",
  join(homedir(), ".antigravity/antigravity/bin/antigravity"),
  "code",
  "cursor",
].filter(Boolean);

const commandExists = command => {
  if (command.includes("/")) return existsSync(command);
  const result = spawnSync("command", ["-v", command], {
    shell: true,
    stdio: "ignore",
  });
  return result.status === 0;
};

const editorCli = cliCandidates.find(commandExists);

if (process.env.EXTENSIONS_DRY_RUN === "true") {
  console.log("> Dry run: recommended editor extensions");
  console.log(`> Editor CLI: ${editorCli || "not found"}`);
  for (const extension of extensions) console.log(`  - ${extension}`);
  process.exit(0);
}

if (!editorCli) {
  console.log("> No VS Code-compatible editor CLI found.");
  console.log("> Install these extensions manually:");
  for (const extension of extensions) console.log(`  - ${extension}`);
  process.exit(0);
}

console.log(`> Installing workspace extensions with ${editorCli}`);

for (const extension of extensions) {
  console.log(`> ${extension}`);
  execFileSync(editorCli, ["--install-extension", extension], {
    stdio: "inherit",
  });
}

console.log("> Extension setup complete.");
