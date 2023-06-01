/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import pwa from "next-pwa";
await import("./src/env.mjs");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = pwa({
  dest: 'public'
});

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') : "louisebawas.github.io";

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  assetPrefix,
  basePath,
  output: "export",
  /**
   * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
};
export default withPWA(config);
