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

VIMAT.namespace('VIMAT.JQM');

/*
    Requires:
    VIMAT.DOM.ele
*/

VIMAT.JQM = (function () {
    // *** Public
    function checklist(items) {
        var div = VIMAT.DOM.ele('div'),
            fieldset = VIMAT.DOM.ele('fieldset');
        
        div.setAttribute('class', 'ui-field-contain');
        fieldset.setAttribute('data-role', 'controlgroup');
        items.forEach(function(element, index, array) {
            fieldset.appendChild(element);
        });
        div.appendChild(fieldset);
        
        return div;
    }
    function checklistItem(checkListItemConfig) {
        var input, countSpan, item;
        
        input = VIMAT.DOM.ele('input');
        input.setAttribute('type', 'checkbox');
        input.checked = checkListItemConfig['checked'];
        if (checkListItemConfig['cssClass']) {
            input.setAttribute('class', checkListItemConfig['cssClass']);
        }
        if (checkListItemConfig['id']) {
            input.setAttribute('id', checkListItemConfig['id']);
        }
        if (checkListItemConfig['count'] && !(checkListItemConfig['count'] === 'NaN')) {
            countSpan = VIMAT.DOM.ele('span', checkListItemConfig['count']);
            countSpan.setAttribute('class', 'ui-li-count');
            item = VIMAT.DOM.ele('label', input, checkListItemConfig['label'], countSpan);
        }
        else {
            item = VIMAT.DOM.ele('label', input, checkListItemConfig['label']);
        }

        return item;
    }
    function collapsible(header, count, headerSize) {
        var div = VIMAT.DOM.ele('div'), countNode = VIMAT.DOM.ele('span', count);
        
        countNode.setAttribute('class', 'ui-li-count');
        div.setAttribute('data-role', 'collapsible');
        if (!(headerSize)) {
            headerSize = 'h3';
        }
        if (count === 'NaN') {
            div.appendChild(VIMAT.DOM.ele(headerSize, header));
        }
        else {
            div.appendChild(VIMAT.DOM.ele(headerSize, header, countNode));
        }
        
        return div;
    }
    function collapsibleSet() {
        var div = VIMAT.DOM.ele('div');
        
        div.setAttribute('data-role', 'collapsibleset');
        
        return div;
    }

    // *** Public API
    return {
        checklist:      checklist,
        checklistItem:  checklistItem,
        collapsible:    collapsible,
        collapsibleSet: collapsibleSet
    };
}());