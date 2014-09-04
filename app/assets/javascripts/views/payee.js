window.PlastiqApp.Views.Payee = Backbone.View.extend({
	template: JST['payee'],
	
	tagName: 'li',
	
	className: 'payee-container-each',
	
	render: function() {
		var content = this.template({
			payee: this.model
		});
		
		this.$el.html(content);
		return this;
	},
})