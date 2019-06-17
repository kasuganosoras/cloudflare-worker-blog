// 定义 Github 项目，文章会从这里读取
const github_base = "kasuganosoras/frp-blog";

// 设置站点信息
var default_title	 = "SakuraFrp Blog - 樱花内网穿透官方博客";					// 站点标题（显示在浏览器标题栏）
var default_intitle	 = "SakuraFrp Blog";								// 站点名称（显示在首页）
var default_description  = "欢迎访问 Sakura Frp 官方博客，本博客分享与 Frp 相关的技术以及记录一些日常。"; 	// 站点简介，有利于 SEO
var site_domain		 = "blog.natfrp.org";								// 站点域名
var site_subtitle	 = "樱花内网穿透官方博客";							// 站点副标题
var site_favicon	 = "https://cn.tql.ink:4443/gitea/img/favicon.png";				// 站点 Logo

// 博主信息
var owner_name = "Akkariin";									// 博主名字
var owner_logo = "https://secure.gravatar.com/avatar/80962ca1ced98d0e679b2bc315d049f2?s=256"	// 博主头像
var owner_desc = "鸽子王/咸鱼/phper，日常水贴摸鱼，佛系出租服务器";					// 博主简介

// 设置站点资源文件地址
var css_bootstrap	 = "https://cn.tql.ink:4443/css/bootstrap.min.css";	// Boostrap css 文件地址
var css_hljs_github   = "https://cn.tql.ink:4443/css/highlight.js/github.css";  // Highlight js css 地址
var js_jquery		 = "https://cn.tql.ink:4443/js/jquery.min.js";		// JQuery 地址
var js_bootstrap	= "https://cn.tql.ink:4443/js/bootstrap.min.js";	// Bootstrap 地址
var js_instantclick   = "https://cn.tql.ink:4443/js/instantclick.min.js";	// InstantClick 地址
var js_showdown	 = "https://cn.tql.ink:4443/js/showdown.min.js";		// Showdown 地址
var js_showdown_table = "https://cn.tql.ink:4443/js/showdown-table.min.js";	// Showdown table 地址
var js_highlight	= "https://cn.tql.ink:4443/js/highlight.min.js";	// Highlight 地址
var js_highlight_pack = "https://cn.tql.ink:4443/js/highlight.pack.js";		// Highlight pack 地址

// 这是一些临时变量，无需修改
var title = "";
var intitle = "";
var title2 = "";
var description = "";
var ctime = "unknown";
var isunknown = "";

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

