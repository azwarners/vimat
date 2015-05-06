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

VIMAT.CONTROLLER = (function () {
    // *** Dependencies
    
    // *** Private methods
    function initialize(){
        // All of this code is executed after the page has loaded
        VIMAT.tl = new VIMAT.MODEL.TASKS.taskList();
        VIMAT.DB.loadTaskList();
//        VIMAT.DB.loadProjectList();
        VIMAT.DB.loadListOfLists();
        VIMAT.DB.loadSettings();
        VIMAT.DB.loadHistory();
        applySettings();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }
    
    // Task List
    function addTaskEventListeners() {        
        document.getElementById('groupBySelect').addEventListener('change', function() {
            var prop = document.getElementById('groupBySelect').value;
            VIMAT.SETTINGS.taskList.setGroupBy(prop);
            VIMAT.DB.saveSettings();
            VIMAT.VIEW.TASKS.displayTaskList();
        });
        document.getElementById('sortBySelect').addEventListener('change', function() {
            var prop = document.getElementById('sortBySelect').value;
            VIMAT.SETTINGS.taskList.setSortBy(prop);
            VIMAT.DB.saveSettings();
            VIMAT.VIEW.TASKS.displayTaskList();
        });
    };
    function taskListModuleHeaderClicked() {
        var tlt = document.getElementById('taskListTool');
        
        if (tlt.getAttribute('class') === 'hidden') {
            tlt.removeAttribute('class');
        }
        else {
            tlt.setAttribute('class', 'hidden');
        }
    }
    function textExportClicked() {
        var t = VIMAT.tl.getAllTasksToString();
        document.getElementById('divForStringify').innerHTML = '<textarea>' + t + '</textarea>';
    }
    function textImportClicked() {
        var s, h;
        h = '<textarea id="importTextArea"></textarea><button onclick="importClicked()">Import</button>';
        document.getElementById('divForStringify').innerHTML = h;
    }
    function importClicked() {
        var s;
        s = document.getElementById('importTextArea').value;
        VIMAT.tl.addTasksFromString(s);
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.VIEW.TASKS.displayTaskListTool();
    }
    function newTaskClicked(){
        VIMAT.VIEW.TASKS.displayNewTaskForm();
    }
    function clearCompletedClicked() {
        VIMAT.tl.deleteOrRepeatCompleted();
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.DB.saveHistory();
        VIMAT.VIEW.TASKS.displayTaskList();
    }
    function moveToProjectClicked() {
        var targetProject, i,
            l = VIMAT.tl.getNumberOfTasks();
        // find out what project the tasks are going into
    
        for (i = 0; i < l; i++) {
            if ((VIMAT.tl.getTaskById(i)).getFinished) {
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
            t = et.id, tid, task, taskFormHTM;
            
        // id of <span> containing task description that was clicked
        if (t === VIMAT.tl.getEditTaskId()) {
            VIMAT.hideEditTaskForm(t);
            editTaskFormIsDisplayed = false;
            VIMAT.tl.setEditTaskId(-1);
        }
        else {
            // tid = parseInt(t.slice(2), 10);
            tid = 'ef' + t;
            VIMAT.tl.setEditTaskId(t);
            task = VIMAT.tl.getTaskById(t);
            taskFormHTM = VIMAT.HTM.taskForm(task, 'E');
            document.getElementById(tid).innerHTML = taskFormHTM;

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
         hideEditTaskForm(t);
        editTaskFormIsDisplayed = false;
        saveTasks();
        displayTaskList();
    }
    function addTaskClicked() {
        var ti = document.getElementById("taskInput").value,
            fi = document.getElementById("folderInput").value,
            cxi = document.getElementById('contextInput').value,
            ci = document.getElementById("compassInput").value,
            di = document.getElementById("dueDateInput").value,
            r = document.getElementById("repeatCheckBox").checked,
            rfRadios = document.getElementsByName("repeatFrom"),
            rf, f = document.getElementById("frequency").value,
            interv = document.getElementById("interval").value,
            task = new VIMAT.MODEL.TASKS.Task(ti),
            d;

        if (!(cxi === '')) {
            task.context = cxi;
        }
        if (!(ci === '')) {
            task.compass = ci;
        }
        else {
            task.compass = 'Chores';
        }
        if (!(fi === '')) {
            task.folder = fi;
        }
        else {
            task.folder = 'untitled';
        }
        if (!(di == '')) {
            d = new Date(di);
        }
        else {
            d = new Date();
        }
        d.setHours(0);
        d.setMinutes(0);
//        d.setDate(d.getDate() + 1);
        task.dueDate = d.toJSON();
        task.repeats = r;
        if (rfRadios[0].checked) {
            rf = 'd';
        }
        else {
            rf = 'c';
        }
        task.dueOrCompletion = rf;
        task.frequency = f;
        task.interval = interv;
        VIMAT.VIEW.TASKS.hideNewTaskForm();
        VIMAT.tl.addTask(task);
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.VIEW.TASKS.displayTaskList();
    }
    function editTaskClicked() {
        var ti = document.getElementById("taskInput").value,
            fi = document.getElementById("folderInput").value,
            ci = document.getElementById("compassInput").value,
            di = document.getElementById("dueDateInput").value,
            r = document.getElementById("repeatCheckBox").checked,
            rfRadios = document.getElementsByName("repeatFrom"),
            rf, f = document.getElementById("frequency").value,
            interv = document.getElementById("interval").value,
            task = new VIMAT.MODEL.TASKS.Task(ti), ts,
            d;
        task.setCompass(ci);
        task.setFolder(fi);
        d = new Date(di);
        d.setHours(0);
        d.setMinutes(0);
        d.setDate(d.getDate() + 1);
        task.setDueDate(d.toJSON());
        task.setRepeats(r);
        if (rfRadios[0].checked) {
            rf = 'd';
        }
        else {
            rf = 'c';
        }
        task.setDueOrCompletion(rf);
        task.setFrequency(f);
        task.setInterval(interv);
        task.setId(VIMAT.tl.getEditTaskId());
        ts = task.toString();
        VIMAT.tl.removeTaskById(VIMAT.tl.getEditTaskId());
        VIMAT.VIEW.TASKS.hideNewTaskForm();
        VIMAT.tl.setEditTaskId(false);
        VIMAT.tl.addTaskFromString(ts);
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.VIEW.TASKS.displayTaskList();
    }
    function checkBoxChanged(e) {
        var et = e.currentTarget,
            tid = et.id,
            t = VIMAT.tl.getTaskById(tid);
        t.finished = document.getElementById(tid).checked;
        VIMAT.tl.removeTaskById(tid);
        VIMAT.tl.addTaskFromString(t.toString());
        VIMAT.DB.saveTaskList();
    }
    
    // Tickler
    function ticklerHeaderClicked() {
        var ttdiv = document.getElementById('ticklerTool').innerHTML;
        if (ttdiv) {
            VIMAT.VIEW.TICKLER.hideTicklerTool();
        }
        else {
            VIMAT.VIEW.TICKLER.displayTicklerTool();   
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
            VIMAT.lol.toggleCheckStateOfItemInCurrentListById(liid);
        }
    }
    function newListButtonClicked() {
        var n = document.getElementById('newListInput').value,
            nl = new VIMAT.MODEL.LISTS.List(n);
        document.getElementById('newListInput').value = '';
        VIMAT.lol.addList(nl);
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
        VIMAT.lol.addItemToCurrentList(li);
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
        if (document.getElementById('projectsTool').hasChildNodes()) {
            VIMAT.VIEW.PROJECTS.hideProjectsTool();
        }
        else {
            VIMAT.VIEW.PROJECTS.displayProjectsTool();
            VIMAT.VIEW.PROJECTS.displayProjectList();
            assignProjectEventListeners();
        }
    }
    function addProjectButtonClicked() {
    }
    function assignProjectEventListeners() {
        document.getElementById('newProjectButton').addEventListener('click', function() {
            if (document.getElementById('newProjectForm').hasChildNodes()) {
                VIMAT.VIEW.PROJECTS.hideNewProjectForm();
            }
            else {
                VIMAT.VIEW.PROJECTS.displayNewProjectForm();
                assignNewProjectFormEventListeners();
            }
        });
    }
    function assignNewProjectFormEventListeners() {
        document.getElementById('addProjectButton').addEventListener('click', function() {
            var pn = document.getElementById("projectInput").value,
                p = new VIMAT.MODEL.PROJECTS.Project(pn);
                
            VIMAT.VIEW.PROJECTS.hideNewProjectForm();
            VIMAT.pl.addProjectAndCreateId(p);
            VIMAT.DB.saveProjectList();
            VIMAT.VIEW.PROJECTS.displayProjectList();
        });
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
        var gb, sb, gbs, sbs, gbsc, sbsc, i, l;
        
        gb = VIMAT.SETTINGS.taskList.getGroupBy();
        sb = VIMAT.SETTINGS.taskList.getSortBy();
        
        gbs = document.getElementById('groupBySelect');
        sbs = document.getElementById('sortBySelect');
        
        gbsc = gbs.childNodes;
        sbsc = sbs.childNodes;
        l = gbsc.length;
        for (i = 0; i < l; i++) {
            if (gbsc[i].value === gb) {
                gbsc[i].setAttribute('selected', 'selected');
            }
        }
        
    }

    // Public API
    return {
        initialize:                     initialize,
        textExportClicked:              textExportClicked,
        textImportClicked:              textImportClicked,
        importClicked:                  importClicked,
        addTaskClicked:                 addTaskClicked,
        editTaskClicked:                editTaskClicked,
        checkBoxChanged:                checkBoxChanged,
        newTaskClicked:                 newTaskClicked,
        clearCompletedClicked:          clearCompletedClicked,
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
        calendarHeaderClicked:          calendarHeaderClicked,
        listOfListsHeaderClicked:       listOfListsHeaderClicked,
        listItemCheckBoxChanged:        listItemCheckBoxChanged,
        newItemButtonClicked:           newItemButtonClicked,
        currentListChanged:             currentListChanged,
        newListButtonClicked:           newListButtonClicked,
        taskListModuleHeaderClicked:    taskListModuleHeaderClicked
    };
}());