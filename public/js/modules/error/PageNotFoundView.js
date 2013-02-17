define(function(require) {
    "use strict";
    
    var BaseView = require("modules/base/BaseView");
    var pageNotFoundTemplate = require("text!templates/error/page-not-found.html");
    
    var PageNotFoundView = BaseView.extend({
        template: pageNotFoundTemplate
    });
    
    return PageNotFoundView;
});