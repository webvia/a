var win = window; var his = win.history; var loc = win.location; var doc = win.document; var doc_head = doc.head; var doc_body = doc.body; // win,his,loc,doc
var u_loc; var u_par; var u_def; var u_path; var u_page_item; var u_page; var u_item; // location url  u_path(u_path_pre__u_page_item(u_page--u_item))
var def; var pagesets; var pages; var contents; var site; var home; // definition
var pageset; var pageset_style; var pageset_header; var pageset_footer; var pageset_top; var pageset_bottom; var pageset_left; var pageset_right; // pageset
var page; var page_path; var page_style; var page_title; var page_description; var page_icon; var page_data; var page_pageset; var page_main; // page
var xrt; var html; var path_sep = '__'; var item_sep = '--'; var hier_sep = '``'; // misc

// Setup --------------------------------------------------------------------------------------------------------------
var e_main_script = doc_body.querySelector('script[data-site]'); if ( e_main_script !== undefined && e_main_script !== null ) { var e_def = e_main_script.dataset['site'] };
doc_head.insertAdjacentHTML('afterbegin', '<title id="e-_title"></title><link id="e-_icon" rel="shortcut icon" href=""/><meta id="e-_desc" name="description" content=""/><meta name="viewport" content="width=device-width, initial-scale=1"><link id="e-_svc_style" rel="stylesheet" href="main.css"/><style id="e-_site_style"></style><style id="e-_pageset_style"></style><style id="e-_page_style"></style>');
doc_body.insertAdjacentHTML('afterbegin', '<div id="e-_page"></div>'); var e_page = doc.getElementById('e-_page');
var e_site_style = doc.getElementById('e-_site_style'); var e_pageset_style = doc.getElementById('e-_pageset_style'); var e_page_style = doc.getElementById('e-_page_style'); var e_title = doc.getElementById('e-_title'); var e_description = doc.getElementById('e-_desc'); var e_icon = doc.getElementById('e-_icon');

