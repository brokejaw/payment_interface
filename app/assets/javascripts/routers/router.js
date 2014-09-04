window.PlastiqApp.Router = Backbone.Router.extend({
	initialize: function(options) {
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		'': 'form',
	},
	
	form: function() {
		var view = new PlastiqApp.Views.Form({
			collection: allPayees
		});
		allPayees.fetch();
		this.$rootEl.html(view.render().$el);
	},
});