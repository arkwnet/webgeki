function InitCommon(){
	document.title = "無題 - ウェブ撃";
	$("#colorTheme").val("rgb(63, 81, 181)");
	$("#hfTheme").val("rgb(255, 255, 255)");
	$("#mTheme").val("rgb(0, 0, 0)");
	$("#wsDescription").text("【ウェブサイトの説明文を入力】");
	$("#wsFooter").text("(c)2020 all rights reserved.");
	page.push(["トップページ","","<h1>ようこそ</h1>これはサンプルテキストです。編集時には削除して下さい。<hr>これはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストです","<h1>ようこそ</h1>これはサンプルテキストです。編集時には削除して下さい。<hr>これはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストです",1]);
}

function Initialize(){
	if(window.confirm("編集途中のデータは破棄されます。よろしいですか?")){
		site_name = "【ウェブサイトの名前を入力】";
		keyword = "";
		access_tag = "";
		memo = "";
		logo_img = "";
		logo_use = 0;
		bg_img = "";
		bg_use = 1;
		bg_use2 = 0;
		no_wide = 0;
		c_shadow = 0;
		c_margin = 0;
		default_color = "";
		default_hf = "";
		default_m = "";
		page = [];
		page_id = 0;
		page_dialog = 0;
		path = "";
		$(".webgeki-wrapper").css("width","1000px");
		$("#siteWidth").val("1000");
		$(".webgeki-main").css("font-family","GenShinGothic");
		$(".webgeki-header").css("text-align","left");
		$(".webgeki-footer").css("text-align","left");
		InitCommon();
		openPage(0);
	}
}

function fileOpen(){
	if(window.confirm("編集途中のデータは破棄されます。よろしいですか?")){
		dialog.showOpenDialog(remote.getCurrentWindow(), {
			properties: ["openFile"],
			title: "開く",
			defaultPath: ".",
			filters: [
				{name: "ウェブ撃 保存ファイル", extensions: ["webgeki"]}
			]
		}, filepaths=>{
			if(filepaths != undefined){
				if(filepaths.length != 0){
					// ファイル読み込み
					fs.readFile(filepaths[0], { encoding:"utf-8"}, (err, data)=>{
						if(err){
							showError(err);
						}else{
							var savedata = JSON.parse(data);
							keyword = savedata.ws_keyword;
							site_name = savedata.ws_name;
							$("#wsDescription").text(savedata.ws_description);
							access_tag = savedata.ws_access_tag;
							memo = savedata.ws_memo;
							logo_img = savedata.ws_logo_img;
							logo_use = savedata.ws_logo_use;
							bg_img = savedata.ws_bg_img;
							bg_use = savedata.ws_bg_use;
							bg_use2 = savedata.ws_bg_use2;
							no_wide = savedata.ws_no_wide;
							c_shadow = savedata.ws_c_shadow;
							c_margin = savedata.ws_c_margin;
							$("#wsFooter").html(savedata.ws_footer);
							$(".webgeki-wrapper").css("width",parseInt(savedata.ws_width));
							$("#siteWidth").val(""+parseInt(savedata.ws_width));
							$(".webgeki-main").css("font-family",savedata.ws_font);
							$(".webgeki-header").css("text-align",savedata.ws_align);
							$(".webgeki-footer").css("text-align",savedata.ws_align_footer);
							$("#colorTheme").val(savedata.ws_theme_color);
							$("#hfTheme").val(savedata.ws_theme_hf);
							$("#mTheme").val(savedata.ws_theme_m);
							page = savedata.ws_page;
							path = filepaths[0];
							update();
							openPage(0);
							document.title = ""+path+" - ウェブ撃";
						}
					});
				}
			}
		});
	}
}

function fileSave(){
	if(path == ""){
		fileSaveAs();
	}else{
		fileSaveProcess(path);
	}
}

function fileSaveAs(){
	dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: "名前を付けて保存",
		defaultPath: ".",
		filters: [
			{name: "ウェブ撃 保存ファイル", extensions: ["webgeki"]}
		]}, filename=>{
		if(filename){
			fileSaveProcess(filename);
		}
	});
}

function fileSaveProcess(a){
	savePage(page_id);
	var savedata = {
		information: "WEBGEKI Save File",
		version: 1,
		ws_name: site_name,
		ws_description: $("#wsDescription").text(),
		ws_keyword: keyword,
		ws_access_tag: access_tag,
		ws_memo: memo,
		ws_logo_img: logo_img,
		ws_logo_use: logo_use,
		ws_bg_img: bg_img,
		ws_bg_use: bg_use,
		ws_bg_use2: bg_use2,
		ws_no_wide: no_wide,
		ws_c_shadow: c_shadow,
		ws_c_margin: c_margin,
		ws_footer: $("#wsFooter").html(),
		ws_width: $(".webgeki-wrapper").css("width"),
		ws_font: $(".webgeki-main").css("font-family"),
		ws_align: $(".webgeki-header").css("text-align"),
		ws_align_footer: $(".webgeki-footer").css("text-align"),
		ws_theme_color: $("#colorTheme").val(),
		ws_theme_hf: $("#hfTheme").val(),
		ws_theme_m: $("#mTheme").val(),
		ws_page: page
	}
	fs.writeFile(a, JSON.stringify(savedata), "utf8", err=>{
		if(err){
			showError(err);
		}else{
			path = a;
			document.title = ""+path+" - ウェブ撃";
		}
	});
}

function selectLogoImage(){
	dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ["openFile"],
		title: "ロゴ画像を選択",
		defaultPath: ".",
		filters: [
			{name: "画像ファイル", extensions: ["jpg", "jpeg", "png", "gif", "bmp"]}
		]
	}, filepaths=>{
		if(filepaths != undefined){
			if(filepaths.length != 0){
				img = new Image();
				img.src = filepaths[0];
				img.onload = function(){
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					if(img.width > 600){
						bai = 600/img.width;
						ch = img.height * bai;
						canvas.width = 600;
						canvas.height = ch;
						ctx.drawImage(img, 0, 0, 600, ch);
					}else{
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img, 0, 0);
					}
					logo_img = canvas.toDataURL("image/png");
					$("#logoImageView").attr("src",logo_img);
				}
			}
		}
	});
}

function deleteLogoImage(){
	if(window.confirm("ロゴ画像を削除します。よろしいですか?")){
		logo_img = "";
		logo_use = 0;
		$("#logoImageView").attr("src","img/no_image.png");
		update();
	}
}


function selectBGImage(){
	dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ["openFile"],
		title: "背景画像を選択",
		defaultPath: ".",
		filters: [
			{name: "画像ファイル", extensions: ["jpg", "jpeg", "png", "gif", "bmp"]}
		]
	}, filepaths=>{
		if(filepaths != undefined){
			if(filepaths.length != 0){
				img = new Image();
				img.src = filepaths[0];
				img.onload = function(){
					var canvas = document.createElement("canvas");
					bai = 800/img.width;
					ch = img.height * bai;
					canvas.width = 800;
					canvas.height = ch;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, 800, ch);
					bg_img = canvas.toDataURL("image/png");
					update();
				}
			}
		}
	});
}

function deleteBGImage(){
	if(window.confirm("背景画像を削除します。よろしいですか?")){
		bg_img = "";
		update();
	}
}