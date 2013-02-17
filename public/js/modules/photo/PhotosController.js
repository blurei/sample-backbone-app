define(function(require) {
	"use strict";

	var Photos = require("modules/photo/Photos");
	var PhotoListView = require("modules/photo/PhotoListView");

	var photos; 
	
	var PhotosController = {
		
		fetchPhotos: function(url) {
			photos = new Photos();
			photos.url = url;
			return photos.fetch();			
		},
		
		handleUsing: function(url) {
			return this.fetchPhotos(url).pipe(
				function() {
					return new PhotoListView({model: photos});
				}
			);
		}
	}
	return PhotosController;
});
