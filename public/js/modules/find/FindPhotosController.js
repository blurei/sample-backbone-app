define(function(require) {
	"use strict";
	
	var FindPhotosView = require("modules/find/FindPhotosView");
	
	var FindPhotosController = {
		handle: function() {
			return new FindPhotosView();
		}
		
	}
	return FindPhotosController;
});