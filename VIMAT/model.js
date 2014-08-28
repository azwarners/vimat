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

// tasks


var tasks = [];

function Task(description) {
    this.description = description;
    this.finished = false;
    this.dueDate = '';
    this.compass = 'Chores';
}


// projects


var projects = [];

function Project(description) {
    this.description = description;
    this.finished = false;
    var projectTasks = [];
}


// calendar


var calendar = [];

function Event(description) {
    this.description = description;
    this.date;
}


// Notes


function Note(description, content) {
    this.description = description;
    this.content = content;
    var project;
}

var notes = [];

// settings


function Settings() {
    
    // task list
    var defaultTaskDueDate = '';
    var defaultTaskCompass = 'Chores';
    var taskListToolIsDisplayed = false;
    
    // tickler
    var ticklerToolIsDisplayed = false;
    
    // calendar
    var calendarToolIsDisplayed = false;
    
    // compass
    var compassToolIsDisplayed = false;

    // notes
    var notesToolIsDisplayed = false;

}

var settings = new Settings();
