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

// Create the namespace for the data model
VIMAT.createNS("VIMAT.MODEL");
 
VIMAT.MODEL.Task = function(descr){
    // private variables
    
    var id              = 0,        // id will be assigned by a settings module (nextID)
        description     = descr,       // string describing the task
        finished        = false,    // boolean that is true when the task is completed
        dueDate         = '',       // string containing JSON Date for the due date
        context         = '',       // string for context (popular convention is to begin with '@')
        priority        = '',       // string for priority (importance)
        urgency         = '',       // string for urgency (how high is the fire to fight)
        repeating       = false,    // boolean telling whether or not the task repeats
        dueOrCompletion = 'd',      // string telling whether it repeats from due date ('d') or completion date ('c')
        repeatInterval  = 'd',      // string providing the repeating interval ('d', 'w', 'm', 'y')
        repeatFrequency = 1;        // number telling how many days, weeks, months or years pass before repeating

    // private methods
    var getId = function(){
        return id;
    };
    var getDescription = function(){
        return description;
    };
    var getFinished = function(){
        return finished;
    };
    var getDueDate = function(){
        return dueDate;
    };
    var getContext = function(){
        return context;
    };
    var getPriority = function(){
        return priority;
    };
    var getUrgency = function(){
        return urgency;
    };
    var getRepeating = function(){
        return repeating;
    };
    var getDueOrCompletion = function(){
        return dueOrCompletion;
    };
    var getRepeatInterval = function(){
        return repeatInterval;
    };
    var getRepeatFrequency = function(){
        return repeatFrequency;
    };
    
    // public API
    return {
        getId               : getId,
        getDescription      : getDescription,
        getFinished         : getFinished,
        getDueDate          : getDueDate,
        getContext          : getContext,
        getPriority         : getPriority,
        getUrgency          : getUrgency,
        getRepeating        : getRepeating,
        getDueOrCompletion  : getDueOrCompletion,
        getRepeatInterval   : getRepeatInterval,
        getRepeatFrequency  : getRepeatFrequency
    };
};
