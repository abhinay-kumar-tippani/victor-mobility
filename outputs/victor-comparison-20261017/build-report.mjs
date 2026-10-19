import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require = createRequire('C:/Users/tippa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { Workbook, SpreadsheetFile } = await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const out = 'D:/victor website/outputs/victor-comparison-20261017';
const base = 'https://victor-mobility.vercel.app';
const old = 'https://victorluxurylimousine.com/';
const absent = 'Not found in the accessible old pages reviewed.';
// Observation inventory: live browser review on 17 October 2026.
const records = [
['Language options', absent, 'English, Hindi and Telugu options in the language menu.', 'Lets visitors choose a familiar language.', 'Addition', '/india'],
['Service showcase', 'A single line names broad transport services.', 'Rotating hero with six service slides, service links and requirement actions.', 'Gives each service a clear entry point.', 'Enhancement', '/india'],
['Service catalogue', 'Employee, event, luxury and airport transport are named without accessible detail pages.', 'Six service cards with description, detail-page links and quote links. Bus & Shuttle and Rent-A-Car are explicitly listed.', 'Helps visitors find the relevant service and next step.', 'Enhancement', '/india#services'],
['Interactive fleet categories', absent, 'Tabbed fleet display for Sedans, MPVs & Groups, Buses & Shuttles and Luxury.', 'Supports vehicle-category comparison.', 'Addition', '/india#fleet'],
['Vehicle planning information', absent, 'Fleet panel shows passenger and luggage guidance, use cases and vehicle references.', 'Helps customers describe a suitable vehicle requirement.', 'Addition', '/india#fleet'],
['Sample pricing display', absent, 'Sample starting-price panel with an illustrative-pricing notice. Final terms and availability require a quotation.', 'Gives preliminary context without confirming a booking or rate.', 'Addition', '/india#fleet'],
['Structured enquiry form', absent, 'Contact form collects name, company, service, city, passenger count, date and requirement details.', 'Organises the information needed for a transport discussion.', 'Addition', '/india/contact'],
['WhatsApp draft preview', absent, 'Live message-preview area, Copy message draft control and Continue on WhatsApp action.', 'Lets visitors review the enquiry before sending it themselves.', 'Addition', '/india/contact'],
['Context-specific enquiry links', absent, 'Service, fleet-category and city enquiry links carry the selected context in their destination URL.', 'Provides a more relevant entry into the enquiry journey.', 'Addition', '/india'],
['Journey estimator', absent, 'Planning interface asks for passengers, seats, distance, days, return trip and optional user-entered rate.', 'Offers vehicle-count, distance and optional budget planning. Calculation results were not tested.', 'Addition', '/india/estimator'],
['City search and presence map', 'The accessible old site lists a Hyderabad address.', 'Interactive India map, search field, ten-city selector and selected-city information panel.', 'Helps visitors explore listed locations and enquire by city.', 'Addition', '/india#network'],
['Office details and directions', 'Hyderabad address appears in the old contact panel.', 'Contact page lists Hyderabad, Bengaluru and Pune addresses with map and directions links.', 'Makes the published office information easier to locate.', 'Enhancement', '/india/contact'],
['Company journey roadmap', absent, 'Milestones from 2009 to 2024, an illustrated roadmap, enlarge controls and a company-story link.', 'Presents the company history in a structured section.', 'Addition', '/india#journey'],
['Leadership profiles', absent, 'Founder Jahangir profile and Mujeeb Ur Rahman Mohammed business-development contact section.', 'Shows who leads the business and whom to contact.', 'Addition', '/india#about'],
['Safety information section', absent, 'Sections describe driver verification, women-passenger safety, defensive driving and pre-trip checks.', 'Explains the safety practices claimed by the website.', 'Addition', '/india#safety'],
['Client and company overview', absent, 'Client-logo section and headline company statistics appear on the India homepage.', 'Provides a visible company overview. Claims were recorded, not independently validated.', 'Addition', '/india#clients'],
['Frequently asked questions', absent, 'Expandable questions cover transport types, listed cities, quotes and booking confirmation.', 'Answers common questions before an enquiry.', 'Addition', '/india#questions'],
['Fleet-partner enquiry', absent, 'Dedicated fleet-partnership section links to a WhatsApp draft requesting city, vehicle categories and fleet size.', 'Creates a separate enquiry path for vehicle owners.', 'Addition', '/india#partners'],
['Enquiry and imagery notices', absent, 'Explains that WhatsApp opens a draft rather than an automated booking. Vehicle imagery is labelled illustrative.', 'Sets clearer expectations about enquiries and images.', 'Addition', '/india/contact'],
['Country navigation repair', 'India and UAE both point to /UAE, which showed a 404 page. GO links point to #.', 'Country landing page has separate /india and /uae links. The India destination was verified to load.', 'Provides a usable India entry. UAE page content was not inspected.', 'Enhancement', '/'],
];
const wb = Workbook.create();
const main = wb.worksheets.add('Website additions');
const scope = wb.worksheets.add('Review scope');
const widths = [7,29,42,61,49,18,57];
function init(s, end, w=widths){
 s.showGridLines=false;
 s.getRange(`A1:G${end}`).format.font={name:'Arial',size:11,color:'#15162F'};
 s.getRange(`A1:G${end}`).format.verticalAlignment='top';
 w.forEach((v,i)=>s.getRange(`${String.fromCharCode(65+i)}1:${String.fromCharCode(65+i)}${end}`).format.columnWidth=v);
}
function heading(s,cell,text){s.getRange(cell).values=[[text]];s.getRange(cell).format.font={name:'Arial',size:16,bold:true,color:'#31326F'};s.getRange(cell).format.rowHeight=28;}
function table(s,range,name){const t=s.tables.add(range,true,name);t.showFilterButton=true;const row=Number(range.match(/\d+/)[0]);s.getRange(`A${row}:G${row}`).format={fill:'#31326F',font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:30,verticalAlignment:'center',horizontalAlignment:'center'};}
init(main,28); main.tabColor='#31326F';
heading(main,'B2','Victor website additions report');
main.getRange('B3').values=[['Reviewed 17 October 2026. Comparison of the currently accessible live websites.']];
main.getRange('B4').values=[['“Addition” means not found in the old pages reviewed. It does not establish historical absence.']];
main.getRange('B5').values=[['See Review scope for the old-site access limitation, retained features and verification boundaries.']];
main.getRange('B3:G5').format.rowHeight=22;
main.getRange('B3:G5').format.font={name:'Arial',size:11,italic:true,color:'#55566A'};
main.getRange('A7:G7').values=[['No.','Feature / section','Old website observed','New website added or changed','Customer / business value','Change type','New website reference']];
main.getRange('A8:G27').values=records.map((r,i)=>[i+1,r[0],r[1],r[2],r[3],r[4],base+r[5]]);
table(main,'A7:G27','WebsiteComparison');
main.getRange('A8:G27').format.wrapText=true;
main.getRange('A8:G27').format.rowHeight=60;
main.getRange('B8:B27').format.font.bold=true;
main.getRange('G8:G27').format.font.color='#2D5090';
for(let r=8;r<=27;r++){ if(r%2===0) main.getRange(`A${r}:G${r}`).format.fill='#F3F3F8'; }
main.freezePanes.freezeRows(7);
main.getRange('F8:F27').conditionalFormats.add('containsText',{text:'Enhancement',format:{fill:'#EEE9F7',font:{color:'#594482'}}});
init(scope,32,[7,30,80,55,20,15,15]); scope.tabColor='#2D5090';
heading(scope,'B2','Review scope and existing features');
scope.getRange('B4').values=[['Comparison basis']];
scope.getRange('B4').format.font.bold=true;
const notes=[
['Review date','17 October 2026 (India time).'],
['New website',base+'/'],
['Old website',old],
['Old pages inspected','Homepage and its linked /UAE destination. Both country links target /UAE, which displayed a 404 page.'],
['Scope limitation','No archive or complete historical version was supplied. Absence means not found in the accessible old pages reviewed.'],
['New pages inspected','Country landing page, India homepage, contact page and journey estimator. Language choices were inspected.'],
['Verification level','Visible content and link targets reviewed. Forms were not submitted. Estimator arithmetic and all linked pages were not tested.'],
['Claims and availability','Statistics, client names, office labels, safety statements and sample prices are website content, not independently verified business facts.'],
['Additional visible links','RFP Desk, Privacy Notice and Plan your journey control were observed. Their detailed behaviour was not inspected and is not counted as an addition.'],
['Responsibility','This report records website differences. It does not assign authorship to a particular tool or contributor.']
];
notes.forEach((n,i)=>{const r=i+5;scope.getRange(`B${r}`).values=[[n[0]]];scope.getRange(`C${r}`).values=[[n[1]]];scope.getRange(`B${r}`).format.font.bold=true;scope.getRange(`B${r}:G${r}`).format.rowHeight=28;});
scope.getRange('C5:C14').format.wrapText=true;
scope.getRange('B5:C14').format.rowHeight=56;
heading(scope,'B17','Already present or excluded from new-feature claims');
scope.getRange('B19:D19').values=[['Existing item','Old website evidence','How treated in this report']];
scope.getRange('B20:D23').values=[
['Country selection','India and UAE choices already appeared on the landing page.','Counted as a navigation improvement, not a new concept.'],
['Core service names','Employee, event, luxury and airport transportation were named.','Expanded service presentation is an enhancement.'],
['Operations phone number','+91 91007 77768 appeared on the old site.','Existing contact number, not a newly added business detail.'],
['Hyderabad address','The Gachibowli office address appeared in the old contact panel.','Retained information. Additional published office details and map links are improvements.']
];
scope.getRange('B19:D19').format={fill:'#31326F',font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:30};
scope.getRange('B20:D23').format.wrapText=true;scope.getRange('B20:D23').format.rowHeight=56;
heading(scope,'B26','Report counts');
scope.getRange('B28:B30').values=[['Additions observed'],['Enhancements observed'],['Total report entries']];
scope.getRange('C28:C30').formulas=[['=COUNTIFS(\'Website additions\'!F8:F27,"Addition")'],['=COUNTIFS(\'Website additions\'!F8:F27,"Enhancement")'],['=SUM(C28:C29)']];
scope.getRange('C28:C30').setNumberFormat('0');
wb.recalculate();
console.log((await wb.inspect({kind:'region',sheetId:'Review scope',range:'B28:C30',maxChars:1000,tableMaxRows:3})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#NUM!',options:{useRegex:true,maxResults:10},maxChars:1000})).ndjson);
for(const [sheetName,range,file] of [['Website additions','A1:G14','comparison-preview.png'],['Review scope','B2:D14','scope-preview.png']]){
 const preview=await wb.render({sheetName,range,scale:1,format:'png'});await fs.writeFile(`${out}/${file}`,new Uint8Array(await preview.arrayBuffer()));
}
await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/Victor_Website_Additions_Report.xlsx`);
console.log('Saved Victor_Website_Additions_Report.xlsx');
