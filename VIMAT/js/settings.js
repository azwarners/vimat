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

VIMAT.namespace("VIMAT.SETTINGS.LISTOFLISTS");
VIMAT.SETTINGS.LISTOFLISTS = (function () {
    // *** Private Properties
    var currentListName = 'Groceries',
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
        var l = VIMAT.MODEL.LISTOFLISTS.listOfLists.getNumberOfLists(),
            i;
        currentListName = ln;
        for (i = 0; i < l; i++) {
            if (VIMAT.MODEL.LISTOFLISTS.listOfLists.getListNameAt(i) === ln) {
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

VIMAT.namespace("VIMAT.SETTINGS.TASKLIST");
VIMAT.SETTINGS.TASKLIST = (function () {
    // *** Private Properties
    var displayed = false;
    
    // *** Private Methods
    function getDisplayed() {
        return displayed;
    }
    function setDisplayed(b) {
        displayed = b;
    }
    
    // *** Public API
    return {
        getDisplayed:           getDisplayed,
        setDisplayed:           setDisplayed
    };
}());