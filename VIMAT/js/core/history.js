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

/*  Requires:
    
*/

VIMAT.HISTORY = (function () {

    // *** Private
    var taskHistory = [];

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
        var lastCompletionTimeByPropVal, ms,
            // change new date below to currentDate
            d = new Date();
    
        lastCompletionTimeByPropVal = lastCompletionTimeByPropertyValue(prop, val);
        if (lastCompletionTimeByPropVal === '(none completed)') {
            return '(none completed)';
        }
        ms = (Date.parse(d) - Date.parse(lastCompletionTimeByPropVal));   
        return ms;
    }
    function lastCompletionTimeByPropertyValue(prop, val) {
        var completedTasksByPropertyValue = completedTasksByPropertyValue(prop, val),
            lastCompletionTimeByPropVal = 0, index, length = completedTasksByPropertyValue.length,
            completedTask;
        
        if (length === 0) {
            return '(none completed)';
        } 
        for (index = 0; index < length; index++) {
            if (completedTasksByPropertyValue[index].JSONCompletedDate > lastCompletionTimeByPropVal
                    || lastCompletionTimeByPropVal === 0) {
                completedTask = completedTasksByPropertyValue[index];
                lastCompletionTimeByPropVal = completedTask.JSONCompletedDate;
            }
        }   
        return lastCompletionTimeByPropVal;
    }
    function lastCompletionTimeByTaskId(id) {
        var completionTimes = [], lastTime = 0;
        
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
    
    // *** Public API
    return {
        CompletedTask:                          CompletedTask,
        completedTasksByPropertyValueInLastXMs: completedTasksByPropertyValueInLastXMs,
        completedTasksByPropertyValue:          completedTasksByPropertyValue,
        msSinceLastCompletionByPropertyValue:   msSinceLastCompletionByPropertyValue,
        lastCompletionTimeByPropertyValue:      lastCompletionTimeByPropertyValue,
        lastCompletionTimeByTaskId:             lastCompletionTimeByTaskId
    };
}());