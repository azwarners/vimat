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

// List of Lists
VIMAT.namespace("VIMAT.LISTS");

// Model related functions

VIMAT.LISTS = (function () {
    // *** Private
    var listOfLists = [];

    // *** Public
    function ListItem(d, c) {
        this.description = d;
        
        if (c) {
            this.checked = c;
        }
        else {
            this.checked = false;
        }
    }
    ListItem.prototype = {
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
    function List(n) {
        this.arrayContent = [];
        this.name = n;
        this.keepItemsAfterCheckedOff = true;
        this.trashCan = [];
    }
    List.prototype = {
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
    function addList(list) {
        listOfLists.push(list);
    }
    function getListAt(index) {
        return listOfLists[index];
    }
    function getListNameAt(index) {
        return listOfLists[index].getName();
    }
    function removeListAt(index) {
        listOfLists.splice(index, 1);
    }
    function getNumberOfLists() {
        return listOfLists.length;
    }
    function getListOfListNames() {
        var l = listOfLists.length,
            loln = [],
            i;
        for (i = 0; i < l; i++) {
            loln.push(listOfLists[i].getName());
        }
        return loln;
    }
    function getListByListName(ln) {
        var l = listOfLists.length,
            i,
            list;
        for (i = 0; i < l; i++) {
            if (listOfLists[i].getName() === ln) {
                list = listOfLists[i];
            }
        }
        return list;
    }

    
   // *** Public API
   return {
       ListItem:            ListItem,
       List:                List,
       addList:             addList,
       getListAt:           getListAt,
       getListNameAt:       getListNameAt,
       removeListAt:        removeListAt,
       getNumberOfLists:    getNumberOfLists,
       getListOfListNames:  getListOfListNames,
       getListByListName:   getListByListName
   };
}());