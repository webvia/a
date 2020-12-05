const win = window; const doc = win.document; const body = doc.body; const head = doc.head; const style = head.querySelector('#style'); var css=''; var htm='';  // page objs
var txt=''; var dat=[]; var srt=[]; var dat0=[]; var dat1=[]; var pctof=[]; var pctchg=[]; var pcttot=[]; var multicol; // data cols
var calcs=[]; var cnts=[]; var tots=[]; var avgs=[]; var meds=[]; var maxs=[]; var mins=[]; var rngs=[]; var mods=[]; var frqs=[]; // summary calcs
var dat0tot;
const clbls = [ 'Value 1','Value 2','% Change','% 2 of 1','% of Total' ]; const arws = [ '&#x21C5;','&#x25BC;','&#x25B2;' ];  // arws: [0]up/dn:x039E | [1]dn/des:x25B4 | [2]up/asc:x25BE
const rlbls = [ 'Count','Total','Average','Median','Maximum','Minimum','Range','Mode Item','Mode Count' ];

// Events ==============================================================================================================
doc.onselectionchange = function() { let sel = win.getSelection().toString(); if (sel !='') { navigator.clipboard.writeText(sel) } } // copy selection
win.onload = function() { navigator.clipboard.readText().then(clp => { txt = clp; Load() }) }
//win.onload = function() { Load() }

// Load ================================================================================================================
function Load() {  // if (!HasVal(txt)) { body.insertAdjacentHTML('beforeend', 'no data.'); return }; // check for empty
//txt = '2\n3\n1';
//txt = '13.85\t2.48';
//txt = '7\t-0.5\n9\t1.5\n8\t4\n8\t6';

dat = txt.replace(/(^\n)|(\n$)|([^\n\t0-9.-])/g,'').split('\n'); // remove leading/trailing lines, everything but numbers
if (dat[0].includes('\t')) { for (let i = 0, l = dat.length; i < l; i++) { dat[i] = dat[i].split('\t').map(Number) } } else { let dat_a = []; for (let i = 0, l = dat.length; i < l; i++) { let dat_a_i = []; dat_a_i.push(Number(dat[i])); dat_a.push(dat_a_i) } dat = dat_a } // make dat an array of nums
if (dat[0].length > 1) { multicol = true }
for (let i = 0, l = dat.length; i < l; i++) { // columns
let dati0 = dat[i][0]; dat0.push(dati0);
if (multicol) {
let dati1 = dat[i][1]; dat1.push(dati1);
let pctchgi = PctChg(dati0,dati1); dat[i].push(pctchgi); pctchg.push(pctchgi);
let pctofi = PctOf(dati0,dati1); dat[i].push(pctofi); pctof.push(pctofi);
} // end if
} // end for
Calc(dat0);  if (dat[0].length > 1) { Calc(dat1); Calc(pctchg); Calc(pctof) }  // calcs
dat0tot = tots[0]; for (let i = 0, l = dat0.length; i < l; i++) { let dat0i = dat0[i]; let pcttoti = PctTot(dat0i); dat[i].push(pcttoti); pcttot.push(pcttoti); } // percent of total
if (dat[0].length > 1) { Calc(pcttot) }  // calcs

// css -----------------------------------------------------------------------------------------------------------------
css += '\
body { margin: 1em 0 ; padding: 0 ; color: #FFFFFF ; background-color: #121212 ; font-size: 1.2em }\
b,i,s,u { font-style: normal ; text-decoration: none }  /* b:button = i:icon + s:string/span -- u:unselectable? */\
i { color: #FF80FF ; user-select: none ; cursor: pointer }  i:hover { color: #80FF80 }  i#copy { float: left }  s { cursor: default }\
table { margin: 0 auto ; border-collapse: collapse }\
td { min-width: 8em ; padding: .1em .5em ; border-left: 1px solid #666666 ; border-right: 1px solid #666666 ; font-family: monospace ; text-align: right ; white-space: nowrap }\
tr.ch > td { color: #80FFFF ; font-weight: bold ; background-color: #333333 }\
tr.ch.sort > td:not(:first-child) { cursor: pointer }  tr.ch.sort > td:not([onclick$=",1)"]) > i { color: #80FF80 }\
tr.ch > td:first-child s { color: #FF80FF }\
td.rh { color: #80FFFF ; background-color: #222222 }  td.rh > s:after { content: " \\25B8" ; color: #AAAAAA }\
tr:hover { background-color: #222222 }\
'; // end css
style.insertAdjacentHTML('beforeend', css);  css = doc.styleSheets[0].cssRules;
Cont(0,0); // (col,dir)
} // end Load

