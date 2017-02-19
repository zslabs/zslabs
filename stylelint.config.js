module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-empty-line-before": [ "always", {
      except: [
        "blockless-after-same-name-blockless",
        "first-nested",
      ],
      ignore: ["after-comment"],
      ignoreAtRules: ["include", "mixin"]
    } ],
    "max-nesting-depth": [ 5, {
      ignore: ["blockless-at-rules"]
    } ]
  }
};
