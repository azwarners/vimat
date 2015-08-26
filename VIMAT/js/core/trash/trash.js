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

VIMAT.namespace("VIMAT.TRASH");

/*
    Requires:
    
    
*/

VIMAT.TRASH = function () {
    // *** Private Properties
    var trash = [];
    
    // *** Private Methods
    
    // *** Public Methods
    function idExists(id) {
        trash.forEach(function(element, index, array) {
            if (element.id === id) {
                return true;
            }
        });
        
        return false;
    }
    function addItem(item) {
        trash.push(item);
    }
    function getItemByIndex(i) {
        return trash[i];
    }
    function getItemById(id) {
        var l = trash.length, i;
        
        for (i = 0; i < l; i++) {
            if (trash[i].id === id) {
                return trash[i];
            }
        }
    }
    function removeItemById(id) {
        var i = getTaskIndexById(id);
        tasks.splice(i, 1);
    }
    function sortByProp(prop) {
        VIMAT.UTILITIES.sortArrayOfObjectsByProperty(tasks, prop);
    }
    function deleteItem(i) {
        tasks.splice(i, 1);        
    }
    function getItemsByPropertyValue(prop, val) {
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
    function emptyTrash() {
        trash = [];
    }
    function getAllItems() {
        var allTrash = trash;
        
        return allTrash;
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
    function getItemIndexById(id) {
        var l = getNumberOfTasks(),
            i;
        for (i = 0; i < l; i++) {
            if (tasks[i].id === id) {
                return i;
            }
        }
    }    
    
    // *** Public API
    return {
        idExists:                       idExists,
        addItem:                        addItem,
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
        getAllTasks:                    getAllTasks
    };
};