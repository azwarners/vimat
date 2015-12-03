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

VIMAT.namespace('VIMAT.COMPOSITE');

/*
    Requires:
    (None)
*/

VIMAT.COMPOSITE = (function () {
    // *** Private
    
    // *** Public Functions
    
    /* Constructor for new composite objects:
        When constructing a new hierarchy the first node should be the root.
        Name and optional id should be passed in as parameters.
        Children stored in the array should also be Node objects so they inherit all
            of the same methods.    */
    function Node(name, id) {
        this.name = name;
        if (id) {
            this.id = id;
        }
        this.children = [];
    }
    Node.prototype.getImmediateChildrensNames = function() {
        var names = [];
        
        this.children.forEach(function(element, index, array) {
            names.push(element.name);
        });

        return names;
    };
    Node.prototype.getAllDescendantsNames = function() {
        var names = [];
        
        this.children.forEach(function(element, index, array) {
            names.push(element.name);
        });
        names.concat(this.children.getAllDescendantsNames());
        
        return names;
    };
    
    return {
        Node:   Node
    };
}());