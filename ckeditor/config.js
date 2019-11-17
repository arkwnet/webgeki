/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function(config){
	config.enterMode = 2;
	config.shiftEnterMode = 1;
	config.removePlugins = "about,a11yhelp,flash,forms,iframe,smiley,language,newpage,pagebreak,preview";
	config.extraPlugins = "base64image,sourcedialog";
};