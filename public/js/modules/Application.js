define(function(require) {
	"use strict";

	var $ = require("jquery");
	var Backbone = require("Backbone");
	var MainContentRenderer = require("modules/site/MainContentRenderer");
	var Router = require("modules/routers/Router");

	var Application = {

		initialize : function() {

			MainContentRenderer.init();
			
			Backbone.history.start({});

		}
	};

	return Application;
});
