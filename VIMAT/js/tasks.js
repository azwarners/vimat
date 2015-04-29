/* 
 * Copyright (C) 2013 nick
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* 
 * The MIT License
 *
 * Copyright 2013 nick.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var VIMAT = VIMAT || {};

VIMAT.namespace("VIMAT.MODEL.TASKS");

VIMAT.MODEL.TASKS.Task = function(d) {
    this.id = '';
    this.description = d;
    this.folder = '';
    this.finished = false;
    this.context;
    this.dueDate = (new Date()).toJSON();
    this.compass = 'Chores';
    this.priority = '';
    this.urgency = '';
    this.repeats = false;
    this.dueOrCompletion = '';
    this.frequency = 0;
    this.interval = '';
};

// refactor to utility
VIMAT.MODEL.TASKS.Task.prototype.toString = function () {
    var str = this.id;
    str += '|' + this.description;
    str += '|' + this.folder;
    str += '|' + this.finished;
    str += '|' + this.context;
    str += '|' + this.dueDate;
    str += '|' + this.compass;
    str += '|' + this.priority;
    str += '|' + this.urgency;
    str += '|' + this.repeats;
    str += '|' + this.dueOrCompletion;
    str += '|' + this.frequency;
    str += '|' + this.interval;
    return str;
};

VIMAT.MODEL.TASKS.Task.prototype.fromString = function (s) {
    var taskProperties = [];
    taskProperties = s.split('|');
    // 'finished' and 'repeats' are boolean and the expressions
    // that follow were used to store boolean values rather than strings
    this.id = taskProperties[0];
    this.description = taskProperties[1];
    this.folder = taskProperties[2];
    this.finished = (taskProperties[3] === 'true');
    this.context = taskProperties[4];
    this.dueDate = taskProperties[5];
    this.compass = taskProperties[6];
    this.priority = taskProperties[7];
    this.urgency = taskProperties[8];
    this.repeats = (taskProperties[9] === 'true');
    this.dueOrCompletion = taskProperties[10];
    this.frequency = taskProperties[11];
    this.interval = taskProperties[12];
    if (taskProperties[13]) {
        // add new attributes in this manner to avoid breaking old tasks
    }
};

VIMAT.MODEL.TASKS.Task.prototype.repeat = function () {
    var d;
    if (this.dueOrCompletion === 'd') {
        d = Date.parse(this.dueDate);
    }
    else {
        d = Date.parse(new Date());
    }
    if (this.interval === 'h') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInHour();
    }
    if (this.interval === 'd') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInDay();
    }
    if (this.interval === 'w') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInWeek();
    }
    if (this.interval === 'm') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInMonth();
    }
    if (this.interval === 'y') {
        d += this.frequency * VIMAT.MODEL.MISC.getMsInYear();
    }
    this.dueDate = (new Date(d)).toJSON();
    this.finished = false;
};

VIMAT.MODEL.TASKS.Task.prototype.isDue = function () {
    var d = (new Date()).toJSON();
    if (this.dueDate <= d) {
        return true;
    }
    return false;
};

VIMAT.MODEL.TASKS.taskList = function () {
    // *** Dependencies

    // *** Private Properties
    var tasks = [],
        trash = [],
        editTaskId = false;
    
    // *** Private methods
    function idExists(id) {
        var i, l = getNumberOfTasks();
        for (i = 0; i < l; i++) {
            if (tasks[i].id === id) {
                return true;
            }
        }
        return false;
    }
    function addTask(t) {
        // Any new task created for the task list must go through this function
        // in order to get the proper ID
        t.id = VIMAT.SETTINGS.taskList.getNextId(); // *** TODO Prefix ID with userID
        tasks.push(t);
    }
    function addTaskNoId(t) {
        tasks.push(t);
    }
    function addTaskFromString(s) {
        // This function will not create a new ID
        // This is for tasks that have already been created and
        // assigned a unique ID
        var t = new VIMAT.MODEL.TASKS.Task();
        t.fromString(s);
        tasks.push(t);
    }
    function addTasksFromStrings(ss) {
        // array version of 'addTaskFromString'
        var i, l = ss.length;
        for (i = 0; i < l; i++) {
            addTaskFromString(ss[i]);
        }
    }
    function addTasksFromString(s) {
        // importing multiple tasks from a single string
        var i, l, tl = [];
        tl = s.split('/|');
        l = tl.length;
        for (i = 0; i < l; i++) {
            addTaskFromString(tl[i]);
        }
    }
    function getAllTasksToStrings() {
        var i, ts = [];
        for (i = 0; i < getNumberOfTasks(); i++)  {
            ts[i] = tasks[i].toString();
        }
        return ts;
    }
    function getAllTasksToString() {
        var i, l = getNumberOfTasks(), ts = '';
        for (i = 0; i < l; i++)  {
            if (i === l) {
                ts += tasks[i].toString();
            }
            else {
                ts += tasks[i].toString() + '/|';
            }
        }
        return ts;
    }
    function getTaskByIndex(i) {
        return tasks[i];
    }
    function getTaskById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (tasks[i].getId() === id) {
                return tasks[i];
            }
        }
    }
    function getTasksByPropertyValue(prop, val) {
        var l = getNumberOfTasks(),
            i, t, ts = [];
        for (i = 0; i < l; i++) {
            t = tasks[i];
            if (t[prop] === val) {
                ts.push(t);
            }
        }
        return ts;
    }
    function getTaskIndexById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (tasks[i].getId() === id) {
                return i;
            }
        }
    }    
    function removeTaskById(id) {
        var i = getTaskIndexById(id);
        tasks.splice(i, 1);
    }
    function sortByProp(prop) {
        tasks.sort(function (a, b) {
          if (a[prop] > b[prop]) {
            return 1;
          }
          if (a[prop] < b[prop]) {
            return -1;
          }
          return 0;
        });        
    }
    function deleteOrRepeatCompleted() {
        var l = getNumberOfTasks(),
            i, t;
        for (i = 0; i < l; i++) {
            t = getTaskByIndex(i);
            if (t.getFinished()) {
                addToHistory(t);
                if (t.getRepeats()) {
                    t.repeat();
                    deleteTask(i);
                    i--;
                    tasks.push(t);
                }
                else {
                    deleteTask(i);
                    i--;
                    l--;
                }
            }
        }
    }
    function permanentlyDeleteCompleted() {
        var l = getNumberOfTasks(),
            i, t;
        for (i = 0; i < l; i++) {
            t = getTaskByIndex(i);
            if (t.getFinished()) {
                deleteTask(i);
                i--;
                l--;
            }
        }
    }
    function setFinishedById(id, b) {
        var l = getNumberOfTasks(), i, t;
        
        for (i = 0; i < l; i++) {
            if (tasks[i].getId() === id) {
                tasks[i].setFinished(b);
                return;
            }
        }
    }
    function addToHistory(t) {
        var ct = new VIMAT.HISTORY.CompletedTask(t, (new Date()).toJSON());
        VIMAT.HISTORY.taskHistory.push(ct);
    }
    function deleteTask(i) {
        tasks.splice(i, 1);        
    }
    function getTextForCompleted() {
        var arrayOfTaskStrings = [],
            l = getNumberOfTasks(),
            i, t;
        for (i = 0; i < l; i++) {
            t = getTaskByIndex(i);
            if (t.getFinished()) {
                arrayOfTaskStrings.push(t.toString());
                tasks.splice(i, 1);
                i--;
                t.setFinished(false);
                tasks.push(t);
            }
        }
        return arrayOfTaskStrings;
    }
    function getNumberOfTasks() {
        return tasks.length;
    }
    function getEditTaskId() {
        return editTaskId;
    }
    function setEditTaskId(id) {
        editTaskId = id;
    }
    function getUniqueFolders(root) {
        var l = getNumberOfTasks(),
            i, task, taskFolder, uniqueFolderNames = [], notInArray,
            blankFolderNamesExist = false;
        for (i = 0; i < l; i++) {
            task = tasks[i];
            taskFolder = task.folder;
            if (taskFolder === '') {
                blankFolderNamesExist = true;
            }
            notInArray = VIMAT.UTILITIES.isNotInArray(taskFolder, uniqueFolderNames);
            if (notInArray && task.isDue()) {
                uniqueFolderNames.push(taskFolder);
            }
        }
        if (blankFolderNamesExist) {
            l = uniqueFolderNames.length;
            for (i = 0; i < l; i++) {
                if (uniqueFolderNames[i] === '') {
                    uniqueFolderNames.splice(i, 1);
                }
            }
            uniqueFolderNames.unshift('');
        }
        return uniqueFolderNames;
    }
    function getUniqueValuesOfProperty(prop) {
        var uniquePropVals = [], notInArray, blankPropValsExist;
        
        tasks.forEach(function(element, index, array) {
            if (element[prop] === '' || element[prop].toString() === 'undefined' || element[prop] === null) {
                blankPropValsExist = true;
            }
            else {
                notInArray = VIMAT.UTILITIES.isNotInArray(element[prop], uniquePropVals);
                if (notInArray && element.isDue()) {
                    uniquePropVals.push(element[prop]);
                }
            }
        });
        if (blankPropValsExist) {

        }
        return uniquePropVals;
    }
    function getTasksByFolder(f) {
        var i, l = getNumberOfTasks(), tasksInFolder = [];
//        alert(tasks);
        for (i = 0; i < l; i++) {
//            alert(tasks[i]);
            if (tasks[i].getFolder() === f) {
                tasksInFolder.push(tasks[i]);
            }
        }
//        alert(tasks);
        return tasksInFolder;
    }
    function getFoldersByFolder(folder) {
        
    }
    function sweepTasks() {
        
    }
    function removeFromTrash(id) {
        
    }
    function emptyTrash() {
        
    }

    // *** Public API
    return {
        idExists:                   idExists,
        addTask:                    addTask,
        addTaskFromString:          addTaskFromString,
        addTasksFromStrings:        addTasksFromStrings,
        addTasksFromString:         addTasksFromString,
        addTaskNoId:                addTaskNoId,
        removeTaskById:             removeTaskById,
        sortByProp:                 sortByProp,
        deleteOrRepeatCompleted:    deleteOrRepeatCompleted,
        getTextForCompleted:        getTextForCompleted,
        getNumberOfTasks:           getNumberOfTasks,
        getTaskByIndex:             getTaskByIndex,
        getTaskById:                getTaskById,
        getTasksByPropertyValue:    getTasksByPropertyValue,
        getTaskIndexById:           getTaskIndexById,
        getAllTasksToString:        getAllTasksToString,
        getAllTasksToStrings:       getAllTasksToStrings,
        getEditTaskId:              getEditTaskId,
        setEditTaskId:              setEditTaskId,
        getUniqueFolders:           getUniqueFolders,
        getUniqueValuesOfProperty:  getUniqueValuesOfProperty,
        permanentlyDeleteCompleted: permanentlyDeleteCompleted,
        setFinishedById:            setFinishedById,
        getTasksByFolder:           getTasksByFolder
    };
};