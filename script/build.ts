import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await mkdir("dist", { recursive: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    target: "node20",
    minify: true,
    external: externals,
    logLevel: "info",
  });

  // Create a minimal package.json for Hostinger
  const hostingerPkg = {
    name: pkg.name,
    version: pkg.version,
    type: "commonjs",
    scripts: {
      start: "node index.cjs"
    },
    dependencies: pkg.dependencies
  };
  await writeFile("dist/package.json", JSON.stringify(hostingerPkg, null, 2));
  
  console.log("Build complete. Ready for Hostinger deployment from 'dist' folder.");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
