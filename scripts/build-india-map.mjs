// Convert DataMeet's WGS84 boundary data into a small, offline SVG-path asset.
// Source files and licences: docs/map-attribution.md. No runtime map service.
import fs from 'node:fs';
import crypto from 'node:crypto';
const dir = process.argv[2] || 'references/maps';
const dbf = fs.readFileSync(`${dir}/Admin2.dbf`);
const shp = fs.readFileSync(`${dir}/Admin2.shp`);
const countryFile = fs.readFileSync(`${dir}/india-soi.geojson`);
const fields = [];
for (let p=32; dbf[p]!==13; p+=32) fields.push({name:dbf.toString('utf8',p,p+11).replace(/\0.*$/,''),length:dbf[p+16]});
const records = [];
for (let i=0;i<dbf.readUInt32LE(4);i++) {
  let p=dbf.readUInt16LE(8)+i*dbf.readUInt16LE(10)+1;
  const row={};
  for (const f of fields) {row[f.name]=dbf.toString('utf8',p,p+f.length).trim();p+=f.length;}
  records.push(row);
}
const shapes=[];
for(let p=100;p<shp.length;) {
  const length=shp.readUInt32BE(p+4)*2,start=p+8;
  if(shp.readInt32LE(start)!==5) throw new Error('Expected Polygon shapefile');
  const parts=shp.readInt32LE(start+36),count=shp.readInt32LE(start+40),pointsAt=start+44+parts*4;
  const rings=[];
  for(let i=0;i<parts;i++) {
    const from=shp.readInt32LE(start+44+i*4),to=i+1<parts?shp.readInt32LE(start+48+i*4):count;
    const ring=[];for(let j=from;j<to;j++)ring.push([shp.readDoubleLE(pointsAt+j*16),shp.readDoubleLE(pointsAt+j*16+8)]);
    rings.push(ring);
  }
  shapes.push(rings);p=start+length;
}
console.log('Boundary records:',records);
// Equirectangular projection centred on India, cosine-corrected at 22 degrees N.
const project=([lon,lat])=>[(lon-67)*15.2*Math.cos(22*Math.PI/180)+22,(37.5-lat)*15.2+18];
function simplify(points,tolerance=0.5) {
  if(points.length<3)return points;
  const [a,b]=[points[0],points.at(-1)];let max=0,index=0;
  for(let i=1;i<points.length-1;i++) {
    const p=points[i],dx=b[0]-a[0],dy=b[1]-a[1];
    const t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));
    const distance=Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);
    if(distance>max){max=distance;index=i;}
  }
  return max>tolerance?[...simplify(points.slice(0,index+1),tolerance).slice(0,-1),...simplify(points.slice(index),tolerance)]:[a,b];
}
const path=rings=>rings.map(r=>simplify(r.map(project))).filter(r=>r.length>3).map(r=>'M'+r.map(p=>p.map(v=>v.toFixed(1)).join(',')).join('L')+'Z').join('');
const geometry=JSON.parse(countryFile).features[0].geometry;
const countryRings=geometry.type==='MultiPolygon'?geometry.coordinates.flat():geometry.coordinates;
const states=records.map((record,index)=>({name:record.ST_NM,path:path(shapes[index])}));
const cities=[{name:'Hyderabad',state:'Telangana',lon:78.4867,lat:17.385},{name:'Bengaluru',state:'Karnataka',lon:77.5946,lat:12.9716},{name:'Pune',state:'Maharashtra',lon:73.8567,lat:18.5204}].map(c=>({...c,point:project([c.lon,c.lat]).map(v=>+v.toFixed(1))}));
const output={viewBox:'0 0 500 510',country:path(countryRings),states,cities};
fs.writeFileSync('src/content/india-map.json',JSON.stringify(output)+'\n');
for(const [name,b] of [['Admin2.dbf',dbf],['Admin2.shp',shp],['india-soi.geojson',countryFile]])console.log(name,crypto.createHash('sha256').update(b).digest('hex'));
console.log('Map asset bytes:',fs.statSync('src/content/india-map.json').size);
