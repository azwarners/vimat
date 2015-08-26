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

VIMAT.namespace("VIMAT.TASKEDIT.VIEW");

/*
    Requires:
    
    
*/

VIMAT.TASKEDIT.VIEW = (function () {
    // *** Private
    function taskEditorListItem(task) {
        // console.log(task.id);
        var liTop = task.description + ' ID:' + task.id,
            liMid = task.compass + ' ' + task.folder + ' ' + task.context,
            // taskDate = (task.dueDate === '' || task.dueDate === 'undefined') ? '' : task.dueDate,
            liBot = task.priority + ' ' + task.urgency + ' ' + task.dueDate +
                ' ' + task.repeats.toString() + ' ' + task.dueOrCompletion + ' ' +
                task.frequency.toString() + ' ' + task.interval,
            li = VIMAT.DOM.ele('li', liTop, VIMAT.DOM.ele('br'), liMid, VIMAT.DOM.ele('br'), liBot);

        li.setAttribute('id', 'edit' + task.id);
        li.setAttribute('class', 'taskEditorListItem');

        return li;
    }

    // *** Public
    function displayTasks(tasks) {
        var listView = VIMAT.DOM.ele('ul'),
            taskEditorList = document.getElementById('taskEditorDiv');
        
        listView.setAttribute('data-role', 'listview');
        $(taskEditorList).empty();
        tasks.forEach(function(element, index, array) {
            listView.appendChild(taskEditorListItem(element));
        });
        taskEditorList.appendChild(listView);
        $(document).trigger('create');
    }
    // *** Public API
    return {
        displayTasks:   displayTasks
    };
}());