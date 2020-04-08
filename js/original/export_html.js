function exportHTML(){
	dialog.showOpenDialog(remote.getCurrentWindow(), {
		properties: ["openDirectory"],
		title: "ウェブサイトの出力",
		defaultPath: ".",
		}, filepaths=>{
		if(filepaths.length != 0) {
			// ファイル読み込み
			if(!fs.existsSync(filepaths[0]+"\\css")){
				fs.mkdir(filepaths[0]+"\\css", function(err){});
			}
			generateCSS(filepaths[0]);
			for(var i = 0;  i < page.length;  i++){
				var html = "";
				html += "<!DOCTYPE html><html><head><title>";
				if(page[i][1] == ""){
					html += site_name;
				}else{
					html += page[i][0]+" - "+site_name;
				}
				html += "</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,user-scalable=no,maximum-scale=1\"><link rel=\"stylesheet\" href=\"css/style.css\">";
				if(keyword != ""){
					html += "<meta name=\"keywords\" content=\""+keyword+"\">";
				}
				html += ""+access_tag+"</head><body><div class=\"main\"><div class=\"header\"><div class=\"wrapper\">";
				if(page[i][1] != ""){
					html += "<a href=\"index.html\">";
				}
				if(logo_use == 1){
					html += "<h1><img src='"+logo_img+"'>";
				}else{
					html += "<h1>"+site_name;
				}
				html += "</h1>";
				if(page[i][1] != ""){
					html += "</a>";
				}
				html += "<h2>"+$("#wsDescription").text()+"</h2></div></div>";
				html += "<div class=\"contents\"><div class=\"wrapper\">";
				if(page[i][4] == 0){
					html += page[i][2];
				}
				if(page[i][4] == 1){
					html += "<div class=\"contents-right width-70\">"+page[i][3]+"</div>";
					html += "<div class=\"contents-left width-28\">"+page[i][2]+"</div>";
				}
				if(page[i][4] == 2){
					html += "<div class=\"contents-left width-49\">"+page[i][2]+"</div>";
					html += "<div class=\"contents-right width-49\">"+page[i][3]+"</div>";
				}
				if(page[i][4] == 3){
					html += "<div class=\"contents-left width-28\">"+page[i][2]+"</div>";
					html += "<div class=\"contents-right width-70\">"+page[i][3]+"</div>";
				}
				html += "</div></div><div class=\"footer\"><div class=\"wrapper\">"+$("#wsFooter").html()+"</div></div>";
				html += "</div></body></html>";
				if(page[i][1] == ""){
					fs.writeFile(filepaths[0]+"\\index.html", html, "utf8", function(err){});
				}else{
					fs.writeFile(filepaths[0]+"\\"+page[i][1]+".html", html, "utf8", function(err){});
				}
			}
		}
	});
}

