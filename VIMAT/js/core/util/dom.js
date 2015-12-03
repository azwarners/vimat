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

VIMAT.namespace('VIMAT.DOM');

/*
    Requires:
    (None)
*/

VIMAT.DOM = (function () {
    function ele(type) {
        /*
         *  Thanks to Marijn Haverbeke, the Eloquent Javascripter
         *  "The following example defines a utility elt, which creates an element
         *   node and treats the rest of its arguments as children to that node."
         *  Chapter 13, eloquentjavascript.net
         *  MIT license
         */
        var i, child, node = document.createElement(type);
        for (i = 1; i < arguments.length; i++) {
            child = arguments[i];
            if (typeof child === "string") {
                child = document.createTextNode(child);
            }
        node.appendChild(child);
        }
        return node;
    }
    function empty(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    
    return {
        ele:    ele,
        empty:  empty
    };
}());