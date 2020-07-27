const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = (config) => {
  config.resolve.extensions.push(".wasm");

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        // Make file-loader ignore WASM files
        oneOf.exclude.push(/\.wasm$/);
      }
    });
  });

  config.plugins = (config.plugins || []).concat([
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "./src/tasks/counter"),
      extraArgs: "--no-typescript",
      outDir: path.resolve(__dirname, "./src/tasks/counter/build"),
    }),
  ]);

  require("react-app-rewire-postcss")(config, {
    plugins: (loader) => [require("autoprefixer")(), require("tailwindcss")],
  });

  return config;
};
