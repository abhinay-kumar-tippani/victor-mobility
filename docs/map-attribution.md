# India presence map provenance

The map uses geographic boundaries from [DataMeet/maps](https://github.com/datameet/maps), retrieved 6 October 2026. Highlighting identifies states containing the three published offices in `src/content/india.json`; it does not promise statewide service coverage.

- State and union-territory polygons: [States/Admin2.shp](https://github.com/datameet/maps/blob/master/States/Admin2.shp) and [Admin2.dbf](https://github.com/datameet/maps/blob/master/States/Admin2.dbf), under the repository's [CC BY 4.0 licence](https://github.com/datameet/maps/blob/master/LICENSE). Attribution is visible below the map.
- National outline: [Country/india-soi.geojson](https://github.com/datameet/maps/blob/master/Country/india-soi.geojson); the Country directory describes this outline as CC0 and based on the Survey of India representation.
- City markers use approximate city-centre coordinates, not precise office locations.

`scripts/build-india-map.mjs` parses the source polygons, projects longitude/latitude into a 500 × 510 SVG viewBox (equirectangular, cosine correction at 22° N), and simplifies boundaries to a 0.5 SVG-unit tolerance. It writes the small offline asset `src/content/india-map.json`. All 36 state/UT records are retained. This is a simplified location graphic, not a navigation or legal boundary map.

To regenerate, download the three named files from the raw links in the repository into `references/maps`, then run `node scripts/build-india-map.mjs`. Raw source files are intentionally not bundled in the application.

Source SHA-256:

| File | SHA-256 |
| --- | --- |
| Admin2.dbf | `4ec2f9b83263c85781bc9abf0d281d441b5e02377be124bda6b5d87bd9dc4ccd` |
| Admin2.shp | `b61ebc11a7487ce1c340d55fc9d0c1a2b63af1f73191fef691c11693c726130d` |
| india-soi.geojson | `e5321e2010d060c0bffa3b51a1e691af8fbf6063b848c02c123d61d4084cf820` |
