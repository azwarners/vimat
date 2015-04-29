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

QUnit.module("tasks");
// QUnit.test("Task constructor and getters/setters", function(assert) {
//     var t = new VIMAT.MODEL.TASKS.Task('testDescription'),
//         d = new Date();

//     t.setId('testId');
//     t.setFolder('testFolder');
//     t.setFinished(true);
//     t.setContext('@testContext');
//     t.setCompass('testCompass');
//     t.setPriority('testPriority');
//     t.setUrgency('testUrgency');
//     t.setDueDate(d);
//     t.setRepeats(true);
//     t.setDueOrCompletion('d');
//     t.setFrequency(1);
//     t.setInterval('d');
//     assert.ok(t.getDescription() === 'testDescription', "get/setDescription");

//     assert.ok(t.getId() === 'testId', "get/setId");

//     assert.ok(t.getFolder() === 'testFolder', "get/setFolder");

//     assert.ok(t.getFinished() === true, "get/setFinished");

//     assert.ok(t.getContext() === '@testContext', "get/setContext");

//     assert.ok(t.getCompass() === 'testCompass', "get/setCompass");

//     assert.ok(t.getPriority() === 'testPriority', "get/setPriority");

//     assert.ok(t.getUrgency() === 'testUrgency', "get/setUrgency");

//     assert.ok(t.getDueDate() === d, "get/setDueDate");

//     assert.ok(t.getRepeats() === true, "get/setRepeats");

//     assert.ok(t.getDueOrCompletion() === 'd', "get/setDueOrCompletion");

//     assert.ok(t.getFrequency() === 1, "get/setFrequency");

//     assert.ok(t.getInterval() === 'd', "get/setInterval");
// });
QUnit.test("toString/fromString", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task('testDescription');
    var d = new Date();
    var s, t2 = new VIMAT.MODEL.TASKS.Task();
    t.id = 'testId';
    t.folder = 'testFolder';
    t.finished = true;
    t.context = '@testContext';
    t.compass = 'testCompass';
    t.priority = 'testPriority';
    t.urgency = 'testUrgency';
    t.dueDate = d.toJSON();
    t.repeats = true;
    t.dueOrCompletion = 'd';
    t.frequency = 1;
    t.interval = 'd';
    s = t.toString();
    t2.fromString(s);
    assert.ok(t2.description === 'testDescription', "to/fromString description");
    assert.ok(t2.id === 'testId', "to/fromString id");
    assert.ok(t2.folder === 'testFolder', "to/fromString folder");
    assert.ok(t2.finished === true, "to/fromString finished");
    assert.ok(t2.context === '@testContext', "to/fromString context");
    assert.ok(t2.compass === 'testCompass', "to/fromString compass");
    assert.ok(t2.priority === 'testPriority', "to/fromString priority");
    assert.ok(t2.urgency === 'testUrgency', "to/fromString urgency");
    assert.ok(t2.dueDate === t.dueDate, "to/fromString dueDate");
    assert.ok(t2.repeats === true, "to/fromString repeats");
    assert.ok(t2.dueOrCompletion === 'd', "to/fromString dueOrCompletion");
    assert.ok(t2.frequency === '1', "to/fromString frequency");
    assert.ok(t2.interval === 'd', "to/fromString interval");
});
QUnit.test("repeat and related properties/methods", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task(),
        d = new Date("December 8, 2014 11:00:00");

    t.dueDate = d.toJSON();
    t.repeats = true;
    t.dueOrCompletion = 'd';
    t.frequency = 1;
    t.interval = 'd';
    t.repeat();
    assert.ok(t.dueDate === "2014-12-09T18:00:00.000Z", "repeat every day from due date");
    
    t.frequency = 2;
    t.repeat();
    assert.ok(t.dueDate === "2014-12-11T18:00:00.000Z", "every 2 days");
    
    t.interval = 'w';
    t.repeat();
    assert.ok(t.dueDate === "2014-12-25T18:00:00.000Z", "every 2 weeks");
    
    t.interval = 'm';
    t.frequency = 3;
    t.repeat();
    assert.ok(t.dueDate === "2015-03-27T00:00:00.000Z", "every 3 months");
    
    t.interval = 'y';
    t.repeat();
    assert.ok(t.dueDate === "2018-03-26T00:00:00.000Z", "every 3 years");
    
    t.interval = 'h';
    t.repeat();
    assert.ok(t.dueDate === "2018-03-26T03:00:00.000Z", "every 3 hours");
});
QUnit.test("isDue", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task(),
        d = new Date("December 8, 2019 11:00:00");

    t.dueDate = (new Date()).toJSON();
    assert.ok(t.isDue(), "task is due");
    
    t.dueDate = d.toJSON();
    assert.ok(!(t.isDue()), "task for 2019 is not due");
});
QUnit.test("Task List methods", function(assert) {
    var myTL = new VIMAT.MODEL.TASKS.taskList(),
        t1, t2, t3, t4, t5, t6, t7,
        id1, id2, id3, stringArray, upv = [],
        d = new Date();
    
    t1 = new VIMAT.MODEL.TASKS.Task('sweep floor');
    t3 = new VIMAT.MODEL.TASKS.Task('unload dishwasher');
    t4 = new VIMAT.MODEL.TASKS.Task('mow yard');
    t5 = new VIMAT.MODEL.TASKS.Task('shovel snow');
    myTL.addTask(t1);
    t2 = myTL.getTaskByIndex(0);
    assert.ok(t2.description === 'sweep floor', "addTask / getTaskByIndex");
    
    myTL.addTask(t3);
    id1 = t1.id;
    id3 = t3.id;
    assert.ok(myTL.idExists(id1) & myTL.idExists(id3), "idExists");
    
    t2.folder = 'housework';
    t4.folder = 'yardwork';
    myTL.addTask(t2);
    myTL.addTask(t4);
    t6 = new VIMAT.MODEL.TASKS.Task('clear inbox');
    t6.folder = 'housework/subfolder/deepsubfolder/deepersubfolder/deepestsubfolder';
    t7 = new VIMAT.MODEL.TASKS.Task('walk dogs');
    t7.folder = 'yardwork/subfolder/deepsubfolder/deepersubfolder/deepestsubfolder';
    myTL.addTask(t6);
    myTL.addTask(t7);
    stringArray = myTL.getUniqueFolders();
    stringArray = VIMAT.UTILITIES.removeEmptyStrings(stringArray);
    assert.ok(stringArray[0] === 'housework' && stringArray[1] === 'yardwork', 'getUniqueFolders');
    
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(stringArray[2], stringArray[0]), 'isSubFolderOfContext');
    assert.ok(!(VIMAT.UTILITIES.isSubContextOfContext(stringArray[3], stringArray[0])), 'isSubFolderOfContext');
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(stringArray[2], ''), 'isSubFolderOfContext');
    assert.ok(VIMAT.UTILITIES.isSubContextOfContext(stringArray[2], '/'), 'isSubFolderOfContext');

    // these need to be changed to an actual test rather than popup boxes
//    alert(myTL.getAllTasksToStrings());
//    myTL.sortByProp('description');
//    alert(myTL.getAllTasksToStrings());
    
});
// QUnit.test("idExists", function(assert) {
    
// });
// QUnit.test("addTask", function(assert) {
    
// });
// QUnit.test("tasklistmethod", function(assert) {
    
// });
// QUnit.test("tasklistmethod2", function(assert) {
    
// });