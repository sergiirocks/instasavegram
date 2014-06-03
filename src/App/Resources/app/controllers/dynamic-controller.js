define([ 'jquery', 'app/symfony-router', 'app/lib/utils', 'app/globals', 'app/controllers/base/controller', 'app/views/dynamic-view' ], function($, SymfonyRouter, utils, Globals, BaseController, DynamicView) {

	var actions = {};

	var routes, i;

	routes = SymfonyRouter.ServerRoutes.routes;

	for (i = 0; i < routes.length; i++) {
		actions[routes[i].name] = function() {
			return this.show.apply(this, arguments);
		}
	}

	return BaseController.extend($.extend(actions, {
		show: function(params, route) {
			var template, payload = $('#payload');

			if (payload.length) {
				template = payload.html();
				this.applyContent(template);
				payload.remove();
			} else {
				$.ajax(utils.reverse(route.name) + '?ajax').done(this.applyContent);
			}
		},
		applyContent: function(html) {

			this.view = new (DynamicView.extend({
				template: html
			}));
		}
	}));
});