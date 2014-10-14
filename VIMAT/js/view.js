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

VIMAT.namespace("VIMAT.VIEW.LISTOFLISTS");
VIMAT.VIEW.LISTOFLISTS = (function () {
    // *** Private Methods
    function displayListOfListsTool() {
        document.getElementById('listOfListsTool').innerHTML =
                VIMAT.HTM.listOfListsTool();
    }
    function hideListOfListsTool() {
        document.getElementById('listOfListsTool').innerHTML = '';
    }
    function displayListByListName(ln) {
        var list = VIMAT.MODEL.LISTOFLISTS.listOfLists.getListByListName(ln),
            l,
            h = '',
            i;
        l = list.getLength();
        if (l > 0) {
            for (i = 0; i < l; i++) {
                h += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup("listItemCheckBoxChanged(event)",
                        ('lolcb' + i), list.getListItemAt(i).getChecked());
                h += list.getListItemAt(i).getDescription() + '<br/>';
            }
            document.getElementById('listOfListsListDiv').innerHTML = h;
        }
    }
    
    // *** Public API
    return {
        displayListOfListsTool: displayListOfListsTool,
        hideListOfListsTool:    hideListOfListsTool,
        displayListByListName:  displayListByListName
    };
}());

VIMAT.namespace("VIMAT.VIEW.TASKLIST");
VIMAT.VIEW.TASKLIST = (function () {
    // *** Private Methods
    function displayTaskListTool() {
        document.getElementById('taskListModuleTool').innerHTML =
                VIMAT.HTM.taskListTool();
        displayTaskList();
    }
    function hideTaskListTool() {
        document.getElementById('taskListModuleTool').innerHTML = '';
    }
    function displayNewTaskForm() {
        document.getElementById('newTaskForm').innerHTML = VIMAT.HTM.newTaskForm();
    }
    function hideNewTaskForm() {
        document.getElementById('newTaskForm').innerHTML = '';
    }
    function displayTaskList() {
        var i, t,
            l = VIMAT.MODEL.TASKLIST.taskList.getNumberOfTasks();
        document.getElementById('taskListDiv').innerHTML = '';
        for (i = 0; i < l; i++) {
            t = VIMAT.MODEL.TASKLIST.taskList.getTaskByIndex(i);
        // alert('task ' + i + ' = ' + t);
        // alert('task instanceof VIMAT.MODEL.TASKLIST.Task = ' + (t instanceof VIMAT.MODEL.TASKLIST.Task));
            getMarkupForTask(t);
        }
        VIMAT.SETTINGS.TASKLIST.setDisplayed(true);
        // saveSettings();
    }
    function getMarkupForTask(t) {
        var htm = '',
            now = (new Date()).toJSON();
        // checkbox
        htm += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup(
                "checkBoxChanged(event)", t.getId(), t.getFinished());
        // description
        htm += '<span onclick="taskClicked(event)" id="';
        htm += t.getId() + '">';
        htm += t.getDescription();
        htm += '</span><br/>';
        // // compass
        // if (tasks[i].compass) {
        //     htm += tasks[i].compass + '   ';
        // }
        // // due date
        // if (typeof tasks[i].dueDate === 'string') {
        //     htm += (new Date(tasks[i].dueDate)).toDateString() + '<br/>';
        // }
        // // container for an optional edit form
        // htm += '<div id="ef' + i.toString() + '"></div><br/>';
        // put the task on the page
        if (!(t.getDueDate() > now)) {
            document.getElementById('taskListDiv').innerHTML += htm;
        }
    }
    // *** Public API
    return {
        displayTaskListTool:    displayTaskListTool,
        hideTaskListTool:       hideTaskListTool,
        displayNewTaskForm:     displayNewTaskForm,
        hideNewTaskForm:        hideNewTaskForm,
        getMarkupForTask:       getMarkupForTask,
        displayTaskList:        displayTaskList
    };
}());

// Initialize

