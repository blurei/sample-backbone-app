define(function(require) {
    "use strict";

    var $ = require("jquery");
    var RouterFactory = require("modules/routers/RouterFactory");
    var Backbone = require("Backbone");
    var EventBus = require("EventBus");
    var MainContentRenderer = require("modules/site/MainContentRenderer");
    var wait = require("wait");

	var Router;

    describe("RouterFactory", function() {
    	var view = new Backbone.View();
    	
    	beforeEach(function() {
            Router = RouterFactory.create({            	
                routes: {
                    "route": "routeHandler"
                },
                routeHandler: function() {
                    return view;
                }
            });
        });
        
        it("should be able to create a Router", function() {
            expect(new Router() instanceof Backbone.Router).toBeTruthy();
        });

        it("should be able to create a Router with custom routes and handlers", function() {
            var router = new Router();

            expect(router.routes["route"]).toBeDefined();
            expect(router[router.routes["route"]]).toBeDefined();
        });

        it("should set up route handlers to publish the view", function() {
            var router = new Router();

            wait("route to publish view").forMax(1000).untilEventFires(MainContentRenderer.UPDATE_EVENT,
                                                                       router.routeHandler)
                .then(function(publishedview) {
                    expect(publishedview).toEqual(view);
                });
        });

    });
});
