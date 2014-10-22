/*
	******************************************************************
	 Copyright 2013 Nicholas Warner

	 This file is part of vimat.

    vimat is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    vimat is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with vimat.  If not, see <http://www.gnu.org/licenses/>.
	******************************************************************
*/

var VIMAT = VIMAT || {};

// List of Lists
VIMAT.namespace("VIMAT.MODEL.LISTS");
VIMAT.MODEL.LISTS.ListItem = function(d) {
    this.description = d,
    this.checked = false;
};   
VIMAT.MODEL.LISTS.ListItem.prototype.getChecked = function () {
    return this.checked;
};
VIMAT.MODEL.LISTS.ListItem.prototype.setChecked = function (b) {
    this.checked = b;
};
VIMAT.MODEL.LISTS.ListItem.prototype.getDescription = function () {
    return this.description;
};
VIMAT.MODEL.LISTS.ListItem.prototype.setDescription = function (d) {
    this.description = d;
};
VIMAT.MODEL.LISTS.List = function(n) {
    this.arrayContent = [];
    this.name = n;
    this.keepItemsAfterCheckedOff = true;
    this.trashCan = [];
};
VIMAT.MODEL.LISTS.List.prototype.getName = function () {
    return this.name;
};
VIMAT.MODEL.LISTS.List.prototype.setName = function (n) {
    this.name = n;
};
VIMAT.MODEL.LISTS.List.prototype.getKeepItemsAfterCheckedOff = function () {
    return this.keepItemsAfterCheckedOff;
};
VIMAT.MODEL.LISTS.List.prototype.setKeepItemsAfterCheckedOff = function (b) {
    this.keepItemsAfterCheckedOff = b;
};
VIMAT.MODEL.LISTS.List.prototype.setCheckedAll = function (b) {
    var i, l = this.arrayContent.length;
    for (i = 0; i < l; i++) {
        this.arrayContent[i].setChecked(b);
    }
};
VIMAT.MODEL.LISTS.List.prototype.getListItemAt = function (index) {
    return this.arrayContent[index];
};
VIMAT.MODEL.LISTS.List.prototype.removeListItemAt = function (index) {
    this.trashCan.push(this.arrayContent[index]);
    this.arrayContent.splice(index, 1);
};
VIMAT.MODEL.LISTS.List.prototype.addListItem = function (li) {
    this.arrayContent.push(li);
};
VIMAT.MODEL.LISTS.List.prototype.deleteOrRestoreTrash = function () {
    var i, l = this.trashCan.length;
    for (i = 0; i < l; i++) {
        if (this.keepItemsAfterCheckedOff) {
            this.arrayContent.push(this.trashCan[i]);
            this.trashCan.splice(i, 1);
        }
        else {
            this.trashCan.splice(i, 1);
        }
    }
};
VIMAT.MODEL.LISTS.List.prototype.moveCheckedItemsToTrash = function () {
    var i, l = this.arrayContent.length;
    for (i = 0; i < l; i++) {
        if (this.arrayContent[i].getChecked()) {
            this.removeListItemAt(i);
        }
    }
};
VIMAT.MODEL.LISTS.List.prototype.getLength = function () {
    return this.arrayContent.length;
};
VIMAT.MODEL.LISTS.listOfLists = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];

    // *** Private methods
    function addList(vimatList) {
        arrayContent.push(vimatList);
    }
    function addItemToCurrentList(li) {
        arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].addListItem(li);
    }
    function getListAt(index) {
        return arrayContent[index];
    }
    function getListNameAt(index) {
        return arrayContent[index].getName();
    }
    function removeListAt(index) {
        arrayContent.splice(index, 1);
    }
    function getNumberOfLists() {
        return arrayContent.length;
    }
    function getListOfListNames() {
        var l = arrayContent.length,
            loln = [],
            i;
        for (i = 0; i < l; i++) {
            loln.push(arrayContent[i].getName());
        }
        return loln;
    }
    function getListByListName(ln) {
        var l = arrayContent.length,
            i,
            list;
        for (i = 0; i < l; i++) {
            if (arrayContent[i].getName() === ln) {
                list = arrayContent[i];
            }
        }
        return list;
    }
    function toggleCheckStateOfItemInCurrentListById(id) {
        if (arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).getChecked()) {
            arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).unCheck();
        }
        else {
            arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).unCheck();
        }
    }
    
    // *** Initialization

    // *** Public API
    return {
        addList:                                    addList,
        addItemToCurrentList:                       addItemToCurrentList,
        getListAt:                                  getListAt,
        getListNameAt:                              getListNameAt,
        removeListAt:                               removeListAt,
        getNumberOfLists:                           getNumberOfLists,
        getListOfListNames:                         getListOfListNames,
        getListByListName:                          getListByListName,
        toggleCheckStateOfItemInCurrentListById:    toggleCheckStateOfItemInCurrentListById
    };
}());

