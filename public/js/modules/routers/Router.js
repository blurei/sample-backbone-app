define(function(require) {
    "use strict";

    var RouterFactory = require("modules/routers/RouterFactory");
    var HomeView = require("modules/home/HomeView");
    var PageNotFoundView = require("modules/error/PageNotFoundView");
    var FlickrUrl = require("modules/util/FlickrUrl");
    var PhotosController = require("modules/photo/PhotosController");
    var FindPhotosController = require("modules/find/FindPhotosController");
    
    var Router = RouterFactory.create({
        
        routes: {

            "": "home",
            "#": "home", 
            "bunnies" : "bunnies",
            "puppies" : "puppies",
            "kittens" : "kittens",
            "find"    : "find",
            "*undefined": "pageNotFound"
        },

        home: function() {
            return new HomeView();
        },
        
        bunnies: function() {
        	return PhotosController.handleUsing(FlickrUrl.bunnies());
        },
        
        puppies: function() {
        	return PhotosController.handleUsing(FlickrUrl.puppies());
        },
        
        kittens: function() {
        	return PhotosController.handleUsing(FlickrUrl.kittens());
        },
        
        find: function() {
        	return new FindPhotosController.handle();
        },
        
        pageNotFound: function() {
            return new PageNotFoundView();
        }
        
    });

    // importing Router will always give you this instance
    return new Router();
});