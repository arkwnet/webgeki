const electron = require("electron");
const fs = require("fs");
const remote = electron.remote;
const app = remote.app;
const w = remote.getCurrentWindow();
const dialog = remote.dialog;

var path = "";
var app_path = app.getAppPath();

function closeApp(){
	w.close();
}

window.onload = function(){
	$('[data-toggle="tooltip"]').tooltip();
	$("#colorTheme").colorpicker({
		format: "rgb",
		useAlpha: false
	});
	$("#siteWidth").val(""+parseInt($(".webgeki-wrapper").css("width")));
	InitCommon();
	update();
	openPage(0);
	setInterval(main,1000/20);
}

function main(){
	$(".geki-ui-page").height(window.innerHeight-78);
	if(bg_use == 0){
		$(".webgeki-header").css("background-color","rgb(255,255,255)");
		$(".webgeki-footer").css("background-color","rgb(255,255,255)");
	}else{
		$(".webgeki-header").css("background-color",$("#colorTheme").val());
		$(".webgeki-footer").css("background-color",$("#colorTheme").val());
	}
	if(bg_use2 == 0){
		$(".webgeki-main").css("background-color","rgb(255,255,255)");
	}else{
		$(".webgeki-main").css("background-color",$("#colorTheme").val());
	}
	if(bg_img == ""){
		$(".webgeki-header").css("background-image","");
		$("#deleteBGImage").prop("disabled", true);
	}else{
		$(".webgeki-header").css("background-image","url("+bg_img+")");
		$("#deleteBGImage").prop("disabled", false);
	}
	if($("#hfTheme").val() == "theme"){
		$(".webgeki-header a, .webgeki-footer a").css("color",$("#colorTheme").val());
	}else{
		$(".webgeki-header a, .webgeki-footer a").css("color",$("#hfTheme").val());
	}
	if($("#mTheme").val() == "theme"){
		$(".webgeki-main").css("color",$("#colorTheme").val());
	}else{
		$(".webgeki-main").css("color",$("#mTheme").val());
	}
	if(no_wide == 1){
		$(".webgeki-main").css("width",parseInt($(".webgeki-wrapper").css("width"))+50);
	}else{
		$(".webgeki-main").css("width","100%");
	}
	if(c_shadow == 1){
		$(".webgeki-main").css("box-shadow","0 0 2px black");
	}else{
		$(".webgeki-main").css("box-shadow","0");
	}
	if(c_margin == 1){
		$(".webgeki-main").css("padding","15px");
		page_height = $(".webgeki-header").height()+$(".webgeki-contents").height()+$(".webgeki-footer").height() + 130;
	}else{
		$(".webgeki-main").css("padding","0");
		page_height = $(".webgeki-header").height()+$(".webgeki-contents").height()+$(".webgeki-footer").height() + 100;
	}
	$(".webgeki").css("height",page_height);
	$(".webgeki-contents h1, .webgeki-contents h2, .webgeki-contents h3, .webgeki-contents h4, .webgeki-contents h5, .webgeki-contents h6").css("border-bottom","solid 2px "+$("#colorTheme").val());
	$(".webgeki-contents a").css("color",$("#colorTheme").val());
	$("#colorTheme").css("background","linear-gradient(to right,rgb(255,255,255),"+$("#colorTheme").val()+")");
}

function update(){
	if(logo_use == 1 && logo_img != ""){
		$("#wsName").html("<img src='"+logo_img+"'>");
	}else{
		$("#wsName").html(site_name);
	}
	if(page[page_id][4] == 0){
		$(".webgeki-wrapper-left").css("display","block");
		$(".webgeki-wrapper-right").css("display","none");
		$(".webgeki-wrapper-left").css("width",parseInt($("#siteWidth").val()));
	}
	if(page[page_id][4] == 1){
		$(".webgeki-wrapper-left").css("display","block");
		$(".webgeki-wrapper-right").css("display","block");
		$(".webgeki-wrapper-left").css("width",parseInt($("#siteWidth").val())*0.28);
		$(".webgeki-wrapper-right").css("width",parseInt($("#siteWidth").val())*0.7);
	}
	if(page[page_id][4] == 2){
		$(".webgeki-wrapper-left").css("display","block");
		$(".webgeki-wrapper-right").css("display","block");
		$(".webgeki-wrapper-left").css("width",parseInt($("#siteWidth").val())*0.49);
		$(".webgeki-wrapper-right").css("width",parseInt($("#siteWidth").val())*0.49);
	}
	if(page[page_id][4] == 3){
		$(".webgeki-wrapper-left").css("display","block");
		$(".webgeki-wrapper-right").css("display","block");
		$(".webgeki-wrapper-left").css("width",parseInt($("#siteWidth").val())*0.7);
		$(".webgeki-wrapper-right").css("width",parseInt($("#siteWidth").val())*0.28);
	}
}

function showError(a){
	$("#errorContents").text(a);
	$("#errorDialog").modal("show");
}

function execHelp(a){
	window.open(app_path + "/help/"+a+".html","","width=1024,height=600");
}