// Tasks
function displayTaskListTool() {
    var htmlToAdd = '';
    // htmlToAdd += "<style>html, body {font-size: 5px;color: #46220A;}</style>";    
    htmlToAdd += '<button onclick="newTaskButtonClicked()">New<br/>Task</button>';
    htmlToAdd += '<button onclick="clearCompletedButtonClicked()">Clear<br/>';
    htmlToAdd += 'completed</button>';
    htmlToAdd += '<button onclick="moveToProjectButtonClicked()">Move to<br/>';
    htmlToAdd += 'project</button>';
    htmlToAdd += '<button onclick="stringifyTasks()">Text for<br/>Export</button>';
    htmlToAdd += '<div id="divForStringify"></div>';
    htmlToAdd += '<div id="newTaskForm"></div>';
    htmlToAdd += '<div id="taskListDiv"></div>';
    
    document.getElementById('taskListTool').innerHTML = htmlToAdd;
    displayTaskList();
}
function hideTaskListTool() {
    document.getElementById('taskListTool').innerHTML = '';
    settings.taskListToolIsDisplayed = false;
    saveSettings();
}
function displayTaskList() {
    // clearing the <div> for the new string
    document.getElementById('taskListDiv').innerHTML = '';
    
    for (var i in tasks) {
        displayTaskListItemById(i);
    }
    
    settings.taskListToolIsDisplayed = true;
    
    saveSettings();

}
function displayTaskListItemById(i) {
    // creating a string to store the html for the task list item
    var htm = '';

    // creating a variable with the current time/date stamp for comparing
    var now = (new Date()).toJSON();

    // checkbox
    htm += returnCheckBoxMarkup("checkBoxChanged(event)", i, tasks[i].finished);

    // description
    htm += '<span onclick="taskClicked(event)" id="td';
    htm += i + '">';
    htm += (tasks[i].description).toString();
    htm += '</span><br/>';
    
    // compass
    if (tasks[i].compass) {
        htm += tasks[i].compass + '   ';
    }
    
    // due date
    if (typeof tasks[i].dueDate === 'string') {
        htm += (new Date(tasks[i].dueDate)).toDateString() + '<br/>';
    }
    
    // container for an optional edit form
    htm += '<div id="ef' + i.toString() + '"></div><br/>';
    
    // put the task on the page
    if (!(tasks[i].dueDate > now)) {
        document.getElementById('taskListDiv').innerHTML += htm;
    }
    
}
function displayNewTaskForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a task:<br/><input type="text" id="taskInput"/><br/>';
    htmlToAdd += '<button onclick="addTaskButtonClicked()">Add Task</button>';
    
    document.getElementById('newTaskForm').innerHTML = htmlToAdd;
}
function hideNewTaskForm() {
    document.getElementById('newTaskForm').innerHTML = '';
}
var editTaskFormIsDisplayed = false; // id of task description <span> of task being edited
var currentTaskBeingEdited;
function displayEditTaskForm(t) {
    hideNewTaskForm();
    if (editTaskFormIsDisplayed) {
        hideEditTaskForm(currentTaskBeingEdited);
    }

    // tasks[] index of the task being edited    
    var i = parseInt(t.slice(2), 10);
    
    var htmlToAdd = '';
    
    // description text box
    htmlToAdd += 'Description: <input type="text" id="taskInput"';
    htmlToAdd += ' value="' + tasks[i].description + '"/><br/>';
    
    // compass drop down
    if (tasks[i].compass === 'Wellness') {
        htmlToAdd += 'Compass: <select id="compass"><option value="Wellness" selected>Wellness</option>';
    } else {
        htmlToAdd += 'Compass: <select id="compass"><option value="Wellness">Wellness</option>';
    }
    if (tasks[i].compass === 'Education') {
        htmlToAdd += '<option value="Education" selected>Education</option>';
    } else {
        htmlToAdd += '<option value="Education">Education</option>';
    }
    if (tasks[i].compass === 'Finance') {
        htmlToAdd += '<option value="Finance" selected>Finance</option>';
    } else {
        htmlToAdd += '<option value="Finance">Finance</option>';
    }
    if (tasks[i].compass === 'Art') {
        htmlToAdd += '<option value="Art" selected>Art</option>';
    } else {
        htmlToAdd += '<option value="Art">Art</option>';
    }
    if (tasks[i].compass === 'Chores') {
        htmlToAdd += '<option value="Chores" selected>Chores</option>';
    } else {
        htmlToAdd += '<option value="Chores">Chores</option>';
    }
    if (tasks[i].compass === 'Relations') {
        htmlToAdd += '<option value="Relations" selected>Relations</option>';
    } else {
        htmlToAdd += '<option value="Relations">Relations</option>';
    }
    if (tasks[i].compass === 'Projects') {
        htmlToAdd += '<option value="Projects" selected>Projects</option>';
    } else {
        htmlToAdd += '<option value="Projects">Projects</option>';
    }
    if (tasks[i].compass === 'Tools') {
        htmlToAdd += '<option value="Tools" selected>Tools</option>';
    } else {
        htmlToAdd += '<option value="Tools">Tools</option>';
    }
    htmlToAdd += '</select><br/>';
    
    // date picker
    var d = new Date(); // for setting the default to today's date
    htmlToAdd += 'Date: <input type="date" id="dueDate" value="';
    htmlToAdd += tasks[i].dueDate.slice(0, 10) + '"><br/>';
    
    // repeat
    htmlToAdd += 'Check to repeat: <input type="checkbox" id="repeatCheckBox"><br/>';
    htmlToAdd += 'Repeat from: <input type="radio" name="repeatFrom" value="due">Due Date ';
    htmlToAdd += '<input type="radio" name="repeatFrom" value="completion" checked="true">Completion Date<br/>';
    htmlToAdd += 'Every <input type="number" id="frequency" min="1"> ';
    htmlToAdd += '<select id="interval"><option value="day">day</option>';
    htmlToAdd += '<option value="week">week</option><option value="month">month</option>';
    htmlToAdd += '<option value="year">year</option></select><br/>';

    // save button
    htmlToAdd += '<button onclick="editTaskButtonClicked()">Save Changes</button>';
    
    var ef = 'ef' + i.toString();
    document.getElementById(ef).innerHTML = htmlToAdd;
    
    editTaskFormIsDisplayed = true;
    currentTaskBeingEdited = t;
}
function hideEditTaskForm(t) {
    document.getElementById('ef' + t.slice(2)).innerHTML = '';
}

