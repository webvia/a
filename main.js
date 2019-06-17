// to do: page not found msg, componenents, change separator (31-44 Page path, 141 Reps, 206 Html links)

var win = window; var his = win.history; var loc = win.location; var doc = win.document; var head = doc.head; var body = doc.body; // win,his,loc,doc,head,body
body.insertAdjacentHTML('afterbegin', '<div id="e-_page"></div>'); var e_page = doc.getElementById('e-_page'); // e_page
var u_loc; var u_par; var u_site; var u_path; var u_page; var u_item; // url location
var pages_u; var contents_u; var pages; var contents; var p_all; var p_home; var path_d; var page; var page_item; var page_data; // definition
var cont_match; var cont_ref; // cont
var rep_item; var rep_x; var rep_match; var rep_u_item; var rep_ref; var rep_cont; var rep_html; // rep
var html; var xrt; var xrt_a = []; var xrtu_a = []; var page_sep = '__'; var item_sep = '--'; var lev_sep = '..'; var cont_sep = '`~`'; var gsu1; var gsu2; // misc
//
// Load ===============================================================================================================
win.onload = function() { Load() }; win.onpopstate = function() { Load() };
function Load() {
body.style.background = 'url(https://www.mikromann.no/4bilder/big_loading_indicator.gif) center 2em / 5em 5em no-repeat';
var e_script = body.querySelector('script[data-site]'); if ( HasObj(e_script) ) { var e_site = e_script.dataset['s'] };
u_loc = new URL(loc); u_par = u_loc.searchParams; u_site = u_par.get('s'); u_path = u_par.get('p');
gsu1 = 'https://docs.google.com/spreadsheets/d/'+ u_site +'/gviz/tq?tqx=out:csv&sheet='; gsu2 = '&headers=1&tq=select+%2A';
pages_u = gsu1 + 'pages' + gsu2; contents_u = gsu1 + 'contents' + gsu2; 
if ( HasVal(u_site) && u_site.startsWith('http') ) { var u_site_x = u_site } else { var u_site_x = pages_u } 
if ( HasVal(u_site_x) ) { var site_ref = u_site_x } else if ( HasVal(e_site) ) { var site_ref = e_site } else { return }; 
if (pages == undefined) { DataGet('pages', site_ref) } else { Page() }
}
// Site ===============================================================================================================
function Pages() { pages = xrt; p_home = pages['_Home']; if (pages['_All'] !== undefined) { p_all = pages['_All'] } else { p_all = {} }; DataGet('contents', contents_u); }
function Contents() { contents = xrt; Page(); }
//
// Page ===============================================================================================================
function Page() {
u_page = ''; u_item = ''; path_d = []; // reset vals
if ( HasVal(u_path) ) {

// u_page, u_item -----------------------------------------------------------------------------------------------------
var u_page_a = []; var u_item_a = []; 
var u_path_a = u_path.split(page_sep); 
for (var i of u_path_a) { u_page_a.push(i.split(item_sep)[0]); }
u_page = u_page_a.join(page_sep); u_item_a = u_path.split(item_sep); u_item = u_item_a[u_item_a.length-1];

// build path_d -------------------------------------------------------------------------------------------------------
var path_x = u_path;
var path_x_len = path_x.replace(lev_sep, page_sep).split(page_sep).length;
for (var i2 = 0; i2 < path_x_len; i2++) {
	// path_x
	if ( path_x.includes(lev_sep) && path_x.includes(page_sep) && path_x.lastIndexOf(lev_sep) > path_x.lastIndexOf(page_sep) ) { path_x = path_x.substring(0, path_x.lastIndexOf(lev_sep)); }
	else if ( path_x.includes(page_sep) ) { path_x = path_x.substring(0, path_x.lastIndexOf(page_sep)); }
	else { path_x = path_x }
	// path_name
	if ( path_x.includes(lev_sep) && path_x.includes(item_sep) && path_x.lastIndexOf(lev_sep) > path_x.lastIndexOf(item_sep) ) { var path_name = path_x.substring(path_x.lastIndexOf(lev_sep)+2) }
	else if ( path_x.includes(item_sep) && path_x.includes(page_sep) && path_x.lastIndexOf(item_sep) > path_x.lastIndexOf(page_sep) ) { var path_name = path_x.substring(path_x.lastIndexOf(item_sep)+2) }
	else if ( path_x.includes(page_sep) ) { var path_name = path_x.substring(path_x.lastIndexOf(page_sep)+2) }
	else { var path_name = path_x }
	path_d.push('"' + path_x + '","' + path_name + '"');
} //  } for
path_d.reverse();
path_d.unshift('"_Home","Home"'); path_d.unshift('"path_id_","path_name_"');
path_d = path_d.join('\n');
} //  } if u_path

// page setup ---------------------------------------------------------------------------------------------------------
if ( HasVal(u_page) ) { page = pages[u_page] } else { page = p_home }; // page or home
if ( HasVal(page.group) ) { var pgrp = pages[page.group] } else { var pgrp = {} } // pgrp

// main, header, footer, left, right, top, bottom
var h_main = ''; if (HasVal(page.main)) { h_main = page.main } else if ( HasVal(pgrp.main) ) { h_main = pgrp.main } else if ( HasVal(p_all.main) ) { h_main = p_all.main } else if ( HasVal(p_home.main) ) { h_main = p_home.main }  if ( h_main !== '' && !h_main.includes('<') && !h_main.includes('(`') ) { h_main = '(`#'+ h_main +')' };

var h_header = ''; if (HasVal(page.header)) { h_header = page.header } else if ( HasVal(pgrp.header) ) { h_header = pgrp.header } else if ( HasVal(p_all.header) ) { h_header = p_all.header } else if ( HasVal(p_home.header) ) { h_header = p_home.header }  if ( h_header !== '' && !h_header.includes('<') && !h_header.includes('(`') ) { h_header = '(`#'+ h_header +')' };

var h_footer = ''; if (HasVal(page.footer)) { h_footer = page.footer } else if ( HasVal(pgrp.footer) ) { h_footer = pgrp.footer } else if ( HasVal(p_all.footer) ) { h_footer = p_all.footer } else if ( HasVal(p_home.footer) ) { h_footer = p_home.footer }  if ( h_footer !== '' && !h_footer.includes('<') && !h_footer.includes('(`') ) { h_footer = '(`#'+ h_footer +')' };

var h_left = ''; if (HasVal(page.left)) { h_left = page.left } else if ( HasVal(pgrp.left) ) { h_left = pgrp.left } else if ( HasVal(p_all.left) ) { h_left = p_all.left } else if ( HasVal(p_home.left) ) { h_left = p_home.left }  if ( h_left !== '' && !h_left.includes('<') && !h_left.includes('(`') ) { h_left = '(`#'+ h_left +')' };

var h_right = ''; if (HasVal(page.right)) { h_right = page.right } else if ( HasVal(pgrp.right) ) { h_right = pgrp.right } else if ( HasVal(p_all.right) ) { h_right = p_all.right } else if ( HasVal(p_home.right) ) { h_right = p_home.right }  if ( h_right !== '' && !h_right.includes('<') && !h_right.includes('(`') ) { h_right = '(`#'+ h_right +')' };

var h_top = ''; if (HasVal(page.top)) { h_top = page.top } else if ( HasVal(pgrp.top) ) { h_top = pgrp.top } else if ( HasVal(p_all.top) ) { h_top = p_all.top } else if ( HasVal(p_home.top) ) { h_top = p_home.top }  if ( h_top !== '' && !h_top.includes('<') && !h_top.includes('(`') ) { h_top = '(`#'+ h_top +')' };

var h_bottom = ''; if (HasVal(page.bottom)) { h_bottom = page.bottom } else if ( HasVal(pgrp.bottom) ) { h_bottom = pgrp.bottom } else if ( HasVal(p_all.bottom) ) { h_bottom = p_all.bottom } else if ( HasVal(p_home.bottom) ) { h_bottom = p_home.bottom }  if ( h_bottom !== '' && !h_bottom.includes('<') && !h_bottom.includes('(`') ) { h_bottom = '(`#'+ h_bottom +')' };

// head
var h_head = ''; if (HasVal(page.head)) { h_head = page.head } else if ( HasVal(pgrp.head) ) { h_head = pgrp.head } else if ( HasVal(p_all.head) ) { h_head = p_all.head } else if ( HasVal(p_home.head) ) { h_head = p_home.head }  if ( h_head !== '' && !h_top.includes('<') && !h_head.includes('(`') ) { h_head = '(`#'+ h_head +')' };

// title, icon, description
var h_title = ''; if (HasVal(page.title)) { h_title = page.title } else if ( HasVal(pgrp.title) ) { h_title = pgrp.title } else if ( HasVal(p_all.title) ) { h_title = p_all.title } else if ( HasVal(p_home.title) ) { h_title = p_home.title };

var h_icon = ''; if (HasVal(page.icon)) { h_icon = page.icon } else if ( HasVal(pgrp.icon) ) { h_icon = pgrp.icon } else if ( HasVal(p_all.icon) ) { h_icon = p_all.icon } else if ( HasVal(p_home.icon) ) { h_icon = p_home.icon };

var h_description = ''; if (HasVal(page.description)) { h_description = page.description } else if ( HasVal(pgrp.description) ) { h_description = pgrp.description } else if ( HasVal(p_all.description) ) { h_description = p_all.description } else if ( HasVal(p_home.description) ) { h_description = p_home.description };

// styles
var h_all_style_file = ''; var h_all_style_sheet = ''; var p_all_style = p_all.style; var p_home_style = p_home.style; if (HasVal(p_all_style) && p_all_style.startsWith('http')) { h_all_style_file = p_all_style } else if (HasVal(p_all_style)) { h_all_style_sheet = '(`@' + gsu1 + p_all_style + gsu2 + ')' } else if (HasVal(p_home_style) && p_home_style.startsWith('http')) { h_all_style_file = p_home_style } else if (HasVal(p_home_style)) { h_all_style_sheet = '(`@' + gsu1 + p_home_style + gsu2 + ')' }

var h_pgrp_style_file = ''; var h_pgrp_style_sheet = ''; var pgrp_style = pgrp.style; if (HasVal(pgrp_style) && pgrp_style.startsWith('http')) { h_pgrp_style_file = pgrp_style } else if (HasVal(pgrp_style)) { h_pgrp_style_sheet = '(`@' + gsu1 + pgrp_style + gsu2 + ')' }

var h_page_style_file = ''; var h_page_style_sheet = ''; var page_style = page.style; if (HasVal(page_style) && page_style.startsWith('http')) { h_page_style_file = page_style } else if (HasVal(page_style)) { h_page_style_sheet = '(`@' + gsu1 + page_style + gsu2 + ')' }

// html ---------------------------------------------------------------------------------------------------------------
html = '<header id="e-_header">'+ h_header +'</header><div id="e-_middle"><div id="e-_left">'+ h_left +'</div><div id="e-_center"><div id="e-_top">'+ h_top +'</div><main id="e-_main">'+ h_main +'</main><div id="e-_bottom">'+ h_bottom +'</div></div><div id="e-_right">'+ h_right +'</div></div><footer id="e-_footer">'+ h_footer +'</footer><template id="e-_head"><title>'+ h_title +'</title><link rel="shortcut icon" href="'+ h_icon +'"/><meta name="description" content="'+ h_description +'"/><meta name="viewport" content="initial-scale=1, minimum-scale=1, width=device-width">'+ h_head +'<link rel="stylesheet" href="main.css"/><link rel="stylesheet" href="'+ h_all_style_file +'"/><style>'+ h_all_style_sheet +'</style><link rel="stylesheet" href="'+ h_pgrp_style_file +'"/><style>'+ h_pgrp_style_sheet +'</style><link rel="stylesheet" href="'+ h_page_style_file +'"/><style>'+ h_page_style_sheet +'</style></template>'; // ?v=' + Math.random() + '

// get page item data -------------------------------------------------------------------------------------------------
page_data = page.data;
if (HasVal(page_data)) {
	if ( page_data.startsWith('http') ) { page_data = page_data.replace('(`$id_)', u_item); } // not in these sheets
	else { page_data = gsu1 + page_data + gsu2 + '+where+' + encodeURIComponent("A = '"+ u_item +"'") } // query a sheet
	DataGet('item', page_data);
} // }if page_data
else { Conts() }
}
// Item ===============================================================================================================
function Item() {
page_item = xrt[u_item];
Conts();
}
// Conts ==============================================================================================================
function Conts(resp) {
if (resp !== undefined) {
if (resp === 'cont') {
	if (xrt.startsWith('<!DOCTYPE html>')) { if (xrt.includes('<div id="contents">')) { xrt = xrt.match(/\<div\sid\=\"contents\"\>.+?\<\/div\>/g)[0].replace('<div id="contents">','<div class="gdoc">') } } // gdoc
	if (cont_ref.includes('#')) {
		var cont_ref_id = cont_ref.split('#')[1].replace(/\-/g,'\\-').replace(/\_/g,'\\_');
		var cont_regexp_str = '\\<\\!\\-\\-\\(\\#\\`' + cont_ref_id + '\\)\\-\\-\\>.+?\\<\\!\\-\\-\\(\\%\\`' + cont_ref_id + '\\)\\-\\-\\>'; // <!--(#`cont_ref_id)-->...<!--(%`cont_ref_id)-->
		var cont_regexp = new RegExp(cont_regexp_str, 'g');
		var cont_html_rem = xrt.replace(/\r\n/g, '').replace(/\t/g, '').match(cont_regexp);
		if (cont_html_rem !== null) {
			cont_html_rem = cont_html_rem[0].split(')-->')[1].split('<!--(')[0];
			html = html.replace(cont_match, cont_html_rem); 
		} // } if cont_html_rem
	} // } if cont_ref
	else { html = html.replace(cont_match, xrt); }
} // } if remote
else if (resp === 'local') {
	var content = contents[cont_ref]; 
	var cont_main = ''; if (HasVal(content.main)) { cont_main = content.main }
	var cont_bef = ''; if (HasVal(content.before)) { cont_bef = content.before }
	var cont_aft = ''; if (HasVal(content.after)) { cont_aft = content.after }
	var cont_alt = ''; if (HasVal(content.alternate)) { cont_alt = content.alternate }
	var cont_data = ''; if (HasVal(content.data)) { cont_data = content.data }
	if (HasVal(cont_data)) { var cont_html_loc = '(`(#' + cont_ref + ')' + cont_main + cont_sep + cont_bef + cont_sep + cont_aft + cont_sep + cont_alt + '`)' } // for reps: (`(#cont_id)...<html>...`)
	else { var cont_html_loc = cont_bef + cont_main + cont_aft }
	html = html.replace(cont_match, cont_html_loc);
} // } if local
} // } if response ----------------------------------------------------------------------------------------------------
var cont_matches = html.match(/\(\`[\@\#].+?\)/g); // (`@html_file#elem_id) or (`#cont_id)
if (cont_matches !== null) {
	cont_match = cont_matches[0];
	cont_ref = cont_match.substring(3, cont_match.length-1);
if (cont_match.startsWith('(`@')) { 
if ( !cont_ref.startsWith('http') ) { var cont_ref_a = cont_ref.split('#'); cont_ref = gsu1 + cont_ref_a[0] + gsu2 + '#' + cont_ref_a[1] }
DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`#')) { Conts('local') }
} // } if cont_matches
else { Reps() }
}
// Reps ===============================================================================================================
function Reps(resp) {
if (resp !== undefined) {
var rep_html_a = rep_html.split(cont_sep); rep_html = rep_html_a[0]; var cont_bef = rep_html_a[1]; var cont_aft = rep_html_a[2]; var cont_alt = rep_html_a[3]; 
if (xrt.constructor === Object && Object.entries(xrt).length !== 0) {
var rep_cont_between = rep_cont.between;
if ( HasVal(rep_cont_between) && rep_cont_between.includes(cont_sep) ) { // tree
	var cont_between = rep_cont_between.split(cont_sep); var cont_begin = cont_between[0]; var cont_middle = cont_between[1]; var cont_end = cont_between[2];
	var rep_html_rep = ''; 
	var rep_item_id_prev_len = 0;
	for (var x in xrt) {
		rep_item = xrt[x];
		rep_x = rep_html;
		var rep_item_id = rep_item.id_;
		var rep_item_id_len = rep_item_id.split(lev_sep).length;
		if (rep_item_id_prev_len === 0) { rep_x = rep_x } 
		if (rep_item_id_prev_len < rep_item_id_len ) { rep_x = cont_begin + rep_x } // if row longer:  begin + cont
		else if (rep_item_id_prev_len === rep_item_id_len ) { rep_x = cont_middle + rep_x } // if row same length: middle + cont
		else if (rep_item_id_prev_len > rep_item_id_len ) { var rep_item_id_len_diff = rep_item_id_prev_len - rep_item_id_len; rep_x = cont_end.repeat(rep_item_id_len_diff) + cont_middle + rep_x } // if row shorter: end( x num shorter ) + cont
		Props('rep');
		rep_html_rep = rep_html_rep + rep_x;
		rep_item_id_prev_len = rep_item_id_len;
	} // } for
} // } if
else { // list
	if ( HasVal(rep_cont_between) ) { var cont_between = rep_cont_between } else  { var cont_between = '' } 
	var rep_html_rep = []; 
	for (var x in xrt) {
		rep_item = xrt[x];
		rep_x = rep_html;
		Props('rep');
		rep_html_rep.push(rep_x);
	} // } for in
	rep_html_rep = rep_html_rep.join(cont_between);
} // } else if list
rep_html_rep = cont_bef + rep_html_rep + cont_aft;
} // } if xrt not 0
else { var rep_html_rep = cont_alt }
html = html.replace(rep_match, rep_html_rep);
//
} // } if resp --------------------------------------------------------------------------------------------------------
var rep_matches = html.match(/\(\`\(\#.+?\).+?\`\)/g); // (`(#rep_cont_id)...rep_html...`)
if (rep_matches !== null) { 
rep_match = rep_matches[0];
var rep_cont_id = rep_match.substring(4, rep_match.indexOf(')'));
rep_html = rep_match.substring(rep_match.indexOf(')')+1, rep_match.length-2);
rep_cont = contents[rep_cont_id];
rep_ref = rep_cont.data;
//get path data
if ( rep_ref === 'path_' && path_d !== [] && HasVal(u_path) ) { xrt = path_d; DataParse(); Reps('rep'); }
// get rep data
else {
var rep_ref_props = rep_ref.match(/\(\`\$.+?\)/g); // (`$rep_ref_prop)
if (rep_ref_props !== null) { for (var rep_ref_prop of rep_ref_props) { 
	rep_ref = rep_ref.replace(rep_ref_prop, page_item[rep_ref_prop.substring(3, rep_ref_prop.length-1)]) } }
if ( rep_ref.startsWith('http') ) {  } // not in these sheets
else if ( rep_ref.includes('#') ) { var rep_ref_a = rep_ref.split('#'); rep_ref = gsu1 + rep_ref_a[0] + gsu2 + '+where+' + encodeURIComponent(rep_ref_a[1]) } // query a sheet
else { rep_ref = gsu1 + rep_ref + gsu2; } // whole sheet
DataGet('rep', rep_ref);
} // } else
} // } if matches
else { Html() }
}
// Html ===============================================================================================================
function Html() {
if (HasVal(page_data)) { Props('item') }
body.style.background = "none";
e_page.innerHTML = ''; e_page.insertAdjacentHTML('afterbegin', html); 
var e_head = doc.getElementById('e-_head'); var head_html = e_head.innerHTML; head.innerHTML = ''; head.insertAdjacentHTML('afterbegin', head_html); e_head.parentNode.removeChild(e_head);
//
// links --------------------------------------------------------------------------------------------------------------
var lnks = e_page.getElementsByTagName('a'); var lnks_len = lnks.length; for (var i = 0; i < lnks_len; i++) {
var lnk = lnks[i];
var lnk_p = lnk.dataset['p'];
if (HasVal(lnk_p)) {
	var lnk_h = new URL(loc);
	if (lnk_p === '_Home') { lnk_h.searchParams.delete('p'); if (u_path === null) { lnk.setAttribute('data-inpath','true'); lnk.setAttribute('data-ispage','true'); lnk.setAttribute('aria-selected','true'); lnk.setAttribute('aria-current','page'); } }
	else {
		var lnk_p_page = lnk_p.split(page_sep)[0]; lnk_p_page = lnk_p_page.split(item_sep)[0];
		var lnk_p_page_path = pages[lnk_p_page].path; 
		if (HasVal(lnk_p_page_path)) { lnk_h.searchParams.set('p', lnk_p_page_path + page_sep + lnk_p) }
		else { lnk_h.searchParams.set('p', lnk_p) }
		// get url path param to set attribute for nav-level styling
		if (u_path !== null) {
			if (u_path.includes(lnk_p)) { lnk.setAttribute('data-inpath','true'); lnk.parentNode.setAttribute('data-inpath','true'); }
			if (u_path.endsWith(lnk_p)) { lnk.setAttribute('data-ispage','true'); lnk.parentNode.setAttribute('data-ispage','true'); lnk.setAttribute('aria-selected','true'); lnk.setAttribute('aria-current','page'); }
		} // } if path not null
	} // } else if not home
	lnk.href = lnk_h;
	lnk.addEventListener('click', Link, false);
	// link descendants
	var lnk_des_a = lnk.getElementsByTagName('*'); var lnk_des_len = lnk_des_a.length; 
		for (var i2 = 0; i2 < lnk_des_len; i2++) { var lnk_des = lnk_des_a[i2]; lnk_des.href = lnk_h; lnk_des.addEventListener('click', Link, false); } // } for descendants
} // } if has lnk_p
else { lnk.target = '_blank' } // no lnk_p
} // } for links
}
// Link ===============================================================================================================
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// Props ==============================================================================================================
function Props(type) {
if (type==='rep') { var props = rep_x.match(/\(\`\$.+?\)/g) } else if (type==='item') { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type==='rep') { rep_x = rep_x.replace(props_i, rep_item[prop]) } else if (type==='item') { html = html.replace(props_i, page_item[prop]) }
} } // } for } if
}
// DataGet ============================================================================================================
function DataGet(type, url) {
if (type === '') { console.log('no type to get'); return }; if (url === '') { console.log('no url to get'); return }
var xrt_i = -1; var len = xrtu_a.length; for (var i = 0; i < len; i++) { var xrtu = xrtu_a[i]; if (url.split('#')[0] === xrtu) { xrt_i = i; xrt = xrt_a[i]; break } } // } if } for
if (xrt_i !== -1) { if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item('item') } } // } if
else { var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { xrt = xhr.responseText; if (xrt.startsWith('"<') || xrt.startsWith('"/*')) { xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'').replace(/\"\,\"/g,'').replace(/""/g,'"') } else if (xrt.startsWith('"')) { DataParse() } 
xrtu_a.push(url.split('#')[0]); xrt_a.push(xrt); if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item() } } } } // } else
}
// DataParse ==========================================================================================================
function DataParse() {
xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').split('\r\n'); 
var props = xrt[0].split('","'); var items = xrt.slice(1); var a_items = []; var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2]; var vals = items_i.split('","'); var a_vals = []; var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3]; a_vals.push('"' + props[i3] + '":"' + vals[i3].replace(/""/g,'"').replace(/"/g,'\\"') + '"') }; a_items.push('"' + vals[0] + '":{"id_":"' + vals[0] + '",' + a_vals.join(',') + '}') }; 
xrt = '{' + a_items.join(',') + '}'; xrt = xrt.replace(/\,\"\"\:\"\"/g,''); xrt = JSON.parse(xrt);
}
// misc ===============================================================================================================
function cl(vlu) { console.log(vlu) }
function vl(vbl,vlu) { console.log(vbl + ': ' + vlu) }
function jl(vlu) { console.log(JSON.stringify(vlu)) }
function HasVal(vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj(vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }
//var e_gscript = document.querySelector('div[data-code*="data-site"]'); if ( HasObj(e_gscript) ) { var e_gsite = e_gscript.dataset['code'].match(/data\-site\=\".+?\"/g)[0].split('"')[1]; };
