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

// General
VIMAT.namespace = function (ns_string) {
    var parts = ns_string.split('.'), parent = VIMAT, i;
        
    if (parts[0] === "VIMAT") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

VIMAT.namespace('VIMAT.UTILITIES');

VIMAT.UTILITIES = (function () {
    // *** Private method
    var msInHour = 1000 * 60 * 60;
    var msInDay = msInHour * 24;
    var msInWeek = msInDay * 7;
    var msInYear = msInDay * 365;
    var msInMonth = msInYear / 12;
    
    function msToHours(ms) {
        return ms / msInHour;
    }
    function isNotInArray(o, a) {
        var l, i;
        if (a) {
            l = a.length;
        }
        for (i = 0; i < l; i++) {
            if (a[i] === o) {
                return false;
            }
        }
        return true;
    }
    function isInArray(o, a) {
        var l, i;
        if (a) {
            l = a.length;
        }
        for (i = 0; i < l; i++) {
            if (a[i] === o) {
                return true;
            }
        }
        return false;
    }
    function removeEmptyStrings(a) {
        var returnArray = [];
        a.forEach (function (item, i, array) {
            if (item !== '' && item !== undefined) {
                returnArray.push(item);
            }
        });
        return returnArray;
    }
    function appendChildren(nodeId, children) {
        var i, child, node = document.getElementById(nodeId);
        for (i = 1; i < arguments.length; i++) {
            child = arguments[i];
            if (typeof child === "string") {
                child = document.createTextNode(child);
            }
        node.appendChild(child);
        }
    }
    function addEventListenerList(list, event, fn) {
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].addEventListener(event, fn, false);
        }
    }
    function sortArrayOfObjectsByProperty(ao, p) {
        ao.sort(function (a, b) {
          if (a[p] > b[p]) {
            return 1;
          }
          if (a[p] < b[p]) {
            return -1;
          }
          return 0;
        });        
    }
    function isSubContextOfContext(folder, context) {
        var folderSubParts,
            contextSubParts = context.split('/'),
            newFolder, newContext, isSubFolder;

        if (!(folder)) {
            return false;
        }
        folderSubParts = folder.split('/');
        if (context === '' || context === '/') {
            return true;
        }
        if (folderSubParts.length > 1 && contextSubParts.length > 1) {
            if (folderSubParts[0] === contextSubParts[0]) {
                contextSubParts.splice(0, 1);
                folderSubParts.splice(0, 1);
                newFolder = folderSubParts.join('/');
                newContext = contextSubParts.join('/');
                isSubFolder = isSubContextOfContext(newFolder, newContext);
            } else {
                isSubFolder = false;
            }
        }
        else if (folderSubParts.length > 1 && contextSubParts.length === 1) {
            if (folderSubParts[0] === contextSubParts[0]) {
                isSubFolder = true;
            }
            else {
                isSubFolder = false;
            }
        }
        return isSubFolder;
    }
    function isChildOfContext(folder, context) {
        var folderSubParts = folder.split('/'),
            contextSubParts = context.split('/');
        
        if (context === '' || context === '/') {
            contextSubParts = [];
        }
        if ( (isSubContextOfContext(folder, context)) &&
                (folderSubParts.length === contextSubParts.length + 1) ) {
            return true;
        }
        else{
            return false;
        }
    }
    function vimatToString(obj) {
        var i, l, string = '', key = '', stringKeyObject,
            propArray = Object.keys(obj);
                
        l = propArray.length;
        for (i = 0; i < l; i++) {
            string += obj[propArray[i]] + '|';
            key += propArray[i] + '|';
        }
        l = string.length;
        string = string.substring(0, l - 1);
        l = key.length;
        key = key.substring(0, l - 1);
        stringKeyObject = {
            'string':   string,
            'key':      key
        };
        
        return stringKeyObject;
    }
    function vimatFromString(stringKeyObject) {
        var string = stringKeyObject.string,
            key = stringKeyObject.key,
            objProperties = key.split('|'),
            propValues = string.split('|'),
            obj = {}, i, l = objProperties.length;
        
        if (!(propValues.length === objProperties.length)) {
            // return -1 for mismatch between key and string
            return -1;
        }    
        for (i = 0; i < l; i++) {
            obj[objProperties[i]] = propValues[i];
        }
        
        return obj;
    }
    
    // *** Public API
    return {
        msToHours:                      msToHours,
        msInHour:                       msInHour,
        msInDay:                        msInDay,
        msInWeek:                       msInWeek,
        msInMonth:                      msInMonth,
        msInYear:                       msInYear,
        isNotInArray:                   isNotInArray,
        isInArray:                      isInArray,
        appendChildren:                 appendChildren,
        addEventListenerList:           addEventListenerList,
        sortArrayOfObjectsByProperty:   sortArrayOfObjectsByProperty,
        isSubContextOfContext:          isSubContextOfContext,
        isChildOfContext:               isChildOfContext,
        removeEmptyStrings:             removeEmptyStrings,
        vimatToString:                  vimatToString,
        vimatFromString:                vimatFromString
    };
}());