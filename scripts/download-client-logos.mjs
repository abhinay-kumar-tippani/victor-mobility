import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "images", "clients");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const logos = [
  {
    id: "amazon",
    filename: "amazon.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: "synechron",
    filename: "synechron.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Synechron_Logo_White_Background.jpg",
  },
  {
    id: "teleperformance",
    filename: "teleperformance.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Teleperformance_logo.svg",
  },
  {
    id: "otis",
    filename: "otis.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Otis_logo.SVG",
  },
  {
    id: "jpmorgan",
    filename: "jpmorgan.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/JPMorgan_Chase.svg",
  },
  {
    id: "tatadocomo",
    filename: "tatadocomo.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Tata_Docomo_Logo.svg",
  },
  {
    id: "oracle",
    filename: "oracle.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
  },
  {
    id: "wipro",
    filename: "wipro.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
  },
  {
    id: "google",
    filename: "google.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: "godrej",
    filename: "godrej.svg",
    url: "https://static.cdnlogo.com/logos/g/13/godrej-properties.svg",
  },
  {
    id: "hdfc",
    filename: "hdfc.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
  },
  {
    id: "synchrony",
    filename: "synchrony.svg",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Synchrony_Financial_logo.svg",
  },
];

async function downloadAll() {
  for (const item of logos) {
    try {
      console.log(`Downloading ${item.id} from ${item.url}...`);
      const res = await fetch(item.url, {
        headers: {
          "User-Agent": "VictorMobilityWeb/1.0 (https://victormobility.com; contact@victormobility.com)",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(dir, item.filename);
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${item.filename} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed ${item.id}:`, err.message);
    }
  }
}

downloadAll();
