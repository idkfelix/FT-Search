import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import svelte from "rollup-plugin-svelte";
import css from 'rollup-plugin-css-only';
import zip from "rollup-plugin-zip";
import del from 'rollup-plugin-delete'

import {chromeExtension, simpleReloader} from "rollup-plugin-chrome-extension";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // Chrome Extention Stuff
    chromeExtension({
      
    }),
    simpleReloader(),

    // Svelte Pre-Process
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),

    // Abstract CSS to its own file
    css({ output: 'bundle.css' }),

    // Clean dist folder before bundeling
    del({ targets: 'dist/*' }),

    // Node_Modules Stuff
    resolve({
      dedupe: ["svelte"],
    }),

    // Convert CommmonJS to ES6
    commonjs(),

    // If we're building for production, minify
    production && terser(),

    // Outputs a zip file in ./releases
    production && zip({ dir: "releases" }),
  ],
};