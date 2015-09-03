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

VIMAT.namespace('VIMAT.TIMETRACKER');

VIMAT.TIMETRACKER = (function () {
    /*  Requires:
    
    */
    
    // *** Private
    var trackedTimes = [];
    
    function getIndexOfUnEndedTrackedTime(taskId) {
        var ttIndex = -1;
        trackedTimes.forEach(function(element, index, array) {
            if (element.trackedTaskId === taskId && (element.endTime === '')) {
                ttIndex = index;
            }
        });
        return ttIndex;
    }
    function elapsedTimeBetween2JsonDates(start, end) {
        var startTime = new Date(start),
            endTime = new Date(end);
            
        return (Date.parse(endTime) - Date.parse(startTime));
            
    }
    
    // *** Public
    function TrackedTime(jsonStartTime, taskId) {
        this.startTime = jsonStartTime;
        this.endTime = '';
        this.trackedTaskId = taskId;
    }
    function punchIn(taskId) {
        var date = (new Date()).toJSON();

        trackedTimes.push(new TrackedTime(date, taskId));
}
    function punchOut(taskId) {
        var index = getIndexOfUnEndedTrackedTime(taskId),
            date = (new Date()).toJSON();

        trackedTimes[index].endTime = date;
    }
    function toggleTimeTracker(taskId) {
        if (getIndexOfUnEndedTrackedTime(taskId) === -1) {
            punchIn(taskId);
        }
        else {
            punchOut(taskId);
        }
    }
    function elapsedTimeSinceCompletion(taskId) {
        var lastCompletionTime = VIMAT.HISTORY.lastCompletionTimeByTaskId(taskId),
            elapsedTime = 0;
            
        trackedTimes.forEach(function(element, index, array) {
            if (element.trackedTaskId === taskId) {
                if (element.endTime) {
                    if (element.endTime > lastCompletionTime) {
                        elapsedTime += elapsedTimeBetween2JsonDates(element.startTime, element.endTime);
                    }
                }
                else {
                    elapsedTime += elapsedTimeBetween2JsonDates(element.startTime, (new Date()).toJSON());
                }
            }
        });
        elapsedTime = elapsedTime / 1000;
        return elapsedTime;
    }
    function getTrackedTimes() {
        return trackedTimes;
    }
    function setTrackedTimes(tt) {
        trackedTimes = tt;
    }
    function timeTrackerIsOn(taskId) {
        var trackedTimesForThisTask = [], isOn = false,
            task = VIMAT.tl.getTaskById(taskId);
        
        trackedTimes.forEach(function(element, index, array) {
            if (element.trackedTaskId === taskId) {
                trackedTimesForThisTask.push(element);
            }
        });
        trackedTimesForThisTask.forEach(function(element, index, array) {
            if (element.endTime === '') {
                isOn = true;
            }
        });

        return isOn;
    }
    return {
        TrackedTime:                TrackedTime,
        punchIn:                    punchIn,
        punchOut:                   punchOut,
        toggleTimeTracker:          toggleTimeTracker,
        elapsedTimeSinceCompletion: elapsedTimeSinceCompletion,
        getTrackedTimes:            getTrackedTimes,
        setTrackedTimes:            setTrackedTimes,
        timeTrackerIsOn:            timeTrackerIsOn
    };
}());