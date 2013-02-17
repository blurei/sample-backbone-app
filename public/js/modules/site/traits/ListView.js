define(function(require) {
    "use strict";

    var _ = require("Underscore");
    var BaseView = require("modules/base/BaseView");
    var WithColdstateView = require("modules/traits/WithColdstateView");
    var EMPTY_ITEM_VIEW = "EMPTY VIEW";

    var ListView = BaseView.extend(_.extend({}, WithColdstateView, {

        tagName: "ul",

        ItemView: EMPTY_ITEM_VIEW,

        coldState: "The list is empty",
        
        onClose: function() {
            this.closeSubViews();
        },
  
        itemViewEvents: {},

        attachItemEventsTo: function(subview) {

            for(var event in this.itemViewEvents) {
                if (this.itemViewEvents.hasOwnProperty(event)) {
                    var handler = this[this.itemViewEvents[event]];

                    if (!handler) {
                        throw new Error("Could not find the handler for " + event);
                    }

                    subview.on(event, handler, this);
                }
            }
        },

        render: function() {

            if (this.shouldShowColdState()) {
                var coldState = this.options.coldState || this.coldState;
                var coldStateElement = this.convertColdStateToElement(coldState);

                this.$el.replaceWith(coldStateElement);
                this.setElement(coldStateElement);
            } else {
                if (this.ItemView !== EMPTY_ITEM_VIEW) {
                    this.model.each(function(model, modelPositionInList) {

                        var subView = this.createSubView(this.ItemView).withOptions({
                            model: model,
                            tagName: "li",
                            modelPositionInList: modelPositionInList
                        })
                        .andAppendIt();

                        this.attachItemEventsTo(subView);

                    }.bind(this));
                } else {
                    console.warn("Please specify an item view for your list");
                }
            }

            return this;
        }
    }));

    return ListView;
});
