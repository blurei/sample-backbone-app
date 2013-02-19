define(function(require) {
    "use strict";
    
    var Backbone = require("Backbone");
    var Templates = require("modules/templating/Templates");
    var Mustache = require("Mustache");
    require("jquery.jasmine");
    var forEach = require("forEach");

    describe("Templates", function() {

        var simpleTemplate = "<div>i dont have space for a model</div>";
        var modelTemplate = "<div>{{some}} {{more}}</div>";
        var withPartialsTemplate = "<div>i render {{> partials}}</div>";
        var objectToRender = {
            some: "data",
            more: "info"
        };
        var backboneModel = new Backbone.Model(objectToRender);

        var container;

        beforeEach(function() {
            container = document.createElement("DIV");
        });

        afterEach(function() {
            container = null;
        });

        it("should be able to render a template into a container", function() {

            Templates.render({
                container: container,
                template: simpleTemplate
            });

            expect(container).toContainHtml(simpleTemplate);
        });
        
        it("should be able to render a template with a Backbone.Model into a container", function() {

            Templates.render({
                container: container,
                template: modelTemplate,
                model: backboneModel
            });

            expect($(container)).toHaveText("data info");
        });

        it("should be able to render a template with a regular object into a container", function() {

            Templates.render({
                container: container,
                template: modelTemplate,
                model: objectToRender
            });

            expect($(container)).toHaveText("data info");
        });
        
        it("should be able to render a template with partials into a container", function() {
            var PARTIAL = "I'm just a partial, I'm not complete...";
            
            Templates.render({
                container: container,
                template: withPartialsTemplate,
                partials: {
                    partials: PARTIAL
                }
            });

            expect(container).toContainHtml(PARTIAL);
        });
        
        forEach({
            "undefined": undefined,
            "null": null,
            "false": false
        })
        .it("should NOT allow you to render a {{falsy}} model", function(model) {
            var renderingFalsyModel = function() {
                Templates.render({
                    container: container,
                    template: modelTemplate,
                    model: model
                });
            };
            
            expect(renderingFalsyModel).toThrow();
        });
    });
});