// Tasks
VIMAT.namespace("VIMAT.MODEL.TASKS");
VIMAT.MODEL.TASKS.Task = function(d) {
    this.id = '';
    this.description = d;
    this.finished = false;
    this.context = '';
    this.dueDate = '';
    this.compass = '';
    this.priority = '';
    this.urgency = '';
    this.repeats = false;
    this.dueOrCompletion = '';
    this.frequency = 0;
    this.interval = '';
};
VIMAT.MODEL.TASKS.Task.prototype.getId = function () {
    return this.id;
};
VIMAT.MODEL.TASKS.Task.prototype.setId = function (i) {
    this.id = i;
};
VIMAT.MODEL.TASKS.Task.prototype.getDescription = function () {
    return this.description;
};
VIMAT.MODEL.TASKS.Task.prototype.setDescription = function (d) {
    this.description = d;
};
VIMAT.MODEL.TASKS.Task.prototype.getFinished = function () {
    return this.finished;
};
VIMAT.MODEL.TASKS.Task.prototype.setFinished = function (f) {
    this.finished = f;
};
VIMAT.MODEL.TASKS.Task.prototype.getContext = function () {
    return this.context;
};
VIMAT.MODEL.TASKS.Task.prototype.setContext = function (c) {
    this.context = c;
};
VIMAT.MODEL.TASKS.Task.prototype.getDueDate = function () {
    return this.dueDate;
};
VIMAT.MODEL.TASKS.Task.prototype.setDueDate = function (d) {
    this.dueDate = d;
};
VIMAT.MODEL.TASKS.Task.prototype.getCompass = function () {
    return this.compass;
};
VIMAT.MODEL.TASKS.Task.prototype.setCompass = function (c) {
    this.compass = c;
};
VIMAT.MODEL.TASKS.Task.prototype.getPriority = function () {
    return this.priority;
};
VIMAT.MODEL.TASKS.Task.prototype.setPriority = function (p) {
    this.priority = p;
};
VIMAT.MODEL.TASKS.Task.prototype.getUrgency = function () {
    return this.urgency;
};
VIMAT.MODEL.TASKS.Task.prototype.setUrgency = function (u) {
    this.urgency = u;
};
VIMAT.MODEL.TASKS.Task.prototype.getRepeats = function () {
    return this.repeats;
};
VIMAT.MODEL.TASKS.Task.prototype.setRepeats = function (r) {
    this.repeats = r;
};
VIMAT.MODEL.TASKS.Task.prototype.getDueOrCompletion = function () {
    return this.dueOrCompletion;
};
VIMAT.MODEL.TASKS.Task.prototype.setDueOrCompletion = function (doc) {
    this.dueOrCompletion = doc;
};
VIMAT.MODEL.TASKS.Task.prototype.getFrequency = function () {
    return this.frequency;
};
VIMAT.MODEL.TASKS.Task.prototype.setFrequency = function (f) {
    this.frequency = f;
};
VIMAT.MODEL.TASKS.Task.prototype.getInterval = function () {
    return this.interval;
};
VIMAT.MODEL.TASKS.Task.prototype.setInterval = function (i) {
    this.interval = i;
};
VIMAT.MODEL.TASKS.Task.prototype.toString = function () {
    var str = this.id;
    str += '|' + this.description;
    str += '|' + this.finished;
    str += '|' + this.context;
    str += '|' + this.dueDate;
    str += '|' + this.compass;
    str += '|' + this.priority;
    str += '|' + this.urgency;
    str += '|' + this.repeats;
    str += '|' + this.dueOrCompletion;
    str += '|' + this.frequency;
    str += '|' + this.interval;
    return str;
};
VIMAT.MODEL.TASKS.Task.prototype.fromString = function (s) {
    var taskProperties = [];
    taskProperties = s.split('|');
    // 'finished' and 'repeats' are boolean and the expressions
    // that follow were used to store boolean values rather than strings
    this.id = taskProperties[0];
    this.description = taskProperties[1];
    this.finished = (taskProperties[2] === 'true');
    this.context = taskProperties[3];
    this.dueDate = taskProperties[4];
    this.compass = taskProperties[5];
    this.priority = taskProperties[6];
    this.urgency = taskProperties[7];
    this.repeats = (taskProperties[8] === 'true');
    this.dueOrCompletion = taskProperties[9];
    this.frequency = taskProperties[10];
    this.interval = taskProperties[11];
};
VIMAT.MODEL.TASKS.Task.prototype.repeat = function () {
    var d;
    if (this.dueOrCompletion === 'd') {
        d = Date.parse(this.dueDate);
    }
    else {
        d = Date.parse(new Date());
    }
    if (this.interval === 'd') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInDay();
    }
    if (this.interval === 'w') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInWeek();
    }
    if (this.interval === 'm') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInWeek();
    }
    if (this.interval === 'y') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInYear();
    }
    this.dueDate = (new Date(d)).toJSON();
};
VIMAT.MODEL.TASKS.taskList = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];
    
    // *** Private methods
    function addTask(t) {
        // Any new task created for the task list must go through this function
        // in order to get the proper ID
        t.setId(VIMAT.SETTINGS.taskList.getNextId()); // ***** Prefix ID with userID);
        arrayContent.push(t);
    }
    function addTaskFromString(s) {
        // This function will not create a new ID
        // This is for tasks that have already been created and
        // assigned a unique ID
        var t = new VIMAT.MODEL.TASKS.Task();
        t.fromString(s);
        arrayContent.push(t);
    }
    function addTasksFromStrings(ss) {
        // array version of 'addTaskFromString'
        var i, l = ss.length;
        for (i = 0; i < l; i++) {
            addTaskFromString(ss[i]);
        }
    }
    function getAllTasksToStrings() {
        var i, ts = [];
        for (i = 0; i < getNumberOfTasks(); i++)  {
            ts[i] = arrayContent[i].toString();
        }
        return ts;
    }
    function getTaskByIndex(i) {
        return arrayContent[i];
    }
    function getTaskById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (arrayContent[i].getId() === id) {
                return arrayContent[i];
            }
        }
    }
    function getTaskIndexById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (arrayContent[i].getId() === id) {
                return i;
            }
        }
    }
    function removeTaskById(id) {
        var i = getTaskIndexById(id);
        arrayContent.splice(i, 1);
    }
    function sortByContext() {
        
    }
    function sortByCompass() {
        
    }
    function sortByPriority() {
        
    }
    function sortByUrgency() {
        
    }
    function sortByDate() {
        arrayContent.sort(function (a, b) {
          if (a.getDueDate() > b.getDueDate()) {
            return 1;
          }
          if (a.getDueDate() < b.getDueDate()) {
            return -1;
          }
          return 0;
        });
    }
    function deleteOrRepeatCompleted() {
        var l = getNumberOfTasks(),
            i, t;
        for (i = 0; i < l; i++) {
            t = getTaskByIndex(i);
            if (t.getFinished()) {
                if (t.getRepeats()) {
                    t.repeat();
                    arrayContent.splice(i, 1);
                    i--;
                    arrayContent.push(t);
                }
                else {
                    arrayContent.splice(i, 1);
                    i--;
                }
            }
        }
    }
    function getTextForCompleted() {
        var arrayOfTaskStrings = [],
            l = getNumberOfTasks(),
            i, t;
        for (i = 0; i < l; i++) {
            t = getTaskById(i);
            if (t.getFinished()) {
                arrayOfTaskStrings.push(t.toString());
                arrayContent.splice(i, 1);
                i--;
                t.setFinished(false);
                arrayContent.push(t);
            }
        }
        return arrayOfTaskStrings;
    }
    function moveCompletedToProject(projectId) {
        
    }
    function getNumberOfTasks() {
        return arrayContent.length;
    }

    // *** Initialization

    // *** Public API
    return {
        addTask:                    addTask,
        addTaskFromString:          addTaskFromString,
        addTasksFromStrings:        addTasksFromStrings,
        removeTaskById:             removeTaskById,
        sortByContext:              sortByContext,
        sortByCompass:              sortByCompass,
        sortByPriority:             sortByPriority,
        sortByUrgency:              sortByUrgency,
        sortByDate:                 sortByDate,
        deleteOrRepeatCompleted:    deleteOrRepeatCompleted,
        getTextForCompleted:        getTextForCompleted,
        moveCompletedToProject:     moveCompletedToProject,
        getNumberOfTasks:           getNumberOfTasks,
        getTaskByIndex:             getTaskByIndex,
        getTaskById:                getTaskById,
        getTaskIndexById:           getTaskIndexById,
        getAllTasksToStrings:       getAllTasksToStrings
    };
}());

