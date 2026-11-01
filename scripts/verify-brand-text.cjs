// Exercise actual React output without adding a test framework dependency.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = fs.readFileSync('src/components/brand/BrandText.tsx', 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exportsObject = {};
new Function('require', 'exports', js)(require, exportsObject);
const BrandText = exportsObject.default;
const h = React.createElement;
const render = children => renderToStaticMarkup(h(BrandText, null, children));
const count = html => (html.match(/class="victor-wordmark"/g) || []).length;
for (const name of ['Victor Mobility Pvt. Ltd.', 'VICTOR MOBILITY PVT LTD', 'victor mobility pvt. ltd', 'Victor Mobility Pvt., Ltd.', 'Victor Mobility (Pvt.) Ltd.', 'VICTOR MOBILITY P.V.T. L.T.D.']) {
  assert.equal(render(name), name);
  assert.equal(count(render([name, ' — Why choose Victor?'])), 1);
}
const splitName = ['Victor', h('strong', { key: 'mobility' }, ' Mobility'), h('span', { key: 'pvt' }, ' Pvt.'), ' Ltd.'];
assert.equal(count(render(splitName)), 0);
assert.equal(count(render([...splitName, ' and Victor.'])), 1);
assert.equal(count(render(['Victor', h('br', {key:'break'}), 'Mobility Pvt. Ltd.'])), 0);
assert.equal(count(render([false, 'Why Choose Victor?'])), 1);
assert.equal(count(render(h(React.Fragment, null, 'Journey of ', h('em', null, 'Victor')))), 1);
assert.equal(count(render('VICTOR, Victor’s and Victor!')), 3);
assert.equal(count(render('Victorious victor_id jvictorgroup.com https://victor.example/path hello@victor.com victor.png')), 0);
const attributed = render(h('a', { href: '/Victor', 'aria-label': 'Contact Victor', title: 'Victor' }, 'Contact Victor'));
assert.match(attributed, /href="\/Victor"/);
assert.match(attributed, /aria-label="Contact Victor"/);
assert.match(attributed, /title="Victor"/);
assert.equal(count(attributed), 1);
assert.equal((attributed.match(/class="sr-only">Victor</g) || []).length, 1);
assert.match(attributed, /aria-hidden="true"/);
assert.equal(render(h('span', { className: 'sr-only' }, 'Victor')), '<span class="sr-only">Victor</span>');
assert.equal(count(render(h('code', null, 'Victor'))), 0);
console.log('PASS: company variants and split names, punctuation, mixed copy, hidden labels, URLs, file names, one accessible word per logo.');
