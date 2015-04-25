/*
	******************************************************************
	 Copyright 2013 Nicholas Warner

	 This file is part of vimat.

    vimat is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    vimat is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with vimat.  If not, see <http://www.gnu.org/licenses/>.
	******************************************************************
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
    function element(type) {
        /*
         *  Thanks to Marijn Haverbeke, the Eloquent Javascripter
         *  "The following example defines a utility elt, which creates an element
         *   node and treats the rest of its arguments as children to that node."
         *  Chapter 13, eloquentjavascript.net
         *  MIT license
         */
        var i, child, node = document.createElement(type);
        for (i = 1; i < arguments.length; i++) {
            child = arguments[i];
            if (typeof child === "string") {
                child = document.createTextNode(child);
            }
        node.appendChild(child);
        }
        return node;
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
    function removeChildren(n) {
        while (n.firstChild) {
            n.removeChild(n.firstChild);
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
        var folderSubParts = folder.split('/'),
            contextSubParts = context.split('/'),
            newFolder, newContext, isSubFolder;

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

    // *** Public API
    return {
        isNotInArray:                   isNotInArray,
        isInArray:                      isInArray,
        element:                        element,
        appendChildren:                 appendChildren,
        removeChildren:                 removeChildren,
        addEventListenerList:           addEventListenerList,
        sortArrayOfObjectsByProperty:   sortArrayOfObjectsByProperty,
        isSubContextOfContext:          isSubContextOfContext,
        isChildOfContext:               isChildOfContext,
        removeEmptyStrings:             removeEmptyStrings
    };
}());

VIMAT.namespace('VIMAT.UTILITIES.VIEW');
VIMAT.UTILITIES.VIEW = (function () {
    // *** Private method
    function buildSelectTagFromList(list, selected, id, onchange) {
        var l, h, i;
        
        h = '<select id="' + id + '"';
        if (onchange) {
            h += ' onchange="' + onchange + '">';
        }
        else {
            h += '>';
        }
        if (typeof list === 'object') {
            l = list.length;
            for (i = 0; i < l; i++) {
                h += '<option value="' + list[i] + '"';
                if (list[i] === selected) {
                    h += ' selected';
                }
                h += '>' + list[i] + '</option>';
            }
        }
        h += '</select>';
        
        return h;
    }
    function getCheckBoxMarkup(onChange, checkBoxId, checked) {
        var h = '<input type="checkbox" ';
        h += 'onchange="' + onChange + '" ';
        h += 'id="' + checkBoxId + '"';
        if (checked) {
            h += ' checked';
        }
        h += '>';
        return h;
    }
    
    // *** Public API
    return {
        buildSelectTagFromList: buildSelectTagFromList,
        getCheckBoxMarkup:      getCheckBoxMarkup
    };
}());