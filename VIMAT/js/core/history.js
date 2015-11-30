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

VIMAT.namespace("VIMAT.HISTORY");
VIMAT.HISTORY = (function () {
    /*  Requires:
        VIMAT.CONTEXT.isSubContextOfContext
    */

    // *** Private
    var taskHistory = [];
    var trackedTimes = [];

    // *** Public
    function CompletedTask(task, completionTime) {
        this.description = task.description;
        this.id = task.id;
        this.compass = task.compass;
        this.JSONCompletedDate = completionTime;
        this.priority = task.priority;
        this.urgency = task.urgency;
        this.folder = task.folder;
        this.context = task.context;
    }
    function addToHistory(t) {
        var ct = new CompletedTask(t, (new Date()).toJSON());
        taskHistory.push(ct);
    }
    function completedTasksByPropertyValueInLastXMs(prop, val, ms, currentDate) {
        // Returns the number of completed tasks where a specific property is equal
        //      to a specific value in the last x amount of milliseconds.
        var i, sum = 0, ct,
            l = taskHistory.length,
            // change new date below to currentDate
            d = Date.parse(new Date());
        
        for (i = 0; i < l; i++) {
            ct = taskHistory[i];
            if (ct[prop] === val) {
                if (d - Date.parse(ct.JSONCompletedDate) < ms) {
                    sum++;
                }
            }
        }    
        return sum;
    }
    function completedTasksByPropertyValue(prop, val) {
        var completedTasksByPropVal = [], completedTask,
            index, length = taskHistory.length;
        
        for (index = 0; index < length; index++) {
            completedTask = taskHistory[index];
            if (completedTask[prop] === val) {
                completedTasksByPropVal.push(completedTask);
            }
        }
        
        return completedTasksByPropVal;
    }
    function msSinceLastCompletionByPropertyValue(prop, val, currentDate) {
        var lastCompletionTimeByPropVal = lastCompletionTimeByPropertyValue(prop, val),
            ms, d = new Date(),
            uniqueValues = VIMAT.tl.getUniqueValuesOfProperty(prop)['uniquePropVals'],
            descendantsCompletionTime,
            index, length = uniqueValues.length;

        lastCompletionTimeByPropVal;
        if (lastCompletionTimeByPropVal === '(none completed)') {
            ms = '(none completed)';
        }
        else {
            ms = (Date.parse(d) - Date.parse(lastCompletionTimeByPropVal));
        }
        for (index = 0; index < length; index++) {
            if (VIMAT.CONTEXT.isSubContextOfContext(uniqueValues[index], val)) {
                descendantsCompletionTime = lastCompletionTimeByPropertyValue(uniqueValues[index]);
                if (!(descendantsCompletionTime === "(none completed)")) {
                    descendantsCompletionTime = (Date.parse(d) - Date.parse(descendantsCompletionTime));
                    if (descendantsCompletionTime < ms || ms === '(none completed)') {
                        ms = descendantsCompletionTime;
                    }
                }
            }
        }
        return ms;
    }
    function lastCompletionTimeByPropertyValue(prop, val) {
        var completedTasksByPropVal = completedTasksByPropertyValue(prop, val),
            lastCompletionTimeByPropVal = 0, index, length = completedTasksByPropVal.length,
            completedTask;
        
        if (length === 0) {
            return '(none completed)';
        } 
        for (index = 0; index < length; index++) {
            if (completedTasksByPropVal[index].JSONCompletedDate > lastCompletionTimeByPropVal
                    || lastCompletionTimeByPropVal === 0) {
                completedTask = completedTasksByPropVal[index];
                lastCompletionTimeByPropVal = completedTask.JSONCompletedDate;
            }
        }   
        return lastCompletionTimeByPropVal;
    }
    function lastCompletionTimeByTaskId(id) {
        var completionTimes = [], lastTime = '0';
        taskHistory.forEach(function(element, index, array) {
            if (element.id === id) {
                completionTimes.push(element.JSONCompletedDate);
            }
        });
        completionTimes.forEach(function(element, index, array) {
            if (element > lastTime) {
                lastTime = element;
            }
        });
        return lastTime;
    }
    function timeOfLastTrackedTimeByPropertyValue(prop, val) {
        var lastTime = '', tt, task;
        
        for (tt in trackedTimes) {
            task = VIMAT.tl.getTaskById(tt.trackedTaskId);
            if (task[prop] === val) {
                if (tt.endTime > lastTime) {
                    lastTime = tt.endTime;
                }
            }
        }
        
        return lastTime;
    }
    function msSinceLastCompletionByTaskId(id) {
        var lastTime = lastCompletionTimeByTaskId(id),
            // change new date below to currentDate
            d = new Date();
        if (lastTime === '0') {
            return '(none completed)';
        }
        lastTime = (Date.parse(d) - Date.parse(lastTime));
        if (lastTime < 0) {
            lastTime *= -1;
        }
        return lastTime;
    }
    function msSinceLastTrackedTimeByTaskId(taskId) {
        var taskHasntBeenStartedBefore = true, ms = 0, msForThisTrackedTime;
        
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
    }
    function msSinceLastTrackedTimeByPropertyValue(prop, val) {
        var taskHasntBeenStartedBefore = true, task, ms = 0, msForThisTrackedTime;
        
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
    }
    function getTrackedTimes() {
        return trackedTimes;
    }
    function setTrackedTimes(tt) {
        trackedTimes = tt;
    }
    function getTaskHistory() {
        return taskHistory;
    }
    function setTaskHistory(th) {
        taskHistory = th;
    }

    // *** Public API
    return {
        CompletedTask:                          CompletedTask,
        addToHistory:                           addToHistory,
        getTaskHistory:                         getTaskHistory,
        setTaskHistory:                         setTaskHistory,
        getTrackedTimes:                        getTrackedTimes,
        setTrackedTimes:                        setTrackedTimes,
        completedTasksByPropertyValueInLastXMs: completedTasksByPropertyValueInLastXMs,
        completedTasksByPropertyValue:          completedTasksByPropertyValue,
        msSinceLastCompletionByPropertyValue:   msSinceLastCompletionByPropertyValue,
        lastCompletionTimeByPropertyValue:      lastCompletionTimeByPropertyValue,
        lastCompletionTimeByTaskId:             lastCompletionTimeByTaskId,
        timeOfLastTrackedTimeByPropertyValue:   timeOfLastTrackedTimeByPropertyValue,
        msSinceLastCompletionByTaskId:          msSinceLastCompletionByTaskId,
        msSinceLastTrackedTimeByTaskId:         msSinceLastTrackedTimeByTaskId,
        msSinceLastTrackedTimeByPropertyValue:  msSinceLastTrackedTimeByPropertyValue
    };
}());