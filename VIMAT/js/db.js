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
    function saveProjectList() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveProjectList();
                break;
            
            default:
                // code
        }
    }
    function loadProjectList() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadProjectList();
                break;
            
            default:
                // code
        }
    }
    function saveListOfLists() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveListOfLists();
                break;
            
            default:
                // code
        }
    }
    function loadListOfLists() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadListOfLists();
                break;
            
            default:
                // code
        }
    }
    function saveSettings() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveSettings();
                break;
            
            default:
                // code
        }
    }
    function loadSettings() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadSettings();
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
        saveTaskList:       saveTaskList,
        loadTaskList:       loadTaskList,
        saveProjectList:    saveProjectList,
        loadProjectList:    loadProjectList,
        saveListOfLists:    saveListOfLists,
        loadListOfLists:    loadListOfLists,
        saveSettings:       saveSettings,
        loadSettings:       loadSettings,
        getDbType:          getDbType,
        setDbType:          setDbType
    };
}());

VIMAT.namespace("VIMAT.DB.LOCALSTORAGE");
VIMAT.DB.LOCALSTORAGE = (function () {
    // *** Dependencies

    // *** Private Properties

    // *** Private methods
    function saveTaskList() {
        var taskStringArray = VIMAT.MODEL.TASKS.taskList.getAllTasksToStrings();
        localStorage.taskListDb = JSON.stringify(taskStringArray);
    }
    function loadTaskList() {
        var taskStringArray = [];
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.taskListDb) {
                taskStringArray = JSON.parse(localStorage.taskListDb);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
        VIMAT.MODEL.TASKS.taskList.addTasksFromStrings(taskStringArray);
    }
    function saveProjectList() {
        var projectArray = [],
            l = VIMAT.MODEL.PROJECTS.projectList.getNumberOfProjects(),
            i, p;
        for (i = 0; i < l; i++) {
            p = VIMAT.MODEL.PROJECTS.projectList.getProjectAtIndex(i);
            projectArray[i] = p;
        }    
        localStorage.projectListDb = JSON.stringify(projectArray);
    }
    function loadProjectList() {
        var projectArray = [],
            p, i, l;
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.taskListDb) {
                projectArray = JSON.parse(localStorage.projectListDb);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
        l = projectArray.length;
        for (i = 0; i < l; i++) {
            p = projectArray[i];
            VIMAT.MODEL.PROJECTS.projectList.addTask(p);
        }
    }
    function saveListOfLists() {
        var listArray = [],
            l = VIMAT.MODEL.LISTS.listOfLists.getNumberOfLists(),
            i, list;
        for (i = 0; i < l; i++) {
            list = VIMAT.MODEL.LISTS.listOfLists.getListAt(i);
            listArray[i] = list;
        }    
        localStorage.listOfListsDb = JSON.stringify(listArray);
    }
    function loadListOfLists() {
        var listArray = [],
            i, l, list;
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.listOfListsDb) {
                listArray = JSON.parse(localStorage.listOfListsDb);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
        l = listArray.length;
        for (i = 0; i < l; i++) {
            list = new VIMAT.MODEL.LISTS.List();
            list.setName(listArray[i].name);
            list.arrayContent = listArray[i].arrayContent;
            VIMAT.MODEL.LISTS.listOfLists.addList(list);
        }
    }
    function saveSettings() {
        var s;
        localStorage.listOfListsSettingsDb = JSON.stringify(VIMAT.SETTINGS.listOfLists.getCurrentListName());
        s = VIMAT.SETTINGS.taskList.getStateString();
        localStorage.taskListSettingsDb = JSON.stringify(s);
    }
    function loadSettings() {
        var s;
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.listOfListsSettingsDb) {
                VIMAT.SETTINGS.listOfLists.setCurrentListName(JSON.parse(localStorage.listOfListsSettingsDb));
            }
            if (localStorage.taskListSettingsDb) {
                s = JSON.parse(localStorage.taskListSettingsDb);
                VIMAT.SETTINGS.taskList.setStateFromString(s);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
    }

    // *** Initialization

    // *** Public API
    return {
        saveTaskList:       saveTaskList,
        loadTaskList:       loadTaskList,
        saveProjectList:    saveProjectList,
        loadProjectList:    loadProjectList,
        saveListOfLists:    saveListOfLists,
        loadListOfLists:    loadListOfLists,
        saveSettings:       saveSettings,
        loadSettings:       loadSettings
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