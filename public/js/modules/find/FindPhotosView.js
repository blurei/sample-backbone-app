define(function(require) {
	"use strict";
	
	var BaseView = require("modules/base/BaseView");
	var PhotoListView = require("modules/photo/PhotoItemView"); 
	var findPhotosTemplate = require("text!templates/find/find-photos.html");
	
	var FindPhotosListView = BaseView.extend({	
		
		template : findPhotosTemplate,
		
		events : {
			"click input[type=submit]" : "find"
		},
		
		find: function() {
			
		}
		
	});

	return FindPhotosListView;
});
