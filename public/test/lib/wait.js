define(function(require) {
    "use strict";
    
    var EventBus = require("EventBus");
    
    var Wait = function(message) {
        if (message) {
            this.message = message;
        }
    };
    
    Wait.prototype = {
        
        maxTimeout: 7000,
        message: "it took too long",
        
        // sets max timeout to wait for deferreds to be completed
        forMax: function(maxTimeout) { 
            this.maxTimeout = maxTimeout;
            
            return this;
        },
        
        // pass in what you're waiting on to this method
        until: function() {
            var deferreds = arguments;
            
            waitsFor(function() {
                for(var i = 0; i < deferreds.length; i++) {
                    if (deferreds[i].state() == "pending") {
                        return false;
                    }
                }

                return true;
            }, this.message, this.maxTimeout);
            
            return {
                then: function(callback) {
                    runs(function() {
                        $.when.apply(null, deferreds)
                         .always(function() {
                            callback.apply(null, arguments);
                         });
                    });
                }
            };
        },
        
        untilEventFires: function(event, trigger) {
            var args;
            var context = { id: "handle to unsubscribe" };
            
            EventBus.subscribe(event, function() {
                args = arguments;
            }, context);

            trigger();
            
            waitsFor(function() {
                return args != undefined;
            }, this.message, this.maxTimeout);
            
            return {
                then: function(callback) {
                    runs(function() {
                        EventBus.unsubscribe(event, context);
                        callback.apply(null, args);
                    });
                }
            }
        }
    };
    
    // pass an optional message so if there's a problem, you can read what you were waiting on
    var wait = function(message) {
        return new Wait(message);
    }
    
    return wait;
});