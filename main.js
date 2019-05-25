var win = window; var his = win.history; var loc = win.location; var doc = win.document; var head = doc.head; var body = doc.body; // win,his,loc,doc,head,body
body.insertAdjacentHTML('afterbegin', '<div id="e-_page"></div>'); var e_page = doc.getElementById('e-_page'); // e_page
var u_loc; var u_par; var u_site; var u_path; var page_id; var item_id; var path_d; // url
var pages_u; var contents_u; var pages; var contents; var p_all; var p_home; // site def
var p_group; var p_group_header; var p_group_footer; var p_group_top; var p_group_bottom; var p_group_left; var p_group_right; // p_group
var page; var page_title; var page_description; var page_icon; var page_group; var page_main; var page_data; var page_item; // page
var html; var xrt; var xrt_a = []; var xrtu_a = []; var page_sep = '__'; var item_sep = '--'; var lev_sep = '..'; var cont_sep = '``'; var gsu1; var gsu2; // misc
//
// Load ---------------------------------------------------------------------------------------------------------------
win.onload = function() { Load() }; win.onpopstate = function() { Load() };
function Load() {
var e_script = body.querySelector('script[data-site]'); if ( HasObj(e_script) ) { var e_site = e_script.dataset['site'] };
u_loc = new URL(loc); u_par = u_loc.searchParams; u_site = u_par.get('site'); u_path = u_par.get('page');
gsu1 = 'https://docs.google.com/spreadsheets/d/'+ u_site +'/gviz/tq?tqx=out:csv&sheet='; gsu2 = '&headers=1&tq=select+%2A';
pages_u = gsu1 + 'pages' + gsu2; contents_u = gsu1 + 'contents' + gsu2; 
if ( HasVal(u_site) && u_site.startsWith('http') ) { var u_site_x = u_site } else { var u_site_x = pages_u } 
if ( HasVal(u_site_x) ) { var site_ref = u_site_x } else if ( HasVal(e_site) ) { var site_ref = e_site } else { return }; 
if (pages == undefined) { DataGet('pages', site_ref) } else { Page() }
}
// Site ---------------------------------------------------------------------------------------------------------------
function Pages() { pages = xrt; p_home = pages['Home']; p_all = pages['All']; DataGet('contents', contents_u); }
function Contents() { contents = xrt; Page(); }
//
// Page ---------------------------------------------------------------------------------------------------------------
function Page() {
// page_id, item_id
page_id = ''; item_id = ''; path_d = [];

if ( HasVal(u_path) ) {
var page_id_a = []; var item_id_a = []; 
var u_path_a = u_path.split(page_sep); 
for (var i of u_path_a) { page_id_a.push(i.split(item_sep)[0]); }
	page_id = page_id_a.join(page_sep);
	item_id_a = u_path.split(item_sep); item_id = item_id_a[item_id_a.length-1];

// build path
var path_x = u_path;
var path_x_len = path_x.replace(lev_sep, page_sep).split(page_sep).length;
for (var i2 = 0; i2 < path_x_len; i2++) {

	// path_x
	if ( path_x.includes(lev_sep) && path_x.includes(page_sep) && path_x.lastIndexOf(lev_sep) > path_x.lastIndexOf(page_sep) ) { 
		path_x = path_x.substring(0, path_x.lastIndexOf(lev_sep)); }
	else if ( path_x.includes(page_sep) ) { 
		path_x = path_x.substring(0, path_x.lastIndexOf(page_sep)); }
	else { path_x = path_x }


	// path_name
	if ( path_x.includes(lev_sep) && path_x.includes(item_sep) && path_x.lastIndexOf(lev_sep) > path_x.lastIndexOf(item_sep) ) { 
		var path_name = path_x.substring(path_x.lastIndexOf(lev_sep)+2) }
	else if ( path_x.includes(item_sep) && path_x.includes(page_sep) && path_x.lastIndexOf(item_sep) > path_x.lastIndexOf(page_sep) ) { 
		var path_name = path_x.substring(path_x.lastIndexOf(item_sep)+2) }
	else if ( path_x.includes(page_sep) ) { 
		var path_name = path_x.substring(path_x.lastIndexOf(page_sep)+2) }
	else { var path_name = path_x }

	path_d.push('"' + path_x + '","' + path_name + '"');
} //  } for
path_d.reverse();
path_d.unshift('"Home","Home"'); path_d.unshift('"path_id_","path_name_"');
path_d = path_d.join('\n');

} //  } u_path

//
if ( HasVal(page_id) ) { page = pages[page_id] } else { page = p_home }; // page obj
page_data = page.data; page_group = page.group; page_main = page.main; // page vals
//
if ( HasVal(page_main) && !page_main.includes('(`') ) { page_main = '(`#'+ page_main +')' }; 
// page or home vals
if(page.title !== '') { page_title = page.title } else { page_title = p_home.title }; if (page.icon !== '') { page_icon = page.icon } else { page_icon = p_home.icon }; if(page.description !== '') { page_description = page.description } else { page_description = p_home.description }; 
// p_group or site vals
if ( HasVal(page_group) ) { p_group = pages[page_group] }
// p_group obj,props
if ( HasVal(page_group) && HasVal(p_group.header) ) { p_group_header = p_group.header } else { p_group_header = p_all.header }; if ( !p_group_header.includes('(`') ) { p_group_header = '(`#'+ p_group_header +')' }; 
if ( HasVal(page_group) && HasVal(p_group.footer) ) { p_group_footer = p_group.footer } else { p_group_footer = p_all.footer }; if ( !p_group_footer.includes('(`') ) { p_group_footer = '(`#'+ p_group_footer +')' }; 
if ( HasVal(page_group) && HasVal(p_group.left) ) { p_group_left = p_group.left } else { p_group_left = p_all.left }; if ( !p_group_left.includes('(`') ) { p_group_left = '(`#'+ p_group_left +')' }; 
if ( HasVal(page_group) && HasVal(p_group.right) ) { p_group_right = p_group.right } else { p_group_right = p_all.right }; if ( !p_group_right.includes('(`') ) { p_group_right = '(`#'+ p_group_right +')' }; 
if ( HasVal(page_group) && HasVal(p_group.top) ) { p_group_top = p_group.top } else { p_group_top = p_all.top }; if ( !p_group_top.includes('(`') ) { p_group_top = '(`#'+ p_group_top +')' }; 
if ( HasVal(page_group) && HasVal(p_group.bottom) ) { p_group_bottom = p_group.bottom } else { p_group_bottom = p_all.bottom }; if ( !p_group_bottom.includes('(`') ) { p_group_bottom = '(`#'+ p_group_bottom +')' }; 
if ( HasVal(page_group) && HasVal(p_group.style) ) { p_group_style = p_group.style } else { p_group_style = p_all.style }; 
// styles
var site_style = p_all.style; var site_style_file = ''; var site_style_sheet = ''; if (!HasVal(site_style)) {} else if ( site_style.startsWith('http') ) { site_style_file = site_style } else { site_style_sheet = '(`@' + gsu1 + site_style + gsu2 + ')' }
var ps_style = p_group_style; var ps_style_file = ''; var ps_style_sheet = ''; if (!HasVal(ps_style)) {} else if ( ps_style.startsWith('http') ) { ps_style_file = site_style } else { ps_style_sheet = '(`@' + gsu1 + ps_style + gsu2 + ')' }
// html
html = '<header id="e-_header">'+ p_group_header +'</header><div id="e-_middle"><div id="e-_center"><div id="e-_top">'+ p_group_top +'</div><main id="e-_main">'+ page_main +'</main><div id="e-_bottom">'+ p_group_bottom +'</div></div "e-_center"><div id="e-_left">'+ p_group_left +'</div><div id="e-_right">'+ p_group_right +'</div></div "e-_middle"><footer id="e-_footer">'+ p_group_footer +'</footer><template id="e-_head"><title>'+ page_title +'</title><link rel="shortcut icon" href="'+ page_icon +'"/><meta name="description" content="'+ page_description +'"/><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="main.css"/><link rel="stylesheet" href="'+ site_style_file +'"/><style>'+ site_style_sheet +'</style><link rel="stylesheet" href="'+ ps_style_file +'"/><style>'+ ps_style_sheet +'</style></template>';
// get page data
if (HasVal(page_data)) {
if ( page_data.startsWith('http') ) { page_data = page_data.replace('(`$id_)', item_id); } // not in these sheets
else { page_data = gsu1 + page_data + gsu2 + '+where+' + encodeURIComponent("A = '"+ item_id +"'") } // query a sheet
DataGet('item', page_data);
} // }if page_data
else { Conts() }
}
// Item ---------------------------------------------------------------------------------------------------------------
function Item() {
page_item = xrt[item_id];
Conts();
}
// Conts --------------------------------------------------------------------------------------------------------------
var cont_match; var cont_ref; // cont

