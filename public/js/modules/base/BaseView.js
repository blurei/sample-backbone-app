define(function (require) {
    "use strict";

    var _ = require("Underscore");
    var Backbone = require("Backbone");
    var WithCloseableView = require("modules/site/traits/WithCloseableView");
    var WithRenderableView = require("modules/site/traits/WithRenderableView");
    
    var BaseView = Backbone.View.extend(_.extend({}, WithCloseableView, WithRenderableView, {
        // any "only baseview" code goes here, hopefully there's none that cant wait for a trait
    }));
    
    return BaseView;
});