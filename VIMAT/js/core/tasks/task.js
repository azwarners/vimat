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

VIMAT.namespace("VIMAT.MODEL.TASKS");

VIMAT.MODEL.TASKS.Task = function(d) {
    this.id = '';
    this.description = d;
    this.folder = '';
    this.finished = false;
    this.context = '';
    this.dueDate = (new Date()).toJSON();
    this.compass = 'Chores';
    this.priority = '';
    this.urgency = '';
    this.repeats = false;
    this.dueOrCompletion = '';
    this.frequency = 0;
    this.interval = '';
};

// refactor to utility
VIMAT.MODEL.TASKS.Task.prototype.toString = function () {
    var str = this.id;
    str += '|' + this.description;
    str += '|' + this.folder;
    str += '|' + this.finished;
    str += '|' + this.context;
    str += '|' + this.dueDate;
    str += '|' + this.compass;
    str += '|' + this.priority;
    str += '|' + this.urgency;
    str += '|' + this.repeats;
    str += '|' + this.dueOrCompletion;
    str += '|' + this.frequency;
    str += '|' + this.interval;
    return str;
};

VIMAT.MODEL.TASKS.Task.prototype.fromString = function (s) {
    var taskProperties = [];
    taskProperties = s.split('|');
    // 'finished' and 'repeats' are boolean and the expressions
    // that follow were used to store boolean values rather than strings
    this.id = taskProperties[0];
    this.description = taskProperties[1];
    this.folder = taskProperties[2];
    this.finished = (taskProperties[3] === 'true');
    this.context = taskProperties[4];
    this.dueDate = taskProperties[5];
    this.compass = taskProperties[6];
    this.priority = taskProperties[7];
    this.urgency = taskProperties[8];
    this.repeats = (taskProperties[9] === 'true');
    this.dueOrCompletion = taskProperties[10];
    this.frequency = taskProperties[11];
    this.interval = taskProperties[12];
};

VIMAT.MODEL.TASKS.Task.prototype.repeat = function () {
    var d;
    if (this.dueOrCompletion === 'd') {
        d = Date.parse(this.dueDate);
    }
    else {
        d = Date.parse(new Date());
    }
    if (this.interval === 'h') {
        d += this.frequency * VIMAT.UTILITIES.msInHour;
    }
    if (this.interval === 'd') {
        d += this.frequency * VIMAT.UTILITIES.msInDay;
    }
    if (this.interval === 'w') {
        d += this.frequency * VIMAT.UTILITIES.msInWeek;
    }
    if (this.interval === 'm') {
        d += this.frequency * VIMAT.UTILITIES.msInMonth;
    }
    if (this.interval === 'y') {
        d += this.frequency * VIMAT.UTILITIES.msInYear;
    }
    this.dueDate = (new Date(d)).toJSON();
    this.finished = false;
};

VIMAT.MODEL.TASKS.Task.prototype.isDue = function () {
    var d = (new Date()).toJSON();
    if (this.dueDate <= d) {
        return true;
    }
    return false;
};