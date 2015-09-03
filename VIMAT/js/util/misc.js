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

VIMAT.namespace('VIMAT.UTIL');

/*
    Requires:
    (None)
*/

VIMAT.UTIL = (function () {
    // *** Public
    function newId() {
        /*
            Creates an Ascii85 id
            Generates same level of uniqueness as hex with only 20 characters
                 instead of 32 characters in typical GUID/UUIDs
            The pipe is replaced with a colon because VIMAT uses the pipe as a
                separator in to/fromString functions
        */
        var id = '', index,
            characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&()*+-;<=>?@^_`{:}~";
            
        characters = characters.split("");
        for (var index = 0; index < 20; index++) {
            id += characters[Math.floor(Math.random() * 85)];
        }
    
        return id;
    }
    function log(text) {
        console.log(text);
    }
    function logProperties(jsObject, jsObjectName) {
        /*  Thanks to Mozilla for this one!
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
        */
        for (var prop in jsObject) {
            if (jsObject.hasOwnProperty(prop)) 
                log(jsObjectName + '.' + prop + ' = ' + jsObject[prop]);
        }    
    } 
    

    // *** Public API
    return {
        newId:          newId,
        log:            log,
        logProperties:  logProperties
    };
}());