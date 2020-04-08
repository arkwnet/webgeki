function wsPageDialogOpen(a){
	if(a == 0){
		$("#wsPageDialog .modal-title").text("新しいページを追加");
		$("#pageName").val("");
		$("#pageFile").val("");
		$("#pageDeleteButton").hide();
	}
	if(a == 1){
		$("#wsPageDialog .modal-title").text("ページの設定");
		$("#pageName").val(page[page_id][0]);
		$("#pageFile").val(page[page_id][1]);
		$("#pageLayout").val(page[page_id][4]);
		$("#pageDeleteButton").show();
	}
	page_dialog = a;
	$("#wsPageDialog").modal("show");
}

function wsPageDialogClose(){
	var hit = 0;
	for(var i = 0;  i < page.length;  i++){
		if(page_dialog == 0 && $("#pageFile").val() == page[i][1]){
			hit++;
		}
		if(page_dialog == 1 && $("#pageFile").val() == page[i][1] && i != page_id){
			hit++;
		}
	}
	if(hit != 0){
		$("#pageFile").addClass("is-invalid");
	}else{
		if(page_dialog == 0){
			page.push([$("#pageName").val(),$("#pageFile").val(),"<h1>ようこそ</h1>これはサンプルテキストです。編集時には削除して下さい。<hr>これはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストです","<h1>ようこそ</h1>これはサンプルテキストです。編集時には削除して下さい。<hr>これはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストですこれはサンプルテキストです",parseInt($("#pageLayout").val())]);
			openPage(page.length-1);
		}
		if(page_dialog == 1){
			page[page_id][0] = $("#pageName").val();
			page[page_id][1] = $("#pageFile").val();
			page[page_id][4] = $("#pageLayout").val();
			openPage(page_id,0);
		}
		$("#wsPageDialog").modal("hide");
		$("#pageFile").removeClass("is-invalid");
	}
}

function wsPageDelete(){
	if(page.length == 1){
		alert("これ以上削除できません");
	}else{
		if(window.confirm("このページを削除します。よろしいですか?")){
			page.splice(page_id,1);
			$("#wsPageDialog").modal("hide");
			openPage(0);
		}
	}
}

function wsNameDialogOpen(){
	$("#wsNameDialog input").val(site_name);
	if(logo_img == ""){
		$("#logoImageView").attr("src","img/no_image.png");
	}else{
		$("#logoImageView").attr("src",logo_img);
	}
	if(logo_use == 1){
		$("#checkNameLogo").prop("checked",true);
	}else{
		$("#checkNameLogo").prop("checked",false);
	}
	$("#wsNameDialog").modal("show");
}

function wsNameDialogClose(){
	site_name = $("#wsNameDialog input").val();
	if($("#checkNameLogo").prop("checked") == true){
		logo_use = 1;
	}else{
		logo_use = 0;
	}
	update();
	$("#wsNameDialog").modal("hide");
}

function wsDescriptionDialogOpen(){
	$("#wsDescriptionDialog textarea").val($("#wsDescription").text());
	$("#wsDescriptionDialog").modal("show");
}

function wsDescriptionDialogClose(){
	$("#wsDescription").text($("#wsDescriptionDialog textarea").val());
	$("#wsDescriptionDialog").modal("hide");
}

function wsFooterDialogOpen(){
	$("#wsFooterDialog textarea").val($("#wsFooter").html());
	$("#wsFooterDialog").modal("show");
}

function wsFooterDialogClose(){
	$("#wsFooter").html($("#wsFooterDialog textarea").val());
	$("#wsFooterDialog").modal("hide");
}

function wsKeywordDialogOpen(){
	$("#wsKeywordDialog textarea").val(keyword);
	$("#wsKeywordDialog").modal("show");
}

function wsKeywordDialogClose(){
	keyword = $("#wsKeywordDialog textarea").val();
	$("#wsKeywordDialog").modal("hide");
}

function wsBaseDialogOpen(){
	$("#siteWidth").val(""+parseInt($(".webgeki-wrapper").css("width")));
	var fontfamily = $(".webgeki-main").css("font-family");
	fontfamily = fontfamily.replace(/\"/g , "") ;
	$("#siteFont").val(fontfamily);
	$("#siteAlign").val($(".webgeki-header").css("text-align"));
	$("#siteAlignFooter").val($(".webgeki-footer").css("text-align"));
	if(no_wide == 1){
		$("#hfNoWide").prop("checked",true);
	}else{
		$("#hfNoWide").prop("checked",false);
	}
	if(c_shadow == 1){
		$("#createShadow").prop("checked",true);
	}else{
		$("#createShadow").prop("checked",false);
	}
	if(c_margin == 1){
		$("#createMargin").prop("checked",true);
	}else{
		$("#createMargin").prop("checked",false);
	}
	$("#wsBaseDialog").modal("show");
}

function wsBaseDialogClose(){
	$(".webgeki-wrapper").css("width",parseInt($("#siteWidth").val()));
	$(".webgeki-main").css("font-family",$("#siteFont").val());
	$(".webgeki-header").css("text-align",$("#siteAlign").val());
	$(".webgeki-footer").css("text-align",$("#siteAlignFooter").val());
	if($("#hfNoWide").prop("checked") == true){
		no_wide = 1;
	}else{
		no_wide = 0;
	}
	if($("#createShadow").prop("checked") == true){
		c_shadow = 1;
	}else{
		c_shadow = 0;
	}
	if($("#createMargin").prop("checked") == true){
		c_margin = 1;
	}else{
		c_margin = 0;
	}
	$("#wsBaseDialog").modal("hide");
	update();
}

function wsColorDialogOpen(){
	default_color = $("#colorTheme").val();
	default_hf = $("#hfTheme").val();
	if(bg_use == 1){
		$("#useBGColor").prop("checked",true);
	}else{
		$("#useBGColor").prop("checked",false);
	}
	if(bg_use2 == 1){
		$("#useBGColor2").prop("checked",true);
	}else{
		$("#useBGColor2").prop("checked",false);
	}
	$("#wsColorDialog").modal("show");
}

function wsColorDialogClose(){
	if($("#useBGColor").prop("checked") == true){
		bg_use = 1;
	}else{
		bg_use = 0;
	}
	if($("#useBGColor2").prop("checked") == true){
		bg_use2 = 1;
	}else{
		bg_use2 = 0;
	}
	$("#wsColorDialog").modal("hide");
}

function wsColorDialogCancel(){
	$("#colorTheme").val(default_color);
	$("#hfTheme").val(default_hf);
	$("#wsColorDialog").modal("hide");
}

function wsAccessTagDialogOpen(){
	$("#wsAccessTagDialog textarea").val(access_tag);
	$("#wsAccessTagDialog").modal("show");
}

function wsAccessTagDialogClose(){
	access_tag = $("#wsAccessTagDialog textarea").val();
	$("#wsAccessTagDialog").modal("hide");
}

function wsMemoDialogOpen(){
	$("#wsMemoDialog textarea").val(memo);
	$("#wsMemoDialog").modal("show");
}

function wsMemoDialogClose(){
	memo = $("#wsMemoDialog textarea").val();
	$("#wsMemoDialog").modal("hide");
}

function wsMessageDialogOpen(a){
	$("#wsMessageDialogMain").html(a);
	$("#wsMessageDialog").modal("show");
}