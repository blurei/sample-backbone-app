define(function(require) {
    "use strict";

    var $ = require("jquery");
    var EventBus = require("EventBus");

    var currentView;

    var DESTINATION = "#main";
    var UPDATE_EVENT = "UPDATE_MAIN_VIEW";

    var MainContentRenderer = {

        UPDATE_EVENT: UPDATE_EVENT,
        DESTINATION: DESTINATION,
        
        init: function() {         
            EventBus.subscribe(UPDATE_EVENT, this.render, this);
        },

        render: function(view) {
            if(!view) {
                return;
            }

            if(currentView && currentView.close) {
                currentView.close();
            }
            currentView = view;
            $(DESTINATION).html(currentView.render().el);

        }

    };

    return MainContentRenderer;
});