function generateCSS(path){
	var css = "";
	css += "*{margin: 0;box-sizing: border-box;}";
	var hf_theme = "";
	if($("#hfTheme").val() == "theme"){
		hf_theme = $("#colorTheme").val();
	}else{
		hf_theme = $("#hfTheme").val();
	}
	if($("#mTheme").val() == "theme"){
		m_theme = $("#colorTheme").val();
	}else{
		m_theme = $("#mTheme").val();
	}
	if(bg_use == 0){
		css += "body{background-color: rgb(255,255,255);";
	}else{
		css += "body{background-color: "+$("#colorTheme").val()+";";
	}
	css += "font-size: 14px;line-height: 1.5;color: #212529;";
	var fontfamily = $(".webgeki-main").css("font-family");
	fontfamily = fontfamily.replace(/\"/g , "") ;
	if(fontfamily == "GenShinGothic"){ css += "font-family: 'Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','HiraKakuProN-W3','メイリオ',Meiryo,'ＭＳ Ｐゴシック',Osaka,sans-serif;"; }
	if(fontfamily == "Yu Gothic"){ css += "font-family: YuGothic,'Yu Gothic','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','HiraKakuProN-W3','メイリオ',Meiryo,'ＭＳ Ｐゴシック',Osaka,sans-serif;"; }
	if(fontfamily == "Meiryo"){ css += "font-family: 'メイリオ',Meiryo,'Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','HiraKakuProN-W3','ＭＳ Ｐゴシック',Osaka,sans-serif;"; }
	if(fontfamily == "MS PGothic"){ css += "font-family: 'ＭＳ Ｐゴシック','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','HiraKakuProN-W3',Osaka,sans-serif;"; }
	if(fontfamily == "Yu Mincho"){ css += "font-family: YuMincho,'Yu Mincho','Hiragino Mincho ProN','HiraMinProN-W3','ＭＳ Ｐ明朝',serif;"; }
	if(fontfamily == "MS PMincho"){ css += "font-family: 'ＭＳ Ｐ明朝','Hiragino Mincho ProN','HiraMinProN-W3',serif;"; }
	if(fontfamily == "Hiragino Kaku Gothic ProN"){ css += "font-family: 'Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','HiraKakuProN-W3','メイリオ',Meiryo,'ＭＳ Ｐゴシック',Osaka,sans-serif;"; }
	if(fontfamily == "Hiragino Mincho ProN"){ css += "font-family: 'Hiragino Mincho ProN','HiraMinProN-W3','ＭＳ Ｐ明朝',serif;"; }
	css += "}.main{";
	if(no_wide == 1){
		css += "width: "+(parseInt($(".webgeki-wrapper").css("width"))+50)+"px;margin: auto;";
	}
	if(c_shadow == 1){
		css += "box-shadow: 0 0 2px black;";
	}
	if(c_margin == 1){
		css += "margin-top: 15px;margin-bottom: 15px;padding: 15px;";
	}
	css += "}.wrapper{width: "+$(".webgeki-wrapper").css("width")+";margin: auto;overflow: hidden;}";
	css += "a{color: "+$("#colorTheme").val()+"}a:hover{opacity: 0.8;}";
	if(bg_img != ""){
		bg_tag = "background-image: url("+bg_img+");background-size: cover;";
	}else{
		bg_tag = "";
	}
	if(bg_use == 0){
		css += ".header,.header a{color: "+hf_theme+";position: relative;text-align: "+$(".webgeki-header").css("text-align")+";"+bg_tag+"}";
		css += ".footer{padding-top: 20px;padding-bottom: 20px;color: "+hf_theme+";text-align: "+$(".webgeki-header").css("text-align")+";}";
	}else{
		css += ".header,.header a{color: "+hf_theme+";position: relative;background-color: "+$("#colorTheme").val()+";text-align: "+$(".webgeki-header").css("text-align")+";"+bg_tag+"}";
		css += ".footer{padding-top: 20px;padding-bottom: 20px;background-color: "+$("#colorTheme").val()+";color: "+hf_theme+";text-align: "+$(".webgeki-header").css("text-align")+";}";
	}
	css += ".header a{text-decoration: none;}.header h1{padding-top: 40px;font-size: 36px;font-weight: normal;}.header h2{padding-top: 10px;padding-bottom: 40px;font-size: 18px;font-weight: normal;}";
	css += ".contents {padding-top: 30px;padding-bottom: 30px;overflow: hidden;";
	if(bg_use2 == 0){
		css += "color: "+m_theme+";";
	}else{
		css += "color: "+m_theme+";background-color: "+$("#colorTheme").val()+";";
	}
	css += "}.contents-left{float: left;}.contents-right{float: right;}.width-28{width: 28%;}.width-49{width: 49%;}.width-70{width: 70%;}";
	css += ".contents h1, .contents h2, .contents h3, .contents h4, .contents h5, .contents h6 {margin: 10px 0;padding: 2px 0;border-bottom: solid 2px rgb(52,152,219);font-weight: normal;}";
	css += ".contents h1 {font-size: 38px;}.contents h2 {font-size: 32px;}.contents h3 {font-size: 26px;}.contents h4 {font-size: 22px;}.contents h5 {font-size: 18px;}.contents h6 {font-size: 14px;}.contents p {margin: 10px 0;}";
	css += ".contents li{margin-left: -15px;}.contents hr {margin: 14px 0;border: solid 1px rgb(232,232,232);}.contents table{border-collapse: collapse;}.contents th,.contents td{padding: 2px;border: solid 1px rgb(63,63,63);}";
	css += "@media screen and (max-width: "+(parseInt($(".webgeki-wrapper").css("width"))+50)+"px){.header img{width: 70%;}.header,.footer,.contents{padding: 10px;}.main,.wrapper,.contents-left,.contents-right{width: 100%;}}";
	css += ".wrapper {transform: rotate(0.05deg);}";
	fs.writeFile(path+"\\css\\style.css", css, "utf8", function(err){});
	wsMessageDialogOpen("ウェブサイトの出力が完了しました。");
}