// Tickler
function displayTicklerTool() {
    // *** Refactor display task list to require a boolean to tell the function to use
    //      present dates or future dates and call it in here to cut repeated code
    
    
    // creating a string to insert into the <div> container for the task list
    var htmlToAdd;
    
    // clearing the <div> for the new string
    // document.getElementById('taskListDiv').innerHTML = '';
    document.getElementById('ticklerTool').innerHTML = '';
    
    // creating a variable with the current time/date stamp for comparing
    var now = (new Date()).toJSON();
    
    // iterating through the task list array to build the string
    for (var i in tasks) {
        
        // checkbox
        htmlToAdd = '<input type="checkbox" ';
        htmlToAdd += 'onchange="checkBoxChanged(event)" ';
        htmlToAdd += 'id="' + i + '"';
        if (tasks[i].finished){
            htmlToAdd += ' checked';
        }
        htmlToAdd += '>';
        
        // description
        htmlToAdd += '<span onclick="taskClicked(event)" id="td';
        htmlToAdd += i + '">';
        htmlToAdd += (tasks[i].description).toString();
        htmlToAdd += '</span><br/>';
        
        // compass
        if (tasks[i].compass) {
            htmlToAdd += tasks[i].compass + '   ';
        }
        
        // due date
        if (typeof tasks[i].dueDate === 'string') {
            htmlToAdd += (new Date(tasks[i].dueDate)).toDateString() + '<br/>';
        }
        
        // container for an optional edit form
        htmlToAdd += '<div id="ef' + i.toString() + '"></div><br/>';
        
        // put the task on the page
        if (tasks[i].dueDate > now) {
            document.getElementById('ticklerTool').innerHTML += htmlToAdd;
        }
    }

    settings.ticklerToolIsDisplayed = true;
    saveSettings();

}
function hideTicklerTool() {
    document.getElementById('ticklerTool').innerHTML = '';
    settings.ticklerToolIsDisplayed = false;
    saveSettings();
}

