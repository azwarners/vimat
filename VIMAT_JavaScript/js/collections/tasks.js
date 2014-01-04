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
