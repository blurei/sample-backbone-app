define(function(require) {
    "use strict";
    
    var Backbone = require("Backbone");
    var Templates = require("modules/templating/Templates");
    
    var WithColdstateView = {
        
        shouldShowColdState: function() {
            return this.model.length <= 0;
        },
        
        convertColdStateToElement: function(coldState) {
            if(coldState instanceof Backbone.View) {
                return coldState.render().el;
            } else if(typeof coldState == "string") {
                var $coldStateElement = $("<div />");

                Templates.render({
                    container: $coldStateElement,
                    template: coldState
                });

                return $coldStateElement.get(0);
            }

            return coldState;
        } 
    };
    
    return WithColdstateView;
});