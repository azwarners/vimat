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

// Tasks

function displayTaskListTool() {
    var htmlToAdd = '';
    
    htmlToAdd += '<button onclick="newTaskButtonClicked()">New Task</button>';
    htmlToAdd += '<button onclick="clearCompletedButtonClicked()">Clear completed</button>';
    htmlToAdd += '<div id="newTaskForm"></div>';
    htmlToAdd += '<div id="taskListDiv"></div>';
    
    document.getElementById('taskListTool').innerHTML = htmlToAdd;    
}

function hideTaskListTool() {
    document.getElementById('taskListTool').innerHTML = '';
}

function taskListToolIsDisplayed() {
    if (document.getElementById('taskListTool').innerHTML) {
        return true;
    }
    else {
        return false;
    }
}

function displayTaskList() {
    // creating a string to insert into the <div> container for the task list
    var htmlToAdd;
    
    // clearing the <div> for the new string
    document.getElementById('taskListDiv').innerHTML = '';
    
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
        htmlToAdd += '</span>';
        
        // line break
        htmlToAdd += '<br/>';
        
        // container for an optional edit form
        htmlToAdd += '<div id="ef' + i.toString() + '"></div><br/>';
        
        // put the task on the page
        document.getElementById('taskListDiv').innerHTML += htmlToAdd;
    }
}

function displayNewTaskForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a task: <input type="text" id="taskInput"/>';
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
    
    htmlToAdd += 'Description: <input type="text" id="taskInput"';
    htmlToAdd += ' value="' + tasks[i].description + '"/>';
    htmlToAdd += '<button onclick="editTaskButtonClicked()">Save Changes</button>';
    
    var ef = 'ef' + i.toString();
    document.getElementById(ef).innerHTML = htmlToAdd;
    
    editTaskFormIsDisplayed = true;
    currentTaskBeingEdited = t;
}

function hideEditTaskForm(t) {
    document.getElementById('ef' + t.slice(2)).innerHTML = '';
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
        
        htmlToAdd += '<br/>';
        
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