var header = `<!DOCTYPE HTML>
<!-- 由 CloudFlare Workers Blog 强力驱动 -->
<!-- SakuraFrp Blog 模板 1.0 by Akkariin -->
<html lang="zh_CN">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=11">
		<meta name="application-name" content="SakuraFrp Blog">
		<meta name="msapplication-TileColor" content="#F1F1F1">
		<link rel="shortcut icon" href="${site_favicon}" />
		<meta name="description" content="{description}">
		<link rel="stylesheet" href="${css_bootstrap}" crossorigin="anonymous">
		<link rel="stylesheet" href="${css_hljs_github}">
		<title>{title}{title_2}</title>
		<style type="text/css">.pageid{margin-bottom:-26px}code{color:#484848;background-color:#f5f5f5;border-radius:0px;border:1px solid #dadada;}pre>code{color:unset;background-color:unset;border-radius:unset;border:0px;}.post-a {color: #000;text-decoration: none ! important;}.post-box {padding: 12px 20px 12px 20px;border-bottom: 1px solid rgba(0,0,0,0.07);cursor: pointer;border-left: 0px solid rgba(66, 66, 66, 0);transition-duration: 0.3s;}.post-box:hover {transition-duration: 0.3s;border-left: 5px solid rgba(66, 66, 66, 0.15);}.thread h2 {border-bottom: 1px solid rgb(238,238,238);padding-bottom: 10px;}.editor-preview pre, .editor-preview-side pre{padding: 0.5em;}.hljs{background: unset ! important;padding: 0px;}.CodeMirror{height: calc(100% - 320px);min-height: 360px;}.msgid{font-family:Consolas;}.tooltip {word-break: break-all;}h2 a{font-weight: 400;}body{/*background:url(https://i.natfrp.org/cbf5973ce9da283bc9abe307cdea7f30.jpg);*/font-family:'-apple-system','BlinkMacSystemFont','Segoe UI','Helvetica','Arial','sans-serif','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol' ! important;font-weight:400;background-attachment:fixed;background-size:cover;background-repeat:no-repeat;background-position:center;}h2 a{color: #000;} h2 a:hover{color: #000; text-decoration: none;}.full-width{width: 100%;}.thread img{vertical-align:text-bottom ! important;max-width:100% ! important;margin-top:8px;margin-bottom:8px;}.thread table{display:block;width:100%;overflow:auto;margin-bottom:8px;}.thread table tr{background-color:#fff;border-top:1px solid #c6cbd1;}.thread table tr:nth-child(2n){background-color:#f7f7f7;}.thread table th,.thread table td{padding:10px 12px 0px 12px;border:1px solid #dfe2e5;font-size:14px;}.thread table th {padding-bottom: 10px;background: #f7f7f7;}.thread pre{margin-bottom:16px;}pre{border:none ! important;}blockquote{font-size:15px ! important;}@media screen and(max-width:768px){.copyright{text-align:center;}}</style>
		<script>
			var _hmt = _hmt || [];
			(function() {
			var hm = document.createElement("script");
			hm.src = "https://hm.baidu.com/hm.js?b1f3cc985ea87c4141634fa0572a1612";
			var s = document.getElementsByTagName("script")[0]; 
			s.parentNode.insertBefore(hm, s);
			})();
		</script>
	</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<h2><a href="/" class="post-a">{intitle}</a></h2>
					<p>${site_subtitle}</p>
					<hr>
				</div>
				<div class="col-sm-9">
					<div class="thread">
						`;

var modifyHeader = {};
var cookieText = "";

function getRequestParams(str) {
	var index = str.indexOf("?");
	str = str.substring(index + 1, str.length);
	if(typeof(str) == "string"){
		u = str.split("&");
		var get = {};
		for(var i in u){
			var j = u[i].split("=");
			get[j[0]] = j[1];
		}
		return get;
	} else {
		return {};
	}
}

