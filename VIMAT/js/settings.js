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

VIMAT.namespace("VIMAT.SETTINGS");
VIMAT.SETTINGS.mobile = false;
VIMAT.SETTINGS.listOfLists = (function () {
    // *** Private Properties
    var currentListName = '',
        currentListIndex = 0,
        displayed = false;
    
    // *** Private Methods
    function getCurrentListName() {
        return currentListName;
    }
    function getCurrentListIndex() {
        return currentListIndex;
    }
    function setCurrentListName(ln) {
        var l = VIMAT.lol.getNumberOfLists(),
            i;
        currentListName = ln;
        for (i = 0; i < l; i++) {
            if (VIMAT.lol.getListNameAt(i) === ln) {
                currentListIndex = i;
            }
        }
    }
    function getDisplayed() {
        return displayed;
    }
    function setDisplayed(b) {
        displayed = b;
    }
    
    // *** Public API
    return {
        getCurrentListName:     getCurrentListName,
        setCurrentListName:     setCurrentListName,
        getCurrentListIndex:    getCurrentListIndex,
        getDisplayed:           getDisplayed,
        setDisplayed:           setDisplayed
    };
}());
VIMAT.SETTINGS.taskList = (function () {
    // *** Private Properties
    var displayed = false;
    var nextIdSuffix = 0;
    var taskIdCurrentEdit = 0;
    var groupBy = 'none';
    var sortBy = 'dueDate';
    var stat = 'hoursSinceCompletion';
    
    // *** Private Methods
    function getStat() {
        return stat;
    }
    function setStat(s) {
        stat = s;
    }
    function getTaskIdCurrentEdit () {
        return taskIdCurrentEdit;
    }
    function setTaskIdCurrentEdit (i) {
        taskIdCurrentEdit = i;
    }
    function getStateString() {
        var s = groupBy + '|';
        s += sortBy + '|';
        s += nextIdSuffix;
        return s;
    }
    function setStateFromString(s) {
        var settingsProperties = [];
        settingsProperties = s.split('|');
        groupBy = settingsProperties[0];
        sortBy = settingsProperties[1];
        nextIdSuffix = settingsProperties[2];
    }
    function getDisplayed() {
        return displayed;
    }
    function setDisplayed(b) {
        displayed = b;
    }
    function getGroupBy() {
        return groupBy;
    }
    function setGroupBy(g) {
        groupBy = g;
    }
    function getSortBy() {
        return sortBy;
    }
    function setSortBy(s) {
        sortBy = s;
    }
    function getNextId() {
        var nid = 't' + nextIdSuffix; // add userID prefix
        nextIdSuffix++;
        return nid;
    }
    
    // *** Public API
    return {
        getTaskIdCurrentEdit:   getTaskIdCurrentEdit,
        setTaskIdCurrentEdit:   setTaskIdCurrentEdit,
        getStateString:         getStateString,
        setStateFromString:     setStateFromString,
        getDisplayed:           getDisplayed,
        setDisplayed:           setDisplayed,
        getGroupBy:             getGroupBy,
        setGroupBy:             setGroupBy,
        getSortBy:              getSortBy,
        setSortBy:              setSortBy,
        getNextId:              getNextId
    };
}());
/*VIMAT.SETTINGS.history = (function () {
    // *** Private Properties
    var displayed = false;
    var nextIdSuffix = 0;
    
    // *** Private Methods
    function getStateString() {
        var s = displayed + '|';
        s += nextIdSuffix;
        return s;
    }
    function setStateFromString(s) {
        var settingsProperties = [];
        settingsProperties = s.split('|');
        displayed = (settingsProperties[0] === 'true');
        nextIdSuffix = settingsProperties[1];
    }
    function getDisplayed() {
        return displayed;
    }
    function setDisplayed(b) {
        displayed = b;
    }
    function getNextId() {
        var nid = 't' + nextIdSuffix; // add userID prefix
        nextIdSuffix++;
        return nid;
    }
    
    // *** Public API
    return {
        getStateString:         getStateString,
        setStateFromString:     setStateFromString,
        getDisplayed:           getDisplayed,
        setDisplayed:           setDisplayed,
        getNextId:              getNextId
    };
}());
VIMAT.SETTINGS.projects = (function () {
    // *** Private Properties
    var displayed = false;
    var nextIdSuffix = 0;
    
    // *** Private Methods
    function getStateString() {
        var s = displayed + '|';
        s += nextIdSuffix;
        return s;
    }
    function setStateFromString(s) {
        var settingsProperties = [];
        settingsProperties = s.split('|');
        displayed = (settingsProperties[0] === 'true');
        nextIdSuffix = settingsProperties[1];
    }
    function getDisplayed() {
        return displayed;
    }
    function setDisplayed(b) {
        displayed = b;
    }
    function getNextId() {
        var nid = 'p' + nextIdSuffix; // add userID prefix
        nextIdSuffix++;
        return nid;
    }
    
    // *** Public API
    return {
        getStateString:         getStateString,
        setStateFromString:     setStateFromString,
        getDisplayed:           getDisplayed,
        setDisplayed:           setDisplayed,
        getNextId:              getNextId
    };
}());*/