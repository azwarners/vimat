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

function initialize(){
    loadData();
    displayProjectList();
}

function taskListHeaderClicked() {
    if (taskListToolIsDisplayed()) {
        hideTaskListTool();
    }
    else {
        displayTaskListTool();   
        displayTaskList();
    }
}

function projectListHeaderClicked() {
    if (projectListToolIsDisplayed()) {
        hideProjectListTool();
    }
    else {
        displayProjectListTool();
        displayProjectList();
    }
}

function addTaskButtonClicked() {
    var task = new Task(document.getElementById("taskInput").value);
    hideNewTaskForm();
    tasks.push(task);
    saveTasks();
    displayTaskList();
}

function checkBoxChanged(e) {
    var et = e.currentTarget;
    var t = et.id;
    tasks[t].finished = document.getElementById(t).checked;
    saveTasks();
}

function addProjectButtonClicked() {
    var project = new Project(document.getElementById("projectInput").value);
    hideNewProjectForm();
    projects.push(project);
    saveProjects();
    displayProjectList();
}

function newTaskButtonClicked(){
    displayNewTaskForm();
}

function newProjectButtonClicked(){
    displayNewProjectForm();
}

function clearCompletedButtonClicked() {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].finished) {
            tasks.splice(i, 1);
            i--;
        }
    }

    saveTasks();
    displayTaskList();
}

function taskClicked(e) {
    var et = e.currentTarget;
    
    // id of <span> containing task description that was clicked
    var t = et.id;
    displayEditTaskForm(t);
}

function editTaskButtonClicked() {
    // index of the current task in the array
    var t = currentTaskBeingEdited.slice(2);

    tasks[t].description = document.getElementById("taskInput").value;
    saveTasks();
    displayTaskList();
    // hideEditTaskForm(currentTaskBeingEdited);
}