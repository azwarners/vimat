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

function displayTaskListTool() {
    var htmlToAdd = '';
    
    htmlToAdd += '<button onclick="newTaskButtonClicked()">New Task</button>';
    htmlToAdd += '<div id="newTaskForm"></div>';
    htmlToAdd += '<div id="taskListDiv"></div>';
    
    document.getElementById('taskListTool').innerHTML = htmlToAdd;    
}

function displayTaskList() {
    var htmlToAdd = '';
    document.getElementById('taskListDiv').innerHTML = '';
    for (var i in tasks) {
        
        htmlToAdd = '<input type="checkbox" ';
        htmlToAdd += 'onchange="checkBoxChanged(event)" ';
        htmlToAdd += 'id="';
        htmlToAdd += i + '"';
        if (tasks[i].finished){
            htmlToAdd += ' checked';
        }
        htmlToAdd += '>';
        
        htmlToAdd += (tasks[i].description).toString();
        
        htmlToAdd += '<br/>';
        
        document.getElementById('taskListDiv').innerHTML += htmlToAdd;
        
    }
}

function displayProjectList() {
    var htmlToAdd = '';
    document.getElementById('projectListDiv').innerHTML = '';
    for (var i in projects) {
        
        // htmlToAdd = '<input type="checkbox" ';
        // htmlToAdd += 'onchange="checkBoxChanged(event)" ';
        // htmlToAdd += 'id="p';
        // htmlToAdd += i + '"';
        // if (projects[i].finished){
        //     htmlToAdd += ' checked';
        // }
        // htmlToAdd += '>';
        
        htmlToAdd = (projects[i].description).toString();
        
        htmlToAdd += '<br/>';
        
        document.getElementById('projectListDiv').innerHTML += htmlToAdd;
        
    }
}

function displayNewTaskForm(){
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a task: <input type="text" id="taskInput"/>';
    htmlToAdd += '<button onclick="addTaskButtonClicked()">Add Task</button>';
    
    document.getElementById('newTaskForm').innerHTML = htmlToAdd;
}

function hideNewTaskForm(){
    document.getElementById('newTaskForm').innerHTML = '';
}