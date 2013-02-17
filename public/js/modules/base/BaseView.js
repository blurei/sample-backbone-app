define(function (require) {
    "use strict";

    var _ = require("Underscore");
    var Backbone = require("Backbone");
    var CloseableView = require("modules/site/traits/CloseableView");
    var RenderableView = require("modules/site/traits/RenderableView");
    
    var BaseView = Backbone.View.extend(_.extend({}, CloseableView, RenderableView, {
        // any "only baseview" code goes here, hopefully there's none that cant wait for a trait
    }));
    
    return BaseView;
});