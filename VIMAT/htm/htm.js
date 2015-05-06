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
        // '<button onclick="moveToProjectClicked()">Move to<br/>project</button>' +
        '<button onclick="textExportClicked()">Text for<br/>Export</button>' +
        '<button onclick="textImportClicked()">Import<br/>Tasks</button>' +
        '<div id="divForStringify"></div><div id="newTaskForm"></div><div id="taskListDiv"></div>';
    return h;
});
VIMAT.HTM.ticklerTool = (function () {
    var h = '<div id="ticklerTaskListDiv"></div>';
    return h;
});
VIMAT.HTM.taskForm = (function (t, n) {
    var h,
        d = new Date(); // for setting the default to today's date
    
    // description text box
    h = '<section class="form">Description: <input type="text" id="taskInput"';
    if (t.description) {
        h += ' value="' + t.description + '"';
    }
    h += '/><br/>';
    
    // context input
    h += 'Context: <input type="text" id ="contextInput"';
    if (t.context) {
        h += ' value="' + t.context + '"';
    }
    h += '/><br/>';

    // folder text box
    h += 'Folder: <input type="text" id="folderInput"';
    if (t.folder) {
        h += ' value="' + t.folder + '"';
    }
    h += '/><br/>';

    // compass drop down
    h += 'Compass: ' + VIMAT.UTILITIES.VIEW.buildSelectTagFromList(
            VIMAT.MODEL.MISC.getCompassCategories(), t.compass, 'compassInput',
            false) + '<br/>';
    
    // date picker
    h += 'Date: <input type="date" id="dueDateInput" value="';
    h += (t.dueDate).slice(0, 10) + '"><br/>';
    
    // repeat
    h += 'Check to repeat: <input type="checkbox" id="repeatCheckBox"';
    if (t.repeats) {
        h += ' checked';
    }
    h += '><br/>';
    h += 'Repeat from: <input type="radio" name="repeatFrom" value="due"';
    if (t.dueOrCompletion === 'd') {
        h += ' checked="true"';
    }
    h += '>Due Date ';
    h += '<input type="radio" name="repeatFrom" value="completion"';
    if (t.dueOrCompletion === 'c') {
        h += ' checked="true"';
    }
    h += '>Completion Date<br/>';
    h += 'Every <input type="number" id="frequency" min="1" value="';
    h += t.frequency + '">';
    h += '<select id="interval"><option value="d">day</option>';
    h += '<option value="w">week</option><option value="m">month</option>';
    h += '<option value="y">year</option></select><br/>';

    // save button
    h += '<button onclick="';
    if (n === 'E') {
        h += 'editTaskClicked()';
    }
    else {
        h += 'addTaskClicked()';
    }
    h += '">Save Task</button></section>';

    return h;
});
VIMAT.HTM.getMarkupForTask = (function (t, condition) {
    var htm = '';
    // checkbox
    htm += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup(
            "checkBoxChanged(event)", t.id, t.finished);
    htm += '<span class="task">';
    // description
    htm += '<span onclick="taskClicked(event)" id="';
    htm += t.id + '">';
    htm += t.description;
    htm += '</span><br/>';
    // compass
    if (!(condition === 'noCompass')) {
        if (t.compass) {
            htm += t.compass + '   ';
        }
    }
    // repeats
    if (t.repeats) {
        htm += 'R   ';
    }
    // due date
    if (t.dueDate) {
        htm += (new Date(t.dueDate)).toDateString() + '<br/>';
    }
    // container for an optional edit form
    htm += '<div id="ef' + t.id + '"></div>';
    htm += '</span>';
    return htm;
});