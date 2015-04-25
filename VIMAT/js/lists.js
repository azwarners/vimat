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

// List of Lists
VIMAT.namespace("VIMAT.MODEL.LISTS");

// Model related functions
VIMAT.MODEL.LISTS.ListItem = function(d, c) {
    this.description = d;
    if (c) {
        this.checked = c;
    }
    else {
        this.checked = false;
    }
};
VIMAT.MODEL.LISTS.ListItem.prototype = {
    getChecked:     function() {
        return this.checked;
    },
    setChecked:     function(newChecked) {
        this.checked = newChecked;
    },
    getDescription: function() {
        return this.description;
    },
    setDescription: function(newDescription) {
        this.description = newDescription;
    }
};

VIMAT.MODEL.LISTS.List = function(n) {
    this.arrayContent = [];
    this.name = n;
    this.keepItemsAfterCheckedOff = true;
    this.trashCan = [];
};
VIMAT.MODEL.LISTS.List.prototype = {
    getName:                        function() {
        return this.name;
    },
    setName:                        function(n) {
        this.name = n;
    },
    getKeepItemsAfterCheckedOff:    function() {
        return this.keepItemsAfterCheckedOff;
    },
    setKeepItemsAfterCheckedOff:    function(b) {
        this.keepItemsAfterCheckedOff = b;
    },
    setCheckedAll:                  function(b) {
        var i, l = this.arrayContent.length;
        for (i = 0; i < l; i++) {
            this.arrayContent[i].setChecked(b);
        }
    },
    getListItemAt:                  function(index) {
        return this.arrayContent[index];
    },
    removeListItemAt:               function(index) {
        this.trashCan.push(this.arrayContent[index]);
        this.arrayContent.splice(index, 1);
    },
    addListItem:                    function(li) {
        this.arrayContent.push(li);
    },
    deleteOrRestoreTrash:           function() {
        var i, l = this.trashCan.length;
        for (i = 0; i < l; i++) {
            if (this.keepItemsAfterCheckedOff) {
                this.arrayContent.push(this.trashCan[i]);
                this.trashCan.splice(i, 1);
            }
            else {
                this.trashCan.splice(i, 1);
            }
        }
    },
    moveCheckedItemsToTrash:        function() {
        var i, l = this.arrayContent.length;
        for (i = 0; i < l; i++) {
            if (this.arrayContent[i].getChecked()) {
                this.removeListItemAt(i);
            }
        }
    },
    getLength:                      function() {
        return this.arrayContent.length;
    }
};

VIMAT.MODEL.LISTS.listOfLists = (function () {
    // *** Dependencies

    // *** Private Properties
    var arrayContent = [];

    // *** Private methods
    function addList(vimatList) {
        arrayContent.push(vimatList);
    }
    function addItemToCurrentList(li) {
        arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].addListItem(li);
    }
    function getListAt(index) {
        return arrayContent[index];
    }
    function getListNameAt(index) {
        return arrayContent[index].getName();
    }
    function removeListAt(index) {
        arrayContent.splice(index, 1);
    }
    function getNumberOfLists() {
        return arrayContent.length;
    }
    function getListOfListNames() {
        var l = arrayContent.length,
            loln = [],
            i;
        for (i = 0; i < l; i++) {
            loln.push(arrayContent[i].getName());
        }
        return loln;
    }
    function getListByListName(ln) {
        var l = arrayContent.length,
            i,
            list;
        for (i = 0; i < l; i++) {
            if (arrayContent[i].getName() === ln) {
                list = arrayContent[i];
            }
        }
        return list;
    }
    function toggleCheckStateOfItemInCurrentListById(id) {
        if (arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).getChecked()) {
            arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).unCheck();
        }
        else {
            arrayContent[VIMAT.SETTINGS.listOfLists.getCurrentListIndex()].getListItemAt(id).unCheck();
        }
    }
    
    // *** Initialization

    // *** Public API
    return {
        addList:                                    addList,
        addItemToCurrentList:                       addItemToCurrentList,
        getListAt:                                  getListAt,
        getListNameAt:                              getListNameAt,
        removeListAt:                               removeListAt,
        getNumberOfLists:                           getNumberOfLists,
        getListOfListNames:                         getListOfListNames,
        getListByListName:                          getListByListName,
        toggleCheckStateOfItemInCurrentListById:    toggleCheckStateOfItemInCurrentListById
    };
});

VIMAT.lol = new VIMAT.MODEL.LISTS.listOfLists();

// View related functions

VIMAT.namespace("VIMAT.VIEW.LISTS");

VIMAT.VIEW.LISTS.displayListOfListsTool = function() {
    document.getElementById('listOfListsTool').innerHTML = VIMAT.HTM.listOfListsTool();
};

VIMAT.VIEW.LISTS.hideListOfListsTool = function() {
    document.getElementById('listOfListsTool').innerHTML = '';
};

VIMAT.VIEW.LISTS.displayListByListName = function(ln) {
        var list = VIMAT.lol.getListByListName(ln),
            l, li,
            h = '',
            i;
        
         if (list) {
            l = list.getLength();
            if (l > 0) {
                for (i = 0; i < l; i++) {
                    li = list.getListItemAt(i);
                    h += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup("listItemCheckBoxChanged(event)",
                            ('lolcb' + i), li.getChecked() );
                    h += list.getListItemAt(i).getDescription() + '<br/>';
                }
                document.getElementById('listOfListsListDiv').innerHTML = h;
            }
        }
};

//VIMAT.VIEW.LISTS = function () {
//    // *** Private Methods
//    function displayListOfListsTool() {
//        document.getElementById('listOfListsTool').innerHTML =
//                VIMAT.HTM.listOfListsTool();
//    }
//    function hideListOfListsTool() {
//        document.getElementById('listOfListsTool').innerHTML = '';
//    }
//    function displayListByListName(ln) {
//        var list = VIMAT.MODEL.LISTS.listOfLists.getListByListName(ln),
//            l,
//            h = '',
//            i;
//        if (list) {
//            l = list.getLength();
//            if (l > 0) {
//                for (i = 0; i < l; i++) {
//                    h += VIMAT.UTILITIES.VIEW.getCheckBoxMarkup("listItemCheckBoxChanged(event)",
//                            ('lolcb' + i), list.getListItemAt(i).getChecked());
//                    h += list.getListItemAt(i).getDescription() + '<br/>';
//                }
//                document.getElementById('listOfListsListDiv').innerHTML = h;
//            }
//        }
//    }
//    
//    // *** Public API
//    return {
//        displayListOfListsTool: displayListOfListsTool,
//        hideListOfListsTool:    hideListOfListsTool,
//        displayListByListName:  displayListByListName
//    };
//};
