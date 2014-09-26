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

VIMAT.namespace("VIMAT.MODEL.LISTOFLISTS");
VIMAT.MODEL.LISTOFLISTS.ListItem = (function (d) {
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
        checked:        checked,
        check:          check,
        unCheck:        unCheck,
        getDescription: getDescription,
        setDescription: setDescription
    };
}());
VIMAT.MODEL.LISTOFLISTS.List = (function (n) {
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

    // *** Public API
    return this;
    // return {
    //     reusableList:       keepItemsAfterCheckedOff,
    //     getName:            getName,
    //     setName:            setName,
    //     checkAll:           checkAll,
    //     unCheckAll:         unCheckAll,
    //     getListItemAt:      getListItemAt,
    //     removeListItemAt:   removeListItemAt,
    //     addListItem:        addListItem
    // };
}());
VIMAT.MODEL.LISTOFLISTS.listOfLists = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];

    // *** Private methods
    function addList(vimatList) {
        arrayContent.push(vimatList);
    }
    function addItemToCurrentList(li) {
        
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
    
    // *** Initialization
    // var l = new VIMAT.MODEL.LISTOFLISTS.List('Groceries');
    // addList(l);
    
    // *** Public API
    return {
        addList:            addList,
        getListAt:          getListAt,
        removeListAt:       removeListAt,
        getNumberOfLists:   getNumberOfLists,
        getListOfListNames: getListOfListNames,
        getListByListName:  getListByListName
    };
}());

// tasks
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
var projects = [];
function Project(description) {
    this.description = description;
    this.finished = false;
    var projectTasks = [];
}

// calendar
var calendar = [];
function Event(description) {
    this.description = description;
    this.date;
}

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