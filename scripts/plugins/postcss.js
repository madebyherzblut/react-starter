const autoprefixer = require("autoprefixer");
const fs = require("fs-extra");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");

module.exports = function () {
  return {
    name: "plugin-postcss",
    setup(build) {
      build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
        const processor = postcss([tailwindcss(), autoprefixer()]);
        const content = await fs.readFile(path);
        const result = await processor.process(content, { from: path });

        return {
          contents: result.toString(),
          loader: "css",
        };
      });
    },
  };
};
