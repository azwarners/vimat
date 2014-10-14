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
VIMAT.namespace("VIMAT.MODEL.LISTOFLISTS");
VIMAT.MODEL.LISTOFLISTS.ListItem = function(d) {
    // *** Private Properties
    var description = d,
        checked = false;
    
    // *** Private Methods
    function getChecked() {
        return checked;
    }
    function check() {
        checked = true;
    }
    function unCheck() {
        checked = false;
    }
    function getDescription() {
        return description;
    }
    function setDescription(d) {
        description = d;
    }
    // *** Public API
    return {
        getChecked:     getChecked,
        check:          check,
        unCheck:        unCheck,
        getDescription: getDescription,
        setDescription: setDescription
    };
};
VIMAT.MODEL.LISTOFLISTS.List = function(n) {
    // *** Private Properties
    var arrayContent = [],
        name = n,
        keepItemsAfterCheckedOff = true,
        trashCan = [];

    // *** Private Methods
    function getName() {
        return name;
    }
    function setName(n) {
        name = n;
    }
    function checkAll() {
        var i,
            l = arrayContent.length;
            
        for (i = 0; i < l; i++) {
            arrayContent[i].check();
        }
    }
    function unCheckAll() {
        var i,
            l = arrayContent.length;
            
        for (i = 0; i < l; i++) {
            arrayContent[i].unCheck();
        }
    }
    function getListItemAt(index) {
        return arrayContent[index];
    }
    function removeListItemAt(index) {
        var toTrash = arrayContent[index];
        trashCan.push(toTrash);
        arrayContent.splice(index, 1);
        
    }
    function addListItem(li) {
        arrayContent.push(li);
    }
    function restoreTrash() {
        var l = trashCan.length,
            i,
            toList;
        for (i = 0; i < l; i++) {
            toList = trashCan[i];
            arrayContent.push(toList);
            trashCan.splice(i, 1);
        }
    }
    function deleteTrash() {
        var l = trashCan.length,
            i;
        for (i = 0; i < l; i++) {
            trashCan.splice(i, 1);
        }
    }
    function moveCheckedItemsToTrash() {
        
    }
    function getLength() {
        return arrayContent.length;
    }

    // *** Public API
    return {
        reusableList:       keepItemsAfterCheckedOff,
        getName:            getName,
        setName:            setName,
        checkAll:           checkAll,
        unCheckAll:         unCheckAll,
        getListItemAt:      getListItemAt,
        removeListItemAt:   removeListItemAt,
        addListItem:        addListItem,
        getLength:          getLength
    };
};
VIMAT.MODEL.LISTOFLISTS.listOfLists = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];

    // *** Private methods
    function addList(vimatList) {
        arrayContent.push(vimatList);
    }
    function addItemToCurrentList(li) {
        arrayContent[VIMAT.SETTINGS.LISTOFLISTS.getCurrentListIndex()].addListItem(li);
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
        if (arrayContent[VIMAT.SETTINGS.LISTOFLISTS.getCurrentListIndex()].getListItemAt(id).getChecked()) {
            arrayContent[VIMAT.SETTINGS.LISTOFLISTS.getCurrentListIndex()].getListItemAt(id).unCheck();
        }
        else {
            arrayContent[VIMAT.SETTINGS.LISTOFLISTS.getCurrentListIndex()].getListItemAt(id).unCheck();
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
VIMAT.namespace("VIMAT.MODEL.TASKLIST");
VIMAT.MODEL.TASKLIST.Task = function(d) {
    this.id = VIMAT.SETTINGS.TASKLIST.getNextId();
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
VIMAT.MODEL.TASKLIST.Task.prototype.getId = function () {
    return this.id;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setId = function (i) {
    this.id = i;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getDescription = function () {
    return this.description;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setDescription = function (d) {
    this.description = d;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getFinished = function () {
    return this.finished;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setFinished = function (f) {
    this.finished = f;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getContext = function () {
    return this.context;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setContext = function (c) {
    this.context = c;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getDueDate = function () {
    return this.dueDate;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setDueDate = function (d) {
    this.dueDate = d;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getCompass = function () {
    return this.compass;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setCompass = function (c) {
    this.compass = c;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getPriority = function () {
    return this.priority;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setPriority = function (p) {
    this.priority = p;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getUrgency = function () {
    return this.urgency;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setUrgency = function (u) {
    this.urgency = u;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getRepeats = function () {
    return this.repeats;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setRepeats = function (r) {
    this.repeats = r;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getDueOrCompletion = function () {
    return this.dueOrCompletion;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setDueOrCompletion = function (doc) {
    this.dueOrCompletion = doc;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getFrequency = function () {
    return this.frequency;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setFrequency = function (f) {
    this.frequency = f;
};
VIMAT.MODEL.TASKLIST.Task.prototype.getInterval = function () {
    return this.interval;
};
VIMAT.MODEL.TASKLIST.Task.prototype.setInterval = function (i) {
    this.interval = i;
};
VIMAT.MODEL.TASKLIST.Task.prototype.toString = function () {
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
VIMAT.MODEL.TASKLIST.Task.prototype.fromString = function (s) {
    var taskProperties = [];
    taskProperties = s.split('|');
    this.id = taskProperties[0];
    this.description = taskProperties[1];
    this.finished = taskProperties[2];
    this.context = taskProperties[3];
    this.dueDate = taskProperties[4];
    this.compass = taskProperties[5];
    this.priority = taskProperties[6];
    this.urgency = taskProperties[7];
    this.repeats = taskProperties[8];
    this.dueOrCompletion = taskProperties[9];
    this.frequency = taskProperties[10];
    this.interval = taskProperties[11];
};
VIMAT.MODEL.TASKLIST.taskList = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];

    // *** Private methods
    function addTask(t) {
        arrayContent.push(t);
    }
    function addTaskFromString(s) {
        
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
    function removeTaskById(i) {
        
    }
    function sortByContext() {
        
    }
    function sortByCompass() {
        
    }
    function sortByPriority() {
        
    }
    function sortByUrgency() {
        
    }
    function deleteOrRepeatCompleted() {
        var l = getNumberOfTasks(),
            i,
            t;
        for (i = 0; i < l; i++) {
            t = getTaskByIndex(i);
            if (t.getFinished()) {
                if (t.getRepeats) {
                    // repeat the task
                }
                else {
                    // throw it away
                    arrayContent.splice(i, 1);
                    i--;
                }
            }
        }
    }
    function getTextForCompleted() {
        var arrayOfSerializedTasks = [];
        
        return arrayOfSerializedTasks;
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
        removeTaskById:             removeTaskById,
        sortByContext:              sortByContext,
        sortByCompass:              sortByCompass,
        sortByPriority:             sortByPriority,
        sortByUrgency:              sortByUrgency,
        deleteOrRepeatCompleted:    deleteOrRepeatCompleted,
        getTextForCompleted:        getTextForCompleted,
        moveCompletedToProject:     moveCompletedToProject,
        getNumberOfTasks:           getNumberOfTasks,
        getTaskByIndex:             getTaskByIndex,
        getTaskById:                getTaskById,
        getTaskIndexById:           getTaskIndexById
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
VIMAT.MODEL.PROJECTS.Project = function(n) {
    // *** Private Properties
    var name = n,
        taskIds = [];
    
    // *** Private Methods
    function getName() {
        return name;
    }
    function setName(n) {
        name = n;
    }
    function addTaskId(t) {
        taskIds.push(t);
    }
    
    // *** Public API
    return {
        getName:        getName,
        setName:        setName,
        addTaskId:      addTaskId
    };
};
VIMAT.MODEL.PROJECTS.projectList = (function () {
    // *** Private Properties
    var arrayContent = [];
    
    // *** Private Methods
    function addProject(p) {
        arrayContent.push(p);
    }
    
    // *** Public API
    return {
        addProject:         addProject
    }
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
var compassCategories = [   "Wellness",
                            "Education",
                            "Finance",
                            "Art",
                            "Chores",
                            "Relations",
                            "Projects",
                            "Tools"     ];