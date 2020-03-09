function openPage(a,b){
	if(b == undefined){
		CKEDITOR.instances.webgeki_left.setData(page[a][2]);
		CKEDITOR.instances.webgeki_right.setData(page[a][3]);
	}
	page_id = a;
	update();
	var list_html = "";
	var on_active = "";
	for(var i = 0;  i < page.length;  i++){
		if(i == page_id){
			on_active = " active";
		}else{
			on_active = "";
		}
		list_html += "<a href=\"javascript:chgPage("+i+")\" class=\"list-group-item list-group-item-action"+on_active+"\">"+page[i][0]+"<br><span style=\"font-size: 12px\">ファイル名："+page[i][1]+"</span></a>";
	}
	$("#pageList").html(list_html);
}

function savePage(){
	page[page_id][2] = CKEDITOR.instances.webgeki_left.getData();
	page[page_id][3] = CKEDITOR.instances.webgeki_right.getData();
}

function chgPage(a){
	savePage();
	openPage(a);
}