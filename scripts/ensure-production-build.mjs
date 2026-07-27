import { access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const buildIdPath = fileURLToPath(new URL("../dist/BUILD_ID", import.meta.url));

try {
  await access(buildIdPath);
  console.log("Production build found in dist.");
} catch {
  console.log("Production build is missing. Running next build before startup...");

  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const buildProcess = spawn(npmCommand, ["run", "build"], {
    stdio: "inherit",
  });

  const exitCode = await new Promise((resolve, reject) => {
    buildProcess.once("error", reject);
    buildProcess.once("exit", resolve);
  });

  if (exitCode !== 0) {
    throw new Error(`Production build failed with exit code ${exitCode}.`);
  }

  await access(buildIdPath);
  console.log("Production build created successfully.");
}
