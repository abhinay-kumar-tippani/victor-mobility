import fs from "fs";

const names = ["amazon", "oracle", "google", "otis", "jpmorgan", "tatadocomo", "hdfc", "synchrony", "teleperformance", "wipro", "godrej"];

names.forEach((name) => {
  const file = `./public/images/clients/${name}.svg`;
  if (fs.existsSync(file)) {
    const c = fs.readFileSync(file, "utf8");
    const vb = c.match(/viewBox=["'][^"']+["']/);
    const width = c.match(/width=["'][^"']+["']/);
    const height = c.match(/height=["'][^"']+["']/);
    console.log(`${name}: ${vb ? vb[0] : "NO_VB"} | ${width ? width[0] : ""} | ${height ? height[0] : ""}`);
  }
});
