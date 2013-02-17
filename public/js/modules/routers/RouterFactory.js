define(function(require) {
    "use strict";

    var $ = require("jquery");
    var _ = require("Underscore");
    var Backbone = require("Backbone");

    var MainContentRenderer = require("modules/site/MainContentRenderer");
    var EventBus = require("EventBus");

    // used to prevent race conditions
    var currentRouteId = 1;
    var ONLY_CURRENT_ROUTE_PUBLISHES;
    
    
    function publishView(view) {
        EventBus.publish(MainContentRenderer.UPDATE_EVENT, view);
    }
   
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
    
    function prependRouterToArguments(router, _arguments) {
        var argumentsAsArray = [].slice.call(_arguments);        
        return [router].concat(argumentsAsArray);
    }

    
    function augmentRouteHandlers(props) {
        var resultProps = _.clone(props);
        
        for (var route in props.routes) {
            if (props.routes.hasOwnProperty(route)) {
                var handler = props[props.routes[route]];
                handler = makeHandlerThatReturnsAView(handler);                   

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