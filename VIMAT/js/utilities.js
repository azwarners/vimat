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
    var parts = ns_string.split('.'),
        parent = VIMAT,
        i;
        
    // strip redundant leading global
    if (parts[0] === "VIMAT") {
        parts = parts.slice(1);
    }
    
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

VIMAT.namespace('VIMAT.UTILITIES');

VIMAT.UTILITIES.isArray = (function (myArray) {
    // This one appears to be broken. Maybe it can be fixed.
    // http://www.w3schools.com/js/js_arrays.asp
    // return myArray.constructor.toString().indexOf("Array") > -1;
}());

VIMAT.namespace('VIMAT.UTILITIES.MISC');
VIMAT.UTILITIES.MISC = (function () {
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

    // *** Public API
    return {
        isNotInArray:           isNotInArray,
        isInArray:              isInArray
    };
}());

// View
// function returnCheckBoxMarkup(onChange, checkBoxId, checked) {
//     var h = '<input type="checkbox" ';
//     h += 'onchange="' + onChange + '" ';
//     h += 'id="' + checkBoxId + '"';
//     if (checked) {
//         h += ' checked';
//     }
//     h += '>';
//     return (h);
// }
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
VIMAT.UTILITIES.buildSelectTagFromList = (function (list, selected, id, onchange) {
    var l,
        h = '<select id="' + id + '" onchange="' + onchange + '"><option value="',
        i;
    if (typeof list === 'object') {
        l = list.length;
        for (i = 0; i < l; i++) {
            h += l[i] + '"';
            if (l[i] === selected) {
                h += ' selected';
            }
            h += '>' + l[i] + '"</option><option value="';
        }
    }
    h += '</select>';
    return h;
}());
VIMAT.UTILITIES.createHTMLChecklistFromVimatList = (function (list) {

}());