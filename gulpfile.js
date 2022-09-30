"use strict";

const { series, watch, src, dest, parallel } = require("gulp");

// Gulp plugins & utilities
const del = require("del");
const zip = require("gulp-zip");
const wpPot = require("gulp-wp-pot");

/**
 * Copy files for production
 */
function copyFiles() {
  return src([
    "**",
    "!*.map",
    "!node_modules/**",
    "!dist/**",
    "!vendor/**",
    "!sass/**",
    "!.git/**",
    "!.vscode/**",
    "!.github/**",
    "!gulpfile.js",
    "!package.json",
    "!package-lock.json",
    "!.editorconfig",
    "!.gitignore",
    "!.jshintrc",
    "!.DS_Store",
    "!*.map",
    "!composer.json",
    "!composer.lock",
    "!README.md",
  ]).pipe(dest("dist/scroll-top/"));
}

/**
 * Clean folder
 */
function clean() {
  return del(["dist/**", "dist"], { force: false });
}

/**
 * Zip folder
 */
function zipped() {
  return src(["dist/**"]).pipe(zip("scroll-top.zip")).pipe(dest("dist/"));
}

/**
 * Generate .pot file
 */
function language() {
  return src(["**/*.php", "!dist/**/*"])
    .pipe(
      wpPot({
        domain: "scroll-top",
        package: "Scroll Top",
      })
    )
    .pipe(dest("languages/scroll-top.pot"));
}

/**
 * Tasks
 */
exports.build = series(language, copyFiles, zipped);
exports.clean = clean;
