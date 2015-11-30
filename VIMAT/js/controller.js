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
        VIMAT.DB.loadTimeTracker();
        VIMAT.DB.loadListOfLists();
        VIMAT.DB.loadSettings();
        VIMAT.DB.loadHistory();
    }

    // *** Public

    // *** Initialize
    VIMAT.tl = new VIMAT.MODEL.TASKS.taskList();
    loadData();
    VIMAT.TASKLIST.CONTROLLER.applyTaskListSettings();
    VIMAT.tl.addStatToTasks();
    VIMAT.VIEW.TASKS.displayTaskList();
    VIMAT.TASKEDIT.VIEW.displayTasks(VIMAT.tl.getAllTasks());
    VIMAT.TASKLIST.CONTROLLER.addEventListeners();
    VIMAT.TIMETRACKER.VIEW.displayTimeTracker(VIMAT.tl.getAllTasks());
    VIMAT.TIMETRACKER.VIEW.displayTimeTrackerStats();
    VIMAT.TIMETRACKER.CONTROLLER.addEventListeners();
    $(document).trigger('create');
    // console.log(VIMAT.CONTEXT.isSubContextOfContext('pictures/wallpaper/nerdy', 'pictures/wallpaper'));

    // Public API
    return {
        // initialize: initialize
    };
}());



    /*  function initialize(){
    //     // All of this code is executed after the page has loaded
    //     VIMAT.tl = new VIMAT.MODEL.TASKS.taskList();
    //     loadData();
    //     VIMAT.TASKLIST.CONTROLLER.applyTaskListSettings();
    //     VIMAT.tl.addStatToTasks();
    //     VIMAT.VIEW.TASKS.displayTaskList();
    //     VIMAT.TASKEDIT.VIEW.displayTasks(VIMAT.tl.getAllTasks());
    //     VIMAT.TASKLIST.CONTROLLER.addEventListeners();
    //     VIMAT.TIMETRACKER.VIEW.displayTimeTracker(VIMAT.tl.getAllTasks());
    //     VIMAT.TIMETRACKER.CONTROLLER.addEventListeners();
    //     $(document).trigger('create');
    // }
    */