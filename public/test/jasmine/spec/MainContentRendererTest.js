define(function(require) {"use strict";

	require("jasmine-fixture");
	require("jquery.jasmine");
	var MainContentRenderer = require("modules/site/MainContentRenderer");
	var BaseView = require("modules/base/BaseView");
	var EventBus = require("EventBus");
	var _ = require("Underscore");
	var wait = require("wait");

	var VIEW1_TEMPLATE = "I better be in #main first";
	var VIEW2_TEMPLATE = "I better be in #main second";

	describe("MainContentRenderer", function() {

		it("should subscribe to a notification to update the main section", function() {
			var viewToUpdateMainWith = new Backbone.View();
			var updateMainView = function() {
				EventBus.publish(MainContentRenderer.UPDATE_EVENT, viewToUpdateMainWith);
			};

			spyOn(MainContentRenderer, "render");
			MainContentRenderer.init();

			wait("a request to update the main view").forMax(1000).untilEventFires(MainContentRenderer.UPDATE_EVENT, updateMainView).then(function(publishedview) {
				expect(MainContentRenderer.render).toHaveBeenCalledWith(publishedview);
			});
		});

		it("should update main section with a view", function() {
			var $main = affix(MainContentRenderer.DESTINATION);
			var View1 = BaseView.extend({
				template : VIEW1_TEMPLATE
			});
			var View2 = BaseView.extend({
				template : VIEW2_TEMPLATE
			});

			expect($main).toBeEmpty();

			MainContentRenderer.render(new View1());
			expect($main).toContainHtml(VIEW1_TEMPLATE);

			MainContentRenderer.render(new View2());
			expect($main).not.toContainHtml(VIEW1_TEMPLATE);
			expect($main).toContainHtml(VIEW2_TEMPLATE);
		});

		it("should close last view before rendering new view", function() {
			var View = BaseView.extend({});
			var view1 = new View();
			var view2 = new View();

			spyOn(view1, "close");

			MainContentRenderer.render(view1);
			expect(view1.close).not.toHaveBeenCalled();

			MainContentRenderer.render(view2);
			expect(view1.close).toHaveBeenCalled();
		});

	});

});
