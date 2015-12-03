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

VIMAT.namespace("VIMAT.CONFIG.TASKLIST");
VIMAT.CONFIG.TASKLIST = {
    /*
        Enable display for task properties in the view for
            task checklist items
    */
    viewEnabled:    {
                        id:                 false,
                        description:        true,
                        folder:             false,
                        finished:           false,
                        context:            true,
                        dueDate:            false,
                        compass:            false,
                        priority:           true,
                        urgency:            false,
                        repeats:            false,
                        dueOrCompletion:    false,
                        frequency:          false,
                        interval:           false,
                        undefinedDisplayedPropertiesReminder:
                                            true,
                        taskStatBubble:         'hoursSinceCompletion',
                        propertyStatBubble:     'hoursSinceCompletion',
                    },

    /*
        Method of display for task properties in the view for
            task checklist items
    */
    viewMethod: {
                    id:                 'text',
                    description:        'text',
                    folder:             'text',
                    finished:           'checkbox',
                    context:            'text',
                    compass:            'text',
                    priority:           'color',
                    urgency:            'color',
                    repeats:            'RPT',
                    dueOrCompletion:    'text',
                    undefinedDisplayedPropertiesReminderBy:
                                        '*', // character string displayed in red
                    taskStatBubble:     'hoursSinceCompletion',
                    propertyStatBubble: 'hoursSinceCompletion'
                },
    

    groupBy:                '(None)',
    sortBy:                 'dueDate',
    editorCurrentTaskId:    ''
};

VIMAT.namespace("VIMAT.CONFIG.TASKLIST.DEFAULT");
VIMAT.CONFIG.TASKLIST.DEFAULT = VIMAT.CONFIG.TASKLIST;