define(function(require) {
    "use strict";

    var warnThatViewMayNotBeClosed = function() {
        console.warn("You may not have unbound the event handlers for a view. Override onClose if you need to cleanup your view");
    };

    var WithCloseableView = {

        close: function() {
            console.log("closing view " + this.cid);

            this.trigger("close");
            
            this.onClose();
            this.remove();
            this.unbind();
        },

        onClose: warnThatViewMayNotBeClosed
    };

    return WithCloseableView;
});