function Conts(resp) {
if (resp !== undefined) {
if (resp === 'cont') {
if (cont_ref.includes('#')) { var cont_ref_id = cont_ref.split('#')[1].replace(/\-/g,'\\-').replace(/\_/g,'\\_');
var cont_regexp_str = '\\<\\!\\-\\-\\(\\#\\`' + cont_ref_id + '\\)\\-\\-\\>.+?\\<\\!\\-\\-\\(\\%\\`' + cont_ref_id + '\\)\\-\\-\\>';
var cont_regexp = new RegExp(cont_regexp_str, 'g');
var cont_html_rem = xrt.replace(/\r\n/g, '').replace(/\t/g, '').match(cont_regexp)[0]; // <!--(#`cont_ref_id)-->...<!--(%`cont_ref_id)-->
html = html.replace(cont_match, cont_html_rem);
}
else { html = html.replace(cont_match, xrt); }
} // } if remote
else if (resp === 'local') {
var content = contents[cont_ref]; var cont_main = content.main; var cont_data = content.data; var cont_before = content.before; var cont_after = content.after; 
var cont_html_loc = cont_main; 
if (HasVal(cont_data)) { cont_html_loc = '(`(#' + cont_ref + ')'+ cont_html_loc +'`)' } // for reps: (`(#cont_id)...<html>...`)
if (HasVal(cont_before)) { cont_html_loc = cont_before + cont_html_loc } 
if (HasVal(cont_after)) { cont_html_loc = cont_html_loc + cont_after } 
html = html.replace(cont_match, cont_html_loc);
} // } if local
Embeds(); // for g doc
} // } if resp --------------------------------
var cont_matches = html.match(/\(\`[\@\#].+?\)/g); // (`@html_file#elem_id) or (`#cont_id)
if (cont_matches !== null) {
	cont_match = cont_matches[0];
	cont_ref = cont_match.substring(3, cont_match.length-1);
if (cont_match.startsWith('(`@')) { 
// add stuff for g sheet
if ( !cont_ref.startsWith('http') ) { var cont_ref_a = cont_ref.split('#'); cont_ref = gsu1 + cont_ref_a[0] + gsu2 + '#' + cont_ref_a[1] }
DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`#')) { Conts('local') }
} // } if cont_matches
else { Reps() }
}
// Reps ---------------------------------------------------------------------------------------------------------------
var rep_item; var rep_x; var rep_match; var rep_item_id; var rep_ref; var rep_cont; var rep_html; // rep

function Reps(resp) {

if (resp !== undefined) {
var rep_cont_between = rep_cont.between;

if ( HasVal(rep_cont_between) && rep_cont_between.includes(cont_sep) ) {
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
	} // } for in
} // } if tree

else {
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

// before, after
//var cont_before = rep_cont.before; var cont_after = rep_cont.after; if (HasVal(cont_before)) { rep_html_rep = cont_before + rep_html_rep }; if (HasVal(cont_after)) { rep_html_rep = rep_html_rep + cont_after } 

html = html.replace(rep_match, rep_html_rep);
//
} // } if resp ------------------------------------------------------
var rep_matches = html.match(/\(\`\(\#.+?\).+?\`\)/g); // (`(#rep_cont_id)...rep_html...`)
if (rep_matches !== null) { 
rep_match = rep_matches[0];
var rep_cont_id = rep_match.substring(4, rep_match.indexOf(')'));
rep_html = rep_match.substring(rep_match.indexOf(')')+1, rep_match.length-2);
rep_cont = contents[rep_cont_id];
rep_ref = rep_cont.data;

if ( rep_ref === 'path_' && path_d !== [] && HasVal(u_path) ) { xrt = path_d; DataParse(); Reps('rep'); }
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
// Props --------------------------------------------------------------------------------------------------------------
function Props(type) {
if (type==='rep') { var props = rep_x.match(/\(\`\$.+?\)/g) } else if (type==='item') { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type==='rep') { rep_x = rep_x.replace(props_i, rep_item[prop]) } else if (type==='item') { html = html.replace(props_i, page_item[prop]) }
} } // } for } if
}
// Embeds -------------------------------------------------------------------------------------------------------------
function Embeds() {
var embds = html.match(/<\!DOCTYPE html>.+?<\/html>/g); if (embds !== null) { var embds_len = embds.length; for (var i = 0; i < embds_len; i++) { var embd = embds[i]; var gdoc_cont = embd.match(/<div id\=\"contents\">.+?<\/div>/g); html = html.replace(embd, gdoc_cont) } } // } for } if
}
// Html ---------------------------------------------------------------------------------------------------------------
function Html() {
Props('item');
e_page.innerHTML = ''; e_page.insertAdjacentHTML('afterbegin', html); 
var e_head = doc.getElementById('e-_head'); var head_html = e_head.innerHTML; head.innerHTML = ''; head.insertAdjacentHTML('afterbegin', head_html); e_head.parentNode.removeChild(e_head);
//
// links --------------------------------------------
var lnks = e_page.getElementsByTagName('a'); var lnks_len = lnks.length; for (var i = 0; i < lnks_len; i++) {
var lnk = lnks[i];
var lnk_p = lnk.dataset['p'];
if (HasVal(lnk_p)) {
	var lnk_h = new URL(loc);
	if (lnk_p === 'Home') { lnk_h.searchParams.delete('page') } 
	else {
		var lnk_p_page = lnk_p.split(page_sep)[0]; lnk_p_page = lnk_p_page.split(item_sep)[0];
		var lnk_p_page_path = pages[lnk_p_page].path; 
		if (HasVal(lnk_p_page_path)) { lnk_h.searchParams.set('page', lnk_p_page_path + page_sep + lnk_p) }
		else { lnk_h.searchParams.set('page', lnk_p) }
		// get url path param to set attribute for nav-level styling
		if (u_path !== null) {
			if (u_path.includes(lnk_p) && !(u_path.endsWith(lnk_p))) { lnk.setAttribute('data-inpath','true'); }
			if (u_path.endsWith(lnk_p)) { lnk.setAttribute('data-inpath','true'); lnk.setAttribute('data-ispage','true'); lnk.setAttribute('aria-selected','true'); lnk.setAttribute('aria-current','page'); }
		} // } if path not null
	} // } else if not home
	lnk.href = lnk_h;
	lnk.addEventListener('click', Link, false);
} // } if has lnk_p
else { lnk.target = '_blank' } // no lnk_p
} // } for links
}
// Link ---------------------------------------------------------------------------------------------------------------
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// DataGet ------------------------------------------------------------------------------------------------------------
function DataGet(type, url) {
if (type === '') { console.log('no type to get'); return }; if (url === '') { console.log('no url to get'); return }
var xrt_i = -1; var len = xrtu_a.length; for (var i = 0; i < len; i++) { var xrtu = xrtu_a[i]; if (url.split('#')[0] === xrtu) { xrt_i = i; xrt = xrt_a[i]; break } } // } if } for
if (xrt_i !== -1) { if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item('item') } } // } if
else { var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { xrt = xhr.responseText; if (xrt.startsWith('"<') || xrt.startsWith('"/*')) { xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'').replace(/\"\,\"/g,'').replace(/""/g,'"') } else if (xrt.startsWith('"')) { DataParse() } 
xrtu_a.push(url.split('#')[0]); xrt_a.push(xrt); if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item() } } } } // } else
}
// DataParse ----------------------------------------------------------------------------------------------------------
function DataParse() {
xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').split('\r\n'); 
var props = xrt[0].split('","'); var items = xrt.slice(1); var a_items = []; var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2]; var vals = items_i.split('","'); var a_vals = []; var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3]; a_vals.push('"' + props[i3] + '":"' + vals[i3].replace(/""/g,'"').replace(/"/g,'\\"') + '"') }; a_items.push('"' + vals[0] + '":{"id_":"' + vals[0] + '",' + a_vals.join(',') + '}') }; 
xrt = '{' + a_items.join(',') + '}'; xrt = xrt.replace(/\,\"\"\:\"\"/g,''); xrt = JSON.parse(xrt);
}
// misc ---------------------------------------------------------------------------------------------------------------
function cl(vlu) { console.log(vlu) }
function vl(vbl,vlu) { console.log(vbl + ': ' + vlu) }
function jl(vlu) { console.log(JSON.stringify(vlu)) }
function HasVal(vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj(vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }
//var e_gscript = document.querySelector('div[data-code*="data-site"]'); if ( HasObj(e_gscript) ) { var e_gsite = e_gscript.dataset['code'].match(/data\-site\=\".+?\"/g)[0].split('"')[1]; };