// Cont ================================================================================================================
function Cont(col,dir) {
// calc ----------------------------------------------------------------------------------------------------------------
htm = '';
htm += '<table><tbody>';
htm += '<tr class="ch"><td><i id="copy" title="Copy Table" onclick="Copy()">&#x29C9;</i><s>Calcs</s></td>';  for (let i = 0, l = dat[0].length; i < l; i++) { htm += '<td><s>' + clbls[i] + '</s></td>' }  htm += '</tr>';  // calc col heads
htm += '<tr><td class="rh"><s>' + rlbls[0] +'</s></td><td>' + cnts.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[1] +'</s></td><td>' + tots.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[2] +'</s></td><td>' + avgs.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[3] +'</s></td><td>' + meds.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[4] +'</s></td><td>' + maxs.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[5] +'</s></td><td>' + mins.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[6] +'</s></td><td>' + rngs.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[7] +'</s></td><td>' + mods.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh"><s>' + rlbls[8] +'</s></td><td>' + frqs.join('</td><td>') + '</td></tr>';
htm += '<tr><td class="rh">&nbsp;</td>';  for (let i = 0, l = dat[0].length; i < l; i++) { htm += '<td>&nbsp;</td>' }  htm += '</tr>';  // blank separator row
// sort ----------------------------------------------------------------------------------------------------------------
htm += '<tr class="ch sort"><td><s>Data</s></td>';
for (let i = 1, l = dat[0].length; i < l+1; i++) {
var coli = i;
let lbli = clbls[i-1];
if (col == 0 || col != i) { var diri = 1 ; var arwi = arws[0] }  else if (col == i && dir == 1) { var diri = 2 ; var arwi = arws[1] }  else if (col == i && dir == 2) { coli = 0 ; var diri = 0 ; var arwi = arws[2] }  // dirs: 0=none,1=asc,2=dec
htm += '<td title="Sort Column" onclick="Cont(' + coli + ',' + diri + ')">' + lbli + ' <i>' + arwi + '</i></td>';
} // end for
htm += '</tr>';
// data ----------------------------------------------------------------------------------------------------------------
srt = dat.slice(0);  if (dir==0) { }  else if (dir==1) { srt.sort((a, b) => b[col-1] - a[col-1]) }  else if (dir==2) { srt.sort((a, b) => a[col-1] - b[col-1]) }  // sort data rows
for (let i = 0, l = srt.length; i < l; i++) { htm += '<tr><td class="rh"><s>'+(i+1)+'</s></td>';  for (let j = 0, jl = dat[0].length; j < jl; j++) { htm += '<td>'+srt[i][j]+'</td>' }  htm += '</tr>' }
htm += '<tr class="ch"><td></td>';  for (let i = 0, l = dat[0].length; i < l; i++) { htm += '<td></td>' }  htm += '</tr>';  // blank bottom row
htm += '</tbody></table>';
body.innerHTML = ''; body.insertAdjacentHTML('beforeend', htm);
} // end Cont

// Calc ================================================================================================================
function Calc(col) {
let col_srt = col.slice(0); col_srt.sort((a, b) => a - b);
let cnt = col.length;
let sum = col.reduce((a, b) => a + b, 0);
let avg = sum/cnt;
let med = (col_srt[(cnt - 1) >> 1] + col_srt[cnt >> 1]) / 2;
let max = col_srt[cnt-1];
let min = col_srt[0];
let rng = max-min;
let mod; let frq; const map = new Map(); let maxFreq = 0; let mode; for(const item of col) { let freq = map.has(item) ? map.get(item) : 0; freq++; if(freq > maxFreq) { maxFreq = freq; mode = item; } map.set(item, freq); } if(maxFreq > 1) { mod=Round(mode); frq=maxFreq; } else { mod='-'; frq='-'; };
sum = Round(sum); avg = Round(avg); med = Round(med); max = Round(max); min = Round(min); rng = Round(rng);
cnts.push(cnt); tots.push(sum); avgs.push(avg); meds.push(med); maxs.push(max); mins.push(min); rngs.push(rng); mods.push(mod); frqs.push(frq);
} // end Calc

// Cols ================================================================================================================
function Round (n) { return Number(Math.round(n + 'e+2') + 'e-2') }
function PctOf (n1, n2) { return Round((n2 / n1) * 100) }
function PctChg (n1, n2) { return Round(((n2 - n1) / n1) * 100) }
function PctTot(dat0i) { return Round((dat0i / dat0tot) * 100) }

// Copy ================================================================================================================
function Copy() {
let copy = '';
copy += 'Calcs';  for (let i = 0, l = srt[0].length; i < l; i++) { copy += '\t' + clbls[i] }  // calc col heads
copy += '\n' + rlbls[0] + '\t' + cnts.join('\t');
copy += '\n' + rlbls[1] + '\t' + tots.join('\t');
copy += '\n' + rlbls[2] + '\t' + avgs.join('\t');
copy += '\n' + rlbls[3] + '\t' + meds.join('\t');
copy += '\n' + rlbls[4] + '\t' + maxs.join('\t');
copy += '\n' + rlbls[5] + '\t' + mins.join('\t');
copy += '\n' + rlbls[6] + '\t' + rngs.join('\t');
copy += '\n' + rlbls[7] + '\t' + mods.join('\t');
copy += '\n' + rlbls[8] + '\t' + frqs.join('\t');
copy += '\nData';  for (let i = 0, l = srt[0].length; i < l; i++) { copy += '\t' + clbls[i] }  // calc col heads
copy += '\n\t' + srt.map(function(d) { return d.join('\t') }).join('\n\t'); // dat array to text table
navigator.clipboard.writeText(copy);
} // end Copy

// misc ================================================================================================================
function L (vlu) { console.log(vlu) }  function LV (lbl,vlu) { console.log(lbl + ': ' + vlu) }
function HasVal (vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj (vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }

/* notes ===============================================================================================================
2-Col Calcs:  var(variance from average), sum, dif, running total,
ratio: =B4/GCD(B4,C4)&":"&C4/GCD(B4,C4)
------------------------------------------------------------------------------------------------------------------------
Stuff:

----------------------------------------------------------------------------------------------------------------------*/