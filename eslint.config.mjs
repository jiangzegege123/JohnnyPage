import nextConfig from "eslint-config-next";
import nextTypescriptConfig from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // ── Next.js recommended rules (React, React Hooks, @next/next) ────────────
  ...nextConfig,

  // ── TypeScript-aware rules ─────────────────────────────────────────────────
  ...nextTypescriptConfig,

  // ── Project-level overrides ────────────────────────────────────────────────
  {
    rules: {
      // Allow unused vars that start with _ (intentional placeholders)
      "@typescript-eslint/no-unused-vars": ["warn", {
        varsIgnorePattern:  "^_",
        argsIgnorePattern:  "^_",
        caughtErrorsIgnorePattern: "^_",
      }],

      // Prefer const wherever possible
      "prefer-const": "error",

      // No console.log left in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // React 19 — no need to import React for JSX
      "react/react-in-jsx-scope": "off",

      // Allow explicit `any` with a warning (Three.js dynamic imports need it occasionally)
      "@typescript-eslint/no-explicit-any": "warn",

      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": ["error", {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      }],
    },
  },

  // ── Ignore build artefacts ─────────────────────────────────────────────────
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
    ],
  },
];

export default config;