var tasks = [];
function Task(description) {
    this.description = description;
    this.finished = false;
    this.dueDate = '';
    this.compass = 'Chores';
    this.repeats = false;
    this.dueOrCompletion = ''; // 'due' or 'completion' to tell from when it repeats
    this.frequency = 0; // how often it repeats
    this.interval = ''; // repeats every 'day', 'week', 'month', or 'year'
}

// time tracker
var trackedTimes = [];
var msInDay = 60000 * 60 * 24;
var msInWeek = msInDay * 7;
var msInMonth = msInWeek * (13/4);
function TrackedTime(st, c) {
    // expects a JSON time/date string for st and a string for c
    this.startTime = st;
    this.endTime;
    this.compass = c;
}
function timeTrackerStatsForCompass() {
    var stats = [];
    for (var j in compassCategories) {
        var dt = new Date();
        var h = 'D ';
        var d = 0;
        var ds = 0;
        var w = 0;
        var m = 0;
        for (var i in trackedTimes) {
            if (trackedTimes[i].compass === compassCategories[j]) {
                if (dt - new Date(trackedTimes[i].startTime) < msInMonth) {
                    if (trackedTimes[i].endTime) {
                        m += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        m += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInWeek) {
                    if (trackedTimes[i].endTime) {
                        w += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        w += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInDay) {
                    if (trackedTimes[i].endTime) {
                        d += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        d += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
            }
        }
        ds = (d - Math.floor(d)) * 60;
        if (ds < 10) {
            ds = '0' + Math.floor(ds).toString();
            h += Math.floor(d) + ':' + ds + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
        }
        else {
            h += Math.floor(d) + ':' + Math.floor(ds) + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
    
        }
        stats[j] = h;
    }
    return stats;
}

// projects
VIMAT.namespace("VIMAT.MODEL.PROJECTS");
VIMAT.MODEL.PROJECTS.ProjectTask = function(taskId) {
    this.id = 'p' + taskId;
    this.requiresProjectTaskIds = [];
};
VIMAT.MODEL.PROJECTS.Project = function(n) {
    this.name = n;
    this.projectTaskIds = [];
    this.dueDate = '';
    this.compass = '';
    this.priority  = '';
    this.urgency = '';
    this.repeats = false;
    this.dueOrCompletion = '';
    this.frequency = 0;
    this.interval = '';
};
VIMAT.MODEL.PROJECTS.Project.prototype.getName = function () {
    return this.name;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setName = function (n) {
    this.name = n;
};
VIMAT.MODEL.PROJECTS.Project.prototype.addTaskId = function (id) {
    this.taskIds.push(id);
};
VIMAT.MODEL.PROJECTS.Project.prototype.removeTaskId = function (id) {
    var i, l = this.taskIds.length;
    for (i = 0; i < l; i++) {
        if (this.taskIds[i] === id) {
            this.taskIds.splice(i, 1);
            return true;
        }
    }
    return false;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getContext = function () {
    return this.context;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setContext = function (c) {
    this.context = c;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getDueDate = function () {
    return this.dueDate;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setDueDate = function (d) {
    this.dueDate = d;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getCompass = function () {
    return this.compass;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setCompass = function (c) {
    this.compass = c;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getPriority = function () {
    return this.priority;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setPriority = function (p) {
    this.priority = p;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getUrgency = function () {
    return this.urgency;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setUrgency = function (u) {
    this.urgency = u;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getRepeats = function () {
    return this.repeats;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setRepeats = function (r) {
    this.repeats = r;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getDueOrCompletion = function () {
    return this.dueOrCompletion;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setDueOrCompletion = function (doc) {
    this.dueOrCompletion = doc;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getFrequency = function () {
    return this.frequency;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setFrequency = function (f) {
    this.frequency = f;
};
VIMAT.MODEL.PROJECTS.Project.prototype.getInterval = function () {
    return this.interval;
};
VIMAT.MODEL.PROJECTS.Project.prototype.setInterval = function (i) {
    this.interval = i;
};
// VIMAT.MODEL.PROJECTS.Project.prototype.toString = function () {
//     var str = this.id;
//     str += '|' + this.description;
//     str += '|' + this.finished;
//     str += '|' + this.context;
//     str += '|' + this.dueDate;
//     str += '|' + this.compass;
//     str += '|' + this.priority;
//     str += '|' + this.urgency;
//     str += '|' + this.repeats;
//     str += '|' + this.dueOrCompletion;
//     str += '|' + this.frequency;
//     str += '|' + this.interval;
//     return str;
// };
// VIMAT.MODEL.PROJECTS.Project.prototype.fromString = function (s) {
//     var taskProperties = [];
//     taskProperties = s.split('|');
//     this.id = taskProperties[0];
//     this.description = taskProperties[1];
//     this.finished = (taskProperties[2] === 'true');
//     this.context = taskProperties[3];
//     this.dueDate = taskProperties[4];
//     this.compass = taskProperties[5];
//     this.priority = taskProperties[6];
//     this.urgency = taskProperties[7];
//     this.repeats = (taskProperties[8] === 'true');
//     this.dueOrCompletion = taskProperties[9];
//     this.frequency = taskProperties[10];
//     this.interval = taskProperties[11];
// };
VIMAT.MODEL.PROJECTS.projectList = (function () {
    // *** Private Properties
    var arrayContent = [];
    
    // *** Private Methods
    function addProject(p) {
        arrayContent.push(p);
    }
    function getNumberOfProjects() {
        return arrayContent.length;
    }
    function getProjectAtIndex(i) {
        return arrayContent[i];
    }
    
    // *** Public API
    return {
        addProject:             addProject,
        getNumberOfProjects:    getNumberOfProjects,
        getProjectAtIndex:      getProjectAtIndex
    };
}());

// calendar
VIMAT.namespace("VIMAT.MODEL.CALENDAR");
VIMAT.MODEL.CALENDAR.Event = function (d) {
    // *** Private Properties
    var description = d,
        date = '';
        
    // *** Private Methods
    function getDescription() {
        return description;
    }
    function setDescription(d) {
        description = d;
    }
    function getDate() {
        return date;
    }
    function setDate (d) {
        date = d;
    }
    
    // *** Public API
    return {
        getDescription:     getDescription,
        setDescription:     setDescription,
        getDate:            getDate,
        setDate:            setDate
    };
};
VIMAT.MODEL.CALENDAR.calendar = (function () {
    // *** Private Properties
    var arrayContent = [];
    
    // *** Private Methods
    function addEvent(e) {
        arrayContent.push(e);
    }
    
    // *** Public API
    return {
        addEvent:       addEvent
    };
}());

// Notes
function Note(description, content) {
    this.description = description;
    this.content = content;
    var project;
}
var notes = [];

// settings
function Settings() {
    
    // task list
    var defaultTaskDueDate = '';
    var defaultTaskCompass = 'Chores';
    var taskListToolIsDisplayed = false;
    
    // tickler
    var ticklerToolIsDisplayed = false;
    
    // calendar
    var calendarToolIsDisplayed = false;
    
    // compass
    var compassToolIsDisplayed = false;

    // notes
    var notesToolIsDisplayed = false;

}
var settings = new Settings();

// Misc Data
VIMAT.namespace("VIMAT.MODEL.MISC");
VIMAT.MODEL.MISC = (function () {
    // *** Private Properties
    var compassCategories = [   "Wellness",
                                "Education",
                                "Finance",
                                "Art",
                                "Chores",
                                "Relations",
                                "Projects",
                                "Tools" ];
    var msInDay = 1000 * 60 * 60 * 24;
    var msInWeek = msInDay * 7;
    var msInYear = msInDay * 365;
    var msInMonth = msInYear / 12;

    // *** Private Methods
    function getCompassCategories() {
        return compassCategories;
    }
    function getMsInDay() {
        return msInDay;
    }
    function getMsInWeek() {
        return msInWeek;
    }
    function getMsInMonth() {
        return msInMonth;
    }
    function getMsInYear() {
        return msInYear;
    }
    
    // *** Public API
    return {
        getCompassCategories:   getCompassCategories,
        getMsInDay:             getMsInDay,
        getMsInWeek:            getMsInWeek,
        getMsInMonth:           getMsInMonth,
        getMsInYear:            getMsInYear
    };
}());
var compassCategories = [   "Wellness",
                            "Education",
                            "Finance",
                            "Art",
                            "Chores",
                            "Relations",
                            "Projects",
                            "Tools"     ];