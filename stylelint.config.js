export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "theme",
          "utility",
          "custom-variant",
          "source",
          "variant",
          "apply",
          "reference",
        ],
      },
    ],
    "import-notation": "string",
    "custom-property-empty-line-before": null,
    "custom-property-pattern": null,
    "color-hex-length": null,
    "declaration-property-value-disallowed-list": {
      "overflow-y": ["auto", "scroll"],
      overflow: ["/auto/", "/scroll/"],
      height: ["/\\d(vh|svh|lvh|dvh)\\b/"],
      "min-height": ["/\\d(vh|svh|lvh|dvh)\\b/"],
      "max-height": ["/\\d(vh|svh|lvh|dvh)\\b/"],
    },
    "color-no-hex": true,
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"],
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
  },
  overrides: [
    {
      files: ["src/styles/theme.css"],
      rules: { "nesting-selector-no-missing-scoping-root": null },
    },
    {
      files: ["src/styles/tokens.css", "src/styles/standalone.css"],
      rules: {
        "color-no-hex": null,
        "function-disallowed-list": null,
      },
    },
  ],
}
