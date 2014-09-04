window.PlastiqApp.Views.Form = Backbone.CompositeView.extend({
	template: JST['form'],
	
	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render);
	},
	
	events: {
		'submit form': 'create',
		'click .submit-arrow': 'parseInput',
		'click .person-button-text': 'personPlaceholder',
		'click .business-button-text': 'businessPlaceholder',
	},
		
	render: function() {
		var content = this.template({
		});
		this.$el.html(content);
		this.businessPlaceholder();
		this.renderPayees();
		this.makeSortable();
		return this;
	},

	googleAPI: function() {
		var that = this;
    var service = new google.maps.places.AutocompleteService();

    $('#business-input').typeahead(null, {
      source: function(query, process) {
        service.getPlacePredictions({ types: ['establishment'], input: query }, function(predictions, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            process($.map(predictions, function(prediction) {
							return { value: prediction.description };
          	}));
        	}
				});
      },
			templates: {
				dropdown: function() {
					return "div class=tt-dropdown-menu"
				},
				suggestion: function(data) {
					return that.buildSuggestion(data);
				},
				footer: function() {
					return that.getFooter();
				}
			}
    });
  },
	
	buildSuggestion: function(data) {
		var businessName = data.value.split(',')[0];
		var businessAddress = data.value.split(',').slice(1);
		
		return "<div class='suggestion-body'><div class='suggestion-name'>" + businessName + "</div><div class='suggestion-address'>" + businessAddress + "</div></div>";
	},
	
	getFooter: function() {
		return "<div class='footer-body'><div class='no-match'>No Match? That's ok. Enter any name and click the " + "<div class='little-arrow-bg'><div class='little-arrow'></div></div>button.</div></div>"
	},
	
	renderPayees: function() {
		var that = this;
		
		this.collection.each(function(payee) {
			var view = new PlastiqApp.Views.Payee({
				model: payee
			});
			that.addSubView('#payee-container', view.render());
		});
		
		this.initializeTooltip();
	},
	
	parseInput: function() {
		var input = $('#business-input').val();
		var inputArray = input.split(', ');
		var payeeName = inputArray[0];
		
		if (inputArray.length === 1) {
			var payeeAddress = "Address not provided.";
		} else {
			var payeeAddress = inputArray[1];
		};
		
		$('#business-input').val('');
		this.createPayee(payeeName, payeeAddress)
	},
	
	createPayee: function(payeeName, payeeAddress) {
		this.collection.create({
			name: payeeName,
			address: payeeAddress
		}, { wait: true } ); 
	},
	
	initializeTooltip: function() {
    $('.make-payment-bg').tooltip({
			content: "Make a Payment",
			tooltipClass: "tooltip-selector",
      position: {
        my: "center top-45",
        at: "center-3 top"
      },
    });
	},
	
	makeSortable: function() {
		this.$el.find("#payee-container").sortable();
	},
	
	personPlaceholder: function() {
		$('#business-input').typeahead('destroy');
		$('#business-input').attr('placeholder', "What person do you want to pay by card?");
		$('#business-input').focus(function() {
			$('#business-input').attr('placeholder', "Enter the name of the person...")
		}).blur(function() {
			$('#business-input').attr('placeholder', "What person do you want to pay by card?");
		})
	},
		
	businessPlaceholder: function() {
		$('#biz-button').attr('checked', 'checked');
		this.googleAPI();
		$('#business-input').attr('placeholder', "What business do you want to pay by card?");
		$('#business-input').focus(function() {
			$('#business-input').attr('placeholder', "Enter the name of the business...")
		}).blur(function() {
			$('#business-input').attr('placeholder', "What business do you want to pay by card?");
		})
	},
});