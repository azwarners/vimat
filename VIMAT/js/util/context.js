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

VIMAT.namespace('VIMAT.CONTEXT');

/*
    Requires:
    (None)
*/

VIMAT.CONTEXT = (function () {
    // *** Private Functions
    
    // *** Public Functions
    function isSubContextOfContext(element, context) {
        var elementSubParts,
            contextSubParts = context.split('/'),
            newElement, newContext, isSubContext;

        if (!(element)) {
            return false;
        }
        elementSubParts = element.split('/');
        if (context === '' || context === '/') {
            return true;
        }
        if (elementSubParts.length > 1 && contextSubParts.length > 1) {
            if (elementSubParts[0] === contextSubParts[0]) {
                contextSubParts.splice(0, 1);
                elementSubParts.splice(0, 1);
                newElement = elementSubParts.join('/');
                newContext = contextSubParts.join('/');
                isSubContext = isSubContextOfContext(newElement, newContext);
            } else {
                isSubContext = false;
            }
        }
        else if (elementSubParts.length > 1 && contextSubParts.length === 1) {
            if (elementSubParts[0] === contextSubParts[0]) {
                isSubContext = true;
            }
            else {
                isSubContext = false;
            }
        }
        return isSubContext;
    }
    function isChildOfContext(element, context) {
        var elementSubParts, contextSubParts;
        
        if (element && context) {
            elementSubParts = element.split('/');
            contextSubParts = context.split('/');
            if (context === '' || context === '/') {
                contextSubParts = [];
            }
            if ( (isSubContextOfContext(element, context)) &&
                    (elementSubParts.length === contextSubParts.length + 1) ) {
                return true;
            }
            else{
                return false;
            }
        }
    }
    function childrenOfContext(arrayOfValues, context) {
        var children = [];
    
        arrayOfValues.forEach(function(element, index, array) {
            if (isChildOfContext(element, context)) {
                children.push(element);
            }
        });
        
        return children;
    }
    function isParentOfContext(element, context) {
        if (isChildOfContext(context, element)) {
            return true;
        }
        else {
            return false;
        }
    }
    function contextHasNoParent(array, context) {
        array.forEach(function(element, index, array) {
            if (isParentOfContext(element, context)) {
            console.log(element + ' is parent of ' + context);
                return false;
            }
        });
        return true;
    }
    function createParent(context) {
        var contextParts, length, index, parent = '';
        
        if (context) {
            contextParts = context.split('/');
            length = contextParts.length;
            for (index = 0; index < (length - 1); index++) {
                parent = parent + contextParts[index] + '/';
            }
            parent = parent.substr(0, parent.length - 1);
    
            return parent;
        }
    }
    function arrayHasOrphans(array) {
        var parent;
        
        array.forEach(function(element, index) {
            parent = createParent(element);
            if (VIMAT.ARRAY.isNotInArray(parent, array)) {
                return true;
            }
            // if (contextHasNoParent(array, element)) {
            //     return true;
            // }
        });
        
        return false;
    }
    function eliminateOrphans(array) {
        while (arrayHasOrphans(array)) {
            array.forEach(function(element, index) {
                if (contextHasNoParent(array, element)) {
                    array.push(createParent(element));
                }
            });
        }
        
        return array;
    }

    return {
        isSubContextOfContext:  isSubContextOfContext,
        isChildOfContext:       isChildOfContext,
        childrenOfContext:      childrenOfContext,
        contextHasNoParent:     contextHasNoParent,
        createParent:           createParent,
        arrayHasOrphans:        arrayHasOrphans,
        eliminateOrphans:       eliminateOrphans
        
    };
}());