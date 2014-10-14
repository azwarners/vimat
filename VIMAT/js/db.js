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

/*
    The VIMAT.DB serves as a facade. The save/load functions point to
    whatever sub-module (or sub-namespace) the user has selected for data persistence.
    For now the only option is HTML5 LocalStorage.
*/

VIMAT.namespace("VIMAT.DB");
VIMAT.DB = (function () {
    // *** Dependencies

    // *** Private Properties
    // dbType is an integer representing the type of data storage in use
    //      0   --  HTML5 LocalStorage
    var dbType = 0;

    // *** Private methods
    function saveTaskList() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveTaskList();
                break;
            
            default:
                // code
        }
    }
    function loadTaskList() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadTaskList();
                break;
            
            default:
                // code
        }
    }
    function getDbType() {
        return dbType;
    }
    function setDbType(dbt) {
        dbType = dbt;
    }

    // *** Initialization

    // *** Public API
    return {
        saveTaskList:   saveTaskList,
        loadTaskList:   loadTaskList,
        getDbType:      getDbType,
        setDbType:      setDbType
    };
}());

VIMAT.namespace("VIMAT.DB.LOCALSTORAGE");
VIMAT.DB.LOCALSTORAGE = (function () {
    // *** Dependencies

    // *** Private Properties

    // *** Private methods
    function saveTaskList() {
        var taskArray = [],
            l = VIMAT.MODEL.TASKLIST.taskList.getNumberOfTasks(),
            i,
            t = new VIMAT.MODEL.TASKLIST.Task();
        for (i = 0; i < l; i++) {
            t = VIMAT.MODEL.TASKLIST.taskList.getTaskByIndex(i);
            taskArray[i] = t;
        }    
        localStorage.taskListDb = JSON.stringify(taskArray);
    }
    function loadTaskList() {
        var taskArray = [],
            i, l, t;
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.taskListDb) {
                taskArray = JSON.parse(localStorage.taskListDb);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
        l = taskArray.length;
        for (i = 0; i < l; i++) {
            t = new VIMAT.MODEL.TASKLIST.Task();
            t.setId(taskArray[i].id);
            t.setDescription(taskArray[i].description);
            VIMAT.MODEL.TASKLIST.taskList.addTask(t);
        }
    }

    // *** Initialization

    // *** Public API
    return {
        saveTaskList:   saveTaskList,
        loadTaskList:   loadTaskList
    };
}());

function loadData() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.tasksdb) {
            var t = JSON.parse(localStorage.tasksdb);
            // if (isArray(t)){
                tasks = t;
            // }
        } 
        if (localStorage.projectsdb) {
            var p = JSON.parse(localStorage.projectsdb);
            // if (isArray(p)){
                projects = p;
            // }
        }
        if (localStorage.notesdb) {
            var n = JSON.parse(localStorage.notesdb);
            // if (isArray(n)){
                notes = n;
            // }
        }
        if (localStorage.trackedTimesdb) {
            var tt = JSON.parse(localStorage.trackedTimesdb);
            // if (isArray(tt)){
                trackedTimes = tt;
            // }
        }
        if (localStorage.settingsdb) {
            var s = JSON.parse(localStorage.settingsdb);
            if (typeof s == 'object'){
                settings = s;
            }
        }
    }
    else {
        alert('Sorry, no local storage on this browser.');
    }
}

function saveTasks() {
    localStorage.tasksdb = JSON.stringify(tasks);
}

function saveProjects() {
    localStorage.projectsdb = JSON.stringify(projects);
}

function saveNotes() {
    localStorage.notesdb = JSON.stringify(notes);
}

function saveTrackedTimes() {
    localStorage.trackedTimesdb = JSON.stringify(trackedTimes);
}

function saveSettings() {
    localStorage.settingsdb = JSON.stringify(settings);
}