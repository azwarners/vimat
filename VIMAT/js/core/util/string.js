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

VIMAT.namespace('VIMAT.STRING');

/*
    Requires:
    (None)
*/

VIMAT.STRING = (function () {
    // *** Public
    function objectToStringKeyObject(obj) {
        var i, l, string = '', key = '', stringKeyObject,
            propArray = Object.keys(obj);
                
        l = propArray.length;
        for (i = 0; i < l; i++) {
            string += obj[propArray[i]] + '|';
            key += propArray[i] + '|';
        }
        l = string.length;
        string = string.substring(0, l - 1);
        l = key.length;
        key = key.substring(0, l - 1);
        stringKeyObject = {
            'string':   string,
            'key':      key
        };
        
        return stringKeyObject;
    }
    function objectFromStringKeyObject(stringKeyObject) {
        var string = stringKeyObject.string,
            key = stringKeyObject.key,
            objProperties = key.split('|'),
            propValues = string.split('|'),
            obj = {}, i, l = objProperties.length;
        
        if (!(propValues.length === objProperties.length)) {
            // return -1 for mismatch between key and string
            return -1;
        }    
        for (i = 0; i < l; i++) {
            obj[objProperties[i]] = propValues[i];
        }
        
        return obj;
    }
    function stringKeyObjectToString(stringKeyObject) {
        var string = '';
        
        // implementation
        
        return string;
    }
    function stringKeyObjectFromString(string) {
        var stringKeyObject = {};
        
        //  implementation
        //      stringKeyObject['string'] = 
        //      stringKeyObject['key'] = 
        
        return stringKeyObject;
    }

    // *** Public API
    return {
        objectToStringKeyObject:    objectToStringKeyObject,
        objectFromStringKeyObject:  objectFromStringKeyObject,
        stringKeyObjectToString:    stringKeyObjectToString,
        stringKeyObjectFromString:  stringKeyObjectFromString
    };
}());