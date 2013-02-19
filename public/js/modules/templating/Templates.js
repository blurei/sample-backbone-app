define(function(require) {
    "use strict";

    var $ = require("jquery");
    var Mustache = require("Mustache");
    
    /**
     * @param optionsModel {Backbone model, or array of modelS}
     * @returns {JSON Object}
     */
    function getModel(optionsModel) {
        var model;

        // If model passed as array then merge models into one object
        if($.isArray(optionsModel)) {
            $.each(optionsModel, function(index, current) {
                current = getJSON(current);
                model = $.extend(model, current);
            });
        } else {
            model = getJSON(optionsModel);
        }

        function getJSON(model) {
            return (model && typeof model.toJSON === "function") ? model.toJSON() : model;
        }

        return model;
    }
    
    var Templates = {
        
        /**
         * @param options {Object} Config options including:
         * - container {DOM node} required
         * - model {Backbone model or plain object} optional
         * - template {Mustache HTML string} required
         * - partials {hash of keys to partial strings} optional
         */
        render: function(options) {

            /** Setup defaults */
            var model = getModel(options.model);

            // Wrapper for templated content
            var container = options.container;

            // Mustache partials (3rd param) (optional)
            var partials = options.partials || {};

            // Mustache HTML string
            var template = options.template;

            // a template is required
            if (!template) {
                return;
            }

            if ("model" in options && !model) {
                throw new Error("There is no model to render with this template");
            }
            
            // Run the model data through the Mustache renderer            
            var html = Mustache.render(template, model, partials);

            $(container).html(html);
            
            return html;
        }
    };
    
    return Templates;
});