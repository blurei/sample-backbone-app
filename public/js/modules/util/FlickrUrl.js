define(function(require) {
	"use strict";
	
	var DOMAIN = "http://api.flickr.com";
	var GROUP_FEED_URI = "/services/feeds/groups_pool.gne?";
	var PUBLIC_FEED_URI = "/services/feeds/photos_public.gne?";
	var FORMAT_SUFFIX = "&format=json&jsoncallback=?"; 
	
	var BUNNY_GROUP_ID = "49901468@N00";
	var PUPPY_GROUP_ID = "70557968@N00";
	var KITTY_GROUP_ID = "52185806@N00";
	
	var FlickrUrl = {
		
		bunnies: function() {
			return this.byId(BUNNY_GROUP_ID);
		},
		
		puppies: function() {
			return this.byId(PUPPY_GROUP_ID);
		},
		
		kittens: function() {
			return this.byId(KITTY_GROUP_ID);
		},
		
		byId: function(id) {
			return DOMAIN + GROUP_FEED_URI + "id=" + id + FORMAT_SUFFIX;
		},
		
		//tags may be comma delimited
		byTags: function(tags) {
			return DOMAIN + PUBLIC_FEED_URI + "tags=" + tags + FORMAT_SUFFIX;
		}
	
	};
	
	return FlickrUrl;
}); 