// Compass
function displayCompassTool() {
    var h = '';
    
    hideTaskListTool();
    
    document.getElementById('compassTool').innerHTML = '';
    
    h += '<div class="compassDiv"><h3 id="wellnessHeader"></h3><button onclick="punchIn(event)" id="piw">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="pow">Punch<br/>Out</button><div id="wellness"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="educationHeader"></h3><button onclick="punchIn(event)" id="pie">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="poe">Punch<br/>Out</button><div id="education"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="financeHeader"></h3><button onclick="punchIn(event)" id="pif">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="pof">Punch<br/>Out</button><div id="finance"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="artHeader"></h3><button onclick="punchIn(event)" id="pia">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="poa">Punch<br/>Out</button><div id="art"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="choresHeader"></h3><button onclick="punchIn(event)" id="pic">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="poc">Punch<br/>Out</button><div id="chores"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="relationsHeader"></h3><button onclick="punchIn(event)" id="pir">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="por">Punch<br/>Out</button><div id="relations"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="projectsHeader"></h3><button onclick="punchIn(event)" id="pip">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="pop">Punch<br/>Out</button><div id="projects"></div></div>';
    
    h += '<div class="compassDiv"><h3 id="toolsHeader"></h3><button onclick="punchIn(event)" id="pit">Punch<br/>In</button>';
    h += '<button onclick="punchOut(event)" id="pot">Punch<br/>Out</button><div id="tools"></div></div>';

    document.getElementById('compassTool').innerHTML = h;
    
    displayCompass();
    
    displayTimeTrackerStatsForCompass();
    
    settings.compassToolIsDisplayed = true;
}
function hideCompassTool() {
    document.getElementById('compassTool').innerHTML = '';
    // if (ttVarForCompass) {
    //     window.clearInterval(ttVarForCompass);
    // }
    settings.compassToolIsDisplayed = false;
}
function displayCompass() {
    // creating a string to store the html for the task list item
    var htm = '';

    // creating a variable with the current time/date stamp for comparing
    var now = (new Date()).toJSON();

    // cycle through tasks adding each task to the right category
    for (var i in tasks) {
    
        // checkbox
        htm = returnCheckBoxMarkup('checkBoxChanged(event)', i, tasks[i].finished);
    
        // description
        htm += '<span onclick="taskClicked(event)" id="td';
        htm += i + '">';
        htm += (tasks[i].description).toString();
        htm += '</span><br/>';
        
        // due date
        if (typeof tasks[i].dueDate === 'string') {
            htm += (new Date(tasks[i].dueDate)).toDateString() + '<br/>';
        }
        
        // container for an optional edit form
        htm += '<div id="ef' + i.toString() + '"></div><br/>';

        // put the task on the page
        if (!(tasks[i].dueDate > now)) {
            if (tasks[i].compass === 'Wellness') {
                document.getElementById('wellness').innerHTML += htm;
            }
            if (tasks[i].compass === 'Education') {
                document.getElementById('education').innerHTML += htm;
            }
            if (tasks[i].compass === 'Finance') {
                document.getElementById('finance').innerHTML += htm;
            }
            if (tasks[i].compass === 'Art') {
                document.getElementById('art').innerHTML += htm;
            }
            if (tasks[i].compass === 'Chores') {
                document.getElementById('chores').innerHTML += htm;
            }
            if (tasks[i].compass === 'Relations') {
                document.getElementById('relations').innerHTML += htm;
            }
            if (tasks[i].compass === 'Projects') {
                document.getElementById('projects').innerHTML += htm;
            }
            if (tasks[i].compass === 'Tools') {
                document.getElementById('tools').innerHTML += htm;
            }
        }
    }
}

