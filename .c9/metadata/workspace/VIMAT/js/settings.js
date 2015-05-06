{"filter":false,"title":"settings.js","tooltip":"/VIMAT/js/settings.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":138,"column":5},"action":"remove","lines":["/*","\t******************************************************************","\t Copyright 2013 Nicholas Warner","","\t This file is part of vimat.","","    vimat is free software: you can redistribute it and/or modify","    it under the terms of the GNU General Public License as published by","    the Free Software Foundation, either version 3 of the License, or","    (at your option) any later version.","","    vimat is distributed in the hope that it will be useful,","    but WITHOUT ANY WARRANTY; without even the implied warranty of","    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the","    GNU General Public License for more details.","","    You should have received a copy of the GNU General Public License","    along with vimat.  If not, see <http://www.gnu.org/licenses/>.","\t******************************************************************","*/","","var VIMAT = VIMAT || {};","","VIMAT.namespace(\"VIMAT.SETTINGS\");","VIMAT.SETTINGS.listOfLists = (function () {","    // *** Private Properties","    var currentListName = '',","        currentListIndex = 0,","        displayed = false;","    ","    // *** Private Methods","    function getCurrentListName() {","        return currentListName;","    }","    function getCurrentListIndex() {","        return currentListIndex;","    }","    function setCurrentListName(ln) {","        var l = VIMAT.MODEL.LISTS.listOfLists.getNumberOfLists(),","            i;","        currentListName = ln;","        for (i = 0; i < l; i++) {","            if (VIMAT.MODEL.LISTS.listOfLists.getListNameAt(i) === ln) {","                currentListIndex = i;","            }","        }","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    ","    // *** Public API","    return {","        getCurrentListName:     getCurrentListName,","        setCurrentListName:     setCurrentListName,","        getCurrentListIndex:    getCurrentListIndex,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed","    };","}());","VIMAT.SETTINGS.taskList = (function () {","    // *** Private Properties","    var displayed = false;","    var nextIdSuffix = 0;","    ","    // *** Private Methods","    function getStateString() {","        var s = displayed + '|';","        s += nextIdSuffix;","        return s;","    }","    function setStateFromString(s) {","        var settingsProperties = [];","        settingsProperties = s.split('|');","        displayed = (settingsProperties[0] === 'true');","        nextIdSuffix = settingsProperties[1];","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    function getNextId() {","        var nid = 't' + nextIdSuffix; // add userID prefix","        nextIdSuffix++;","        return nid;","    }","    ","    // *** Public API","    return {","        getStateString:         getStateString,","        setStateFromString:     setStateFromString,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed,","        getNextId:              getNextId","    };","}());","VIMAT.SETTINGS.projects = (function () {","    // *** Private Properties","    var displayed = false;","    var nextIdSuffix = 0;","    ","    // *** Private Methods","    function getStateString() {","        var s = displayed + '|';","        s += nextIdSuffix;","        return s;","    }","    function setStateFromString(s) {","        var settingsProperties = [];","        settingsProperties = s.split('|');","        displayed = (settingsProperties[0] === 'true');","        nextIdSuffix = settingsProperties[1];","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    function getNextId() {","        var nid = 'p' + nextIdSuffix; // add userID prefix","        nextIdSuffix++;","        return nid;","    }","    ","    // *** Public API","    return {","        getStateString:         getStateString,","        setStateFromString:     setStateFromString,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed,","        getNextId:              getNextId","    };","}());"]},{"start":{"row":0,"column":0},"end":{"row":205,"column":7},"action":"insert","lines":["/*","\t******************************************************************","\t Copyright 2013 Nicholas Warner","","\t This file is part of vimat.","","    vimat is free software: you can redistribute it and/or modify","    it under the terms of the GNU General Public License as published by","    the Free Software Foundation, either version 3 of the License, or","    (at your option) any later version.","","    vimat is distributed in the hope that it will be useful,","    but WITHOUT ANY WARRANTY; without even the implied warranty of","    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the","    GNU General Public License for more details.","","    You should have received a copy of the GNU General Public License","    along with vimat.  If not, see <http://www.gnu.org/licenses/>.","\t******************************************************************","*/","","var VIMAT = VIMAT || {};","","VIMAT.namespace(\"VIMAT.SETTINGS\");","VIMAT.SETTINGS.listOfLists = (function () {","    // *** Private Properties","    var currentListName = '',","        currentListIndex = 0,","        displayed = false;","    ","    // *** Private Methods","    function getCurrentListName() {","        return currentListName;","    }","    function getCurrentListIndex() {","        return currentListIndex;","    }","    function setCurrentListName(ln) {","        var l = VIMAT.lol.getNumberOfLists(),","            i;","        currentListName = ln;","        for (i = 0; i < l; i++) {","            if (VIMAT.lol.getListNameAt(i) === ln) {","                currentListIndex = i;","            }","        }","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    ","    // *** Public API","    return {","        getCurrentListName:     getCurrentListName,","        setCurrentListName:     setCurrentListName,","        getCurrentListIndex:    getCurrentListIndex,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed","    };","}());","VIMAT.SETTINGS.taskList = (function () {","    // *** Private Properties","    var displayed = false;","    var nextIdSuffix = 0;","    var taskIdCurrentEdit = 0;","    var groupBy = 'none';","    var sortBy = 'dueDate';","    ","    // *** Private Methods","    function getTaskIdCurrentEdit () {","        return taskIdCurrentEdit;","    }","    function setTaskIdCurrentEdit (i) {","        taskIdCurrentEdit = i;","    }","    function getStateString() {","        var s = groupBy + '|';","        s += sortBy + '|';","        s += nextIdSuffix;","        return s;","    }","    function setStateFromString(s) {","        var settingsProperties = [];","        settingsProperties = s.split('|');","        groupBy = settingsProperties[0];","        sortBy = settingsProperties[1];","        nextIdSuffix = settingsProperties[2];","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    function getGroupBy() {","        return groupBy;","    }","    function setGroupBy(g) {","        groupBy = g;","    }","    function getSortBy() {","        return sortBy;","    }","    function setSortBy(s) {","        sortBy = s;","    }","    function getNextId() {","        var nid = 't' + nextIdSuffix; // add userID prefix","        nextIdSuffix++;","        return nid;","    }","    ","    // *** Public API","    return {","        getTaskIdCurrentEdit:   getTaskIdCurrentEdit,","        setTaskIdCurrentEdit:   setTaskIdCurrentEdit,","        getStateString:         getStateString,","        setStateFromString:     setStateFromString,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed,","        getGroupBy:             getGroupBy,","        setGroupBy:             setGroupBy,","        getSortBy:              getSortBy,","        setSortBy:              setSortBy,","        getNextId:              getNextId","    };","}());","/*VIMAT.SETTINGS.history = (function () {","    // *** Private Properties","    var displayed = false;","    var nextIdSuffix = 0;","    ","    // *** Private Methods","    function getStateString() {","        var s = displayed + '|';","        s += nextIdSuffix;","        return s;","    }","    function setStateFromString(s) {","        var settingsProperties = [];","        settingsProperties = s.split('|');","        displayed = (settingsProperties[0] === 'true');","        nextIdSuffix = settingsProperties[1];","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    function getNextId() {","        var nid = 't' + nextIdSuffix; // add userID prefix","        nextIdSuffix++;","        return nid;","    }","    ","    // *** Public API","    return {","        getStateString:         getStateString,","        setStateFromString:     setStateFromString,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed,","        getNextId:              getNextId","    };","}());","VIMAT.SETTINGS.projects = (function () {","    // *** Private Properties","    var displayed = false;","    var nextIdSuffix = 0;","    ","    // *** Private Methods","    function getStateString() {","        var s = displayed + '|';","        s += nextIdSuffix;","        return s;","    }","    function setStateFromString(s) {","        var settingsProperties = [];","        settingsProperties = s.split('|');","        displayed = (settingsProperties[0] === 'true');","        nextIdSuffix = settingsProperties[1];","    }","    function getDisplayed() {","        return displayed;","    }","    function setDisplayed(b) {","        displayed = b;","    }","    function getNextId() {","        var nid = 'p' + nextIdSuffix; // add userID prefix","        nextIdSuffix++;","        return nid;","    }","    ","    // *** Public API","    return {","        getStateString:         getStateString,","        setStateFromString:     setStateFromString,","        getDisplayed:           getDisplayed,","        setDisplayed:           setDisplayed,","        getNextId:              getNextId","    };","}());*/"]}]}]]},"ace":{"folds":[{"start":{"row":0,"column":2},"end":{"row":19,"column":0},"placeholder":"..."},{"start":{"row":24,"column":43},"end":{"row":62,"column":0},"placeholder":"..."}],"scrolltop":420,"scrollleft":0,"selection":{"start":{"row":105,"column":5},"end":{"row":105,"column":5},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":80,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1429979710000,"hash":"30c4cf523d1000cf22bc89e26f8c8df0077e526a"}