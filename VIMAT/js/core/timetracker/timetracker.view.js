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

VIMAT.namespace("VIMAT.TIMETRACKER.VIEW");

VIMAT.TIMETRACKER.VIEW = (function () {
    // *** Private
    function addElapsedTimesToTasks(tasks) {
        var elapsedTime;
        
        tasks.forEach(function(element, index, array) {
            elapsedTime = VIMAT.TIMETRACKER.elapsedTimeSinceCompletion(element.id);
            elapsedTime = (elapsedTime / 60).toFixed(2);
            element['elapsedTime'] = elapsedTime;
        });
        
        return tasks;
    }
    function timeTrackerTableRow(task) {
        var tr = VIMAT.DOM.ele('tr'), elapsedTime = task.elapsedTime + ' min', button, inOrOut;
        
        if (VIMAT.TIMETRACKER.timeTrackerIsOn(task.id)) {
            inOrOut = ' Out';
        }
        else {
            inOrOut = ' In';
        }
        button = VIMAT.DOM.ele('button', 'Punch' + inOrOut);
        button.setAttribute('id', 'tt' + task.id);
        button.setAttribute('class', 'timeTrackerPunchButton');
        tr.appendChild(VIMAT.DOM.ele('td', button));
        tr.appendChild(VIMAT.DOM.ele('td', elapsedTime));
        tr.appendChild(VIMAT.DOM.ele('td', task.description));

        return tr;
    }

    // *** Public
    function displayTimeTracker(tasks) {
        var table = VIMAT.DOM.ele('table'),
            timeTrackerDiv = document.getElementById('timeTrackerDiv');
        
        table.setAttribute('data-role', 'table');
        $(timeTrackerDiv).empty();
        tasks = addElapsedTimesToTasks(tasks);
        tasks.forEach(function(element, index, array) {
            table.appendChild(timeTrackerTableRow(element));
        });
        timeTrackerDiv.appendChild(table);
        // $(document).trigger('create');
        // var listView = VIMAT.DOM.ele('ul'),
        //     timeTrackerDiv = document.getElementById('timeTrackerDiv');
        
        // listView.setAttribute('data-role', 'listview');
        // $(timeTrackerDiv).empty();
        // tasks = addElapsedTimesToTasks(tasks);
        // tasks.forEach(function(element, index, array) {
        //     listView.appendChild(timeTrackerListItem(element));
        // });
        // timeTrackerDiv.appendChild(listView);
        // $(document).trigger('create');
    }
    // *** Public API
    return {
        displayTimeTracker: displayTimeTracker
    };
}());