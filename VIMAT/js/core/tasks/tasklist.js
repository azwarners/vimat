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

/*
    Requires:
    VIMAT.HISTORY.addToHistory
    
*/

VIMAT.MODEL.TASKS.taskList = function () {
    // *** Private Properties
    var tasks = [];
    
    // *** Private Methods
    function repeatIt(task) {
        task.repeat();
        removeTaskById(task.id);
        addTaskNoId(task);
    }
    
    // *** Public Methods
    function removeSamples() {
        
    }
    function idExists(id) {
        tasks.forEach(function(element, index, array) {
            if (element.id === id) {
                return true;
            }
        });
        
        return false;
    }
    function addTaskNoId(t) {
        tasks.push(t);
    }
    function getTaskByIndex(i) {
        return tasks[i];
    }
    function getTaskById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (tasks[i].id === id) {
                return tasks[i];
            }
        }
    }
    function removeTaskById(id) {
        var i = getTaskIndexById(id);
        tasks.splice(i, 1);
    }
    function sortByProp(prop) {
        VIMAT.UTILITIES.sortArrayOfObjectsByProperty(tasks, prop);
    }
    function deleteOrRepeatCompleted() {
        var completedTasks = getTasksByPropertyValue('finished', true);
        
        completedTasks.forEach(function(element, index, array) {
            VIMAT.HISTORY.addToHistory(element);
            if (element.repeats) {
                repeatIt(element);
            }
            else {
                removeTaskById(element.id);
            }
        });
    }
    function deleteTask(i) {
        tasks.splice(i, 1);        
    }
    function permanentlyDeleteCompleted() {
        var completedTasks = getTasksByPropertyValue('finished', true);
            
        completedTasks.forEach(function(element, index, array) {
            removeTaskById(element.id);
        });
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
    function getNumberOfTasks() {
        return tasks.length;
    }
    function getAllTasks() {
        var allTasks = tasks;
        
        return allTasks;
    }
    function getUniqueValuesOfProperty(prop) {
        var uniquePropVals = [], notInArray, undefinedPropValsExist,
            uniquePropValsObject = {};
        
        // Iterate over each task
        tasks.forEach(function(element, index, array) {
            // Test for nullness or emptiness or lack of definition
            if (element[prop] === '' || element[prop] === 'undefined' || element[prop] === null) {
                undefinedPropValsExist = true;
            }
            else {
                notInArray = VIMAT.UTILITIES.isNotInArray(element[prop], uniquePropVals);
                if (notInArray) {
                    uniquePropVals.push(element[prop]);
                }
            }
        });
        if (undefinedPropValsExist) {
            uniquePropValsObject['undefinedPropValsExist'] = undefinedPropValsExist;
        }
        uniquePropValsObject['uniquePropVals'] = uniquePropVals;
        
        return uniquePropValsObject;
    }
    function addStatToTasks() {
        var stat, msTrackedTime = 0, msCompletion = 0;
        tasks.forEach(function(element, index, array) {
            msCompletion = VIMAT.HISTORY.msSinceLastCompletionByTaskId(element.id);
            msTrackedTime = VIMAT.HISTORY.msSinceLastTrackedTimeByTaskId(element.id);
            if ( !(msCompletion === '(none completed)') && !(msTrackedTime === '(never started)') ) {
                if (msTrackedTime < msCompletion) {
                    stat = msTrackedTime;
                }
                else {
                    stat = msCompletion;
                }
                stat = (stat / VIMAT.UTILITIES.msInHour).toFixed(2).toString();
            }
            else if (!(msTrackedTime === '(never started)')) {
                stat = msTrackedTime;
                stat = (stat / VIMAT.UTILITIES.msInHour).toFixed(2).toString();
            }
            else if (!(msCompletion === '(none completed)')) {
                stat = msCompletion;
                stat = (stat / VIMAT.UTILITIES.msInHour).toFixed(2).toString();
            }
            else {
                stat = 'none';
            }
            element['stat'] = stat;
        });
    }
    
    // *** Refactor/Throw Away
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

    // *** Not Sure
    function addTask(t) {
        // Any new task created for the task list must go through this function
        // in order to get the proper ID
        t.id = VIMAT.UTIL.newId(); // *** TODO Prefix ID with userID
        tasks.push(t);
    }
    function getTaskIndexById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (tasks[i].id === id) {
                return i;
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
    function getTasksWithUndefinedProperty(prop) {
        var undefinedTasks = [];
        
        tasks.forEach(function(element, index, array) {
            if (element[prop] === '' || element[prop] === 'undefined' || element[prop] === null) {
                undefinedTasks.push(element);
            }
        });
         
        return undefinedTasks;
    }

    
    // *** Public API
    return {
        idExists:                       idExists,
        addTask:                        addTask,
        addTaskFromString:              addTaskFromString,
        addTasksFromStrings:            addTasksFromStrings,
        addTasksFromString:             addTasksFromString,
        addTaskNoId:                    addTaskNoId,
        removeTaskById:                 removeTaskById,
        sortByProp:                     sortByProp,
        deleteOrRepeatCompleted:        deleteOrRepeatCompleted,
        deleteTask:                     deleteTask,
        getTextForCompleted:            getTextForCompleted,
        getNumberOfTasks:               getNumberOfTasks,
        getTaskByIndex:                 getTaskByIndex,
        getTaskById:                    getTaskById,
        getTasksByPropertyValue:        getTasksByPropertyValue,
        getTaskIndexById:               getTaskIndexById,
        getAllTasksToString:            getAllTasksToString,
        getAllTasksToStrings:           getAllTasksToStrings,
        getUniqueValuesOfProperty:      getUniqueValuesOfProperty,
        getTasksWithUndefinedProperty:  getTasksWithUndefinedProperty,
        permanentlyDeleteCompleted:     permanentlyDeleteCompleted,
        setFinishedById:                setFinishedById,
        getAllTasks:                    getAllTasks,
        addStatToTasks:                 addStatToTasks,
        removeSamples:                  removeSamples
    };
};