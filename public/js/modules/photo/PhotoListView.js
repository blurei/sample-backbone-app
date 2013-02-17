define(function(require) {
	"use strict";

	var BaseView = require("modules/base/BaseView");
	var PhotoItemView = require("modules/photo/PhotoItemView");
	var photoListTemplate = require("text!templates/photo/photo-list.html");
	
	var PhotoListView = BaseView.extend({
		
		template : photoListTemplate,

		afterRender : function() {
			var $photoList = this.$el.find(".photo-list").html("");

			_.each(this.model.models, function(photo) {

				$photoList.append(new PhotoItemView({
					model : photo
				}).render().el);

			});
		}
	});

	return PhotoListView;
}); 