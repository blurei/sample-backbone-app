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
		photoListView : null,

		events : {
			"click input[type=submit]" : "find"
		},

		onClose : function() {
			if (this.photoListView) {
				this.photoListView.close();
			}
		},

		find : function(e) {
			e.preventDefault();
			var tags = this.$el.find("form input[name=tags]").val();

			if (tags) {
				this.results = new Photos();
				this.results.url = FlickrUrl.byTags(tags);
				this.results.fetch({
					beforeSend : function() {
						$(".spinny").show();
					}
				}).then($.proxy(this.showResults, this));
			}
		},

		showResults : function() {
			$(".spinny").hide();
			this.photoListView = new PhotoListView({
				model : this.results
			})
			this.$el.find(".results").html(this.photoListView.render().el);
		}
	});

	return FindPhotosListView;
});
