var win = window; var his = win.history; var loc = win.location; var doc = win.document; var doc_head = doc.head; var doc_body = doc.body; // win,his,loc,doc
var u_loc; var u_par; var u_def; var u_path_page; var u_path_pre; var u_path; var u_page_item; var u_page; var u_item; // location
var def; var pagesets; var pages; var contents; var site; var home; // definition
var page; var page_id; var page_path; var page_style; var page_title; var page_description; var page_icon; var page_data; var page_pageset; var page_main; // page
var xhrs=[]; var xrt; var html; var head_html; var page_item; var item_x; var cont_html; var cont_match; var cont_ref; // cont,item
var rep_x; var rep_d; var rep_match; var rep_html_rep; var rep_table_id; var rep_item_id; var rep_file_ref; var rep_ref; var rep_html; // rep

var e_body = doc_body.querySelector('#e_body');
var e_svc_script = doc_body.querySelector('script[data-site]'); if ( e_svc_script !== undefined && e_svc_script !== null ) { var e_def = e_svc_script.dataset['site'] };

var head_html = '<title id="e-_title"></title><base href="" target=""/><link id="e-_icon" rel="shortcut icon" href=""/><meta id="e-_desc" name="description" content=""/><meta name="viewport" content="width=device-width, initial-scale=1"><link id="e-_svc_style" rel="stylesheet" href="https://webvia.github.io/a/main.css"/><style id="e-_site_style"></style><style id="e-_pageset_style"></style><style id="e-_page_style"></style>';
doc_head.insertAdjacentHTML('afterbegin', head_html);
var e_site_style = doc_head.querySelector('style#e-_site_style'); var e_pageset_style = doc_head.querySelector('style#e-_pageset_style'); var e_page_style = doc_head.querySelector('style#e-_page_style'); var e_title = doc_head.querySelector('title#e-_title'); var e_description = doc_head.querySelector('meta#e-_desc'); var e_icon = doc_head.querySelector('link#e-_icon');

win.onload = function() { Load() }; win.onpopstate = function() { Load() }; //win.addEventListener('popstate', Load, false);
// Load -------------------------------------------------------------------------------------------------------------
function Load() {
u_loc = new URL(loc); u_par = u_loc.searchParams; u_path = u_par.get('page'); u_def = u_par.get('site');
if ( HasVal(u_def) ) { var def_ref = u_def } else if ( HasVal(e_def) ) { var def_ref = e_def } else { return }; 
if (def == undefined) { DataGet('def', def_ref) } else { Page() }
}
// Link -------------------------------------------------------------------------------------------------------------
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// DataGet ----------------------------------------------------------------------------------------------------------
function DataGet(type, url) {
//if (xhrs.includes(url)) { if (type == '') { return } else if (type == 'def') { Def() } else if (type == 'cont') { Conts('rem') } else if (type == 'rep') { Reps('rem') } else if (type == 'item') { Item('resp') }; return; } else { xhrs.push(url); };
var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { xrt = xhr.responseText; if (type == '') { return } else if (type == 'def') { Def() } else if (type == 'cont') { Conts('rem') } else if (type == 'rep') { Reps('rem') } else if (type == 'item') { Item('resp') } } }
}
// DataParse --------------------------------------------------------------------------------------------------------
function DataParse() {
var tables = xrt.replace(/\r\n\r\n\r\n\r\n/g,'\r\n\r\n\r\n').replace(/\r\n\r\n\r\n/g,'\r\n\r\n').replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').replace(/\",\"/g,'\t').replace(/"/g,'\\"').split('\r\n\r\n'); var a_tables = [];
var tables_len = tables.length; for (var i1 = 0; i1 < tables_len; i1++) { var tables_i = tables[i1];
 var table = tables_i.split('\r\n'); var props = table[0].split('\t'); var t_name = props[0];
 var items = table.slice(1); var a_items = [];
 var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2];
  var vals = items_i.split('\t'); var a_vals = [];
  var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3];
   a_vals.push('"' + props[i3] + '":"' + vals[i3] + '"') }
  a_items.push('"' + vals[0] + '":{' + a_vals.join(',') + '}') }
 a_tables.push('"' + t_name + '":{' + a_items.join(',') + '}') }
