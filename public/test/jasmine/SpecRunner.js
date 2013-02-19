require.config({
	baseUrl : "../../js",
	paths : {
		"jquery" : "thirdparty/jquery/1.9.1/jquery.min",
		"Underscore" : "thirdparty/underscore/1.4.2/underscore",
		"json2" : "thirdparty/json2/json2",
		"Backbone" : "thirdparty/backbone/0.9.10/backbone",
		"Mustache" : "thirdparty/mustache/0.7.0/mustache",
		"text" : "thirdparty/require/2.1.4/text",

		"templates" : "../templates",

		"EventBus" : "modules/site/EventBus",

		jasmine : '../test/lib/jasmine',
		"jasmine-html" : '../test/lib/jasmine-html',
		spec : '../test/jasmine/spec/',
		"wait" : "../test/lib/wait",
		"forEach" : "../test/lib/forEach",
		"jquery.jasmine" : "../test/lib/jasmine-jquery",
		"jasmine-fixture" : "../test/lib/jasmine-fixture"
	},
	shim : {
		"Underscore" : {
			exports : "_"
		},
		"Mustache" : {
			exports : "Mustache"
		},
		"Backbone" : {
			deps : ["Underscore", "jquery", "json2"],
			exports : "Backbone"
		},
		jasmine : {
			exports : 'jasmine'
		},
		'jasmine-html' : {
			deps : ['jasmine'],
			exports : 'jasmine'
		}
	}
});

require(['Underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine) {

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};

	var specs = [];

	specs.push('spec/TemplatesTest');
	specs.push('spec/RouterFactoryTest');
	specs.push('spec/MainContentRendererTest');

	$(function() {
		require(specs, function() {
			jasmineEnv.execute();
		});
	});

});
