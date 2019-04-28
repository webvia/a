var win = window; var his = win.history; var loc = win.location; var doc = win.document; var doc_head = doc.head; var doc_body = doc.body; // win,his,loc,doc
var u_loc; var u_par; var u_site; var u_path; var u_page_item; var u_page; var u_item; // location url  u_path(u_path_pre__u_page_item(u_page--u_item))
var pagesets_u; var pages_u; var contents_u;
var pagesets; var pages; var contents; var ps_site; var p_home; // site
var pageset; var pageset_header; var pageset_footer; var pageset_top; var pageset_bottom; var pageset_left; var pageset_right; // pageset
var page; var page_path; var page_name; var page_title; var page_description; var page_icon; var page_pageset; var page_main; var page_data; // page
var xrt; var html; var path_sep = '__'; var item_sep = '--'; var x_sep = '``'; // misc
var ss1 = 'https://docs.google.com/spreadsheets/d/'; var ss2 = '/gviz/tq?tqx=out:csv&sheet='; var ss3 = '&headers=1&tq=select+%2A';

// Load ---------------------------------------------------------------------------------------------------------------
win.onload = function() { Load() }; win.onpopstate = function() { Load() };
function Load() {
var e_main_script = doc_body.querySelector('script[data-site]'); if ( e_main_script !== undefined && e_main_script !== null ) { var e_site = e_main_script.dataset['site'] };
u_loc = new URL(loc); u_par = u_loc.searchParams; u_path = u_par.get('page'); u_site = u_par.get('site');
pagesets_u = ss1 + u_site + ss2 + 'pagesets' + ss3; pages_u = ss1 + u_site + ss2 + 'pages' + ss3; contents_u = ss1 + u_site + ss2 + 'contents' + ss3; 
if ( HasVal(u_site) && u_site.includes('.') ) { var u_site_x = u_site } else { var u_site_x = ss1 + u_site + ss2 + 'pagesets' + ss3 } 
if ( HasVal(u_site_x) ) { var site_ref = u_site_x } else if ( HasVal(e_site) ) { var site_ref = e_site } else { return }; 
if (pagesets == undefined) { DataGet('pagesets', site_ref) } else { Page() }
}
// Link ---------------------------------------------------------------------------------------------------------------
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// DataGet ------------------------------------------------------------------------------------------------------------
function DataGet(type, url) {
var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { 
xrt = xhr.responseText; 

if (xrt.startsWith('"<') || xrt.startsWith('"/*')) { xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'').replace(/\"\,\"/g,'').replace(/""/g,'"') }

else if (xrt.startsWith('"')) { DataParse() }
if (type === '') { return } else if (type === 'pagesets') { Pagesets() } else if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('remote') } else if (type === 'repeat') { Reps('remote') } else if (type === 'item') { Item('response') } } }
}
// DataParse ----------------------------------------------------------------------------------------------------------
function DataParse() {
var table = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').split('\r\n'); var props = table[0].split('","'); 
var items = table.slice(1); var a_items = []; var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2]; 
var vals = items_i.split('","'); var a_vals = []; var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3]; a_vals.push('"' + props[i3] + '":"' + vals[i3].replace(/""/g,'"').replace(/"/g,'\\"') + '"') }; a_items.push('"' + vals[0] + '":{"id_":"' + vals[0] + '",' + a_vals.join(',') + '}') }; 
xrt = '{' + a_items.join(',') + '}'; xrt = xrt.replace(/\,\"\"\:\"\"/g,''); xrt = JSON.parse(xrt);
}
// Site ---------------------------------------------------------------------------------------------------------------
function Pagesets() { pagesets = xrt; ps_site = pagesets['site']; DataGet('pages', pages_u); }
function Pages() { pages = xrt; p_home = pages['home']; DataGet('contents', contents_u); }
function Contents() { contents = xrt; Page(); }

// Page ---------------------------------------------------------------------------------------------------------------
function Page() {
u_page = ''; u_item = ''; u_page_item = ''; // reset vars
// url path, page, item
if ( HasVal(u_path) ) { 
	var u_path_a = u_path.split(path_sep); var u_path_l = u_path_a[u_path_a.length-1]; var u_path_l_a = u_path_l.split(item_sep); 
	if (u_path_l_a.length > 1) { u_page = u_path_l_a[0]; u_item = u_path_l_a[1]; u_page_item = u_page + item_sep + u_item } 
	else { u_page = u_path_l_a[0]; u_item = ''; u_page_item = u_page }
}
if ( HasVal(u_page) ) { page = pages[u_page] } else { page = p_home }; // page obj
page_path = page.path; page_data = page.data; page_pageset = page.pageset; page_main = page.main; // page props

// page or home vals
if(page.title !== '') { page_title = page.title } else { page_title = p_home.title }; if(page.icon !== '') { page_icon = page.icon } else { page_icon = p_home.icon }; if(page.description !== '') { page_description = page.description } else { page_description = p_home.description }; 

// pageset or site vals
if ( HasVal(page_pageset) ) { 
pageset = pagesets[page_pageset]; if ( HasVal(pageset.header) ) { pageset_header = pageset.header } else { pageset_header = ps_site.header }; if ( HasVal(pageset.footer) ) { pageset_footer = pageset.footer } else { pageset_footer = ps_site.footer }; if ( HasVal(pageset.left) ) { pageset_left = pageset.left } else { pageset_left = ps_site.left }; if ( HasVal(pageset.right) ) { pageset_right = pageset.right } else { pageset_right = ps_site.right }; if ( HasVal(pageset.top) ) { pageset_top = pageset.top } else { pageset_top = ps_site.top }; if ( HasVal(pageset.bottom) ) { pageset_bottom = pageset.bottom } else { pageset_bottom = ps_site.bottom }; 
}
else { 
pageset_header = ps_site.header; pageset_footer = ps_site.footer; pageset_left = ps_site.left; pageset_right = ps_site.right; pageset_top = ps_site.top; pageset_bottom = ps_site.bottom;
} // pageset obj,props

//var pageset_style = pageset.style;   <link id="e-_pageset_style" rel="stylesheet" href="'+ pageset_style +'"/>

var site_style = ps_site.style; var site_style_file = ''; var site_style_sheet = '';
if ( site_style.startsWith('http://') || site_style.startsWith('https://') ) { site_style_file = site_style } // css file
else { site_style_sheet = '(`@' + ss1 + u_site + ss2 + site_style + ss3 + ')' } // css sheet

html = '<header id="e-_header">'+ pageset_header +'</header><div id="e-_middle"><div id="e-_center"><div id="e-_top">'+ pageset_top +'</div><main id="e-_main">'+ page_main +'</main><div id="e-_bottom">'+ pageset_bottom +'</div></div "e-_center"><div id="e-_left">'+ pageset_left +'</div><div id="e-_right">'+ pageset_right +'</div></div "e-_middle"><footer id="e-_footer">'+ pageset_footer +'</footer><template id="e-_head"><title id="e-_title">'+ page_title +'</title><link id="e-_icon" rel="shortcut icon" href="'+ page_icon +'"/><meta id="e-_desc" name="description" content="'+ page_description +'"/><meta name="viewport" content="width=device-width, initial-scale=1"><link id="e-_svc_style" rel="stylesheet" href="main.css"/><link id="e-_site_style_link" rel="stylesheet" href="'+ site_style_file +'"/><style id="e-_site_style_embed">'+ site_style_sheet +'</style></template>';
Conts();
}
// Conts --------------------------------------------------------------------------------------------------------------
var cont_match; var cont_ref;
function Conts(resp) {
if (resp !== undefined) {
if (resp === 'remote') {
if (cont_ref.includes('#')) { var cont_ref_id = cont_ref.split('#')[1].replace(/\-/g,'\\-').replace(/\_/g,'\\_');
var cont_regexp_str = '\\<\\!\\-\\-\\(\\#\\`' + cont_ref_id + '\\)\\-\\-\\>.+?\\<\\!\\-\\-\\(\\%\\`' + cont_ref_id + '\\)\\-\\-\\>';
var cont_regexp = new RegExp(cont_regexp_str, 'g');
var cont_html_rem = xrt.replace(/\r\n/g, '').replace(/\t/g, '').match(cont_regexp)[0]; // <!--(#`cont_ref_id)-->...<!--(%`cont_ref_id)-->
html = html.replace(cont_match, cont_html_rem);
}
else { html = html.replace(cont_match, xrt); }
} // end if remote
else if (resp === 'local') {
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
if (cont_match.startsWith('(`@')) { 
// add stuff for g sheet
if ( cont_ref.startsWith('http://') || cont_ref.startsWith('https://') ) {  }
else { var cont_ref_a = cont_ref.split('#'); cont_ref = ss1 + u_site + ss2 + cont_ref_a[0] + ss3 + '#' + cont_ref_a[1] }
DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`~')) { Conts('local') }
} // end if cont_matches
else { Reps() }
}
// Reps ---------------------------------------------------------------------------------------------------------------
var item_x; var rep_x; var rep_d; var rep_match; var rep_item_id; var rep_ref; var rep_cont; var rep_html; // rep
function Reps(resp) {
if (resp !== undefined) {
var cont_between = rep_cont.between.split(x_sep); var cont_begin = cont_between[0]; var cont_middle = cont_between[1]; var cont_end = cont_between[2];
var rep_html_rep = ''; 
rep_d = xrt;
//if (rep_d !== undefined && rep_item_id !=='') { rep_d = [rep_d[rep_item_id]] } } // set rep_d to table or item
var item_x_id_prev_len = 0;
for (var x in rep_d) {
item_x = rep_d[x];
rep_x = rep_html;
var item_x_id = item_x.id_;
var item_x_id_len = item_x_id.split(path_sep).length;
if (item_x_id_prev_len === 0) { rep_x = rep_x } 
else if (item_x_id_prev_len === item_x_id_len ) { rep_x = cont_middle + rep_x } // if row same length: middle + cont
else if (item_x_id_prev_len < item_x_id_len ) { rep_x = cont_begin + rep_x } // if row longer:  begin + cont
else if (item_x_id_prev_len > item_x_id_len ) { var item_x_id_len_diff = item_x_id_prev_len - item_x_id_len; rep_x = cont_end.repeat(item_x_id_len_diff) + cont_middle + rep_x } // if row shorter: end( x num shorter ) + cont
Props('repeat');
rep_html_rep = rep_html_rep + rep_x;
item_x_id_prev_len = item_x_id_len;
} // end items for-in
rep_html_rep = cont_begin + rep_html_rep + cont_end;
html = html.replace(rep_match, rep_html_rep);
} // end if resp ------------------------------------------------------
var rep_matches = html.match(/\(\`\(\~.+?\).+?\`\)/g); // (`(~rep_cont_id)...rep_html...`)
if (rep_matches !== null) { 
rep_match = rep_matches[0];
var rep_cont_id = rep_match.substring(4, rep_match.indexOf(')'));
rep_html = rep_match.substring(rep_match.indexOf(')')+1, rep_match.length-2);
rep_cont = contents[rep_cont_id];
rep_ref = rep_cont.data;
if ( rep_ref.startsWith('http://') || rep_ref.startsWith('https://') ) {  } // not in these sheets
else if ( rep_ref.includes(x_sep) ) { var rep_ref_a = rep_ref.split(x_sep); rep_ref = ss1 + u_site + ss2 + rep_ref_a[0] + ss3 + '+where+' + encodeURIComponent(rep_ref_a[1]) } // query a sheet
else { rep_ref = ss1 + u_site + ss2 + rep_ref + ss3; } // whole sheet
DataGet('repeat', rep_ref);
} // end if matches
else { Item() }
}
// Item ---------------------------------------------------------------------------------------------------------------
function Item(resp) {
if (resp==='response') {
item_x = xrt[u_item];
Props('page');
Html(); return;
} // end if resp --------------------------------------------
else if (resp!=='response') { 
if ( page_data.startsWith('http://') || page_data.startsWith('https://') ) {  } // not in these sheets
else if ( page_data.includes(x_sep) ) { var page_data_a = page_data.split(x_sep);  page_data = ss1 + u_site + ss2 + page_data_a[0] + ss3 + '+where+' + encodeURIComponent(page_data_a[1]) } // query a sheet
page_data = page_data.replace('(`$id_)', u_item);
DataGet('item', page_data);
}
else { Html() }
}
// Props --------------------------------------------------------------------------------------------------------------
function Props(type) {
if (type==='repeat') { var props = rep_x.match(/\(\`\$.+?\)/g) } else if (type==='page') { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type==='repeat') { rep_x = rep_x.replace(props_i, item_x[prop]) } else if (type==='page') { html = html.replace(props_i, item_x[prop]) }
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
doc_body.insertAdjacentHTML('afterbegin', '<div id="e-_page"></div>'); var e_page = doc.getElementById('e-_page'); e_page.innerHTML = ''; e_page.insertAdjacentHTML('afterbegin', html); 
var e_head = doc.getElementById('e-_head'); var head_html = e_head.innerHTML; doc_head.insertAdjacentHTML('afterbegin', head_html); e_head.parentNode.removeChild(e_head);

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