xrt = JSON.parse('{' + a_tables.join(',') + '}');
}
// Def --------------------------------------------------------------------------------------------------------------
function Def() {
DataParse();
 Log('def',xrt);
def = xrt; pagesets = def.pageset; pages = def.page; contents = def.content; site = pagesets['site']; home = pages['home'];
Page();
}
// Page -------------------------------------------------------------------------------------------------------------
function Page() {
u_page = ''; u_item = ''; u_path_pre = ''; e_body.innerHTML = ''; // reset vars

var pageset; var pageset_style; var pageset_header; var pageset_footer; var pageset_top; var pageset_bottom; var pageset_left; var pageset_right; // pageset vars

if ( HasVal(u_path) ) { var u_path_a = u_path.split('..'); var u_path_l = u_path_a[u_path_a.length-1]; var u_path_l_a = u_path_l.split('~'); 
 if (u_path_l_a.length > 1) { u_page = u_path_l_a[0]; u_item = u_path_l_a[1]; u_page_item = u_page + '~' + u_item } else { u_page = u_path_l_a[0]; u_item = ''; u_page_item = u_page }
 if (u_path_a.length > 1) { u_path_pre = u_path_a.slice(0,u_path_a.length-1); }
}

if ( HasVal(u_page) ) { page = pages[u_page] } else { page = home }; // page obj

page_id = page.page; page_path = page.path; page_style = page.style; page_data = page.data; page_pageset = page.pageset; page_main = page.main; // page props
if(page.title !== '') { page_title = page.title } else { page_title = home.title }; if(page.icon !== '') { page_icon = page.icon } else { page_icon = home.icon }; if(page.description !== '') { page_description = page.description } else { page_description = home.description }; // use page or home props

if ( HasVal(page_pageset) ) { pageset = pagesets[page_pageset]; pageset_style = pageset.style; 
 if ( HasVal(pageset.header) ) { pageset_header = pageset.header } else { pageset_header = site.header }; if ( HasVal(pageset.footer) ) { pageset_footer = pageset.footer } else { pageset_footer = site.footer }; if ( HasVal(pageset.left) ) { pageset_left = pageset.left } else { pageset_left = site.left }; if ( HasVal(pageset.right) ) { pageset_right = pageset.right } else { pageset_right = site.right }; if ( HasVal(pageset.top) ) { pageset_top = pageset.top } else { pageset_top = site.top }; if ( HasVal(pageset.bottom) ) { pageset_bottom = pageset.bottom } else { pageset_bottom = site.bottom }; 
}
else { pageset_header = site.header; pageset_footer = site.footer; pageset_left = site.left; pageset_right = site.right; pageset_top = site.top; pageset_bottom = site.bottom; }; // pageset obj,props
// head
e_site_style.textContent = site.style; e_pageset_style.textContent = pageset_style; e_page_style.textContent = page_style; e_title.textContent = page_title; e_description.content = page_description; e_icon.href = page_icon;
// html(body(header,middle(left,center(top,main,bottom),right),footer))
html = '<header id="e-_header">'+ pageset_header +'</header><div id="e-_middle"><div id="e-_center"><div id="e-_top">'+ pageset_top +'</div><main id="e-_main">'+ page_main +'</main><div id="e-_bottom">'+ pageset_bottom +'</div></div "e-_center"><div id="e-_left">'+ pageset_left +'</div><div id="e-_right">'+ pageset_right +'</div></div "e-_middle"><footer id="e-_footer">'+ pageset_footer +'</footer><noscript><p>To use this site, please enable Javascript in your browser settings. <a href="https://enable-javascript.com" target="_blank">More Info</a></p></noscript>';
Conts('');
}
// Conts ------------------------------------------------------------------------------------------------------------
function Conts(resp) {
if (resp!=='') {
var cont_elem_id = '';
if (cont_ref.includes('#')) { cont_elem_id = cont_ref.split('#')[1]; cont_ref = cont_ref.split('#')[0]; }

//if cont_ref starts with 'nav_', loop nav table. if id contains'..'
//'<nav id="nav_main" role="navigation"><ul>'++'</ul></nav "main_nav">'
//'<li><a data-p="'+ target +'">'+ name +'</a></li>'
if (resp==='rem') { cont_html = xrt } else if (resp==='loc') { cont_html = contents[cont_ref].content }
cont_html = cont_html.replace(/\r\n/g, '');
if (cont_elem_id !== '') { var cont_regexp = new RegExp('\\<\\w+? id\\=\\"' + cont_elem_id + '\\".+? \\"' + cont_elem_id + '\\"\\>', 'g');  cont_html = cont_html.match(cont_regexp)[0] } // <... id="{id}"....."{id}">
html = html.replace(cont_match, cont_html);
Embeds();
} // end if resp ---------------------------------
var cont_matches = html.match(/\(\`[\@\~].+?\)/g); // (`@html_file) or () or (`~cont_id)
if (cont_matches !== null) { 
cont_match = cont_matches[0]; cont_ref = cont_match.substring(3, cont_match.length-1);
if (cont_match.startsWith('(`@')) { DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`~')) { Conts('loc') }
} // end if
else { Reps('') }
}
// Embeds -----------------------------------------------------------------------------------------------------------
function Embeds() {
var embds = html.match(/<\!DOCTYPE html>.+?<\/html>/g); if (embds !== null) { 
var embds_len = embds.length; for (var i = 0; i < embds_len; i++) { var embd = embds[i];
var gdoc_cont = embd.match(/<div id\=\"contents\">.+?<\/div>/g);
html = html.replace(embd, gdoc_cont);
} } // end for if
}
// Reps -------------------------------------------------------------------------------------------------------------
function Reps(resp) {
if (resp !== '') {
if (resp === 'rem') { DataParse(); rep_d = xrt[rep_table_id]; if (rep_d !== undefined && rep_item_id !=='') { rep_d = [rep_d[rep_item_id]] } } else if (resp === 'loc') { rep_d = def[rep_table_id]; if (rep_d !== undefined && rep_item_id !=='') { rep_d = [rep_d[rep_item_id]] } }
for (var x in rep_d) {
item_x = rep_d[x]; rep_x = rep_html;
Props('rep'); // Props
rep_html_rep = rep_html_rep + rep_x;
} // end items for-in
html = html.replace(rep_match, rep_html_rep);
} // end if resp ------------------------------------
var rep_matches = html.match(/\(\`\([\@\#].+?\`\)/g); // (`(@txt_file#table_id)...`) or (`(#table_id)...`)
if (rep_matches !== null) { rep_match = rep_matches[0]; rep_ref = rep_match.substring(4, rep_match.indexOf(')')); rep_html = rep_match.substring(4 + rep_ref.length + 1, rep_match.length-2); rep_html_rep = ''; if (rep_ref.includes('~')) { rep_item_id = rep_ref.substring(rep_ref.indexOf('~')+1, rep_ref.length) } else { rep_item_id = '' }; // ~rep_item_id
if (rep_match.startsWith('(`(@')) { rep_table_id = rep_ref.substring(rep_ref.indexOf('#')+1, rep_ref.length - rep_item_id.length); DataGet('rep', rep_ref) } 
else if (rep_match.startsWith('(`(#')) { rep_table_id = rep_ref.substring(0, rep_ref.length - rep_item_id.length); Reps('loc') }; // #rep_table_id
} // end if matches
else { Item() }
}
// Item -------------------------------------------------------------------------------------------------------------
function Item(resp) {
if (resp=='resp') {
DataParse();
var item_table_id = page_data.substring(page_data.indexOf('#') + 1); var page_item_table = xrt[item_table_id];
item_x = page_item_table[u_item];
Props('page'); Html(); return;
} // end if resp
else if (resp!=='resp' && page_data.startsWith('@')) { 
DataGet('item', page_data.substring(1).replace('(`$id)', u_item)) }
else { Html() }
}
// Props ------------------------------------------------------------------------------------------------------------
function Props(type) {
if (type=='rep') { var props = rep_x.match(/\(\`\$.+?\)/g) } else { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type=='rep') { rep_x = rep_x.replace(props_i, item_x[prop]) } else { html = html.replace(props_i, item_x[prop]) }
} } // end for, end if
}
// Html -------------------------------------------------------------------------------------------------------------
function Html() {
e_body.insertAdjacentHTML('afterbegin', html);

// links --------------------------------------------
var lnks = e_body.getElementsByTagName('a'); var lnks_len = lnks.length; for (var i1 = 0; i1 < lnks_len; i1++) { 
var lnk = lnks[i1];
var lnk_p = lnk.dataset['p'];
if (HasVal(lnk_p)) {
var lnk_h = new URL(loc);
if (lnk_p == 'home') { lnk_h.searchParams.delete('page') } 
else { 
if (HasVal(u_path)) { 
var lnk_path = u_path + '..' + lnk_p;
var lnk_path_a = lnk_path.split('..');
lnk_path_a = lnk_path_a.slice(0,lnk_path_a.indexOf(lnk_p)+1); // remove anything past first instance of lnk_p

//if path page before target has same parent or no parent as target page, remove previous path

lnk_path = lnk_path_a.join('..');
lnk_h.searchParams.set('page', lnk_path);
} // end if u_path not null
else { 
lnk_h.searchParams.set('page', lnk_p) }
// get url path param to set attribute for nav-level styling
if (u_path !== null) {
if (u_path_pre.includes(lnk_p)) { lnk.setAttribute('data-inpath','true'); }
if (u_page_item == lnk_p) { lnk.setAttribute('data-ispage','true'); lnk.setAttribute('aria-selected','true'); lnk.setAttribute('aria-current','page'); }
} // end if path not null
} // end else if not home
lnk.href = lnk_h;
lnk.addEventListener('click', Link, false);
} // end if lnk_p not null
else { lnk.target = '_blank' }
} // end for links
//console.log('> DONE ');
} // end Html

// misc ---------------------------------------------------------------------------------------------------------------
function Log(lbl, vlu) { console.log('\r\n' + lbl + ': ' + JSON.stringify(vlu)) }
function HasVal(vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj(vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }
