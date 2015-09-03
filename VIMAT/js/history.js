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

VIMAT.namespace('VIMAT.HISTORY');

VIMAT.HISTORY.taskHistory = [];

VIMAT.HISTORY.CompletedTask = function(task, completionTime) {
    this.description = task.description;
    this.id = task.id;
    this.compass = task.compass;
    this.JSONCompletedDate = completionTime;
    this.priority = task.priority;
    this.urgency = task.urgency;
    this.folder = task.folder;
    this.context = task.context;
};

VIMAT.HISTORY.completedTasksByPropertyValueInLastXMs = function (prop, val, ms, currentDate) {
    // Returns the number of completed tasks where a specific property is equal
    //      to a specific value in the last x amount of milliseconds.
    var i, sum = 0, ct,
        l = VIMAT.HISTORY.taskHistory.length,
        // change new date below to currentDate
        d = Date.parse(new Date());
    
    for (i = 0; i < l; i++) {
        ct = VIMAT.HISTORY.taskHistory[i];
        if (ct[prop] === val) {
            if (d - Date.parse(ct.JSONCompletedDate) < ms) {
                sum++;
            }
        }
    }    
    return sum;
};

VIMAT.HISTORY.completedTasksByPropertyValue = function (prop, val) {
    var completedTasksByPropVal = [], completedTask,
        index, length = VIMAT.HISTORY.taskHistory.length;
    
    for (index = 0; index < length; index++) {
        completedTask = VIMAT.HISTORY.taskHistory[index];
        if (completedTask[prop] === val) {
            completedTasksByPropVal.push(completedTask);
        }
    }
    return completedTasksByPropVal;
};

VIMAT.HISTORY.msSinceLastCompletionByPropertyValue = function (prop, val, currentDate) {
    var lastCompletionTimeByPropVal, ms,
        // change new date below to currentDate
        d = new Date();

    lastCompletionTimeByPropVal = VIMAT.HISTORY.lastCompletionTimeByPropertyValue(prop, val);
    if (lastCompletionTimeByPropVal === '(none completed)') {
        return '(none completed)';
    }
    ms = (Date.parse(d) - Date.parse(lastCompletionTimeByPropVal));
    if (ms < 0) {
        ms *= -1;
    }
    return ms;
};

VIMAT.HISTORY.lastCompletionTimeByPropertyValue = function (prop, val) {
    var completedTasksByPropertyValue = VIMAT.HISTORY.completedTasksByPropertyValue(prop, val),
        lastTime = 0, index, length = completedTasksByPropertyValue.length,
        completedTask;
    
    if (length === 0) {
        return '(none completed)';
    } 
    for (index = 0; index < length; index++) {
        if (completedTasksByPropertyValue[index].JSONCompletedDate > lastTime
                || lastTime === 0) {
            completedTask = completedTasksByPropertyValue[index];
            lastTime = completedTask.JSONCompletedDate;
        }
    }   
    return lastTime;
};

VIMAT.HISTORY.lastCompletionTimeByTaskId = function (id) {
    var lastTime = '';
    
    VIMAT.HISTORY.taskHistory.forEach(function(element, index, array) {
        if (element.id === id) {
            if (element.JSONCompletedDate > lastTime) {
                lastTime = element.JSONCompletedDate;
            }
        }
    });
    if (lastTime === '') {
        lastTime = '(none completed)';
    }
    
    return lastTime;
};

VIMAT.HISTORY.msSinceLastCompletionByTaskId = function (id) {
    var lastTime = VIMAT.HISTORY.lastCompletionTimeByTaskId(id),
        // change new date below to currentDate
        d = new Date();

    if (lastTime === '(none completed)') {
        return '(none completed)';
    }
    lastTime = (Date.parse(d) - Date.parse(lastTime));
    if (lastTime < 0) {
        lastTime *= -1;
    }
    return lastTime;
};

VIMAT.HISTORY.msSinceLastTrackedTimeByTaskId = function(taskId) {
    var taskHasntBeenStartedBefore = true,
        trackedTimes = VIMAT.TIMETRACKER.getTrackedTimes(), ms = 0, msForThisTrackedTime;
    
    trackedTimes.forEach(function(element, index, array) {
        if (element.trackedTaskId === taskId) {
            taskHasntBeenStartedBefore = false;
            if (element.endTime === '') {
                return 0;
            }
            else {
                msForThisTrackedTime = VIMAT.DATETIME.msBetweenTwoJsonDates((new Date()).toJSON(), element.endTime);
                if (msForThisTrackedTime > ms) {
                    ms = msForThisTrackedTime;
                }
            }
        }
    });
    if (taskHasntBeenStartedBefore) {
        return '(never started)';
    }
    
    return ms;
};

VIMAT.HISTORY.msSinceLastTrackedTimeByPropertyValue = function(prop, val) {
    var taskHasntBeenStartedBefore = true, task,
        trackedTimes = VIMAT.TIMETRACKER.getTrackedTimes(), ms = 0, msForThisTrackedTime;
    
    trackedTimes.forEach(function(element, index, array) {
        task = VIMAT.tl.getTaskById(element.trackedTaskId);
        if (task[prop] === val) {
            taskHasntBeenStartedBefore = false;
            if (element.endTime === '') {
                return 0;
            }
            else {
                msForThisTrackedTime = VIMAT.DATETIME.msBetweenTwoJsonDates((new Date()).toJSON(), element.endTime);
                if (msForThisTrackedTime > ms) {
                    ms = msForThisTrackedTime;
                }
            }
        }
    });
    if (taskHasntBeenStartedBefore) {
        return '(never started)';
    }
    
    return ms;
};