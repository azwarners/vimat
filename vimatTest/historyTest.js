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

QUnit.module("history");
QUnit.test("completedTasksByPropertyValue", function(assert) {
    var tl = new VIMAT.MODEL.TASKS.taskList(),
        t1, t2, t3, t4, t5,
        completedHousework, completedYardwork,
        completedKitchen, completedDiningRoom;
        
    t1 = new VIMAT.MODEL.TASKS.Task('task 1');
    t2 = new VIMAT.MODEL.TASKS.Task('task 2');
    t3 = new VIMAT.MODEL.TASKS.Task('task 3');
    t4 = new VIMAT.MODEL.TASKS.Task('task 4');
    t5 = new VIMAT.MODEL.TASKS.Task('task 5');
    
    t1.folder = 'housework';
    t2.folder = 'housework';
    t2.context = '@kitchen';
    t3.folder = 'housework';
    t3.context = '@diningRoom';
    t4.folder = 'yardwork';
    t5.folder = 'yardwork';
    
    t2.finished = true;
    t3.finished = true;
    
    tl.addTask(t1);
    tl.addTask(t2);
    tl.addTask(t3);
    tl.addTask(t4);
    tl.addTask(t5);
    
    tl.deleteOrRepeatCompleted();
    
    completedHousework = VIMAT.HISTORY.completedTasksByPropertyValue('folder', 'housework');
    completedYardwork = VIMAT.HISTORY.completedTasksByPropertyValue('folder', 'yardwork');
    completedKitchen = VIMAT.HISTORY.completedTasksByPropertyValue('context', '@kitchen');
    completedDiningRoom = VIMAT.HISTORY.completedTasksByPropertyValue('context', '@diningRoom');
    
    assert.ok(completedHousework.length === 2);
    assert.ok(completedYardwork.length === 0);
    assert.ok(completedKitchen.length === 1);
    assert.ok(completedDiningRoom.length === 1);
});

QUnit.test("lastCompletionTimeByPropertyValue", function(assert) {
    var tl = new VIMAT.MODEL.TASKS.taskList(),
        t1, t2, t3, t4, t5,
        lastCompletionTimeHousework, lastCompletionTimeYardwork,
        lastCompletionTimeKitchen, lastCompletionTimeDiningRoom;
        
    t1 = new VIMAT.MODEL.TASKS.Task('task 1');
    t2 = new VIMAT.MODEL.TASKS.Task('task 2');
    t3 = new VIMAT.MODEL.TASKS.Task('task 3');
    t4 = new VIMAT.MODEL.TASKS.Task('task 4');
    t5 = new VIMAT.MODEL.TASKS.Task('task 5');
    
    t1.folder = 'housework';
    t2.folder = 'housework';
    t2.context = '@kitchen';
    t3.folder = 'housework';
    t3.context = '@diningRoom';
    t4.folder = 'yardwork';
    t5.folder = 'yardwork';
    
    t2.finished = true;
    
    tl.addTask(t1);
    tl.addTask(t2);
    tl.addTask(t4);
    tl.addTask(t5);
    
    tl.deleteOrRepeatCompleted();

    setTimeout(function(){
        t3.finished = true;
        tl.addTask(t3);
        assert.ok(lastCompletionTimeYardwork === '(none completed)');
    }, 3000);

    lastCompletionTimeHousework = VIMAT.HISTORY.lastCompletionTimeByPropertyValue('folder', 'housework');
    lastCompletionTimeYardwork = VIMAT.HISTORY.lastCompletionTimeByPropertyValue('folder', 'yardwork');
    lastCompletionTimeKitchen = VIMAT.HISTORY.lastCompletionTimeByPropertyValue('context', '@kitchen');
    lastCompletionTimeDiningRoom = VIMAT.HISTORY.lastCompletionTimeByPropertyValue('context', '@diningRoom');
    
    // assert.ok(lastCompletionTimeHousework.length === 2);
    // assert.ok(lastCompletionTimeKitchen.length === 1);
    // assert.ok(lastCompletionTimeDiningRoom.length ===1);
    assert.ok(VIMAT.HISTORY.lastCompletionTimeByPropertyValue('description', 'task 1') === '(none completed)');
});

QUnit.test("msSinceLastCompletionByPropertyValue", function(assert) {
    var tl = new VIMAT.MODEL.TASKS.taskList(),
        t1, t2, t3, t4, t5,
        sinceHousework, sinceYardwork,
        sinceKitchen, sinceDiningRoom, sinceInvalid;
        
    t1 = new VIMAT.MODEL.TASKS.Task('task 1');
    t2 = new VIMAT.MODEL.TASKS.Task('task 2');
    t3 = new VIMAT.MODEL.TASKS.Task('task 3');
    t4 = new VIMAT.MODEL.TASKS.Task('task 4');
    t5 = new VIMAT.MODEL.TASKS.Task('task 5');
    
    t1.folder = 'housework';
    t2.folder = 'housework';
    t2.context = '@kitchen';
    t3.folder = 'housework';
    t3.context = '@diningRoom';
    t4.folder = 'yardwork';
    t5.folder = 'yardwork';
    
    t2.finished = true;
    t3.finished = true;
    
    tl.addTask(t1);
    tl.addTask(t2);
    tl.addTask(t3);
    tl.addTask(t4);
    tl.addTask(t5);
    
    tl.deleteOrRepeatCompleted();
    
    sinceHousework = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue('folder', 'housework');
    sinceYardwork = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue('folder', 'yardwork');
    sinceKitchen = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue('context', '@kitchen');
    sinceDiningRoom = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue('context', '@diningRoom');
    sinceInvalid = VIMAT.HISTORY.msSinceLastCompletionByPropertyValue('description', 'value');
    
    // assert.ok(sinceHousework.length === 2);
    assert.ok(sinceYardwork === '(none completed)');
    // assert.ok(sinceKitchen.length === 1);
    // assert.ok(sinceDiningRoom.length === 1);
    assert.ok(sinceInvalid === '(none completed)');
});