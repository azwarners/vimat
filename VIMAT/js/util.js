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
 
// namespace creator
var createNS = ( function (namespace) {
    var nsparts = namespace.split(".");
    var parent = VIMAT;
    var i;
    var partname;
 
    // exclude the root namespace if it's there
    if (nsparts[0] === "VIMAT") {
        nsparts = nsparts.slice(1);
    }
 
    // iterate over nsparts and create nested namespaces if need be
    for (i = 0; i < nsparts.length; i++) {
        partname = nsparts[i];
        // declare undeclared namespace parts
        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }
        // reference to the deepest nested namespace in the structure
        parent = parent[partname];
    }
    
    // return the fully constructed namespace
    return parent;
}) ();

VIMAT.returnCheckBoxMarkup = ( function (onChange, checkBoxId, checked) {
    var h = '<input type="checkbox" ';
    h += 'onchange="' + onChange + '" ';
    h += 'id="' + checkBoxId + '"';
    if (checked){
        h += ' checked';
    }
    h += '>';
    return h;
}) ();
