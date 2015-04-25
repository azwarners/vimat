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

VIMAT.namespace("VIMAT.VIEW.TASKS");
VIMAT.VIEW.TASKS = (function () {
    // *** Private Methods
    function ele(type) {
        var e;
        e = VIMAT.UTILITIES.element.apply(this, arguments);
        return e;
    }
    function empty(n) {
        VIMAT.UTILITIES.removeChildren(n);
    }
    
    // *** Public Methods
    function displayNewTaskForm() {
        var t = new VIMAT.MODEL.TASKS.Task();
        document.getElementById('newTaskForm').innerHTML = VIMAT.HTM.taskForm(t);
    }
    function hideNewTaskForm() {
        document.getElementById('newTaskForm').innerHTML = '';
    }
    function displayTaskList() {
        // new task list grouped by any property
        // TODO remove grouped property from individual task view
        // TODO displayed history needs reimplemented in new task list
        var gb, uv, iuv, luv, it, t, tasksByValue,
            lt = VIMAT.tl.getNumberOfTasks(),
            olMenutree, groupLi, taskOl, taskLi, label, small, input,
            tlDiv = document.getElementById('taskListDiv');
        
        VIMAT.tl.sortByProp(VIMAT.SETTINGS.taskList.getSortBy());
        gb = VIMAT.SETTINGS.taskList.getGroupBy();
        if (gb === 'none') {
            taskOl = ele('ol');
            taskOl.className = 'menutree';
            for (it = 0; it < lt; it++) {
                t = VIMAT.tl.getTaskByIndex(it);
                if (t.isDue()) {
                    taskLi = ele('li');
                    taskLi.innerHTML = VIMAT.HTM.getMarkupForTask(t);
                    taskOl.appendChild(taskLi);
                }
            }
            empty(tlDiv);
            tlDiv.appendChild(taskOl);
        }
        else {
            uv = VIMAT.tl.getUniqueValuesOfProperty(gb);
            luv = uv.length;
            olMenutree = ele('ol');
            olMenutree.className = 'menutree';
            for (iuv = 0; iuv < luv; iuv++) {
                if (uv[iuv]) {
                    input = ele('input');
                    input.setAttribute('type', 'checkbox');
                    input.id = uv[iuv];
                    label = ele('label', ('+ ' + uv[iuv]));
                    label.className = 'menu_label';
                    label.setAttribute('for', uv[iuv]);
                    groupLi = ele('li',label, input);
                    taskOl = ele('ol');
                }
                tasksByValue = VIMAT.tl.getTasksByPropertyValue(gb, uv[iuv]);
                tasksByValue.forEach(function(element, index, array) {
                    if (element.isDue()) {
                        taskLi = ele('li');
                        taskLi.innerHTML = VIMAT.HTM.getMarkupForTask(element);
                        taskOl.appendChild(taskLi);
                    }
                });
                groupLi.appendChild(taskOl);
                olMenutree.appendChild(groupLi);
            }
            empty(tlDiv);
            tlDiv.appendChild(olMenutree);
        }        
    }
    // *** Public API
    return {
        displayNewTaskForm:     displayNewTaskForm,
        hideNewTaskForm:        hideNewTaskForm,
        displayTaskList:        displayTaskList
    };
}());

