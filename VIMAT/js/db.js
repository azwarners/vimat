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
    function saveTimeTracker() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveTimeTracker();
                break;
            
            default:
                // code
        }
    }
    function loadTimeTracker() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadTimeTracker();
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
    function saveHistory() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.saveHistory();
                break;
            
            default:
                // code
        }
    }
    function loadHistory() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.loadHistory();
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
    function wipeData() {
        switch (dbType) {
            case 0:
                VIMAT.DB.LOCALSTORAGE.wipeData();
                break;
            
            default:
                // code
        }
    }
    // *** Initialization

    // *** Public API
    return {
        saveTaskList:       saveTaskList,
        loadTaskList:       loadTaskList,
        saveTimeTracker:    saveTimeTracker,
        loadTimeTracker:    loadTimeTracker,
        saveProjectList:    saveProjectList,
        loadProjectList:    loadProjectList,
        saveListOfLists:    saveListOfLists,
        loadListOfLists:    loadListOfLists,
        saveSettings:       saveSettings,
        loadSettings:       loadSettings,
        saveHistory:        saveHistory,
        loadHistory:        loadHistory,
        getDbType:          getDbType,
        setDbType:          setDbType,
        wipeData:           wipeData
    };
}());

VIMAT.namespace("VIMAT.DB.LOCALSTORAGE");
VIMAT.DB.LOCALSTORAGE = (function () {
    // *** Dependencies

    // *** Private Properties

    // *** Private methods
    function saveTaskList() {
        var taskStringArray = VIMAT.tl.getAllTasksToStrings();
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
        VIMAT.tl.addTasksFromStrings(taskStringArray);
    }
    function saveTimeTracker() {
        localStorage.timeTrackerDb = JSON.stringify(VIMAT.HISTORY.getTrackedTimes());
    }
    function loadTimeTracker() {
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.timeTrackerDb) {
                VIMAT.HISTORY.setTrackedTimes(JSON.parse(localStorage.timeTrackerDb));
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
    }
    function saveProjectList() {
        var pa = VIMAT.pl.getList();
        localStorage.projectListDb = JSON.stringify(pa);
    }
    function loadProjectList() {
        var pa;
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.projectListDb) {
                pa = JSON.parse(localStorage.projectListDb);
            }
            VIMAT.pl.setList(pa);
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
    }
    function saveListOfLists() {
        var listArray = [],
            l = VIMAT.lol.getNumberOfLists(),
            i, list;
        for (i = 0; i < l; i++) {
            list = VIMAT.lol.getListAt(i);
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
            var j, acl, li;
            list = new VIMAT.MODEL.LISTS.List();
            list.setName(listArray[i].name);
            acl = listArray[i].arrayContent.length;
            for (j = 0; j < acl; j++) {
                li = new VIMAT.MODEL.LISTS.ListItem(listArray[i].arrayContent[j].description,
                    listArray[i].arrayContent[j].checked);
                list.addListItem(li);                
            }
            VIMAT.lol.addList(list);
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
            // **************
            // *** FIX ME ***
            // **************
            // if (localStorage.listOfListsSettingsDb) {
            //     VIMAT.SETTINGS.listOfLists.setCurrentListName(JSON.parse(localStorage.listOfListsSettingsDb));
            // }
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
    function saveHistory() {
        var historyObject = {
            taskHistory:    VIMAT.HISTORY.getTaskHistory(),
            trackedTimes:   VIMAT.HISTORY.getTrackedTimes(),
        };
        
        localStorage.historyDb = JSON.stringify(historyObject);
    }
    function loadHistory() {
        if(typeof(localStorage) !== "undefined") {
            if (localStorage.historyDb) {
                var historyObject = JSON.parse(localStorage.historyDb);
                
                VIMAT.HISTORY.setTaskHistory(historyObject['taskHistory']);
                VIMAT.HISTORY.setTrackedTimes(historyObject['trackedTimes']);
            }
        }
        else {
            alert('Sorry, no local storage on this browser.');
            return;
        }
    }
    function wipeData() {
        localStorage.removeItem('listOfListsSettingsDb');
        localStorage.removeItem('taskListDb');
        localStorage.removeItem('taskListSettingsDb');
        localStorage.removeItem('timeTrackerDb');
        localStorage.removeItem('projectListDb');
        localStorage.removeItem('listOfListsDb');
        localStorage.removeItem('historyDb');
    }

    // *** Initialization

    // *** Public API
    return {
        saveTaskList:       saveTaskList,
        loadTaskList:       loadTaskList,
        saveTimeTracker:    saveTimeTracker,
        loadTimeTracker:    loadTimeTracker,
        saveProjectList:    saveProjectList,
        loadProjectList:    loadProjectList,
        saveListOfLists:    saveListOfLists,
        loadListOfLists:    loadListOfLists,
        saveSettings:       saveSettings,
        loadSettings:       loadSettings,
        saveHistory:        saveHistory,
        loadHistory:        loadHistory,
        wipeData:           wipeData
    };
}());


// Code from another project of mine for refactoring this database helper

    // *** Private Properties
    // LL.settings.dbType is an integer representing the type of data storage in use
    //      0   --  No persistence; RAM only storage
    //      1   --  HTML5 LocalStorage

    // *** Private methods
    // function localStorageExists() {
    //     var localStorageTest = 'localStorageTest';
    //     try {
    //         localStorage.setItem(localStorageTest, localStorageTest);
    //         localStorage.removeItem(localStorageTest);
    //         return true;
    //     } catch(e) {
    //         return false;
    //     }
    // }
    // function storageTypeCheck() {
    //     if(localStorageExists()) {
    //         LL.settings.dbType = 1;
    //     }
    //     else {
    //         LL.settings.dbType = 0;
    //     }
    // }
    // function saveObject(objectToSave) {
        // switch (LL.settings.dbType) {
            // case 0:
                // break;
            
            // case 1:
                // LL.DB.LOCALSTORAGE.saveObject();
                // break;
            
            // default:
                // code
        // }
    // }
    // function loadObject(objectString) {
		// var loadedObject
        // switch (LL.settings.dbType) {
            // case 0:
                // break;
            
            // case 1:
                // loadedObject = LL.DB.LOCALSTORAGE.loadObject(objectString);
                // break;
            
            // default:
                // code
        // }
		// return loadedObject;
    // }

