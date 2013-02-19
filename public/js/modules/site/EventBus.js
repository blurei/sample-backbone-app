define(function(require) {
    "use strict";
    
    var _ = require("Underscore");
    
    var events = {}; // Map of event to models bound to that event

    function subscribe(event, callback, subscriber) {
        events[event] = (!events[event]) ? [] : events[event];
        events[event].push({
            callback: callback,
            subscriber: subscriber
        });
    }
    
    function publish(event) {
        var args = [].slice.call(arguments, 1);

        if (events[event]) {
            for ( var i = 0, num_events = events[event].length; i < num_events; i++) {
                var subscription = events[event][i];
                subscription.callback.apply(subscription.subscriber, args);
            }
        }
    }
    
    function unsubscribe(event, subscriber) {
        if (!event) {
            events = {};
            return;
        }
        
        if (events[event]) {
            if (!subscriber) {
                delete events[event];
            }
            else {
                var i = 0;
                var num_events = events[event].length;
                var found = false;

                while (!found && i < num_events) {
                    if (events[event][i].subscriber == subscriber) {
                        events[event].splice(i, 1);
                        found = true;
                    }

                    i++;
                }
            }
        }
    }
    
     
    var EventBus = {

        subscribe: subscribe,

        publish: publish,

        unsubscribe: unsubscribe
       
    };

    return EventBus;
});