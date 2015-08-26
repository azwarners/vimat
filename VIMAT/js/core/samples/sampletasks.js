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

VIMAT.namespace("VIMAT.MODEL.TASKS");

VIMAT.MODEL.TASKS.sampleData = [
    {
        'id':               'tSAMPLE0',
        'description':      'dishes',
        'folder':           'housework',
        'context':          '@home/@kitchen',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Chores',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        1,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE1',
        'description':      'laundry',
        'folder':           'housework',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Chores',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        1,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE2',
        'description':      'sweep floors',
        'folder':           'housework',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Chores',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        1,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE3',
        'description':      'jog on treadmill',
        'folder':           'exercise',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Wellness',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        2,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE4',
        'description':      'stretching video',
        'folder':           'exercise',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Wellness',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        2,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE5',
        'description':      'practice math on Khan Academy',
        'folder':           'math',
        'context':          '@computer',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Education',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        2,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE6',
        'description':      'read programming book on SafariBooksOnline',
        'folder':           'computer science',
        'context':          '@computer',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Education',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        3,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE7',
        'description':      'practice programming with Project Euler',
        'folder':           'computer science',
        'context':          '@computer',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Education',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        3,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE8',
        'description':      'update resume',
        'folder':           'career',
        'context':          '@computer',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Finance',
        'repeats':          false,
        'dueOrCompletion':  '',
        'frequency':        0,
        'interval':         ''
    },
    {
        'id':               'tSAMPLE9',
        'description':      'practice scales on guitar',
        'folder':           'guitar',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        3,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE10',
        'description':      'practice chords on guitar',
        'folder':           'guitar',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        3,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE11',
        'description':      'practice favorite riffs on guitar',
        'folder':           'guitar',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        3,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE12',
        'description':      'watch TV for an hour',
        'folder':           'fun',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        2,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE13',
        'description':      'play video games for an hour',
        'folder':           'fun',
        'context':          '@home',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        2,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE14',
        'description':      'read for 45 minutes',
        'folder':           'fun',
        'context':          '',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Art',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        1,
        'interval':         'd'
    },
    {
        'id':               'tSAMPLE15',
        'description':      'walk the dogs',
        'folder':           'exercise',
        'context':          '@outside',
        'finished':         false,
        'dueDate':          '2015-05-09T07:00:00.000Z',
        'compass':          'Relations',
        'repeats':          true,
        'dueOrCompletion':  'c',
        'frequency':        1,
        'interval':         'w'
    },
    // {
    //     'id':               'tSAMPLE16',
    //     'description':      'laundry',
    //     'folder':           'housework',
    //     'context':          '@laundryRoom',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE17',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE18',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE19',
    //     'description':      'laundry',
    //     'folder':           'housework',
    //     'context':          '@laundryRoom',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE20',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE21',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE22',
    //     'description':      'laundry',
    //     'folder':           'housework',
    //     'context':          '@laundryRoom',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE23',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE24',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE25',
    //     'description':      'laundry',
    //     'folder':           'housework',
    //     'context':          '@laundryRoom',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // },
    // {
    //     'id':               'tSAMPLE26',
    //     'description':      'dishes',
    //     'folder':           'housework',
    //     'context':          '@kitchen',
    //     'finished':         false,
    //     'dueDate':          '2015-05-09T07:00:00.000Z',
    //     'compass':          'Chores',
    //     'repeats':          true,
    //     'dueOrCompletion':  'c',
    //     'frequency':        1,
    //     'interval':         'd'
    // }
];