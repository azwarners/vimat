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

VIMAT.namespace("VIMAT.ARRAY");

/*  Requires:
    (None)
*/

VIMAT.ARRAY = (function () {
    // *** Private Methods
    
    // *** Public Methods
    function isNotInArray(object, array) {
        if (!(isInArray(object, array))) {
            return true;
        }

        return false;
    }
    function isInArray(object, array) {
        array.forEach(function(element, index, array) {
            if (element === object) {
                return true;
            }
        });

        return false;
    }
    function sortObjectsByProperty(array, prop) {
        array.sort(function (a, b) {
          if (a[prop] > b[prop]) {
            return 1;
          }
          if (a[prop] < b[prop]) {
            return -1;
          }
          return 0;
        });        
    }
    function getUniqueValuesOfProperty(array, prop) {
        var uniquePropVals = [], notInArray, undefinedPropValsExist,
            uniquePropValsObject = {};
        
        array.forEach(function(element, index, array) {
            if (element[prop] === '' || element[prop] === 'undefined' ||
                    element[prop] === null  || !(element[prop])) {
                undefinedPropValsExist = true;
            }
            else {
                notInArray = isNotInArray(element[prop], uniquePropVals);
                if (notInArray) {
                    uniquePropVals.push(element[prop]);
                }
            }
        });
        if (undefinedPropValsExist) {
            uniquePropValsObject['undefinedPropValsExist'] = undefinedPropValsExist;
        }
        uniquePropValsObject['uniquePropVals'] = uniquePropVals;
        
        return uniquePropValsObject;
    }
    function objectsWithMissingProperties(array, prop) {
        var objects = [];
        
        array.forEach(function(element, index, array) {
            if (element[prop] === '' || element[prop] === null || !(element[prop])) {
                objects.push(element);
            }
        });
        
        return objects;
    }
    function getObjectsByPropertyValue(array, prop, val) {
        var objects;

        array.forEach(function(element, index) {
            if (element[prop] === val) {
                objects.push(element)
            }
        });
        
        return objects;
    }

    // *** Public API
    return {
        isInArray:                      isInArray,
        isNotInArray:                   isNotInArray,
        sortObjectsByProperty:          sortObjectsByProperty,
        getUniqueValuesOfProperty:      getUniqueValuesOfProperty,
        objectsWithMissingProperties:   objectsWithMissingProperties,
        getObjectsByPropertyValue:      getObjectsByPropertyValue
    };
}());