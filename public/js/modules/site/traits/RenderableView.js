define(function(require) {
    "use strict";

    var _ = require("Underscore");
    var Templates = require("modules/templating/Templates");
    
    var noop = function(){};
    
    var RenderableView = {

        partials: null,

        afterRender: noop,

        addPartials: function(partials) {
            this.partials = _.extend({}, this.partials, partials);
        },
        
        render: function() {
            var options = {
                container: this.el,
                template: this.template
            };

        
            if(this.model){
            	options.model = this.model;
            }
			    
            if (this.partials) {
                options.partials = this.partials;
            }
            
            Templates.render(options);
            
            this.afterRender();

            return this;
        }
    };

    return RenderableView;
});