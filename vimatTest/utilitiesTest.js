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

var QUnit = QUnit || {};
var VIMAT = VIMAT || {};

QUnit.module("utilities");
QUnit.test("sortArrayOfObjectsByProperty", function(assert) {
    var p1, p2, p3, p4, p5, people = [], Person = function(l, f, a, s) {
        this.lastName = l;
        this.firstName = f;
        this.age = a;
        this.ssn = s;
    };    
    p1 = new Person('Doe', 'John', 37, '123-45-6789');
    p2 = new Person('Doe', 'Jane', 35, '987-65-4321');
    p3 = new Person('Ymous', 'Anon', 25, '111-11-1111');
    p4 = new Person('Name', 'No', 45, '999-99-9999');
    p5 = new Person('Another-Person', 'Yet', 19, '555-55-5555');
    
    people.push(p1);
    people.push(p2);
    people.push(p3);
    people.push(p4);
    people.push(p5);
    
    VIMAT.UTILITIES.sortArrayOfObjectsByProperty(people, 'firstName');
    
    assert.ok(people[0].firstName === 'Anon');
    assert.ok(people[4].firstName === 'Yet');
    assert.ok(people[2].age === 37);
    
    VIMAT.UTILITIES.sortArrayOfObjectsByProperty(people, 'ssn');

    assert.ok(people[4].firstName === 'No');
});

QUnit.test("isSubFolderOfContext", function(assert) {
    var f, c;
    
    f = 'housework/kitchen';
    c = 'housework';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'housework/kitchen';
    c = '/';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'projects/vimat/documentation';
    c = 'projects';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'projects/vimat/documentation';
    c = 'projects/vimat';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'yardwork/backyard';
    c = 'housework';
    assert.ok(!(VIMAT.UTILITIES.isSubContextOfContext(f, c)), (f + ' is not in ' + c));
    f = 'education/math/khanacademy';
    c = 'education/math';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'housework/kitchen';
    c = '';
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(f, c), (f + ' is in ' + c));
    f = 'housework/kitchen';
    c = 'housework/kitchen';
    assert.ok(!(VIMAT.UTILITIES.isSubContextOfContext(f, c)), (f + ' is not in ' + c + ' (same folder)'));
    f = 'housework/kitchen/cupboards';
    c = 'yardwork/kitchen';
    assert.ok(!(VIMAT.UTILITIES.isSubContextOfContext(f, c)), (f + ' is not in ' + c));
    f = 'yardwork';
    c = 'yardwork/backyard';
    assert.ok(!(VIMAT.UTILITIES.isSubContextOfContext(f, c)), (f + ' is not in ' + c));
});

QUnit.test("isChildOfContext", function(assert) {
    var f, c;
    
    f = 'housework/kitchen';
    c = 'housework';
    assert.ok(VIMAT.UTILITIES.isChildOfContext(f, c), (f + ' is child of ' + c));
    f = 'housework/kitchen';
    c = '/';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c + ' (grandchild)'));
    f = 'projects/vimat/documentation';
    c = 'projects';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c + ' (grandchild)'));
    f = 'projects/vimat/documentation';
    c = 'projects/vimat';
    assert.ok(VIMAT.UTILITIES.isChildOfContext(f, c), (f + ' is child of ' + c));
    f = 'yardwork/backyard';
    c = 'housework';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c));
    f = 'education/math/khanacademy';
    c = 'education/math';
    assert.ok(VIMAT.UTILITIES.isChildOfContext(f, c), (f + ' is child of ' + c));
    f = 'education';
    c = '/';
    assert.ok(VIMAT.UTILITIES.isChildOfContext(f, c), (f + ' is child of ' + c));
    f = 'chores';
    c = '';
    assert.ok(VIMAT.UTILITIES.isChildOfContext(f, c), (f + ' is child of ' + c));
    f = 'housework/kitchen';
    c = '';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c + ' (grandchild)'));
    f = 'housework/kitchen';
    c = 'housework/kitchen';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c + ' (same folder)'));
    f = 'housework/kitchen/cupboards';
    c = 'yardwork/kitchen';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c));
    f = 'yardwork';
    c = 'yardwork/backyard';
    assert.ok(!(VIMAT.UTILITIES.isChildOfContext(f, c)), (f + ' is not child of ' + c + ' (parent)'));
});

QUnit.test('vimatToString', function(assert) {
    var obj1 = {
        'testprop1':    'testval1',
        'testprop2':    'testval2',
        'testprop3':    'testval3',
        'testprop4':    'testval4',
    }, obj1String;
    obj1String = VIMAT.UTILITIES.vimatToString(obj1);
    assert.ok(obj1String.string === 'testval1|testval2|testval3|testval4');
    assert.ok(obj1String.key === 'testprop1|testprop2|testprop3|testprop4');

    var obj2 = {
        'testprop1':    'testval1',
        'testprop2':    'testval2',
        'testprop3':    undefined,
        'testprop4':    'testval4',
    }, obj2String;
    obj2String = VIMAT.UTILITIES.vimatToString(obj2);
    assert.ok(obj2String.string === 'testval1|testval2|undefined|testval4');
    assert.ok(obj2String.key === 'testprop1|testprop2|testprop3|testprop4');
    
    var t = new VIMAT.MODEL.TASKS.Task('test task'),
        taskString = VIMAT.UTILITIES.vimatToString(t);
});