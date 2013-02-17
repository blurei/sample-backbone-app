define(function(require) {
    "use strict";

    var BaseView = require("modules/base/BaseView");
    var photoItemTemplate = require("text!templates/photo/photo-item.html");

    var PhotoListView = BaseView.extend({    	
    	tagName: "li",    	
        template: photoItemTemplate
    });

    return PhotoListView;
});