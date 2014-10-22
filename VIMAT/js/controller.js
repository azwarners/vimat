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

VIMAT.namespace("VIMAT.CONTROLLER");

/*
    This module is essentially a container for functions triggered by
        onclick events calling functions in the facade (/vimat.js).
        Until I get a better grasp of event handlers that is.
*/

VIMAT.CONTROLLER = (function () {
    // *** Dependencies
    
    // *** Private methods
    function initialize(){
        // All of this code is executed after the page has loaded
        loadData();
        VIMAT.DB.loadTaskList();
        VIMAT.DB.loadListOfLists();
        VIMAT.DB.loadSettings();
        applySettings();
    }
    
    // Task List
    function taskListHeaderClicked() {
        if (settings.taskListToolIsDisplayed) {
            hideTaskListTool();
        }
        else {
            displayTaskListTool();   
            displayTaskList();
        }
    }
    function stringifyTasks() {
        var t = JSON.stringify(tasks);
        document.getElementById('divForStringify').innerHTML = '<textarea>' + t + '</textarea>';
    }
    function addTaskButtonClicked() {
        var task = new Task(document.getElementById("taskInput").value);
        hideNewTaskForm();
        tasks.push(task);
        saveTasks();
        displayTaskList();
        if (settings.ticklerToolIsDisplayed) {
            displayTicklerTool();
        }
    }
    function checkBoxChanged(e) {
        var et = e.currentTarget,
            t = et.id;
        tasks[t].finished = document.getElementById(t).checked;
        saveTasks();
    }
    function newTaskButtonClicked(){
        displayNewTaskForm();
    }
    function clearCompletedButtonClicked() {
        var i,
            d;
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].finished) {
                // check to see if the task repeats before deleting it
                if (tasks[i].repeats) {
                    // repeat the task
                    // wrong implementation for test
                    d = new Date(tasks[i].dueDate);
                    d.setHours(0);
                    d.setMinutes(0);
                    d.setDate(d.getDate() + 1);
                    tasks[i].dueDate = (d).toJSON();
                    tasks[i].finished = false;
                    
                }
                else {
                    // else delete it
                    tasks.splice(i, 1);
                    i--;
                }
            }
        }
        saveTasks();
        displayTaskList();
    }
    function moveToProjectButtonClicked() {
        var targetProject;
        // find out what project the tasks are going into
    
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].finished) {
                // add the task to the selected project's task list
                
                // remove the task from the task list
                tasks.splice(i, 1);
                
                i--;
            }
        }
        
        saveTasks();
        // saveProjects;
        displayTaskList();
    }
    function taskClicked(e) {
        var et = e.currentTarget,
            t = et.id;
        // id of <span> containing task description that was clicked
        if (t === currentTaskBeingEdited) {
            hideEditTaskForm(t);
            editTaskFormIsDisplayed = false;
            currentTaskBeingEdited = -1;
        }
        else {
            displayEditTaskForm(t);
        }
    }
    function editTaskButtonClicked() {
        // index of the current task in the array
        var t = currentTaskBeingEdited.slice(2),
            d;
        tasks[t].description = document.getElementById("taskInput").value;
        d = new Date(document.getElementById("dueDate").value);
        d.setHours(0);
        d.setMinutes(0);
        d.setDate(d.getDate() + 1);
        tasks[t].dueDate = (d).toJSON();
        tasks[t].compass = document.getElementById("compass").value;
        // add code to fetch information about repeating
        tasks[t].repeats = document.getElementById("repeatCheckBox").checked;
        // hideEditTaskForm(t);
        editTaskFormIsDisplayed = false;
        saveTasks();
        displayTaskList();
    }
    
    // Task List Module (new and improved tasks)
    function taskListModuleHeaderClicked() {
        if (VIMAT.SETTINGS.taskList.getDisplayed()) {
            VIMAT.VIEW.TASKS.hideTaskListTool();
            VIMAT.SETTINGS.taskList.setDisplayed(false);
            VIMAT.DB.saveSettings();
        }
        else {
            VIMAT.VIEW.TASKS.displayTaskListTool();
            VIMAT.SETTINGS.taskList.setDisplayed(true);
            VIMAT.DB.saveSettings();
        }
    }
    function textExportClicked() {
    //     var t = JSON.stringify(tasks);
    //     document.getElementById('divForStringify').innerHTML = '<textarea>' + t + '</textarea>';
    }
    function newTaskClicked(){
        VIMAT.VIEW.TASKS.displayNewTaskForm();
    }
    function clearCompletedClicked() {
        VIMAT.MODEL.TASKS.taskList.deleteOrRepeatCompleted();
        // saveTasks();
        VIMAT.VIEW.TASKS.displayTaskList();
    }
    function moveToProjectClicked() {
        var targetProject, i,
            l = VIMAT.MODEL.TASKS.taskList.getNumberOfTasks();
        // find out what project the tasks are going into
    
        for (i = 0; i < l; i++) {
            if ((VIMAT.MODEL.TASKS.taskList.getTaskById(i)).getFinished) {
                // add the task to the selected project's task list
                
                // remove the task from the task list
                tasks.splice(i, 1);
                
                i--;
            }
        }
        
        saveTasks();
        // saveProjects;
        displayTaskList();
    }
    // function taskClicked(e) {
    //     var et = e.currentTarget,
    //         t = et.id;
    //     // id of <span> containing task description that was clicked
    //     if (t === currentTaskBeingEdited) {
    //         hideEditTaskForm(t);
    //         editTaskFormIsDisplayed = false;
    //         currentTaskBeingEdited = -1;
    //     }
    //     else {
    //         displayEditTaskForm(t);
    //     }
    // }
    // function editTaskButtonClicked() {
    //     // index of the current task in the array
    //     var t = currentTaskBeingEdited.slice(2),
    //         d;
    //     tasks[t].description = document.getElementById("taskInput").value;
    //     d = new Date(document.getElementById("dueDate").value);
    //     d.setHours(0);
    //     d.setMinutes(0);
    //     d.setDate(d.getDate() + 1);
    //     tasks[t].dueDate = (d).toJSON();
    //     tasks[t].compass = document.getElementById("compass").value;
    //     // add code to fetch information about repeating
    //     tasks[t].repeats = document.getElementById("repeatCheckBox").checked;
    //     // hideEditTaskForm(t);
    //     editTaskFormIsDisplayed = false;
    //     saveTasks();
    //     displayTaskList();
    // }
    function addTaskClicked() {
        var ti = document.getElementById("taskInput").value,
            ci = document.getElementById("compassInput").value,
            di = document.getElementById("dueDateInput").value,
            task = new VIMAT.MODEL.TASKS.Task(ti),
            d;
        task.setCompass(ci);
        d = new Date(di);
        d.setHours(0);
        d.setMinutes(0);
        d.setDate(d.getDate() + 1);
        task.setDueDate(d.toJSON());
        VIMAT.VIEW.TASKS.hideNewTaskForm();
        VIMAT.MODEL.TASKS.taskList.addTask(task);
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.VIEW.TASKS.displayTaskList();
    }
    function checkBoxChanged(e) {
        var et = e.currentTarget,
            tid = et.id,
            t = VIMAT.MODEL.TASKS.taskList.getTaskById(tid);
        alert('tid = ' + tid);
        t.setFinished(document.getElementById(tid).checked);
        alert(t.getFinished());
        VIMAT.MODEL.TASKS.taskList.removeTaskById(tid);
        VIMAT.MODEL.TASKS.taskList.addTaskFromString(t.toString());
        VIMAT.DB.saveTaskList();
    }
    
    // Tickler
    function ticklerHeaderClicked() {
        if (settings.ticklerToolIsDisplayed) {
            hideTicklerTool();
        }
        else {
            displayTicklerTool();   
        }
    }
    
    // Compass
    function compassHeaderClicked() {
        if (document.getElementById('compassTool').innerHTML) {
            VIMAT.VIEW.COMPASS.hideCompassTool();
        }
        else {
            VIMAT.VIEW.COMPASS.displayCompassTool();
        }
        // saveSettings();
    }
    
    // Time Tracker
    function punchIn(e) {
        var et = e.currentTarget,
            punchInId = et.id,
            d = new Date(),
            dt = d.toJSON(),
            tt,
            ttVarForCompass =
                    setInterval(function () {displayTimeTrackerStatsForCompass()}, 1000);
        if (punchInId === 'piw') {    
            tt = new TrackedTime(dt, 'Wellness');
        }
        if (punchInId === 'pie') {
            tt = new TrackedTime(dt, 'Education');
        }
        if (punchInId === 'pif') {
            tt = new TrackedTime(dt, 'Finance');
        }
        if (punchInId === 'pia') {
            tt = new TrackedTime(dt, 'Art');
        }
        if (punchInId === 'pic') {
            tt = new TrackedTime(dt, 'Chores');        
        }
        if (punchInId === 'pir') {
            tt = new TrackedTime(dt, 'Relations');        
        }
        if (punchInId === 'pip') {
            tt = new TrackedTime(dt, 'Projects');        
        }
        if (punchInId === 'pit') {
            tt = new TrackedTime(dt, 'Tools');        
        }
        trackedTimes.push(tt);
        saveTrackedTimes(trackedTimes);
}
    function punchOut(e) {
        var et = e.currentTarget,
            punchOutId = et.id,
            d = new Date(),
            dt = d.toJSON();
    
        if (punchOutId === 'pow') {    
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Wellness') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'poe') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Education') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'pof') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Finance') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'poa') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Art') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'poc') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Chores') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'por') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Relations') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'pop') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Projects') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
        if (punchOutId === 'pot') {
            for (var i in trackedTimes) {
                if (trackedTimes[i].startTime && !trackedTimes[i].endTime && trackedTimes[i].compass === 'Tools') {
                    trackedTimes[i].endTime = dt;
                    saveTrackedTimes(trackedTimes);
                    break;
                }
            }
        }
    }
    
    // Notes
    function notesHeaderClicked() {
        if (settings.notesToolIsDisplayed) {
            hideNotesTool();
        }
        else {
            displayNotesTool();
        }
        saveSettings();
    }
    function newNoteButtonClicked(){
        displayNewNoteForm();
    }
    function addNoteButtonClicked() {
        var note = new Note(document.getElementById("noteDescriptionInput").value,
            document.getElementById("noteContentInput").value);
        hideNewNoteForm();
        notes.push(note);
        saveNotes();
        displayNotes();
    }

    // List Of Lists
    function listOfListsHeaderClicked() {
        if (VIMAT.SETTINGS.listOfLists.getDisplayed()) {
            VIMAT.VIEW.LISTS.hideListOfListsTool();
            VIMAT.SETTINGS.listOfLists.setDisplayed(false);
            VIMAT.DB.saveSettings();
        }
        else {
            VIMAT.VIEW.LISTS.displayListOfListsTool();
            VIMAT.VIEW.LISTS.displayListByListName(
                    VIMAT.SETTINGS.listOfLists.getCurrentListName());
            VIMAT.SETTINGS.listOfLists.setDisplayed(true);
            VIMAT.DB.saveSettings();
        }
    }
    function listItemCheckBoxChanged(e) {
        var et = e.currentTarget,
            licbid = et.id,
            liid = licbid.slice(5);
        // Code to change the checked value for the correct li    
        // tasks[t].finished = document.getElementById(t).checked;
        if (document.getElementById(licbid).checked) {
            VIMAT.MODEL.LISTS.listOfLists.toggleCheckStateOfItemInCurrentListById(liid);
        }
    }
    function newListButtonClicked() {
        var n = document.getElementById('newListInput').value,
            nl = new VIMAT.MODEL.LISTS.List(n);
        document.getElementById('newListInput').value = '';
        VIMAT.MODEL.LISTS.listOfLists.addList(nl);
        VIMAT.SETTINGS.listOfLists.setCurrentListName(n);
        VIMAT.DB.saveSettings();
        VIMAT.DB.saveListOfLists();
        VIMAT.VIEW.LISTS.displayListOfListsTool();
        VIMAT.VIEW.LISTS.displayListByListName(
                VIMAT.SETTINGS.listOfLists.getCurrentListName());
    }
    function newItemButtonClicked() {
        var d = document.getElementById('newItemInput').value,
            li = new VIMAT.MODEL.LISTS.ListItem(d);
        document.getElementById('newItemInput').value = '';
        VIMAT.MODEL.LISTS.listOfLists.addItemToCurrentList(li);
        VIMAT.DB.saveListOfLists();
        VIMAT.VIEW.LISTS.displayListByListName(
                VIMAT.SETTINGS.listOfLists.getCurrentListName());
    }
    function currentListChanged() {
        var cl = document.getElementById('listSelect').value;
        VIMAT.SETTINGS.listOfLists.setCurrentListName(cl);
        VIMAT.VIEW.LISTS.displayListOfListsTool();
        VIMAT.VIEW.LISTS.displayListByListName(cl);
    }

    // Project List
    function projectsHeaderClicked() {
        if (VIMAT.SETTINGS.projects.getDisplayed()) {
            VIMAT.VIEW.PROJECTS.hideProjectsTool();
            VIMAT.SETTINGS.projects.setDisplayed(false);
        }
        else {
            VIMAT.VIEW.PROJECTS.displayProjectsTool();
            VIMAT.VIEW.PROJECTS.displayProjectList();
            VIMAT.SETTINGS.projects.setDisplayed(true);
        }
    }
    function addProjectButtonClicked() {
        var pn = document.getElementById("projectInput").value,
            p = new VIMAT.MODEL.PROJECTS.Project(pn);
        VIMAT.VIEW.PROJECTS.hideNewProjectForm();
        VIMAT.MODEL.PROJECTS.projectList.addProject(p);
        VIMAT.DB.saveProjectList();
        VIMAT.VIEW.PROJECTS.displayProjectList();
    }
    function newProjectButtonClicked(){
        VIMAT.VIEW.PROJECTS.displayNewProjectForm();
    }
    
    // calendar
    function calendarHeaderClicked() {
        if (calendarToolIsDisplayed()) {
            hideCalendarTool();
        }
        else {
            displayCalendarTool();
            displayCalendar();
        }
    }
    
    // Settings
    function applySettings() {
        if (settings.taskListToolIsDisplayed) {
            displayTaskListTool();
        }
        if (settings.ticklerToolIsDisplayed) {
            displayTicklerTool();
        }
    }

    // Public API
    return {
        initialize:                     initialize,
        taskListHeaderClicked:          taskListHeaderClicked,
        stringifyTasks:                 stringifyTasks,
        textExportClicked:              textExportClicked,
        addTaskButtonClicked:           addTaskButtonClicked,
        addTaskClicked:                 addTaskClicked,
        checkBoxChanged:                checkBoxChanged,
        newTaskButtonClicked:           newTaskButtonClicked,
        newTaskClicked:                 newTaskClicked,
        clearCompletedButtonClicked:    clearCompletedButtonClicked,
        clearCompletedClicked:          clearCompletedClicked,
        moveToProjectButtonClicked:     moveToProjectButtonClicked,
        moveToProjectClicked:           moveToProjectClicked,
        taskClicked:                    taskClicked,
        editTaskButtonClicked:          editTaskButtonClicked,
        ticklerHeaderClicked:           ticklerHeaderClicked,
        compassHeaderClicked:           compassHeaderClicked,
        punchIn:                        punchIn,
        punchOut:                       punchOut,
        notesHeaderClicked:             notesHeaderClicked,
        newNoteButtonClicked:           newNoteButtonClicked,
        projectsHeaderClicked:          projectsHeaderClicked,
        addProjectButtonClicked:        addProjectButtonClicked,
        newProjectButtonClicked:        newProjectButtonClicked,
        calendarHeaderClicked:          calendarHeaderClicked,
        listOfListsHeaderClicked:       listOfListsHeaderClicked,
        listItemCheckBoxChanged:        listItemCheckBoxChanged,
        newItemButtonClicked:           newItemButtonClicked,
        currentListChanged:             currentListChanged,
        newListButtonClicked:           newListButtonClicked,
        taskListModuleHeaderClicked:    taskListModuleHeaderClicked
    };
}());