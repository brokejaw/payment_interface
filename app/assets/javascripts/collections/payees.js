window.PlastiqApp.Collections.Payees = Backbone.Collection.extend({
	url: "/payees",
	model: PlastiqApp.Models.Payee
});

allPayees = new PlastiqApp.Collections.Payees();