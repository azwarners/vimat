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

VIMAT.namespace("VIMAT.CONTROLLER");

VIMAT.CONTROLLER = (function () {
    // *** Private
    function loadData() {
        VIMAT.DB.loadTaskList();
        VIMAT.DB.loadListOfLists();
        VIMAT.DB.loadSettings();
        VIMAT.DB.loadHistory();
    }
    function applySettings() {
        var groupBy = VIMAT.SETTINGS.taskList.getGroupBy(),
            sortBy = VIMAT.SETTINGS.taskList.getSortBy(),
            groupBySelectNode = document.getElementById('groupBySelect'),
            sortBySelectNode = document.getElementById('sortBySelect'),
            groupByOptionNodes = groupBySelectNode.childNodes,
            sortByOptionNodes = sortBySelectNode.childNodes,
            index, length = groupByOptionNodes.length;
        
        for (index = 0; index < length; index++) {
            if (groupByOptionNodes[index].value === groupBy) {
                groupByOptionNodes[index].setAttribute('selected', 'selected');
            }
        }
        length = sortByOptionNodes.length;
        for (index = 0; index < length; index++) {
            if (sortByOptionNodes[index].value === sortBy) {
                sortByOptionNodes[index].setAttribute('selected', 'selected');
            }
        }
    }
    function addEventListeners() {
        addTaskEventListeners();
        addSettingsEventListeners();
    }
    function fetchTaskFormData() {
        var description = document.getElementById('description').value,
            task = new VIMAT.MODEL.TASKS.Task(description),
            folder = document.getElementById('folder').value,
            context = document.getElementById('context').value,
            compass = document.getElementById('compass').value,
            priority = document.getElementById('priority').value,
            urgency = document.getElementById('urgency').value,
            dueDate = document.getElementById('dueDate').value.toJSON,
            frequency = document.getElementById('frequency').value,
            interval = document.getElementById('interval').value,
            repeats = document.getElementById('repeats').checked;
            
        if (repeats) {
            task.repeats = true;
            if (document.getElementById('due').checked) {
                task.dueOrCompletion = 'd';
            }
            else {
                task.dueOrCompletion = 'c';
            }
            task.frequency = frequency;
            task.interval = interval;
        }
        task.folder = folder;
        task.context = context;
        task.compass = compass;
        task.priority = priority;
        task.urgency = urgency;
        task.dueDate = dueDate;
        
        return task;
    }

    // *** Event Listener Handlers
    function addTask() {
        VIMAT.tl.addTask(fetchTaskFormData());
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        removeTaskEventListeners();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }
    function toggleTaskCheckBox(event) {
        var eventTarget = event.currentTarget,
            taskId = eventTarget.id,
            task = VIMAT.tl.getTaskById(taskId);

        task.finished = document.getElementById(taskId).checked;
        VIMAT.tl.removeTaskById(taskId);
        VIMAT.tl.addTaskFromString(task.toString());
        VIMAT.DB.saveTaskList();
    }
    function clearChecked() {
        VIMAT.tl.deleteOrRepeatCompleted();
        VIMAT.DB.saveTaskList();
        VIMAT.DB.saveSettings();
        VIMAT.DB.saveHistory();
        removeTaskEventListeners();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }
    function addSamples() {
        VIMAT.MODEL.TASKS.sampleData.forEach(function(dataElement, dataIndex, array) {
            var propArray = Object.keys(dataElement),
                task = new VIMAT.MODEL.TASKS.Task();
            
            propArray.forEach(function(propElement, propIndex, array) {
                task[propElement] = dataElement[propElement];
            });
            VIMAT.tl.addTask(task);
        });
        VIMAT.DB.saveTaskList();
        removeTaskEventListeners();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }
    function changeGroupBy() {
        var prop = document.getElementById('groupBySelect').value;

        VIMAT.SETTINGS.taskList.setGroupBy(prop);
        VIMAT.DB.saveSettings();
        removeTaskEventListeners();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }
    function changeSortBy() {
        var prop = document.getElementById('sortBySelect').value;

        VIMAT.SETTINGS.taskList.setSortBy(prop);
        VIMAT.tl.sortByProp(prop);
        VIMAT.DB.saveSettings();
        removeTaskEventListeners();
        VIMAT.VIEW.TASKS.displayTaskList();
        addTaskEventListeners();
    }

    // *** Event Listener Bindings
    function addTaskEventListeners() {
        $('.taskListItem').on('change', toggleTaskCheckBox);
        $('#addTask').on('click', addTask);
        $('#clearChecked').on('click', clearChecked);
        $('#addSamples').on('click', addSamples);
    }
    function removeTaskEventListeners() {
        $('.taskListItem').off('change', toggleTaskCheckBox);
        $('#addTask').off('click', addTask);
        $('#clearChecked').off('click', clearChecked);
        $('#addSamples').off('click', addSamples);
    }
    function addSettingsEventListeners() {
        $('#groupBySelect').on('change', changeGroupBy);
        $('#sortBySelect').on('change', changeSortBy);
    }

    // *** Public
    function initialize(){
        // All of this code is executed after the page has loaded
        VIMAT.tl = new VIMAT.MODEL.TASKS.taskList();
        loadData();
        applySettings();
        VIMAT.VIEW.TASKS.displayTaskList();
        addEventListeners();
        $(document).trigger('create');
    }
    

    // Public API
    return {
        initialize: initialize
    };
}());