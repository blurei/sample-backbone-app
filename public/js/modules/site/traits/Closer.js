define(function(require) {
    "use strict";

    var _ = require("Underscore");

    function isCloseable(objectToClose) {
        if (objectToClose && objectToClose.close) {
            return true;
        }

        return false;
    }
    
    var Closer = {
        closeAll: function() {
            _.each(_.toArray(arguments), function(objectToClose) {
                if(isCloseable(objectToClose)) {
                    objectToClose.close();
                }
            });
        }
    };
    
    return Closer;
});