// Load ---------------------------------------------------------------------------------------------------------------
win.onload = function() { Load() };  win.onpopstate = function() { Load() };
function Load() {
u_loc = new URL(loc); u_par = u_loc.searchParams; u_path = u_par.get('page'); u_def = u_par.get('site');

if ( HasVal(u_def) && (u_def.contains('.')) ) { var u_def_x = u_def } else { var u_def_x = 'https://docs.google.com/spreadsheets/d/'+ u_def +'/gviz/tq?tqx=out:csv&gid=0&headers=0&tq=select+%2A' } 

if ( HasVal(u_def_x) ) { var def_ref = u_def_x } else if ( HasVal(e_def) ) { var def_ref = e_def } else { return }; 
if (def == undefined) { DataGet('def', def_ref) } else { Page() }
}
// Link ---------------------------------------------------------------------------------------------------------------
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// DataGet ------------------------------------------------------------------------------------------------------------
function DataGet(type, url) {
//if (xhrs.includes(url)) { if (type === '') { return } else if (type === 'def') { Def() } else if (type === 'cont') { Conts('rem') } else if (type === 'rep') { Reps('rem') } else if (type === 'item') { Item('resp') }; return; } else { xhrs.push(url); };
var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { xrt = xhr.responseText; if (type == '') { return } else if (type == 'def') { Def() } else if (type == 'cont') { Conts('rem') } else if (type == 'rep') { Reps('rem') } else if (type == 'item') { Item('resp') } } }
}
// DataParse ----------------------------------------------------------------------------------------------------------
function DataParse() {
var tables = xrt.replace(/(?<=\r\n)\t+(?=\r\n)/g,'').replace(/\r\n+(?=\r\n\r\n)/g,'').replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').replace(/\",\"/g,'\t').replace(/"/g,'\\"').split('\r\n\r\n'); // remove tabs between lines, remove >2 returns, remove leading/trailing quotes, change "n" to rn, "," to tab, esc quotes, split at 2 returns
var a_tables = []; var tables_len = tables.length; for (var i1 = 0; i1 < tables_len; i1++) { var tables_i = tables[i1]; var table = tables_i.split('\r\n'); var props = table[0].split('\t'); var t_name = props[0]; var items = table.slice(1); var a_items = []; var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2]; var vals = items_i.split('\t'); var a_vals = []; var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3]; a_vals.push('"' + props[i3] + '":"' + vals[i3] + '"') }; a_items.push('"' + vals[0] + '":{"id":"' + vals[0] + '",' + a_vals.join(',') + '}') }; a_tables.push('"' + t_name + '":{' + a_items.join(',') + '}') };
xrt = JSON.parse('{' + a_tables.join(',') + '}');
}
// Def ----------------------------------------------------------------------------------------------------------------
function Def() {
DataParse();
def = xrt; pagesets = def.pagesets; pages = def.pages; contents = def.contents; site = pagesets['site']; home = pages['home'];
Page();
}
// Page ---------------------------------------------------------------------------------------------------------------
function Page() {
u_page = ''; u_item = ''; u_page_item = ''; e_page.innerHTML = ''; // reset vars
// url path, page, item
if ( HasVal(u_path) ) { 
	var u_path_a = u_path.split(path_sep); 
	var u_path_l = u_path_a[u_path_a.length-1]; 
	var u_path_l_a = u_path_l.split(item_sep); 
	if (u_path_l_a.length > 1) { 
		u_page = u_path_l_a[0]; 
		u_item = u_path_l_a[1]; 
		u_page_item = u_page + item_sep + u_item } 
	else { 
		u_page = u_path_l_a[0]; 
		u_item = ''; 
		u_page_item = u_page }
}
if ( HasVal(u_page) ) { page = pages[u_page] } else { page = home }; // page obj
// home or page vals
page_path = page.path; page_style = page.style; page_data = page.data; page_pageset = page.pageset; page_main = page.main; // page props
if(page.title !== '') { page_title = page.title } else { page_title = home.title }; if(page.icon !== '') { page_icon = page.icon } else { page_icon = home.icon }; if(page.description !== '') { page_description = page.description } else { page_description = home.description }; 
// site or pageset vals
if ( HasVal(page_pageset) ) { pageset = pagesets[page_pageset]; pageset_style = pageset.style; if ( HasVal(pageset.header) ) { pageset_header = pageset.header } else { pageset_header = site.header }; if ( HasVal(pageset.footer) ) { pageset_footer = pageset.footer } else { pageset_footer = site.footer }; if ( HasVal(pageset.left) ) { pageset_left = pageset.left } else { pageset_left = site.left }; if ( HasVal(pageset.right) ) { pageset_right = pageset.right } else { pageset_right = site.right }; if ( HasVal(pageset.top) ) { pageset_top = pageset.top } else { pageset_top = site.top }; if ( HasVal(pageset.bottom) ) { pageset_bottom = pageset.bottom } else { pageset_bottom = site.bottom }; 
}
else { pageset_header = site.header; pageset_footer = site.footer; pageset_left = site.left; pageset_right = site.right; pageset_top = site.top; pageset_bottom = site.bottom; }; // pageset obj,props
// head vals
e_site_style.textContent = site.style; e_pageset_style.textContent = pageset_style; e_page_style.textContent = page_style; e_title.textContent = page_title; e_description.content = page_description; e_icon.href = page_icon;
// page html
html = '<header id="e-_header">'+ pageset_header +'</header><div id="e-_middle"><div id="e-_center"><div id="e-_top">'+ pageset_top +'</div><main id="e-_main">'+ page_main +'</main><div id="e-_bottom">'+ pageset_bottom +'</div></div "e-_center"><div id="e-_left">'+ pageset_left +'</div><div id="e-_right">'+ pageset_right +'</div></div "e-_middle"><footer id="e-_footer">'+ pageset_footer +'</footer>';
Conts('');
}
// Conts --------------------------------------------------------------------------------------------------------------
var cont_match; var cont_ref;
function Conts(resp) {
if (resp !== '') {
if (resp === 'rem') {
if (cont_ref.includes('#')) { var cont_ref_id = cont_ref.split('#')[1].replace(/\-/g,'\\-').replace(/\_/g,'\\_') };
var cont_regexp_str = '\\<\\!\\-\\-\\(\\#\\`' + cont_ref_id + '\\)\\-\\-\\>.+?\\<\\!\\-\\-\\(\\%\\`' + cont_ref_id + '\\)\\-\\-\\>';
var cont_regexp = new RegExp(cont_regexp_str, 'g');
var cont_html_rem = xrt.replace(/\r\n/g, '').replace(/\t/g, '').match(cont_regexp)[0]; // <!--(#`cont_ref_id)-->...<!--(%`cont_ref_id)-->
html = html.replace(cont_match, cont_html_rem);
} // end if remote
else if (resp === 'loc') {
var content = contents[cont_ref]; var cont_main = content.main; var cont_data = content.data; var cont_before = content.before; var cont_after = content.after; 
var cont_html_loc = cont_main; 
if (HasVal(cont_data)) { cont_html_loc = '(`(~' + cont_ref + ')'+ cont_html_loc +'`)' } // for reps  // (`(~cont_id)...<html>...`)
if (HasVal(cont_before)) { cont_html_loc = cont_before + cont_html_loc } 
if (HasVal(cont_after)) { cont_html_loc = cont_html_loc + cont_after } 
html = html.replace(cont_match, cont_html_loc);
} // end if local
Embeds(); // for g doc
} // end if resp --------------------------------
var cont_matches = html.match(/\(\`[\@\~].+?\)/g); // (`@html_file#elem_id) or (`~cont_id)
if (cont_matches !== null) {
cont_match = cont_matches[0];
cont_ref = cont_match.substring(3, cont_match.length-1);
if (cont_match.startsWith('(`@')) { DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`~')) { Conts('loc') }
} // end if cont_matches
else { Reps('') }
}
// Reps ---------------------------------------------------------------------------------------------------------------
var item_x; var rep_x; var rep_d; var rep_match; var rep_table_id; var rep_item_id; var rep_ref; var rep_cont; var rep_html; // rep
function Reps(resp) {
if (resp !== '') {
var cont_hier = rep_cont.hierarchy.split(hier_sep); var cont_begin = cont_hier[0]; var cont_middle = cont_hier[1]; var cont_end = cont_hier[2];
var rep_html_rep = ''; 
if (resp === 'rem') { DataParse(); rep_d = xrt[rep_table_id]; if (rep_d !== undefined && rep_item_id !=='') { rep_d = [rep_d[rep_item_id]] } } 
else if (resp === 'loc') { rep_d = def[rep_table_id]; if (rep_d !== undefined && rep_item_id !=='') { rep_d = [rep_d[rep_item_id]] } } // set rep_d to table or item
var item_x_id_prev_len = 0;
for (var x in rep_d) {
item_x = rep_d[x];
rep_x = rep_html;
var item_x_id = item_x.id;
var item_x_id_len = item_x_id.split(path_sep).length;
if (item_x_id_prev_len === 0) { rep_x = rep_x } 
else if (item_x_id_prev_len === item_x_id_len ) { rep_x = cont_middle + rep_x } // if row same length: middle + cont
else if (item_x_id_prev_len < item_x_id_len ) { rep_x = cont_begin + rep_x } // if row longer:  begin + cont
else if (item_x_id_prev_len > item_x_id_len ) { var item_x_id_len_diff = item_x_id_prev_len - item_x_id_len; rep_x = cont_end.repeat(item_x_id_len_diff) + cont_middle + rep_x } // if row shorter: end( x num shorter ) + cont
Props('rep'); // Props
rep_html_rep = rep_html_rep + rep_x;
item_x_id_prev_len = item_x_id_len;
} // end items for-in
rep_html_rep = cont_begin + rep_html_rep + cont_end;
html = html.replace(rep_match, rep_html_rep);
} // end if resp ------------------------------------------------------
var rep_matches = html.match(/\(\`\(\~.+?\).+?\`\)/g); // (`(~cont_id)...<html>...`)
if (rep_matches !== null) { 
rep_match = rep_matches[0];  
var rep_cont_id = rep_match.substring(4, rep_match.indexOf(')'));
rep_html = rep_match.substring(rep_match.indexOf(')')+1, rep_match.length-2);
rep_cont = contents[rep_cont_id]; 
rep_ref = rep_cont.data;
if (rep_ref.includes(item_sep)) { rep_item_id = rep_ref.substring(rep_ref.indexOf(item_sep)+2, rep_ref.length) } else { rep_item_id = '' }; // --rep_item_id
rep_table_id = rep_ref.substring(rep_ref.indexOf('#')+1, rep_ref.length - rep_item_id.length);  
if (rep_ref.startsWith('@')) { DataGet('rep', rep_ref.substring(1)) } 
else if (rep_ref.startsWith('#')) { Reps('loc') }; 
} // end if matches
else { Item() }
}
// Item ---------------------------------------------------------------------------------------------------------------
function Item(resp) {
if (resp==='resp') {
DataParse();
var item_table_id = page_data.substring(page_data.indexOf('#') + 1); 
var page_item_table = xrt[item_table_id];
item_x = page_item_table[u_item];
Props('page');
Html(); return;
} // end if resp --------------------------------------------
else if (resp!=='resp' && page_data.startsWith('@')) { 
DataGet('item', page_data.substring(1).replace('(`$id)', u_item)) }
else { Html() }
}
// Props --------------------------------------------------------------------------------------------------------------
function Props(type) {
if (type==='rep') { var props = rep_x.match(/\(\`\$.+?\)/g) } else { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type==='rep') { rep_x = rep_x.replace(props_i, item_x[prop]) } else { html = html.replace(props_i, item_x[prop]) }
} } // end for, end if
}
// Embeds -------------------------------------------------------------------------------------------------------------
function Embeds() {
var embds = html.match(/<\!DOCTYPE html>.+?<\/html>/g); if (embds !== null) { 
var embds_len = embds.length; for (var i = 0; i < embds_len; i++) { 
var embd = embds[i];
var gdoc_cont = embd.match(/<div id\=\"contents\">.+?<\/div>/g);
html = html.replace(embd, gdoc_cont);
} } // end for, end if
}
// Html ---------------------------------------------------------------------------------------------------------------
function Html() {
e_page.insertAdjacentHTML('afterbegin', html); 
// links --------------------------------------------
var lnks = e_page.getElementsByTagName('a'); var lnks_len = lnks.length; for (var i = 0; i < lnks_len; i++) {
var lnk = lnks[i];
var lnk_p = lnk.dataset['p'];
if (HasVal(lnk_p)) {
	var lnk_h = new URL(loc);
	if (lnk_p === 'home') { lnk_h.searchParams.delete('page') } 
	else {
		var lnk_p_page = lnk_p.split(path_sep)[0]; lnk_p_page = lnk_p_page.split(item_sep)[0];
		var lnk_p_page_path = pages[lnk_p_page].path; 
		if (HasVal(lnk_p_page_path)) { lnk_h.searchParams.set('page', lnk_p_page_path + path_sep + lnk_p) }
		else { lnk_h.searchParams.set('page', lnk_p) }
		// get url path param to set attribute for nav-level styling
		if (u_path !== null) {
			if (u_path.includes(lnk_p) && !(u_path.endsWith(lnk_p))) { lnk.setAttribute('data-inpath','true'); }
			if (u_path.endsWith(lnk_p)) { lnk.setAttribute('data-ispage','true'); lnk.setAttribute('aria-selected','true'); lnk.setAttribute('aria-current','page'); }
		} // end if path not null
	} // end else if not home
	lnk.href = lnk_h;
	lnk.addEventListener('click', Link, false);
} // end if has lnk_p
else { lnk.target = '_blank' } // no lnk_p
} // end for links
}
// misc ---------------------------------------------------------------------------------------------------------------
function Log(lbl, vlu) { console.log('\r\n' + lbl + ': ' + JSON.stringify(vlu)) }
function HasVal(vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj(vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }