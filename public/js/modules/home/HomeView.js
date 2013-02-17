define(function(require) {
    "use strict";

    var BaseView = require("modules/base/BaseView");
    var homeTemplate = require("text!templates/home/home.html");

    var HomeView = BaseView.extend({
        template: homeTemplate
    });

    return HomeView;
});