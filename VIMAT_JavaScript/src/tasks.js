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
            date: 0,
            duedatestring: "",
            repeat: "n",
            context: "all",
            order: Tasks.nextOrder(),
            done: false
          };
        },

        // Convert task to a string
        toString: function() {
            var ts; //(taskString)
            ts = this.title + "^";
            ts += this.civlife + "^";
            ts += this.date + "^";
            ts += this.duedatestring + "^";
            ts += this.repeat + "^";
            ts += this.context + "^";
            ts += this.done + "^";
            return (ts);
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

        groupBy: function(Task) {
            return Task.get('civlife');
        },

		// Tasks are sorted by their original insertion order.
		comparator: function(task) {
			return task.get('date');
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

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });
  
  var uniqueContexts = new Array();

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
        "click #display-taskstrings-button": "displayTasksToString",
        "click #create-task-from-text": "createFromString",
        "click #toggle-all-button": "toggleAllComplete"
    },

    currentCivLife: "",
    currentContext: "",

    gatherUniqueContexts: function(task) {
        if ( jQuery.inArray(task.get("context"), uniqueContexts) == -1 )
            uniqueContexts.push(task.get("context"));
    },

    initialize: function() {
        this.input = this.$("#new-task");
        // this.allCheckbox = this.$("#toggle-all")[0];

        // Bind to relevant events on `Tasks` collection, when items are added/changed.
        this.listenTo(Tasks, 'add', this.addOne);
        this.listenTo(Tasks, 'reset', this.addAll);
        this.listenTo(Tasks, 'all', this.render);

        this.footer = this.$('footer');
        this.main = $('#main');

        Tasks.fetch(); // load any preexisting tasks saved in localStorage.
      
        // Set date input to today's date
        var todaysdate = new Date();
        document.getElementById("year").value = todaysdate.getFullYear();
        document.getElementById("month").value = todaysdate.getMonth() + 1;
        document.getElementById("day").value = todaysdate.getDate();
        
        // Tasks.each(this.gatherUniqueContexts);
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

    //  Display task as string
    displayTaskString: function(task) {
        var ts; //(taskString)
        ts = task.get("title") + "^";
        ts += task.get("civlife") + "^";
        ts += task.get("date") + "^";
        ts += task.get("duedatestring") + "^";
        ts += task.get("repeat") + "^";
        ts += task.get("context") + "^";
        document.getElementById('new-task').value += ts;
    },

    // Add a single task item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(task) {
        //  if ( (task.get("date") <= ( new Date() ).getTime() ) && (task.get("civlife") == currentCivLife) && (task.get("context") == currentContext) )
        //  {
            // var view = new TaskView({model: task});
            // this.$("#task-list").append(view.render().el);
        //  }
         if ( (task.get("date") <=  (new Date()).getTime()) && (task.get("civlife") == currentCivLife) )
         {
            var view = new TaskView({model: task});
            this.$("#task-list").append(view.render().el);
         }
    },

    // Add all items in the **Tasks** collection at once.
    addAll: function() {

        // var taskListElement = document.getElementById("task-list");
        // var contextheading=document.createElement("h3");
        // var contextnode=document.createTextNode("");
        // for (i = 0; i < uniqueContexts.length; i++) {
        //     taskListElement = document.getElementById("task-list");
        //     contextheading=document.createElement("h3");
        //     contextnode=document.createTextNode(uniqueContexts[i]);
        //     contextheading.appendChild(contextnode);
        //     taskListElement.appendChild(contextheading);
        //     currentContext = uniqueContexts[i];
        // Tasks.each(this.addOne);
        // }
        
        var taskListElement = document.getElementById("task-list");
        var clheading=document.createElement("h3");
        var clnode=document.createTextNode("Growth");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "growth";
        Tasks.each(this.addOne);
        
        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("Science");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "science";
        Tasks.each(this.addOne);
        
        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("Gold");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "gold";
        Tasks.each(this.addOne);
        
        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("Culture");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "culture";
        Tasks.each(this.addOne);
        
        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("Defense");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "defense";
        Tasks.each(this.addOne);
        
        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("Wonders");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "wonders";
        Tasks.each(this.addOne);

        taskListElement = document.getElementById("task-list");
        clheading=document.createElement("h3");
        clnode=document.createTextNode("No Category");
        clheading.appendChild(clnode);
        taskListElement.appendChild(clheading);
        currentCivLife = "";
        Tasks.each(this.addOne);
    },

    repeatTask: function(task) {
           if ((task.get("done") == true) && (task.get("repeat") != "n"))
           {
               var d = new Date();
               var ds; // date string
               var currentDate = task.get("date");
               var newDate;
               var msInDay = 1000 * 60 * 60 * 24; // milliseconds in a day
               switch (task.get("repeat")){
                   case "a":
                       newDate = currentDate + 365 * msInDay;
                        d.setTime(newDate);
                        ds = d.toDateString();
				        task.save({date: newDate, done: false, duedatestring: ds});
                       break;
                    case "m":
                        newDate = currentDate + 365 / 12 * msInDay;
                        d.setTime(newDate);
                        ds = d.toDateString();
				        task.save({date: newDate, done: false, duedatestring: ds});
                        break;
                    case "w":
                        newDate = currentDate + 7 * msInDay;
                        d.setTime(newDate);
                        ds = d.toDateString();
				        task.save({date: newDate, done: false, duedatestring: ds});
                        break;
                    case "d":
                        newDate = currentDate + msInDay;
                        d.setTime(newDate);
                        ds = d.toDateString();
				        task.save({date: newDate, done: false, duedatestring: ds});
                        break;
               }
           }
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

//     getDueDateInMsFromDateInputs: function() {
// 		var y = document.getElementById('year');
// 		var m = document.getElementById('month');
// 		var d = document.getElementById('day');
// 		var dueDate = new Date();
//  		dueDate.setFullYear(y.value);
//  		dueDate.setMonth(m.value - 1);
// 		dueDate.setDate(d.value);
// 		dueDate.setHours(0);
// 		dueDate.setMinutes(0);
// 		dueDate.setSeconds(0);
// 		var dueDateMs = dueDate.getTime();
//         return (dueDateMs);
//     },

//     getDueDateStringFromDateInputs: function() {
// 		var y = document.getElementById('year');
// 		var m = document.getElementById('month');
// 		var d = document.getElementById('day');
// 		var dueDate = new Date();
//         dueDate.setFullYear(y.value);
//         dueDate.setMonth(m.value - 1);
// 		dueDate.setDate(d.value);
// 		dueDate.setHours(0);
// 		dueDate.setMinutes(0);
// 		dueDate.setSeconds(0);
// 		var dueDateString = dueDate.toDateString();
//         return (dueDateString);
//     },

    // If you click the new task button, create new **Task** model,
    // persisting it to *localStorage*.
    createOnClick: function() {
		var cl = document.getElementById("new-task-civlife");
		
		var y = document.getElementById('year');
		var m = document.getElementById('month');
		var d = document.getElementById('day');
		var dueDate = new Date();
        dueDate.setFullYear(y.value);
        dueDate.setMonth(m.value - 1);
		dueDate.setDate(d.value);
		dueDate.setHours(0);
		dueDate.setMinutes(0);
		dueDate.setSeconds(0);
		var dueDateMs = dueDate.getTime();
		var dueDateString = dueDate.toDateString();
		
        Tasks.create({
            title: document.getElementById('new-task').value,
            civlife: cl.options[cl.selectedIndex].value,
            date: dueDateMs,
			duedatestring: dueDateString,
			repeat: document.getElementById('repeat').value,
// 			context: document.getElementById('contextinput').value
		});
		
        document.getElementById('new-task').value = '';
        // document.getElementById('contextinput').value = '';
        
        // Tasks.each(this.gatherUniqueContexts);
        // location.reload();
    },

    createFromString: function() {
        var ttl, cvlf, dt, ddtstrng, rpt, cntxt;
        var ts = document.getElementById('new-task').value;
        var chopPoint;
        
        var extractPropertyFromTaskString = function(){
            chopPoint = ts.indexOf("^");
            var propString;
            if (chopPoint > -1){
                propString = ts.substring(0, chopPoint);
                ts = ts.substring(chopPoint+1, ts.length);
            }
            return propString;
        };
        
        while (ts.length > 0) {
            ttl = extractPropertyFromTaskString();
            cvlf = extractPropertyFromTaskString();
            dt = extractPropertyFromTaskString();
    		ddtstrng = extractPropertyFromTaskString();
    		rpt = extractPropertyFromTaskString();
    		cntxt = extractPropertyFromTaskString();

            Tasks.create({
                title: ttl,
                civlife: cvlf,
                date: dt,
                duedatestring: ddtstrng,
                repeat: rpt,
                context: cntxt
            });
        }
		
        document.getElementById('new-task').value = '';
        // location.reload();
    },

    displayTasksToString: function() {
        Tasks.each(this.displayTaskString);
    },

    // Clear all done task items, destroying their models.
    clearCompleted: function() {
        Tasks.each(this.repeatTask);
      _.invoke(Tasks.done(), 'destroy');
      return false;
    },
    
    toggleAllComplete: function () {
        //var done = this.allCheckbox.checked;
        Tasks.each(function (task) {
            task.save({done: true});
        });
//        Tasks.each(this.save({done: true}));
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});