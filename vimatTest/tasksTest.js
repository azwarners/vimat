var QUnit = QUnit || {};
var VIMAT = VIMAT || {};

QUnit.module("tasks");
QUnit.test("Task constructor and getters/setters", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task('testDescription'),
        d = new Date();

    t.setId('testId');
    t.setFolder('testFolder');
    t.setFinished(true);
    t.setContext('@testContext');
    t.setCompass('testCompass');
    t.setPriority('testPriority');
    t.setUrgency('testUrgency');
    t.setDueDate(d);
    t.setRepeats(true);
    t.setDueOrCompletion('d');
    t.setFrequency(1);
    t.setInterval('d');
    assert.ok(t.getDescription() === 'testDescription', "get/setDescription");

    assert.ok(t.getId() === 'testId', "get/setId");

    assert.ok(t.getFolder() === 'testFolder', "get/setFolder");

    assert.ok(t.getFinished() === true, "get/setFinished");

    assert.ok(t.getContext() === '@testContext', "get/setContext");

    assert.ok(t.getCompass() === 'testCompass', "get/setCompass");

    assert.ok(t.getPriority() === 'testPriority', "get/setPriority");

    assert.ok(t.getUrgency() === 'testUrgency', "get/setUrgency");

    assert.ok(t.getDueDate() === d, "get/setDueDate");

    assert.ok(t.getRepeats() === true, "get/setRepeats");

    assert.ok(t.getDueOrCompletion() === 'd', "get/setDueOrCompletion");

    assert.ok(t.getFrequency() === 1, "get/setFrequency");

    assert.ok(t.getInterval() === 'd', "get/setInterval");
});
QUnit.test("toString/fromString", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task('testDescription');
    var d = new Date();
    var s, t2 = new VIMAT.MODEL.TASKS.Task();
    t.setId('testId');
    t.setFolder('testFolder');
    t.setFinished(true);
    t.setContext('@testContext');
    t.setCompass('testCompass');
    t.setPriority('testPriority');
    t.setUrgency('testUrgency');
    t.setDueDate(d.toJSON());
    t.setRepeats(true);
    t.setDueOrCompletion('d');
    t.setFrequency(1);
    t.setInterval('d');
    s = t.toString();
    t2.fromString(s);
    assert.ok(t2.getDescription() === 'testDescription', "to/fromString description");
    assert.ok(t2.getId() === 'testId', "to/fromString id");
    assert.ok(t2.getFolder() === 'testFolder', "to/fromString folder");
    assert.ok(t2.getFinished() === true, "to/fromString finished");
    assert.ok(t2.getContext() === '@testContext', "to/fromString context");
    assert.ok(t2.getCompass() === 'testCompass', "to/fromString compass");
    assert.ok(t2.getPriority() === 'testPriority', "to/fromString priority");
    assert.ok(t2.getUrgency() === 'testUrgency', "to/fromString urgency");
    assert.ok(t2.getDueDate() === t.getDueDate(), "to/fromString dueDate");
    assert.ok(t2.getRepeats() === true, "to/fromString repeats");
    assert.ok(t2.getDueOrCompletion() === 'd', "to/fromString dueOrCompletion");
    assert.ok(t2.getFrequency() === '1', "to/fromString frequency");
    assert.ok(t2.getInterval() === 'd', "to/fromString interval");
});
QUnit.test("repeat and related properties/methods", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task(),
        d = new Date("December 8, 2014 11:00:00");

    t.setDueDate(d.toJSON());
    t.setRepeats(true);
    t.setDueOrCompletion('d');
    t.setFrequency(1);
    t.setInterval('d');
    t.repeat();
    assert.ok(t.getDueDate() === "2014-12-09T18:00:00.000Z", "repeat every day from due date");
    
    t.setFrequency(2);
    t.repeat();
    assert.ok(t.getDueDate() === "2014-12-11T18:00:00.000Z", "every 2 days");
    
    t.setInterval('w');
    t.repeat();
    assert.ok(t.getDueDate() === "2014-12-25T18:00:00.000Z", "every 2 weeks");
    
    t.setInterval('m');
    t.setFrequency(3);
    t.repeat();
    assert.ok(t.getDueDate() === "2015-03-27T00:00:00.000Z", "every 3 months");
    
    t.setInterval('y');
    t.repeat();
    assert.ok(t.getDueDate() === "2018-03-26T00:00:00.000Z", "every 3 years");
    
    t.setInterval('h');
    t.repeat();
    assert.ok(t.getDueDate() === "2018-03-26T03:00:00.000Z", "every 3 hours");
});

QUnit.test("isDue", function(assert) {
    var t = new VIMAT.MODEL.TASKS.Task(),
        d = new Date("December 8, 2019 11:00:00");

    t.setDueDate((new Date()).toJSON());
    assert.ok(t.isDue(), "task is due");
    
    t.setDueDate(d.toJSON());
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
    assert.ok(t2.getDescription() === 'sweep floor', "addTask / getTaskByIndex");
    
    myTL.addTask(t3);
    id1 = t1.getId();
    id3 = t3.getId();
    assert.ok(myTL.idExists(id1) & myTL.idExists(id3), "idExists");
    
    t2.setFolder('housework');
    t4.setFolder('yardwork');
    myTL.addTask(t2);
    myTL.addTask(t4);
    t6 = new VIMAT.MODEL.TASKS.Task('clear inbox');
    t6.setFolder('housework/subfolder/deepsubfolder/deepersubfolder/deepestsubfolder');
    t7 = new VIMAT.MODEL.TASKS.Task('walk dogs');
    t7.setFolder('yardwork/subfolder/deepsubfolder/deepersubfolder/deepestsubfolder');
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