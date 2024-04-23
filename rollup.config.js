import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import svelte from "rollup-plugin-svelte"
import zip from "rollup-plugin-zip"

import {chromeExtension, simpleReloader} from "rollup-plugin-chrome-extension"

const production = !process.env.ROLLUP_WATCH

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),
    simpleReloader(),

    svelte(),
    postcss({ minimize: production }),

    del({ targets: 'dist/*' }),

    resolve({ dedupe: ["svelte"] }),
    commonjs(),

    production && terser(),
    production && zip({ dir: "release" })
  ],
}