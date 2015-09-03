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

VIMAT.namespace("VIMAT.TIMETRACKER.CONTROLLER");

VIMAT.TIMETRACKER.CONTROLLER = (function () {
    // *** Private
    function toggleTrackedTime(taskId) {
        VIMAT.TIMETRACKER.toggleTimeTracker(taskId);
        VIMAT.TIMETRACKER.VIEW.displayTimeTracker(VIMAT.tl.getAllTasks());
        VIMAT.TIMETRACKER.CONTROLLER.addEventListeners();
    }
    
    // *** Event Listener Handlers
    function toggleTimeTracker(event) {
        var eventTarget = event.currentTarget,
            liId = eventTarget.id,
            taskId = liId.replace('tt', '');
            
        toggleTrackedTime(taskId);
        VIMAT.DB.saveTimeTracker();
        removeEventListeners();
        VIMAT.TIMETRACKER.VIEW.displayTimeTracker(VIMAT.tl.getAllTasks());
        addEventListeners();
    }

    // *** Event Listener Bindings
    function addTimeTrackerEventListeners() {
        $('.timeTrackerPunchButton').on('click', toggleTimeTracker);
    }
    function removeTimeTrackerEventListeners() {
        $('.timeTrackerPunchButton').off('click', toggleTimeTracker);
    }

    // *** Public functions
    function addEventListeners() {
        addTimeTrackerEventListeners();
    }
    function removeEventListeners() {
        removeTimeTrackerEventListeners();
    }

    // *** Public API
    return {
        addEventListeners:      addEventListeners,
        removeEventListeners:   removeEventListeners
    };
}());