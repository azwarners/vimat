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
