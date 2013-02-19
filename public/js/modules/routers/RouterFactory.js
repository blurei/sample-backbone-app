define(function(require) {
    "use strict";

    var $ = require("jquery");
    var _ = require("Underscore");
    var Backbone = require("Backbone");

    var MainContentRenderer = require("modules/site/MainContentRenderer");
    var EventBus = require("EventBus");

    // used to prevent race conditions
    var currentRouteId = 1;
    var ONLY_CURRENT_ROUTE_PUBLISHES = undefined;
    
    
    function publishView(view) {
        EventBus.publish(MainContentRenderer.UPDATE_EVENT, view);
    }
   
     /**
     * @param handler {function}
     * Perform sanity check and make sure last route clicked is the one that is executed
     * Return a promise of a published view when other handlers have executed
     */
    function makeHandlerThatReturnsAView(handler) {
        var oldHandler = handler;
        
        return function() {
            var routeId = ++currentRouteId;
            
            return $.when(oldHandler.apply(null, arguments))
                .always(function(view) {
                    if (currentRouteId != routeId) {
                        return ONLY_CURRENT_ROUTE_PUBLISHES;
                    }
                    publishView(view);
                });
        };
    }
    
    /**
     * @param props {Object}
     * Augment each route with additional functionality
     */
    function augmentRouteHandlers(props) {
        var resultProps = _.clone(props);
        
        for (var route in props.routes) {
            if (props.routes.hasOwnProperty(route)) {
                var handler = props[props.routes[route]];
                handler = makeHandlerThatReturnsAView(handler);                   
				//add more handlers here .. maybe loading spinners? authorization checks?
                resultProps[props.routes[route]] = handler;
            }
        }
        
        return resultProps;
    }

    
    
    var RouterFactory = {
        
        create: function(props) {

            if (props) {
                props = augmentRouteHandlers(props);
            }

            return Backbone.Router.extend(props);
        }
    };

    return RouterFactory;
});