async function bloghandle(request) {
	var cookie = {};
	var clist = undefined;
	try {
		cookieText.split(';').forEach(l => {
			var parts = l.split('=');
			cookie[parts[0].trim()] = unescape((parts[1] || '').trim());
		});
	} catch(e) {
		// 无可奉告
	}
	var $_GET = getRequestParams(request.url);
	var urls = new URL(request.url);
	var data = header;
	if(urls.pathname == "/") {
		var url = "https://raw.githubusercontent.com/" + github_base + "/master/list.json";
		const init = {
		method: "GET"
		};
		const response = await fetch(url, init);
		var resptxt = await response.text();
		if(cookie['list'] == undefined) {
			var Days = 30; 
			var exp = new Date(); 
			exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			modifyHeader = {
				"Set-Cookie" : "list="+ escape (resptxt) + ";expires=" + exp.toGMTString()
			};
		}
		var json = JSON.parse(resptxt);
		// console.log(json);
		data += `<p>所有文章</p>
						`;
		var before_page = 0;
		var current_page = 1;
		var next_page = 2;
		var pagenow = json.length;
		var pageval = json.length - 5;
		if($_GET['p'] != undefined && $_GET['p'] != "") {
			pageval = json.length - (parseInt($_GET['p']) * 5);
			pagenow = json.length - ((parseInt($_GET['p']) - 1) * 5) - 1;
			next_page = parseInt($_GET['p']) + 1;
			current_page = parseInt($_GET['p']);
			before_page = parseInt($_GET['p']) - 1;
		}
		console.log(pageval);
		var update_i = 0;
		for(var i = pagenow;i >= pageval;i--) {
		try {
			var tmpfilename = encodeURIComponent(json[i].file
			.replace(/"/g, "").replace(/posts\//ig, "").replace(/\.md/ig, ""));
			var tmptime = json[i].time;
			var tmptitle = json[i].title;
			data += `<a href="/${tmpfilename}" class="post-a">
							<div class="post-box">
								<h4>${tmptitle}</h4>
								<p>发表于 ${tmptime}</p>
							</div>
						</a>
						`;
			update_i++;
		} catch(e) {
			// 收声
		}
		}
		console.log(update_i);
		if(update_i == 0) {
		data += `<p><blockquote>暂时没有文章！</blockquote></p>
				`
		}
		data += `<br>
						<p class="text-left pageid">当前在第 ${current_page} 页</p>
						<p class="text-right">
							`;
		if(current_page > 1) {
		data += `<a href="/?p=${before_page}"><button class="btn btn-default">上一页</button></a>&nbsp; &nbsp;`;
		}
		if(update_i >= 5) {
		data += `<a href="/?p=${next_page}"><button class="btn btn-default">下一页</button></a>`;
		}
		data += `
						</p>
					</div>
				`;
		title = default_title;
		intitle = default_intitle;
		title2 = "";
	} else {
		var uname = unescape("posts" + urls.pathname + ".md");
		try {
		clist = cookie['list'];
		} catch(e) {
		var url = "https://raw.githubusercontent.com/" + github_base + "/master/list.json";
		const init = {
			method: "GET"
		};
		const response = await fetch(url, init);
		clist = await response.text();
		}
		if(clist != undefined) {
			try {
				var json = JSON.parse(clist);
				var found = false;
				for(var i in json) {
					tmpfilename = json[i].file.replace(/"/g, "");
					tmptime = json[i].time;
					tmptitle = json[i].title;
					if(tmpfilename == uname) {
						title = tmptitle;
						intitle = tmptitle;
						ctime = tmptime;
						found = true;
					}
				}
				if(!found) {
					var url = "https://raw.githubusercontent.com/" + github_base + "/master/list.json";
					const init = {
						method: "GET"
					};
					const response = await fetch(url, init);
					clist = await response.text();
					var json = JSON.parse(clist);
					for(var i in json) {
						tmpfilename = json[i].file.replace(/"/g, "");
						tmptime = json[i].time;
						tmptitle = json[i].title;
						if(tmpfilename == uname) {
							title = tmptitle;
							intitle = tmptitle;
							ctime = tmptime;
						}
					}
					var Days = 30; 
					var exp = new Date(); 
					exp.setTime(exp.getTime() + Days*24*60*60*1000); 
					modifyHeader = {
						"Set-Cookie" : "list="+ escape (clist) + ";expires=" + exp.toGMTString()
					};
				}
			} catch(e) {
				// 收声
			}
		} else {
			var url = "https://raw.githubusercontent.com/" + github_base + "/master/list.json";
			const init = {
				method: "GET"
			};
			const response = await fetch(url, init);
			var clist = await response.text();
			var json = JSON.parse(clist);
			for(var i in json) {
				tmpfilename = json[i].file.replace(/"/g, "");
				tmptime = json[i].time;
				tmptitle = json[i].title;
				if(tmpfilename == uname) {
					title = tmptitle;
					intitle = tmptitle;
					ctime = tmptime;
				}
			}
			var Days = 30; 
			var exp = new Date(); 
			exp.setTime(exp.getTime() + Days*24*60*60*1000); 
			modifyHeader = {
				"Set-Cookie" : "list="+ escape (clist) + ";expires=" + exp.toGMTString()
			};
		}
		data += `</div>
						<p class="text-center{isunknown}"><small>发表于 ${ctime}</small></p>
						<textarea id="textdata" style="display: none;">`;
		var url = "https://raw.githubusercontent.com/" + github_base + "/master/posts" + urls.pathname + ".md";
		const init = {
			method: "GET"
		};
		const response = await fetch(url, init);
		if(response.status == 200) {
			var resptxt = await response.text();
			data += resptxt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			description = resptxt.substring(0, 128).replace(/"/ig, "").replace(/\n/g, " ");
			data += `</textarea>
					<hr>
					<div id="comments">评论区加载中 qwq</div>
				`;
		} else {
			data += `### 404 Not Found
未找到您访问的页面，原因可能是：
- 该文章已被删除
- 该文章已经更改名称
- 您输入的链接不正确

<a href="/">返回 ${default_intitle} 首页</a>
					</textarea>
				`;
			title = `404 Not Found`;
			title2 = ` - ${default_title}`;
			intitle = `未找到指定的页面`;
			description = ``;
			isunknown = " hidden";
		}
		title2 = ` - ${default_title}`;
	}
	data += `</div>
				<div class="col-sm-3">
					<div style="padding: 16px;text-align: center;">
						<img src="${owner_logo}" style="max-width: 220px;width: 100%;border-radius: 50%;">
						<h3>${owner_name}</h3>
						<p class="text-left">${owner_desc}</p>
						<hr>
						<div class="text-left">
							<h4>友情链接</h4>
							<p><a href="https://www.natfrp.org/" target="_blank">Sakura Frp</a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
				<p>Powered by CloudFlare Workers | <a href="https://github.com/kasuganosoras/cloudflare-worker-blog" target="_blank">Github</a></p>
				<p>&copy; 2019 ${default_intitle}</p>
				<br><br>
				</div>
			</div>
		</div>
		<script src="${js_jquery}"></script>
		<script src="${js_bootstrap}" crossorigin="anonymous"></script>
		<script src="${js_instantclick}" data-no-instant></script>
		<script src="${js_showdown}" type="text/javascript"></script>
		<script src="${js_showdown_table}" type="text/javascript"></script>
		<script src="${js_highlight}"></script>
		<script src="${js_highlight_pack}"></script>
		<script src="https://comments.natfrp.org/comments.js?s=2"></script>
		<script type="text/javascript">
			var init = {
			site: "${site_domain}",
			cid: "posts${urls.pathname}.md"
			};
			hljs.initHighlightingOnLoad();
			var md = new showdown.Converter({extensions: ['table']});
			md.setOption('simplifiedAutoLink', true);
			md.setOption('simpleLineBreaks', true);
			md.setOption('openLinksInNewWindow', true);
			md.setOption('noHeaderId', true);
			window.onload = function() {
				try {
					$(".thread").html(md.makeHtml($("#textdata").val()));
					document.querySelectorAll('pre code').forEach(function(e) {
						hljs.highlightBlock(e);
					});
					CommentsInit(comments, init);
				} catch(e) {}
			}
		</script>
		<script data-no-instant>
			InstantClick.init();
			InstantClick.on('change', function() {
				try {
					$(".thread").html(md.makeHtml($("#textdata").val()));
					document.querySelectorAll('pre code').forEach(function(e) {
						hljs.highlightBlock(e);
					});
					CommentsInit(comments, init);
				} catch(e) {}
			});
		</script>
	</body>
</html>
	`;
	data = data.replace(/\{title\}/ig, title)
		.replace(/\{intitle\}/ig, intitle)
		.replace(/\{title\_2\}/ig, title2)
		.replace(/\{isunknown\}/ig, isunknown)
		.replace(/\{description\}/ig, description);
	return data;
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
	if(new URL(request.url).protocol != "https:") {
		var rhttps = new Response("Location to https", {status: 301});
		rhttps.headers.set("Location", request.url.replace("http://", "https://"));
		return rhttps;
	}
	cookieText = request.headers.get("cookie");
	var resp = new Response(await bloghandle(request), {status: 200});
	resp.headers.set("Content-Type", "text/html");
	if(modifyHeader != undefined) {
		for(var index in modifyHeader) {
		resp.headers.set(index, modifyHeader[index]);
		}
	}
	return resp;
}
