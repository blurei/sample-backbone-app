define(function(require) {
	"use strict";
	
	var BaseView = require("modules/base/BaseView");
	var Photos = require("modules/photo/Photos");
	var PhotoListView = require("modules/photo/PhotoListView"); 
	var FlickrUrl = require("modules/util/FlickrUrl");
	var findPhotosTemplate = require("text!templates/find/find-photos.html");

	var FindPhotosListView = BaseView.extend({	
		
		template : findPhotosTemplate,
		results : null,
		
		events : {
			"click input[type=submit]" : "find"
		},
		
		find: function(e) {
			e.preventDefault();
			var tags = this.$el.find("form input[name=tags]").val();

			this.results = new Photos();
			this.results.url =  FlickrUrl.byTags(tags);
			this.results.fetch().then($.proxy(this.showResults,this));
		},
		
		showResults: function() {
			var photoListView = new PhotoListView({model: this.results})
			this.$el.find(".results").html(photoListView.render().el);
		}
		
	});

	return FindPhotosListView;
});
