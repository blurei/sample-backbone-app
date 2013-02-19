define(function(require) {
    "use strict";

    var BaseView = require("modules/base/BaseView");
    var photoListColdTemplate = require("text!templates/photo/photo-list-cold.html");

    var PhotoListColdView = BaseView.extend({    	  	
        template: photoListColdTemplate
    });

    return PhotoListColdView;
});