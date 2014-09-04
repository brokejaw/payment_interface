window.PlastiqApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		PlastiqApp.Router = new PlastiqApp.Router({
			$rootEl: $('#content')
		});
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
	
	addSubView: function (selector, subview) {
		var selectorSubViews;
		
		if (this.subviews()[selector]) {
			selectorSubViews = this.subviews()[selector];
		} else {
			this.subviews()[selector] = [];
			selectorSubViews = this.subviews()[selector];
		}
		
		selectorSubViews.push(subview);
		
		var $selectorEl = this.$(selector);
		
		$selectorEl.append(subview.$el);
	},
		
	subviews: function () {
		if (!this._subviews) {
			this._subviews = {};
		}
		return this._subviews;
	}
});