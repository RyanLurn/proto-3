// @ts-check
import eslintJS from "@eslint/js";
import next from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx}"];

export default defineConfig([
  globalIgnores([
    ".next/",
    "out/",
    "build/",
    "next-env.d.ts",
    "convex/_generated/"
  ]),
  {
    name: "eslint-js/recommended",
    ...eslintJS.configs.recommended
  },
  tseslint.configs.recommendedTypeChecked,
  {
    name: "language-options",
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.browser
      }
    }
  },
  {
    name: "react/version",
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    name: "react/recommended",
    files: tsFiles,
    ...react.configs.flat["recommended"]
  },
  {
    name: "react/jsx-runtime",
    files: tsFiles,
    ...react.configs.flat["jsx-runtime"]
  },
  reactHooks.configs["recommended-latest"],
  reactRefresh.configs.recommended,
  {
    name: "next/recommended",
    files: tsFiles,
    /** @type {any} */
    plugins: {
      "@next/next": next
    },
    /** @type {any} */
    rules: {
      ...next.configs.recommended.rules
    }
  },
  {
    name: "next/core-web-vitals",
    files: tsFiles,
    /** @type {any} */
    plugins: {
      "@next/next": next
    },
    /** @type {any} */
    rules: {
      ...next.configs["core-web-vitals"].rules
    }
  },
  {
    name: "prettier",
    ...prettier
  }
]);
