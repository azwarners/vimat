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
    if (document.getElementById('taskListTool').innerHTML) {
        document.getElementById('taskListTool').innerHTML = '';
    }
    else {
        displayTaskListTool();   
        displayTaskList();
    }
}

function addTaskButtonClicked() {
    var task = new Task(document.getElementById("taskInput").value);
    hideNewTaskForm();
    tasks.push(task);
    persistTasks();
    displayTaskList();
    //document.getElementById("taskInput").value='';
}

function checkBoxChanged(e) {
    var et = e.currentTarget;
    var t = et.id;
    tasks[t].finished = document.getElementById(t).checked;
    persistTasks();
}

function addProjectButtonClicked() {
    var project = new Project(document.getElementById("projectInput").value);
    projects.push(project);
    persistProjects();
    displayProjectList();
    document.getElementById("projectInput").value='';
}

function newTaskButtonClicked(){
    displayNewTaskForm();
}