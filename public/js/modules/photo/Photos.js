define(function(require) {
    "use strict";

    var Backbone = require("Backbone");
    var Photo = require("modules/photo/Photo");
    
    var Photos = Backbone.Collection.extend({

        model: Photo,
            
        parse: function(data) {
            if (data) {
                return data.items;    
            }            
            return null;
        }
    });
    
    return Photos;
});