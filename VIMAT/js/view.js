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

// Root Namespace
var VIMAT = VIMAT || {};

// Create the namespace for the task list
createNS("VIMAT.VIEW");
 
VIMAT.VIEW.taskList = ( function () {
    // private variables

    // private methods
    var hideTaskList = function(){
        document.getElementById('taskList').innerHTML = '';
        VIMAT.SETTINGS.setTaskListIsDisplayed(false);
        // saveSettings();
    };
    var displayTaskList = function(){
        var htmlToAdd   = '',
            i           = 0;
    
        htmlToAdd += '<button onclick="newTaskButtonClicked()">New<br/>Task</button>';
        htmlToAdd += '<button onclick="clearCompletedButtonClicked()">Clear<br/>';
        htmlToAdd += 'completed</button>';
        htmlToAdd += '<button onclick="moveToProjectButtonClicked()">Move to<br/>';
        htmlToAdd += 'project</button>';
        htmlToAdd += '<div id="newTaskForm"></div>';
        htmlToAdd += '<div id="tasksDiv"></div>';
        
        document.getElementById('taskList').innerHTML = htmlToAdd;
        // clearing the <div> for the new string
        document.getElementById('tasksDiv').innerHTML = '';
        
        for (i = 0; i < VIMAT.TOOLS.taskList.getLength(); i++) {
            displayTaskListItemById(i);
        }
    };
    var displayTaskListItemById = function(taskId){
        // creating a string to store the html for the task list item
        var htm = '';
    
        // creating a variable with the current time/date stamp for comparing
        var now = (new Date()).toJSON();
    
        // checkbox
        htm += VIMAT.returnCheckBoxMarkup('checkBoxChanged(event)', taskId, VIMAT.TOOLS.taskList.tasks[taskId].getFinished());

        // description
        htm += '<span onclick="taskClicked(event)" id="td';
        htm += taskId + '">';
        htm += (VIMAT.TOOLS.taskList.tasks[taskId].getDescription()).toString();
        htm += '</span><br/>';
        
        // compass
        if (VIMAT.TOOLS.taskList.tasks[taskId].getCompass()) {
            htm += VIMAT.TOOLS.taskList.tasks[taskId].getCompass() + '   ';
        }
        
        // due date
        if (typeof VIMAT.TOOLS.taskList.tasks[taskId].getDueDate() === 'string') {
            htm += (new Date(VIMAT.TOOLS.taskList.tasks[taskId].getDueDate())).toDateString() + '<br/>';
        }
        
        // container for an optional edit form
        htm += '<div id="ef' + taskId.toString() + '"></div><br/>';
        
        // put the task on the page
        if (!(VIMAT.TOOLS.taskList.tasks[taskId].getDueDate() > now)) {
            document.getElementById('tasksDiv').innerHTML += htm;
        }
        VIMAT.SETTINGS.setTaskListIsDisplayed(true);
        // saveSettings();
    };
        
   // public API
    return {
        hideTaskList: hideTaskList,
        displayTaskList: displayTaskList
    };
}) ();




// Tasks






function displayNewTaskForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a task:<br/><input type="text" id="taskInput"/><br/>';
    htmlToAdd += '<button onclick="addTaskButtonClicked()">Add Task</button>';
    
    document.getElementById('newTaskForm').innerHTML = htmlToAdd;
}

function hideNewTaskForm() {
    document.getElementById('newTaskForm').innerHTML = '';
}

var editTaskFormIsDisplayed = false;

// id of task description <span> of task being edited
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