VIMAT.namespace("VIMAT.VIEW.TICKLER");
VIMAT.VIEW.TICKLER = (function () {
    // *** Private Methods
    function displayTicklerTool() {
        document.getElementById('ticklerTool').innerHTML =
                VIMAT.HTM.ticklerTool();
        displayTickler();
    }
    function hideTicklerTool() {
        document.getElementById('ticklerTool').innerHTML = '';
    }
    function displayTickler() {
        var i, t, h = '', now = (new Date()).toJSON(),
            l = VIMAT.tl.getNumberOfTasks();
        for (i = 0; i < l; i++) {
            t = VIMAT.tl.getTaskByIndex(i);
            if (t.getDueDate() > now) {
                h += VIMAT.HTM.getMarkupForTask(t) + '<br/>';
            }
        }
        document.getElementById('ticklerTaskListDiv').innerHTML = h;
    }
    function getMarkupForTask(t) {
        var htm = '';
        // checkbox
        htm += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup(
                "checkBoxChanged(event)", t.getId(), t.getFinished());
        // description
        htm += '<span onclick="taskClicked(event)" id="';
        htm += t.getId() + '">';
        htm += t.getDescription();
        htm += '</span><br/>';
        // compass
        if (t.getCompass()) {
            htm += t.getCompass() + '   ';
        }
        // repeats
        if (t.getRepeats()) {
            htm += 'R   ';
        }
        // due date
        if (t.getDueDate()) {
            htm += (new Date(t.getDueDate())).toDateString() + '<br/>';
        }
        return htm;
    }
    // *** Public API
    return {
        displayTicklerTool:     displayTicklerTool,
        hideTicklerTool:        hideTicklerTool,
        getMarkupForTask:       getMarkupForTask,
        displayTickler:         displayTickler
    };
}());

VIMAT.namespace("VIMAT.VIEW.PROJECTS");
VIMAT.VIEW.PROJECTS = (function () {
    // *** Private Methods
    function displayProjectsTool() {
        var a, b, c, d, e;
    
        a = ele('button', 'New Project');
        a.id = 'newProjectButton';
        b = ele('div');
        b.id = 'newProjectForm';
        c = ele('div');
        c.id = 'projectListDiv';        
        addChildren('projectsTool', a, b, c);
    }
    function hideProjectsTool() {
        empty(document.getElementById('projectsTool'));
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
        var p, i, l = VIMAT.pl.getNumberOfProjects(),
            htmlToAdd = '';

        empty('projectListDiv');
        for (i = 0; i < l; i++) {
            p = VIMAT.pl.getProjectByIndex(i);
            htmlToAdd += p.name;
            htmlToAdd += '<br/><div id="pt' + i +  '"></div>';
        }
        document.getElementById('projectListDiv').innerHTML = htmlToAdd;
    }
    function displayNewProjectForm() {
        var a, b, c;
       
        a = ele('input');
        a.type = 'text';
        a.id = 'projectInput';
        b = ele('button', 'Add Project');
        b.id = 'addProjectButton';
        addChildren('newProjectForm', 'Enter a project', a, b);
    }
    function hideNewProjectForm() {
        empty(document.getElementById('newProjectForm'));
    }
    
    function ele(type) {
        var e;
        e = VIMAT.UTILITIES.element.apply(this, arguments);
        return e;
    }
     function addChildren() {
        VIMAT.UTILITIES.appendChildren.apply(this, arguments);
    }   
    function empty(n) {
        VIMAT.UTILITIES.removeChildren(n);
    }
    
    // *** Public API
    return {
        displayProjectsTool:        displayProjectsTool,
        hideProjectsTool:           hideProjectsTool,
        projectListToolIsDisplayed: projectListToolIsDisplayed,
        displayProjectList:         displayProjectList,
        displayNewProjectForm:      displayNewProjectForm,
        hideNewProjectForm:         hideNewProjectForm
    };
}());

