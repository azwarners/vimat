// Tasks javascript file is part of VIMAT modified from the following:
// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

	// Task Model
	// ----------

	var Task = Backbone.Model.extend({

	// Default attributes for the todo item.
	// Our basic **Task** model has `title`, 'civlife', `order`, and `done` attributes.
    defaults: function() {
      return {
        title: "empty todo...",
			civlife: "defense",
        order: Tasks.nextOrder(),
        done: false
      };
    },

	// Ensure that each task created has `title`.
	initialize: function() {
		if (!this.get("title")) {
		this.set({"title": this.defaults().title});
		}
	},

	// Toggle the `done` state of this task item.
	toggle: function() {
		this.save({done: !this.get("done")});
		}

	});

	// Task Collection
	// ---------------

	// The collection of tasks is backed by *localStorage* instead of a remote
	// server.
	var TaskList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: Task,

		// Save all of the task items under the `"tasks-backbone"` namespace.
		localStorage: new Backbone.LocalStorage("tasks-backbone"),

		// Filter down the list of all task items that are finished.
		done: function() {
		return this.filter(function(task){ return task.get('done'); });
		},

		// Filter down the list to only task items that are still not finished.
		remaining: function() {
			return this.without.apply(this, this.done());
		},

		// We keep the Tasks in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		// Tasks are sorted by their original insertion order.
		comparator: function(task) {
			return task.get('order');
		}

	});

	// Create our global collection of **Tasks**.
	var Tasks = new TaskList;

	// Task Item View
	// --------------

	// The DOM element for a task item...
	var TaskView = Backbone.View.extend({

		//... is a list tag.
		tagName:  "li",

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			"click .toggle"   : "toggleDone",
			"dblclick .view"  : "edit",
			"click a.destroy" : "clear",
			"keypress .edit"  : "updateOnEnter",
			"blur .edit"      : "close"
		},

		// The TaskView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Task** and a **TaskView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		//Re-Render the titles of the task item.
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');
			return this;
		},

		// Toggle the `"done"` state of the model.
		toggleDone: function() {
			this.model.toggle();
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function() {
			this.$el.addClass("editing");
			this.input.focus();
		},

		// Close the `"editing"` mode, saving changes to the task.
		close: function() {
			var value = this.input.val();
			if (!value) {
				this.clear();
      	    }
			else {
				this.model.save({title: value});
				this.$el.removeClass("editing");
			}
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function(e) {
			if (e.keyCode == 13) this.close();
		},

																																																										    //				Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#taskapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-task":  "createOnEnter",
		"click #new-task-button": "createOnClick",
      "click #clear-completed": "clearCompleted",
//      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Tasks`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting tasks that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$("#new-task");
//      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(Tasks, 'add', this.addOne);
      this.listenTo(Tasks, 'reset', this.addAll);
      this.listenTo(Tasks, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      Tasks.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Tasks.done().length;
      var remaining = Tasks.remaining().length;

      if (Tasks.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

//      this.allCheckbox.checked = !remaining;
    },

    // Add a single task item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(task) {
      var view = new TaskView({model: task});
      this.$("#task-list").append(view.render().el);
    },

    // Add all items in the **Tasks** collection at once.
    addAll: function() {
      Tasks.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Task** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Tasks.create({ title: this.input.val(),
							civlife: document.getElementById('new-task-civlife').value });
      this.input.val('');
    },

    // If you click the new task button, create new **Task** model,
    // persisting it to *localStorage*.
    createOnClick: function() {
		var cl = document.getElementById("new-task-civlife");
      Tasks.create({ title: document.getElementById('new-task').value,
//							civlife: document.getElementById('new-task-civlife').value 
							civlife: cl.options[cl.selectedIndex].value });
      document.getElementById('new-task').value = '';
		//document.getElementById('new-task-civlife').value = '';
//      this.input.val('');
    },

    // Clear all done task items, destroying their models.
    clearCompleted: function() {
      _.invoke(Tasks.done(), 'destroy');
      return false;
    },

//    toggleAllComplete: function () {
//      var done = this.allCheckbox.checked;
//      Tasks.each(function (task) { task.save({'done': done}); });
//    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
