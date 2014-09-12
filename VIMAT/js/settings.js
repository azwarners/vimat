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

// Root Namespace
var VIMAT = VIMAT || {};

// Create the namespace for the task list
createNS("VIMAT.SETTINGS");
 
VIMAT.SETTINGS.general = ( function () {
    // private variables
    var taskListIsDisplayed = false;
    
    // private methods
    var getTaskListIsDisplayed = function(){
        return taskListIsDisplayed;
    };
    var setTaskListIsDisplayed = function(t){
        taskListIsDisplayed = t;
    };
    // public API
    return {
        getTaskListIsDisplayed: getTaskListIsDisplayed,
        setTaskListIsDisplayed: setTaskListIsDisplayed
    };
}) ();