// Time tracker
function displayTimeTrackerStatsForCompass() {
    var stats = timeTrackerStatsForCompass();
    for (var i in stats) {
        switch (i) {
            case '0':
                document.getElementById("wellnessHeader").innerHTML = 'Wellness   ' + stats[i];
                break;
            
            case '1':
                document.getElementById("educationHeader").innerHTML = 'Education   ' + stats[i];
                break;

            case '2':
                document.getElementById("financeHeader").innerHTML = 'Finance   ' + stats[i];
                break;

            case '3':
                document.getElementById("artHeader").innerHTML = 'Art   ' + stats[i];
                break;

            case '4':
                document.getElementById("choresHeader").innerHTML = 'Chores   ' + stats[i];
                break;

            case '5':
                document.getElementById("relationsHeader").innerHTML = 'Relations   ' + stats[i];
                break;

            case '6':
                document.getElementById("projectsHeader").innerHTML = 'Projects   ' + stats[i];
                break;

            case '7':
                document.getElementById("toolsHeader").innerHTML = 'Tools   ' + stats[i];
                break;

            default:
                break;
        }
        
    }
}

// Notes
function displayNotesTool() {
    var htmlToAdd = '';
    
    document.getElementById('notesTool').innerHTML = '';

    htmlToAdd += '<button onclick="newNoteButtonClicked()">New<br/>Note</button>';
    
    htmlToAdd += '<div id="newNoteForm"></div>';
    htmlToAdd += '<div id="noteListDiv"></div>';
    
    document.getElementById('notesTool').innerHTML = htmlToAdd;
    
    displayNotes();
    
    settings.notesToolIsDisplayed = true;
    
}
function hideNotesTool() {
    document.getElementById('notesTool').innerHTML = '';
    settings.notesToolIsDisplayed = false;
}
function displayNotes() {
    var htm = '';
    document.getElementById('noteListDiv').innerHTML = htm;

    for (var i in notes) {
    
        // description
        htm = 'Description: ';
        htm += '<span onclick="noteClicked(event)" id="nd';
        htm += i + '">';
        htm += (notes[i].description).toString();
        htm += '</span><br/>';
        
        // content
        htm += 'Content:<br/>' + (notes[i].content).toString() + '<br/>';

        // container for an optional edit form
        htm += '<div id="enf' + i.toString() + '"></div><br/>';

        // put the note on the page
        document.getElementById('noteListDiv').innerHTML += htm;
    }
}
function displayNewNoteForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter note description:<br/><input type="text" id="noteDescriptionInput"/><br/>';
    htmlToAdd += 'Note content:<br/>';
    htmlToAdd += '<textarea rows="19" cols="50" id="noteContentInput"></textarea>';
    htmlToAdd += '<button onclick="addNoteButtonClicked()">Add Note</button><br/>';
    
    document.getElementById('newNoteForm').innerHTML = htmlToAdd;
}
function hideNewNoteForm() {
    document.getElementById('newNoteForm').innerHTML = '';
}

// Projects

function displayProjectListTool() {
    var htmlToAdd = '';

    htmlToAdd += '<button onclick="newProjectButtonClicked()">New Project</button>';
    htmlToAdd += '<div id="newProjectForm"></div>';
    htmlToAdd += '<div id="projectListDiv"></div>';

    document.getElementById('projectListTool').innerHTML = htmlToAdd;    
}
function hideProjectListTool() {
    document.getElementById('projectListTool').innerHTML = '';
}
function projectListToolIsDisplayed() {
    if (document.getElementById('projectListTool').innerHTML) {
        return true;
    }
    else {
        return false;
    }
}
function displayProjectList() {
    var htmlToAdd = '';
    
    document.getElementById('projectListDiv').innerHTML = '';
    
    for (var i in projects) {
        htmlToAdd = (projects[i].description).toString();
        
        htmlToAdd += '<br/><div id="pt' + i +  '"></div>';
        
        document.getElementById('projectListDiv').innerHTML += htmlToAdd;
    }
}
function displayNewProjectForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a project: <input type="text" id="projectInput"/>';
    htmlToAdd += '<button onclick="addProjectButtonClicked()">Add Project</button>';

    document.getElementById('newProjectForm').innerHTML = htmlToAdd;
}
function hideNewProjectForm() {
    document.getElementById('newProjectForm').innerHTML = '';
}

// Calendar
function displayCalendarTool() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a calendar event: <input type="text" id="eventInput"/>';
    htmlToAdd += '<button onclick="addEventButtonClicked()">Add event</button>';
    htmlToAdd += '<div id="calendarDiv"></div>';

    document.getElementById('CalendarTool').innerHTML = htmlToAdd;    
}

// Settings