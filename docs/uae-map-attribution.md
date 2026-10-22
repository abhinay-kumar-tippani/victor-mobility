# UAE emirates map provenance

The map highlights Dubai, Abu Dhabi and Sharjah, confirmed by the user on 22 October 2026. The other four emirates remain neutral. Highlighting identifies the locations already listed on the UAE page, not additional offices or guaranteed emirate-wide service coverage.

## Source and licence

- Dataset: [geoBoundaries gbOpen ARE ADM1](https://www.geoboundaries.org/api/current/gbOpen/ARE/ADM1/), boundary ID `ARE-ADM1-86790563`.
- Source: OpenStreetMap contributors and Wambacher; boundaries represent 2017. API build date: 12 December 2023. Retrieved 22 October 2026.
- Pinned source: [simplified GeoJSON at revision 9469f09](https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/ARE/ADM1/geoBoundaries-ARE-ADM1_simplified.geojson).
- This particular dataset is licensed under [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/), as identified in the API metadata. It is not labelled CC BY merely because it is in gbOpen.
- Attribution appears below the map, including [OpenStreetMap copyright](https://www.openstreetmap.org/copyright), geoBoundaries and the licence. The derived boundary database is available under ODbL 1.0 at `/maps/uae-emirates.json`, with a download link in the map. The boundary licence applies to this geographic database, not unrelated site code or company content.

## Reproduction

Save the pinned GeoJSON to `references/maps/uae-emirates-source.geojson`, then run `node scripts/build-uae-map.mjs`. The generator accepts another local source path as its first argument. It retains all seven emirates and every polygon ring, projects the simplified source using an equirectangular projection corrected at 24°N, fits the result into a 640×440 SVG viewBox, and rounds coordinates to 0.01 SVG units. The generated asset includes its source SHA-256 and metadata. Geography stays north-up in Arabic; only interface text/layout adapts to RTL.

Output: `public/maps/uae-emirates.json`, imported by `src/components/home/UaeEmiratesMap.tsx`. No runtime map API or network request is required. This is a simplified location graphic, not a navigation or legal boundary map.

UI text and English/Arabic emirate names: `src/content/india.json` → `uaePresenceMap`. Existing location details and enquiries remain in `UaePresenceSection.tsx` and the site's dictionaries.
