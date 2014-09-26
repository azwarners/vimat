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

VIMAT.namespace("VIMAT.HTM");

VIMAT.HTM.listOfListsTool = (function () {
    var h = '<input id="newListInput" type="text" placeholder="Name of new list">';
    h += '<button onclick="newListButtonClicked()">Add<br/>List</button>';
    h += '<h3>Choose a list: ';
    h += VIMAT.UTILITIES.VIEW.buildSelectTagFromList(
            VIMAT.MODEL.LISTOFLISTS.listOfLists.getListOfListNames(),
            VIMAT.SETTINGS.LISTOFLISTS.getCurrentListName(), "listSelect",
            "currentListChanged()");
    h += '<input id="newItemInput" type="text" placeholder="New item for: ';
    h += VIMAT.SETTINGS.LISTOFLISTS.getCurrentListName() + '">';
    h += '<button onclick="newItemButtonClicked()">Add<br/>Item</button>';
    h += '<br/><div id="listOfListsListDiv></div>';
    return h;
});