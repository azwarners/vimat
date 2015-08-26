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
    // Utility Functions
    var mobile = VIMAT.SETTINGS.mobile;
    function ele(type) {
        var e;
        e = VIMAT.UTILITIES.element.apply(this, arguments);
        return e;
    }
    function empty(n) {
        VIMAT.UTILITIES.removeChildren(n);
    }
    // Task List Functions
    function immediateChildrenOfContext(arrayOfValues, context) {
        var children = [];
    
        arrayOfValues.forEach(function(element, index, array) {
            if (VIMAT.UTILITIES.isChildOfContext(element, context)) {
                children.push(element);
            }
        });
        
        return children;
    }
    function groupListItem(prop, val) {
        var input, label, labelText, hoursSinceCompletion, msSinceCompletion;
        
        input = ele('input');
        input.setAttribute('type', 'checkbox');
        input.id = val;
        labelText = '+ ' + val + ':  ';
        msSinceCompletion = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue(prop, val);
        if (msSinceCompletion === '(none completed)') {
            labelText += '(none completed)';
        }
        else {
            hoursSinceCompletion = (msSinceCompletion / VIMAT.UTILITIES.msInHour).toFixed(2);
            labelText += hoursSinceCompletion + ' hours since last completion';
        }
        label = ele('label', labelText);
        label.className = 'menu_label';
        label.setAttribute('for', val);
        
        return ele('li', label, input);
    }
    // function groupListItemMobile(prop, val) {
    //     var input, label, labelText, hoursSinceCompletion, msSinceCompletion;
        
    //     input = ele('input');
    //     input.setAttribute('type', 'checkbox');
    //     input.id = val;
    //     labelText = '+ ' + val + ':  ';
    //     msSinceCompletion = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue(prop, val);
    //     if (msSinceCompletion === '(none completed)') {
    //         labelText += '(none completed)';
    //     }
    //     else {
    //         hoursSinceCompletion = (msSinceCompletion / VIMAT.UTILITIES.msInHour).toFixed(2);
    //         labelText += hoursSinceCompletion + ' hours since last completion';
    //     }
    //     label = ele('label', labelText);
    //     label.className = 'menu_label';
    //     label.setAttribute('for', val);
        
    //     return ele('li', label, input);
    // }
    function taskListItemMobile(task) {
        var listItem = ele('li'),
            input, description, statCount, stat;
        
        input = ele('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', task.id);
        input.setAttribute('class', 'tasklistcheckbox');
        description = ele('span', task.description);
        description.setAttribute('id', ('edit' + task.id));
        description.setAttribute('class', 'tasklistcheckbox');
        // stat = (fill stat with user-selected statistic)
        // statCount = ele('span', stat);
        // statCount.setAttribute('class', 'ui-li-count');
        listItem.appendChild(input);
        listItem.appendChild(description);

        return listItem;
    }
    function ungroupedTaskList() {
        var orderedListOfTasks, taskListItem, task, taskListIndex,
            taskListLength = VIMAT.tl.getNumberOfTasks();
        
        orderedListOfTasks = ele('ol');
        orderedListOfTasks.className = 'menutree';
        for (taskListIndex = 0; taskListIndex < taskListLength; taskListIndex++) {
            task = VIMAT.tl.getTaskByIndex(taskListIndex);
            if (task.isDue()) {
                taskListItem = ele('li');
                taskListItem.innerHTML = VIMAT.HTM.getMarkupForTask(task);
                orderedListOfTasks.appendChild(taskListItem);
            }
        }
        
        return orderedListOfTasks;
    }
    function listviewTasksMobile(tasks) {
        var listview, index, task, taskListItem,
            length;
        
        listview = ele('ul');
        listview.setAttribute('data-role', 'listview');
        if (tasks && tasks.length > 0) {
            length = tasks.length;
        }
        else {
            length = VIMAT.tl.getNumberOfTasks();
        }
        for (index = 0; index < length; index++) {
            if (tasks && tasks.length > 0) {
                task = tasks[index];
            }
            else {
                task = VIMAT.tl.getTaskByIndex(index);
            }
            if (task.isDue()) {
                taskListItem = taskListItemMobile(task);
                listview.appendChild(taskListItem);
            }
        }

        return listview;
    }
    function groupedTaskList(groupBy, context) {
        var uniqueValuesObject = VIMAT.tl.getUniqueValuesOfProperty(groupBy),
            uniqueValues = uniqueValuesObject['uniquePropVals'],
            undefinedPropValsExist = uniqueValuesObject['undefinedPropValsExist'],
            olMenutree = ele('ol'),
            arrayOfChildrenIndex, groupLi, orderedListOfTasks, tasksByValue, taskLi,
            arrayOfChildren = immediateChildrenOfContext(uniqueValues, context),
            arrayOfChildrenLength = arrayOfChildren.length,
            undefinedTasks = [];
            
        olMenutree.className = 'menutree';
        if (undefinedPropValsExist && context === '/') {
            undefinedTasks = VIMAT.tl.getTasksWithUndefinedProperty(groupBy);
            undefinedTasks.forEach(function(element, index, array) {
                taskLi = ele('li');
                taskLi.innerHTML = VIMAT.HTM.getMarkupForTask(element);
                olMenutree.appendChild(taskLi);
            });
        }
        for (arrayOfChildrenIndex = 0; arrayOfChildrenIndex < arrayOfChildrenLength; arrayOfChildrenIndex++) {
            if (arrayOfChildren[arrayOfChildrenIndex]) {
                groupLi = groupListItem(groupBy, arrayOfChildren[arrayOfChildrenIndex]);
                orderedListOfTasks = ele('ol');
            }
            if (!(immediateChildrenOfContext(uniqueValues, arrayOfChildren[arrayOfChildrenIndex]).length === 0)){
                orderedListOfTasks.appendChild(ele('li', groupedTaskList(groupBy, arrayOfChildren[arrayOfChildrenIndex])));
            }
            tasksByValue = VIMAT.tl.getTasksByPropertyValue(groupBy, arrayOfChildren[arrayOfChildrenIndex]);
            tasksByValue.forEach(function(element, index, array) {
                if (element.isDue()) {
                    taskLi = ele('li');
                    taskLi.innerHTML = VIMAT.HTM.getMarkupForTask(element);
                    orderedListOfTasks.appendChild(taskLi);
                }
            });
            groupLi.appendChild(orderedListOfTasks);
            olMenutree.appendChild(groupLi);
        }
        
        return olMenutree;
    }
    function collapsibleSetTasksMobile(groupBy, context) {
        var uniqueValuesObject = VIMAT.tl.getUniqueValuesOfProperty(groupBy),
            uniqueValues = uniqueValuesObject['uniquePropVals'],
            undefinedPropValsExist = uniqueValuesObject['undefinedPropValsExist'],
            collapsibleSet = ele('div'),
            arrayOfChildrenIndex, header, collapsible, tasksByValue, taskLi,
            arrayOfChildren = immediateChildrenOfContext(uniqueValues, context),
            arrayOfChildrenLength = arrayOfChildren.length,
            undefinedTasks = [];
            
        collapsibleSet.setAttribute('data-role', 'collapsibleset');
        if (undefinedPropValsExist && (context === '/' || context === '')) {
            undefinedTasks = VIMAT.tl.getTasksWithUndefinedProperty(groupBy);
            collapsibleSet.appendChild(listviewTasksMobile(undefinedTasks));
        }
        for (arrayOfChildrenIndex = 0; arrayOfChildrenIndex < arrayOfChildrenLength; arrayOfChildrenIndex++) {
            if (arrayOfChildren[arrayOfChildrenIndex]) {
                header = ele('h3', arrayOfChildren[arrayOfChildrenIndex]);
                collapsible = ele('div');
                collapsible.setAttribute('data-role', 'collapsible');
                collapsible.appendChild(header);
            }
            if (!(immediateChildrenOfContext(uniqueValues, arrayOfChildren[arrayOfChildrenIndex]))){
                collapsible.appendChild(ele('li', listviewTasksMobile(groupBy, arrayOfChildren[arrayOfChildrenIndex])));
            }
            tasksByValue = VIMAT.tl.getTasksByPropertyValue(groupBy, arrayOfChildren[arrayOfChildrenIndex]);
            collapsible.appendChild(listviewTasksMobile(tasksByValue));
            collapsibleSet.appendChild(collapsible);
        }
        
        return collapsibleSet;
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
        // new task list grouped by any property or not grouped
        // TODO displayed history needs reimplemented in new task list
        var groupBy, taskList,
            tlDiv = document.getElementById('taskListDiv');
        
        VIMAT.tl.sortByProp(VIMAT.SETTINGS.taskList.getSortBy());
        groupBy = VIMAT.SETTINGS.taskList.getGroupBy();
        if (groupBy === 'none') {
            taskList = ungroupedTaskList();
        }
        else {
            // taskList = groupedTaskList(groupBy);
            taskList = groupedTaskList(groupBy, '/');
        }        
        empty(tlDiv);
        tlDiv.appendChild(taskList);
    }
    function displayTaskListMobile() {
        var groupBy, taskList,
            tlDiv = document.getElementById('taskListDiv');
        
        VIMAT.tl.sortByProp(VIMAT.SETTINGS.taskList.getSortBy());
        groupBy = VIMAT.SETTINGS.taskList.getGroupBy();
        if (groupBy === 'none') {
            taskList = listviewTasksMobile();
        }
        else {
            taskList = collapsibleSetTasksMobile(groupBy, '/');
        }        
        empty(tlDiv);
        tlDiv.appendChild(taskList);
        $(document).trigger('create');
    }
    function displayEditFormMobile() {
        $.mobile.changePage( "#taskEditForm", { role: "dialog" } );
        alert('task clicked!');
    }
    
    // *** Public API
    return {
        displayNewTaskForm:     displayNewTaskForm,
        hideNewTaskForm:        hideNewTaskForm,
        displayTaskList:        displayTaskList,
        displayTaskListMobile:  displayTaskListMobile,
        displayEditFormMobile:  displayEditFormMobile
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