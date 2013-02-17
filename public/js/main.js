(function() {
    "use strict";
    
    require.config({
        paths: {
            "jquery": "thirdparty/jquery/1.9.1/jquery.min",
            "Underscore": "thirdparty/underscore/1.4.2/underscore",
            "json2": "thirdparty/json2/json2",
            "Backbone": "thirdparty/backbone/0.9.10/backbone",
            "Mustache": "thirdparty/mustache/0.7.0/mustache",
            "text": "thirdparty/require/2.1.4/text",

            "templates": "../templates",
            "data": "../data",

            "EventBus": "modules/site/EventBus"
        },
        shim: {
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
                window.jsErrors.push(e);
            }
        }
    );

})();