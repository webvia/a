var win = window; var his = win.history; var loc = win.location; var doc = win.document; var head = doc.head; var body = doc.body; // win,his,loc,doc,head,body
body.insertAdjacentHTML('afterbegin', '<div id="e-_page"></div>'); var e_page = doc.getElementById('e-_page'); 
var u_loc; var u_par; var u_site; var u_path; var u_page_item; var u_page; var u_item; // location url  u_path(u_path_pre__u_page_item(u_page--u_item))
var pages_u; var contents_u; var pages; var contents; var p_all; var p_home; // site
var p_group; var p_group_header; var p_group_footer; var p_group_top; var p_group_bottom; var p_group_left; var p_group_right; // p_group
var page; var page_path; var page_title; var page_description; var page_icon; var page_group; var page_main; var page_data; // page
var item_x; var rep_x; var rep_d; var rep_match; var rep_item_id; var rep_ref; var rep_cont; var rep_html; // rep
var xrt; var xrt_a = []; var xrtu_a = []; var html; var path_sep = '__'; var item_sep = '--'; var gsu1; var gsu2; // misc
//
// Load ---------------------------------------------------------------------------------------------------------------
win.onload = function() { Load() }; win.onpopstate = function() { Load() };
function Load() {
var e_main_script = body.querySelector('script[data-site]'); if ( e_main_script !== undefined && e_main_script !== null ) { var e_site = e_main_script.dataset['site'] };
u_loc = new URL(loc); u_par = u_loc.searchParams; u_path = u_par.get('page'); u_site = u_par.get('site');
gsu1 = 'https://docs.google.com/spreadsheets/d/'+ u_site +'/gviz/tq?tqx=out:csv&sheet='; gsu2 = '&headers=1&tq=select+%2A';
pages_u = gsu1 + 'pages' + gsu2; contents_u = gsu1 + 'contents' + gsu2; 
if ( HasVal(u_site) && u_site.includes('.') ) { var u_site_x = u_site } else { var u_site_x = pages_u } 
if ( HasVal(u_site_x) ) { var site_ref = u_site_x } else if ( HasVal(e_site) ) { var site_ref = e_site } else { return }; 
if (pages == undefined) { DataGet('pages', site_ref) } else { Page() }
}
// Link ---------------------------------------------------------------------------------------------------------------
function Link(evt) {
evt.preventDefault(); his.pushState(null, null, evt.target.href); win.dispatchEvent(new Event('popstate')); // update page url
}
// DataGet ------------------------------------------------------------------------------------------------------------
function DataGet(type, url) {
if (type === '' || url === '') { cl('no type/url'); return }
var xrt_i = -1; var len = xrtu_a.length; for (var i = 0; i < len; i++) { var xrtu = xrtu_a[i]; if (url.split('#')[0] === xrtu) { xrt_i = i; xrt = xrt_a[i]; break } } // }if }for
if (xrt_i !== -1) { if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item('item') } 
} // }if
else { var xhr = new XMLHttpRequest(); xhr.open("GET", url, true); xhr.send(); xhr.onreadystatechange = function() { if (xhr.readyState === 4 && xhr.status === 200) { xrt = xhr.responseText; if (xrt.startsWith('"<') || xrt.startsWith('"/*')) { xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'').replace(/\"\,\"/g,'').replace(/""/g,'"') } else if (xrt.startsWith('"')) { DataParse() } 
xrtu_a.push(url.split('#')[0]); xrt_a.push(xrt); if (type === 'pages') { Pages() } else if (type === 'contents') { Contents() } else if (type === 'cont') { Conts('cont') } else if (type === 'rep') { Reps('rep') } else if (type === 'item') { Item('item') } } } 
} // }else
}
// DataParse ----------------------------------------------------------------------------------------------------------
function DataParse() {
xrt = xrt.replace(/^\"/,'').replace(/\"$/,'').replace(/\"\n\"/g,'\r\n').split('\r\n'); 
var props = xrt[0].split('","'); 
var items = xrt.slice(1); var a_items = []; var items_len = items.length; for (var i2 = 0; i2 < items_len; i2++) { var items_i = items[i2]; 
var vals = items_i.split('","'); var a_vals = []; var vals_len = vals.length; for (var i3 = 0; i3 < vals_len; i3++) { var vals_i = vals[i3]; a_vals.push('"' + props[i3] + '":"' + vals[i3].replace(/""/g,'"').replace(/"/g,'\\"') + '"') }; a_items.push('"' + vals[0] + '":{"id_":"' + vals[0] + '",' + a_vals.join(',') + '}') }; 
xrt = '{' + a_items.join(',') + '}'; xrt = xrt.replace(/\,\"\"\:\"\"/g,''); xrt = JSON.parse(xrt);
}
// Site ---------------------------------------------------------------------------------------------------------------
function Pages() { pages = xrt; p_home = pages['_home']; p_all = pages['_all']; DataGet('contents', contents_u); }
function Contents() { contents = xrt; Page(); }
//
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
page_path = page.path; page_data = page.data; page_group = page.group; page_main = page.main; // page vals
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
html = '<header id="e-_header">'+ p_group_header +'</header><div id="e-_middle"><div id="e-_center"><div id="e-_top">'+ p_group_top +'</div><main id="e-_main">'+ page_main +'</main><div id="e-_bottom">'+ p_group_bottom +'</div></div "e-_center"><div id="e-_left">'+ p_group_left +'</div><div id="e-_right">'+ p_group_right +'</div></div "e-_middle"><footer id="e-_footer">'+ p_group_footer +'</footer><template id="e-_head"><title id="e-_title">'+ page_title +'</title><link id="e-_icon" rel="shortcut icon" href="'+ page_icon +'"/><meta id="e-_desc" name="description" content="'+ page_description +'"/><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="main.css"/><link rel="stylesheet" href="'+ site_style_file +'"/><style>'+ site_style_sheet +'</style><link rel="stylesheet" href="'+ ps_style_file +'"/><style>'+ ps_style_sheet +'</style></template>';
Conts();
}
// Conts --------------------------------------------------------------------------------------------------------------
var cont_match; var cont_ref;
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
} // }if remote
else if (resp === 'local') {
var content = contents[cont_ref]; var cont_main = content.main; var cont_data = content.data; var cont_before = content.before; var cont_after = content.after; 
var cont_html_loc = cont_main; 
if (HasVal(cont_data)) { cont_html_loc = '(`(#' + cont_ref + ')'+ cont_html_loc +'`)' } // for reps  // (`(#cont_id)...<html>...`)
if (HasVal(cont_before)) { cont_html_loc = cont_before + cont_html_loc } 
if (HasVal(cont_after)) { cont_html_loc = cont_html_loc + cont_after } 
html = html.replace(cont_match, cont_html_loc);
} // }if local
Embeds(); // for g doc
} // }if resp --------------------------------
var cont_matches = html.match(/\(\`[\@\#].+?\)/g); // (`@html_file#elem_id) or (`#cont_id)
if (cont_matches !== null) {
cont_match = cont_matches[0];
cont_ref = cont_match.substring(3, cont_match.length-1);
if (cont_match.startsWith('(`@')) { 
// add stuff for g sheet
if ( !cont_ref.startsWith('http') ) { var cont_ref_a = cont_ref.split('#'); cont_ref = gsu1 + cont_ref_a[0] + gsu2 + '#' + cont_ref_a[1] }
DataGet('cont', cont_ref) } 
else if (cont_match.startsWith('(`#')) { Conts('local') }
} // }if cont_matches
else { Reps() }
}
// Reps ---------------------------------------------------------------------------------------------------------------
function Reps(resp) {
if (resp !== undefined) {
var cont_between = rep_cont.between.split('``'); var cont_begin = cont_between[0]; var cont_middle = cont_between[1]; var cont_end = cont_between[2];
var rep_html_rep = ''; 
rep_d = xrt;
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
Props('rep');
rep_html_rep = rep_html_rep + rep_x;
item_x_id_prev_len = item_x_id_len;
} // }items for-in
rep_html_rep = cont_begin + rep_html_rep + cont_end;
html = html.replace(rep_match, rep_html_rep);
} // }if resp ------------------------------------------------------
var rep_matches = html.match(/\(\`\(\#.+?\).+?\`\)/g); // (`(#rep_cont_id)...rep_html...`)
if (rep_matches !== null) { 
rep_match = rep_matches[0];
var rep_cont_id = rep_match.substring(4, rep_match.indexOf(')'));
rep_html = rep_match.substring(rep_match.indexOf(')')+1, rep_match.length-2);
rep_cont = contents[rep_cont_id];
rep_ref = rep_cont.data;
if ( rep_ref.startsWith('http') ) {  } // not in these sheets
else if ( rep_ref.includes('#') ) { var rep_ref_a = rep_ref.split('#'); rep_ref = gsu1 + rep_ref_a[0] + gsu2 + '+where+' + encodeURIComponent(rep_ref_a[1]) } // query a sheet
else { rep_ref = gsu1 + rep_ref + gsu2; } // whole sheet
DataGet('rep', rep_ref);
} // }if matches
else { Item() }
}
// Item ---------------------------------------------------------------------------------------------------------------
function Item(resp) {
if (resp !== undefined) {
item_x = xrt[u_item];
Props('item');
} // }if resp --------------------------------------------
if (resp === undefined && HasVal(page_data)) {
if ( page_data.startsWith('http') ) { page_data = page_data.replace('(`$id_)', u_item); } // not in these sheets
else { page_data = gsu1 + page_data + gsu2 + '+where+' + encodeURIComponent("A = '"+ u_item +"'") } // query a sheet
DataGet('item', page_data);
} // }if page_data
else { Html() }
}
// Props --------------------------------------------------------------------------------------------------------------
function Props(type) {
if (type==='rep') { var props = rep_x.match(/\(\`\$.+?\)/g) } else if (type==='item') { var props = html.match(/\(\`\$.+?\)/g) }
if (props !== null) { var props_len = props.length; for (var i = 0; i < props_len; i++) { var props_i = props[i]; var prop = props_i.substring(3, props_i.length-1);
if (type==='rep') { rep_x = rep_x.replace(props_i, item_x[prop]) } else if (type==='item') { html = html.replace(props_i, item_x[prop]) }
} } // }for }if
}
// Embeds -------------------------------------------------------------------------------------------------------------
function Embeds() {
var embds = html.match(/<\!DOCTYPE html>.+?<\/html>/g); if (embds !== null) { var embds_len = embds.length; for (var i = 0; i < embds_len; i++) { var embd = embds[i]; var gdoc_cont = embd.match(/<div id\=\"contents\">.+?<\/div>/g); html = html.replace(embd, gdoc_cont) } } // }for }if
}
// Html ---------------------------------------------------------------------------------------------------------------
function Html() {
e_page.innerHTML = ''; e_page.insertAdjacentHTML('afterbegin', html); 
var e_head = doc.getElementById('e-_head'); var head_html = e_head.innerHTML; head.innerHTML = ''; head.insertAdjacentHTML('afterbegin', head_html); e_head.parentNode.removeChild(e_head);
//
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
		} // }if path not null
	} // }else if not home
	lnk.href = lnk_h;
	lnk.addEventListener('click', Link, false);
} // }if has lnk_p
else { lnk.target = '_blank' } // no lnk_p
} // }for links
}
// misc ---------------------------------------------------------------------------------------------------------------
function cl(vlu) { console.log(vlu) }
function jl(vlu) { console.log(JSON.stringify(vlu)) }
function HasVal(vbl) { if (vbl !== undefined && vbl !== null && vbl !== '') { return true } else { return false } }
function HasObj(vbl) { if (vbl !== undefined && vbl !== null) { return true } else { return false } }