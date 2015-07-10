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

/*
This file is a facade for 'js/controller.js'
This is essentially a file containing the functions for a large
    and growing list of onclick attributes defined in the html
    tags located in index.html and htm/htm.js.
This file may disappear or change as I learn how to implement
    event handlers. According to most of the textbooks, onclick
    in the markup is bad, but click event handler in the script
    is good. It seems to me that either way you have a little bit
    of bleeding between the presentation layer and the logic
    layer. I will, however, eventually follow convention.
*/

VIMAT.namespace("VIMAT.CONTROLLER");

function initialize(){
    VIMAT.CONTROLLER.initialize();
}

function initializeMobile(){
    VIMAT.CONTROLLER.initializeMobile();
}

// Task List Old
function taskListHeaderClicked() {
    VIMAT.CONTROLLER.taskListHeaderClicked();
}
function stringifyTasks() {
    VIMAT.CONTROLLER.stringifyTasks();
}
function addTaskButtonClicked() {
    VIMAT.CONTROLLER.addTaskButtonClicked();
}
function checkBoxChanged(e) {
    VIMAT.CONTROLLER.checkBoxChanged(e);
}
function newTaskButtonClicked(){
    VIMAT.CONTROLLER.newTaskButtonClicked();
}
function clearCompletedButtonClicked() {
    VIMAT.CONTROLLER.clearCompletedButtonClicked();
}
function moveToProjectButtonClicked() {
    VIMAT.CONTROLLER.moveToProjectButtonClicked();
}
function taskClicked(e) {
    VIMAT.CONTROLLER.taskClicked(e);
}
function editTaskButtonClicked() {
    VIMAT.CONTROLLER.editTaskButtonClicked();
}

// Task List Module New
function taskListModuleHeaderClicked() {
    VIMAT.CONTROLLER.taskListModuleHeaderClicked();
}
function textExportClicked() {
    VIMAT.CONTROLLER.textExportClicked();
}
function textImportClicked() {
    VIMAT.CONTROLLER.textImportClicked();
}
function importClicked() {
    VIMAT.CONTROLLER.importClicked();
}
function newTaskClicked(){
    VIMAT.CONTROLLER.newTaskClicked();
}
function clearCompletedClicked() {
    VIMAT.CONTROLLER.clearCompletedClicked();
}
function moveToProjectClicked() {
    VIMAT.CONTROLLER.moveToProjectClicked();
}
function addTaskClicked() {
    VIMAT.CONTROLLER.addTaskClicked();
}
// function checkBoxChanged(e) {
//     VIMAT.CONTROLLER.checkBoxChanged(e);
// }
// function taskClicked(e) {
//     VIMAT.CONTROLLER.taskClicked(e);
// }
function editTaskClicked() {
    VIMAT.CONTROLLER.editTaskClicked();
}

// Tickler
function ticklerHeaderClicked() {
    VIMAT.CONTROLLER.ticklerHeaderClicked();
}

// Compass
function compassHeaderClicked() {
    VIMAT.CONTROLLER.compassHeaderClicked();
}

// Time Tracker
function punchIn(e) {
    VIMAT.CONTROLLER.punchIn(e);
}
function punchOut(e) {
    VIMAT.CONTROLLER.punchOut(e);
}

// Notes
function notesHeaderClicked() {
    VIMAT.CONTROLLER.notesHeaderClicked();
}
function newNoteButtonClicked(){
    VIMAT.CONTROLLER.newNoteButtonClicked();
}
function addNoteButtonClicked() {
    VIMAT.CONTROLLER.addNoteButtonClicked();
}

// Project List
function projectsHeaderClicked() {
    VIMAT.CONTROLLER.projectsHeaderClicked();
}
function addProjectButtonClicked() {
    VIMAT.CONTROLLER.addProjectButtonClicked();
}
function newProjectButtonClicked(){
    VIMAT.CONTROLLER.newProjectButtonClicked();
}

// calendar
function calendarHeaderClicked() {
    VIMAT.CONTROLLER.calendarHeaderClicked();
}

// List of Lists
function listOfListsHeaderClicked() {
    VIMAT.CONTROLLER.listOfListsHeaderClicked();
}
function listItemCheckBoxChanged(e) {
    VIMAT.CONTROLLER.listItemCheckBoxChanged(e);
}
function newListButtonClicked() {
    VIMAT.CONTROLLER.newListButtonClicked();
}
function newItemButtonClicked() {
    VIMAT.CONTROLLER.newItemButtonClicked();
}
function currentListChanged() {
    VIMAT.CONTROLLER.currentListChanged();
}
