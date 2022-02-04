const { build, cliopts } = require("estrella");
const fs = require("fs-extra");
const path = require("path");
const postcss = require("./plugins/postcss");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");
const outDir = path.resolve(rootDir, "dist");

fs.ensureDirSync(outDir);
fs.emptyDirSync(outDir);
fs.copySync(publicDir, outDir);

build({
  entryPoints: ["src/index.tsx"],
  outdir: outDir,
  bundle: true,
  sourcemap: true,
  minify: process.env.NODE_ENV === "production",
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "production"
    ),
    global: "window",
  },
  plugins: [postcss()],
});

// Run a local web server with livereload when -watch is set
if (cliopts.watch) {
  require("serve-http").createServer({
    port: process.env.PORT || 3000,
    pubdir: outDir,
  });

  fs.watch(publicDir).on("change", () => {
    fs.copySync(publicDir, outDir);
  });
}
