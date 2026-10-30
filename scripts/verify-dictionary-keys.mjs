import fs from "fs";
import path from "path";
import ts from "typescript";

function loadTsDict(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const transpiled = ts.transpileModule(fileContent, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  }).outputText;

  // Create temporary esm file to import
  const tempFile = path.resolve(`scripts/temp-${path.basename(filePath, ".ts")}.mjs`);
  fs.writeFileSync(tempFile, transpiled, "utf-8");
  return tempFile;
}

async function verifyDictionaries() {
  const tempEn = loadTsDict(path.resolve("src/i18n/dictionaries/en.ts"));
  const tempKn = loadTsDict(path.resolve("src/i18n/dictionaries/kn.ts"));
  const tempTa = loadTsDict(path.resolve("src/i18n/dictionaries/ta.ts"));
  const tempMa = loadTsDict(path.resolve("src/i18n/dictionaries/ma.ts"));
  const tempMr = loadTsDict(path.resolve("src/i18n/dictionaries/mr.ts"));

  try {
    const enModule = await import(`file://${tempEn.replace(/\\/g, "/")}`);
    const knModule = await import(`file://${tempKn.replace(/\\/g, "/")}`);
    const taModule = await import(`file://${tempTa.replace(/\\/g, "/")}`);
    const maModule = await import(`file://${tempMa.replace(/\\/g, "/")}`);
    const mrModule = await import(`file://${tempMr.replace(/\\/g, "/")}`);

    const en = enModule.enDictionary;
    const kn = knModule.knDictionary;
    const ta = taModule.taDictionary;
    const ma = maModule.maDictionary;
    const mr = mrModule.mrDictionary;

    function compareKeys(baseObj, testObj, langName, prefix = "") {
      const missingKeys = [];
      for (const key of Object.keys(baseObj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (testObj[key] === undefined || testObj[key] === null) {
          missingKeys.push(fullKey);
        } else if (typeof baseObj[key] === "object" && !Array.isArray(baseObj[key])) {
          if (typeof testObj[key] !== "object") {
            missingKeys.push(`${fullKey} (type mismatch: expected object, got ${typeof testObj[key]})`);
          } else {
            missingKeys.push(...compareKeys(baseObj[key], testObj[key], langName, fullKey));
          }
        }
      }
      return missingKeys;
    }

    const langs = [
      { name: "Kannada (kn)", dict: kn },
      { name: "Tamil (ta)", dict: ta },
      { name: "Malayalam (ma)", dict: ma },
      { name: "Marathi (mr)", dict: mr }
    ];

    let totalErrors = 0;
    for (const { name, dict } of langs) {
      const missing = compareKeys(en, dict, name);
      if (missing.length > 0) {
        console.error(`❌ ${name} has ${missing.length} missing or invalid keys:`);
        missing.forEach(k => console.error(`   - ${k}`));
        totalErrors += missing.length;
      } else {
        console.log(`✅ ${name} has all keys matching English dictionary perfectly!`);
      }
    }

    if (totalErrors === 0) {
      console.log("\n🎉 ALL Indic dictionaries are complete and match 100% of the English dictionary structure!");
    } else {
      process.exit(1);
    }
  } finally {
    [tempEn, tempKn, tempTa, tempMa, tempMr].forEach(f => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
  }
}

verifyDictionaries().catch(err => {
  console.error("Error verifying dictionaries:", err);
  process.exit(1);
});
