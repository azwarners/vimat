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
    this.repeats = false;
    this.dueOrCompletion = ''; // 'due' or 'completion' to tell from when it repeats
    this.frequency = 0; // how often it repeats
    this.interval = ''; // repeats every 'day', 'week', 'month', or 'year'
}


// time tracker


var trackedTimes = [];

var msInDay = 60000 * 60 * 24;
var msInWeek = msInDay * 7;
var msInMonth = msInWeek * (13/4);

function TrackedTime(st, c) {
    // expects a JSON time/date string for st and a string for c
    this.startTime = st;
    this.endTime;
    this.compass = c;
}

function timeTrackerStatsForCompass() {
    var stats = [];
    for (var j in compassCategories) {
        var dt = new Date();
        var h = 'D ';
        var d = 0;
        var ds = 0;
        var w = 0;
        var m = 0;
        for (var i in trackedTimes) {
            if (trackedTimes[i].compass === compassCategories[j]) {
                if (dt - new Date(trackedTimes[i].startTime) < msInMonth) {
                    if (trackedTimes[i].endTime) {
                        m += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        m += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInWeek) {
                    if (trackedTimes[i].endTime) {
                        w += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        w += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInDay) {
                    if (trackedTimes[i].endTime) {
                        d += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        d += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
            }
        }
        ds = (d - Math.floor(d)) * 60;
        if (ds < 10) {
            ds = '0' + Math.floor(ds).toString();
            h += Math.floor(d) + ':' + ds + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
        }
        else {
            h += Math.floor(d) + ':' + Math.floor(ds) + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
    
        }
        stats[j] = h;
    }
    return stats;
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


// Misc Data


var compassCategories = [   "Wellness",
                            "Education",
                            "Finance",
                            "Art",
                            "Chores",
                            "Relations",
                            "Projects",
                            "Tools"     ];