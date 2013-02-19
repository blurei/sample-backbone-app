define(function(require) {
	"use strict";

	require("jquery.masonry");
	var _ = require("Underscore");
	var BaseView = require("modules/base/BaseView");
	var PhotoListColdView = require("modules/photo/PhotoListColdView");
	var PhotoItemView = require("modules/photo/PhotoItemView");
	var photoListTemplate = require("text!templates/photo/photo-list.html");

	var PhotoListView = BaseView.extend({

		template : photoListTemplate,
		coldView : null,

		onClose : function() {
			//TODO: keep track of item subviews and close them here
		},

		$photoList : function() {
			return this.$el.find(".photo-list");
		},

		renderColdView : function() {
			var coldView = new PhotoListColdView();
			this.$photoList().html(coldView.render().el);
		},

		alignPhotos : function() {
			var $container = this.$photoList();
			$container.imagesLoaded(function() {
				$container.masonry({
					itemSelector : 'li',
					columnWidth : 90
				});
			});
		},

		afterRender : function() {
			if (this.model.models <= 0) {
				this.renderColdView();
			} else {
				this.$photoList().html("");
				_.each(this.model.models, function(photo) {
					this.$photoList().append(new PhotoItemView({
						model : photo
					}).render().el);
				}, this);
			}

			this.alignPhotos();
		}
	});

	return PhotoListView;
});
