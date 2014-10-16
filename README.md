vimat
is
more than
a
todo list

About:
vimat is an integrated productivity environment

Changelog v(year).(month).(week).(date).(hour)

v14.10.42.16.9
    Began Modularizing the Task List
        -The original task list will be deleted when finished.
        -The new task list has IDs so tasks can easily be associated with projects
            and other tool.
        -The new task list has toString and fromString functions .
            -This will save storage space because now we can save the string
                instead of the entire object with property names.
            -This will also allow sharing or importing/exporting.
            -I have already implemented long characterstrings for storing/sharing multiple
                tasks in a past life of this app (freeIPE) and will soon
                add it to this one.
    Added List of Lists
        -I still need to get it to save correctly.
        -I will add toString and fromString here as well.
            -Then people living together can share a shopping list and actually
                have the data sent into the app. Then you can check things off of
                your list rather than having to look at a plain text list in your
                email or a text message. Some apps do the latter.
    
v14.9
    Added CSS styling

v14.38
    New Features:
        started on repeating tasks
        started on exporting
        converted controller to a module
        created a facade for the html

v14.37
    New features:
        Compass (guide for creating tasks and choosing which to do)
        Tickler (tasks due on a future date)
        Notes (a tool for adding notes)
        Time Tracker (data for which is displayed within various tools)
