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
    if (VIMAT.SETTINGS.listOfLists.getCurrentListName()) {
        h += '<h3>Choose a list to view: ';
        h += VIMAT.UTILITIES.VIEW.buildSelectTagFromList(
                VIMAT.MODEL.LISTS.listOfLists.getListOfListNames(),
                VIMAT.SETTINGS.listOfLists.getCurrentListName(), "listSelect",
                "currentListChanged()") + '<br/>';
        h += '<input id="newItemInput" type="text" placeholder="New item for: ';
        h += VIMAT.SETTINGS.listOfLists.getCurrentListName() + '">';
        h += '<button onclick="newItemButtonClicked()">Add<br/>Item</button><br/>';
    }
    h += '<div id="listOfListsListDiv"></div>';
    return h;
});
VIMAT.HTM.taskListTool = (function () {
    var h = '<button onclick="newTaskClicked()">New<br/>Task</button>' +
        '<button onclick="clearCompletedClicked()">Clear<br/>completed</button>' +
        '<button onclick="moveToProjectClicked()">Move to<br/>project</button>' +
        '<button onclick="textExportClicked()">Text for<br/>Export</button>' +
        '<div id="divForStringify"></div><div id="newTaskForm"></div><div id="taskListDiv"></div>';
    return h;
});
VIMAT.HTM.taskForm = (function (t) {
    var h,
        d = new Date(); // for setting the default to today's date
    
    // description text box
    h = '<section class="form">Description: <input type="text" id="taskInput"';
    if (t.getDescription()) {
        h += ' value="' + t.getDescription() + '"';
    }
    h += '/><br/>';

    // compass drop down
    h += 'Compass: ' + VIMAT.UTILITIES.VIEW.buildSelectTagFromList(
            VIMAT.MODEL.MISC.getCompassCategories(), t.getCompass(), 'compassInput',
            false) + '<br/>';
    
    // date picker
    h += 'Date: <input type="date" id="dueDateInput" value="';
    h += (t.getDueDate()).slice(0, 10) + '"><br/>';
    
    // repeat
    h += 'Check to repeat: <input type="checkbox" id="repeatCheckBox"><br/>';
    h += 'Repeat from: <input type="radio" name="repeatFrom" value="due">Due Date ';
    h += '<input type="radio" name="repeatFrom" value="completion" checked="true">Completion Date<br/>';
    h += 'Every <input type="number" id="frequency" min="1"> ';
    h += '<select id="interval"><option value="day">day</option>';
    h += '<option value="week">week</option><option value="month">month</option>';
    h += '<option value="year">year</option></select><br/>';

    // save button
    h += '<button onclick="addTaskClicked()">Add Task</button></section>';

    return h;
});