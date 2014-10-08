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

VIMAT.namespace("VIMAT.HTM");

VIMAT.HTM.listOfListsTool = (function () {
    var h = '<input id="newListInput" type="text" placeholder="Name of new list">';
    h += '<button onclick="newListButtonClicked()">Add<br/>List</button>';
    h += '<h3>Choose a list to view: ';
    h += VIMAT.UTILITIES.VIEW.buildSelectTagFromList(
            VIMAT.MODEL.LISTOFLISTS.listOfLists.getListOfListNames(),
            VIMAT.SETTINGS.LISTOFLISTS.getCurrentListName(), "listSelect",
            "currentListChanged()") + '<br/>';
    h += '<input id="newItemInput" type="text" placeholder="New item for: ';
    h += VIMAT.SETTINGS.LISTOFLISTS.getCurrentListName() + '">';
    h += '<button onclick="newItemButtonClicked()">Add<br/>Item</button>';
    h += '<br/><div id="listOfListsListDiv"></div>';
    return h;
});
VIMAT.HTM.taskListTool = (function () {
    var h = '';
    h += '<button onclick="newTaskClicked()">New<br/>Task</button>';
    h += '<button onclick="clearCompletedClicked()">Clear<br/>';
    h += 'completed</button>';
    h += '<button onclick="moveToProjectClicked()">Move to<br/>';
    h += 'project</button>';
    h += '<button onclick="textExportClicked()">Text for<br/>Export</button>';
    h += '<div id="divForStringify"></div>';
    h += '<div id="newTaskForm"></div>';
    h += '<div id="taskListDiv"></div>';
    return h;
});
VIMAT.HTM.newTaskForm = (function () {
    var h = '';
    h += 'Enter a task:<br/><input type="text" id="taskInput"/><br/>';
    h += '<button onclick="addTaskClicked()">Add Task</button>';
    return h;
});