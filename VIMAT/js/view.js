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

VIMAT.namespace("VIMAT.VIEW.TASKS");

/*  Requires:
    VIMAT.DOM.ele,
    VIMAT.JQM.checklist,
    VIMAT.JQM.checklistItem,
    VIMAT.JQM.collapsible,
    VIMAT.JQM.collapsibleSet,
    VIMAT.CONTEXT.childrenOfContext,
    VIMAT.HISTORY.msSinceLastCompletionByTaskId,
    
    'VIMAT.HISTORY.msSinceLastCompletionByPropertyValue',
    'VIMAT.UTILITIES.msInHour',
    'VIMAT.tl.getAllTasks',
    'VIMAT.tl.getUniqueValuesOfProperty',
    'VIMAT.tl.getTasksWithUndefinedProperty',
    'getStatByPropertyValue',
    'VIMAT.tl.getTasksByPropertyValue',
    'VIMAT.SETTINGS.taskList.getGroupBy',
    '$'

    Contains:
    'function getStatByPropertyValue',
*/

VIMAT.VIEW.TASKS = (function () {

    // *** Private Methods
    function getStatByPropertyValue(prop, val) {
        var stat;
        
        stat = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue(prop, val);
        stat = (stat / VIMAT.UTILITIES.msInHour).toFixed(2).toString();

        return stat;
    }
    function getStatByTaskId(id) {
        var stat;
        
        stat = VIMAT.HISTORY.msSinceLastCompletionByTaskId(id);
        stat = (stat / VIMAT.UTILITIES.msInHour).toFixed(2).toString();
        
        return stat;
    }
    function eliminateOrphans(array) {
        while (VIMAT.CONTEXT.arrayHasOrphans(array)) {
            array.forEach(function(element, index) {
                if (VIMAT.CONTEXT.contextHasNoParent(array, element)) {
                    array.push(VIMAT.CONTEXT.createParent(element));
                }
            });
        }
        
        return array;
    }
    function ungroupedTasklist(tasks) {
        var div, taskListItems = [];
        
        if (!(tasks)) {
            tasks = VIMAT.tl.getAllTasks();
        }
        taskListItems = convertTasksToTaskListItems(tasks);
        div = VIMAT.JQM.checklist(taskListItems);

        return div;
    }
    function groupedTasklist(groupBy, context) {
        var collapsibleSet = VIMAT.JQM.collapsibleSet(),
            uniqueValuesObject = VIMAT.tl.getUniqueValuesOfProperty(groupBy),
            uniqueValues = uniqueValuesObject['uniquePropVals'],
            undefinedPropValsExist = uniqueValuesObject['undefinedPropValsExist'],
            children, undefinedTasks = [], collapsible, tasksByValue, stat;
        
        // uniqueValues = eliminateOrphans(uniqueValues);
        children = VIMAT.CONTEXT.childrenOfContext(uniqueValues, context);
        if (undefinedPropValsExist && (context === '/' || context === '')) {
            undefinedTasks = VIMAT.tl.getTasksWithUndefinedProperty(groupBy);
            collapsibleSet.appendChild(ungroupedTasklist(undefinedTasks));
        }

        children.forEach(function(element, index, array) {
            if (element) {
                stat = getStatByPropertyValue(groupBy, element);
                collapsible = VIMAT.JQM.collapsible(element, stat);
            }
            tasksByValue = VIMAT.tl.getTasksByPropertyValue(groupBy, element);
            collapsible.appendChild(ungroupedTasklist(tasksByValue));
            collapsible.appendChild(groupedTasklist(groupBy, element));
            collapsibleSet.appendChild(collapsible);
        });
        
        return collapsibleSet;
    }
    function convertTasksToTaskListItems(tasks) {
        var taskListItems = [], item, stat;
        
        tasks.forEach(function(element, index, array) {
            stat = getStatByTaskId(element.id);
            item = VIMAT.JQM.checklistItem(element.description, stat, element.id, element.finished, 'taskListItem');
            taskListItems.push(item);
        });

        return taskListItems;
    }

    // *** Public Methods
    function displayTaskList(tasks, groupBy) {
        var taskList, tlDiv = document.getElementById('taskListDiv');
        if (!(groupBy)) {
            groupBy = VIMAT.SETTINGS.taskList.getGroupBy();
        }
        if (groupBy === 'none') {
            taskList = ungroupedTasklist();
        }
        else {
            taskList = groupedTasklist(groupBy, '/');
        }        
        $(tlDiv).empty();
        tlDiv.appendChild(taskList);
        $(document).trigger('create');
    }

    // *** Public API
    return {
        displayTaskList:  displayTaskList
    };
}());