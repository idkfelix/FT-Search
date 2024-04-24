import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import del from 'rollup-plugin-delete'
import postcss from 'rollup-plugin-postcss'
import svelte from "rollup-plugin-svelte"
import zip from "rollup-plugin-zip"
import {chromeExtension} from "rollup-plugin-chrome-extension"

const production = !process.env.ROLLUP_WATCH

const {
  npm_package_name,
  npm_package_version
 } = process.env

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    chromeExtension(),

    svelte(),
    postcss(),

    del({ targets: 'dist/*' }),

    resolve(),
    commonjs(),

    production && terser(),
    production && zip({
      file: `${npm_package_name}-${npm_package_version}.crx`
    }),
  ],
}