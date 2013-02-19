(function() {
    "use strict";
    
    require.config({
        paths: {
            "jquery": "thirdparty/jquery/1.9.1/jquery.min",
            "jquery.masonry": "thirdparty/jquery.masonry/2.1.08/jquery.masonry.min",
            "Underscore": "thirdparty/underscore/1.4.2/underscore",
            "json2": "thirdparty/json2/json2",
            "Backbone": "thirdparty/backbone/0.9.10/backbone",
            "Mustache": "thirdparty/mustache/0.7.0/mustache",
            "text": "thirdparty/require/2.1.4/text",

            "templates": "../templates",

            "EventBus": "modules/site/EventBus"
        },
        shim: {
        	"jquery.masonry": ["jquery"],
            "Underscore": {
                exports: "_"
            },
            "Mustache": {
                exports: "Mustache"
            },
            "Backbone": {
                deps: ["Underscore", "jquery", "json2"],
                exports: "Backbone"
            }
        }
    });

    require(
        ["modules/Application"],

        function(Application) {
            try {
                Application.initialize();
            } catch (e) {
            	//TODO: think about error logging plugin
                window.jsErrors.push(e);
            }
        }
    );

})();