VIMAT.namespace("VIMAT.VIEW.COMPASS");
VIMAT.VIEW.COMPASS = (function () {
    // *** Private Methods
    function displayCompassTool() {
        var htm = '',
            cc = VIMAT.MODEL.MISC.getCompassCategories(),
            i, l = cc.length;
        
        for (i = 0; i < l; i++) {
            htm += '<div class="compassDiv"><h3>' + cc[i] + '</h3>';
            htm += 'Hours Since Last Completion: ';
            htm += VIMAT.HISTORY.hoursSinceLastCompletionByCompass(cc[i]);
            htm += '<div id="' + cc[i] + '"></div></div>';
        }   
        document.getElementById('compassTool').innerHTML = htm;       
        VIMAT.VIEW.COMPASS.displayCompass();
    }
    function hideCompassTool() {
        document.getElementById('compassTool').innerHTML = '';
    }
    function displayCompass() {
        // creating a string to store the html for the task list item
        var t, i, currentTaskCompass,
            htm = '', l = VIMAT.tl.getNumberOfTasks();
    
        // creating a variable with the current time/date stamp for comparing
        var now = (new Date()).toJSON();
    
        // cycle through tasks adding each task to the right category
        // unfortunately this also accesses the DOM repeatedly
        // and will therefore require optimization
        for (i = 0; i < l; i++) {
            t = VIMAT.tl.getTaskByIndex(i);            
            htm = VIMAT.HTM.getMarkupForTask(t, 'noCompass') + '<br/>';
            currentTaskCompass = t.getCompass();
            if (!(t.getDueDate() > now)) {
                displayTaskUnderCompassHeader(htm, currentTaskCompass);
            } 
        }
    }
    function displayTaskUnderCompassHeader(h, c) {
        // put the task on the page in the correct compass category
        var i;
        
        i = VIMAT.MODEL.MISC.getCompassCategories().indexOf(c);      
        document.getElementById(VIMAT.MODEL.MISC.getCompassCategories()[i]).innerHTML += h;
    }
   
    // *** Public API
    return {
        displayCompassTool:      displayCompassTool,
        hideCompassTool:         hideCompassTool,
        displayCompass:          displayCompass
    };
}());

// Notes
function displayNotesTool() {
    var htmlToAdd = '';
    
    document.getElementById('notesTool').innerHTML = '';

    htmlToAdd += '<button onclick="newNoteButtonClicked()">New<br/>Note</button>';
    
    htmlToAdd += '<div id="newNoteForm"></div>';
    htmlToAdd += '<div id="noteListDiv"></div>';
    
    document.getElementById('notesTool').innerHTML = htmlToAdd;
    
    displayNotes();
    
    settings.notesToolIsDisplayed = true;
    
}
function hideNotesTool() {
    document.getElementById('notesTool').innerHTML = '';
    settings.notesToolIsDisplayed = false;
}
function displayNotes() {
    var htm = '';
    document.getElementById('noteListDiv').innerHTML = htm;

    for (var i in notes) {
    
        // description
        htm = 'Description: ';
        htm += '<span onclick="noteClicked(event)" id="nd';
        htm += i + '">';
        htm += (notes[i].description).toString();
        htm += '</span><br/>';
        
        // content
        htm += 'Content:<br/>' + (notes[i].content).toString() + '<br/>';

        // container for an optional edit form
        htm += '<div id="enf' + i.toString() + '"></div><br/>';

        // put the note on the page
        document.getElementById('noteListDiv').innerHTML += htm;
    }
}
function displayNewNoteForm() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter note description:<br/><input type="text" id="noteDescriptionInput"/><br/>';
    htmlToAdd += 'Note content:<br/>';
    htmlToAdd += '<textarea rows="7" cols="50" id="noteContentInput"></textarea>';
    htmlToAdd += '<button onclick="addNoteButtonClicked()">Add Note</button><br/>';
    
    document.getElementById('newNoteForm').innerHTML = htmlToAdd;
}
function hideNewNoteForm() {
    document.getElementById('newNoteForm').innerHTML = '';
}

// Calendar
function displayCalendarTool() {
    var htmlToAdd = '';
    
    htmlToAdd += 'Enter a calendar event: <input type="text" id="eventInput"/>';
    htmlToAdd += '<button onclick="addEventButtonClicked()">Add event</button>';
    htmlToAdd += '<div id="calendarDiv"></div>';

    document.getElementById('CalendarTool').innerHTML = htmlToAdd;    
}

// Settings