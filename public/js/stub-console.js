(function(global) {
    "use strict";

    if (typeof global.console == "undefined") {

        var noop = function() {};
        var console = {};
        var console_operations = ["log", "debug", "info", "warn", "error", "assert",
                                  "clear", "dir", "dirxml", "trace", "group",
                                  "groupCollapsed", "groupEnd", "time", "timeEnd",
                                  "profile", "profileEnd", "count", "exception", "table"];
            
        for(var i = 0; i < console_operations.length; i++) {
            var operation = console_operations[i];
            
            console[operation] = noop;
        }
            
        global.console = console;
    }
    
})(this);