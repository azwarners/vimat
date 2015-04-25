var QUnit = QUnit || {};
var VIMAT = VIMAT || {};

QUnit.module("lists");
QUnit.test("List Item constructor", function(assert) {
    var l = new VIMAT.MODEL.LISTS.ListItem('testDescription'),
        li = new VIMAT.MODEL.LISTS.ListItem('testDescription2', true);
    
    assert.ok(l.getDescription() === 'testDescription', "constructor (description) / getDescription");
    
    assert.ok(l.getChecked() === false, "getChecked");
    
    assert.ok(li.getChecked() === true, "loaded constructor (description/checked)");
});
QUnit.test("List Item methods", function(assert) {
    var l = new VIMAT.MODEL.LISTS.ListItem('test1'),
        l2 = new VIMAT.MODEL.LISTS.ListItem('test2');
 
    l.setDescription('test1edit');
    l2.setChecked(true);
    assert.ok(l.getDescription() === 'test1edit', "getDescription / setDescription");
    
    assert.ok(l2.getDescription() === 'test2', "getDescription");
    
    assert.ok(l.getChecked() === false, "getChecked");
    
    assert.ok(l2.getChecked() === true, "getChecked / setChecked");
});
QUnit.test("List constructor", function(assert) {
    var lst = new VIMAT.MODEL.LISTS.List('testListName');
    assert.ok(lst.getName() === 'testListName', "constructor / getName");
    
    assert.ok(lst.getKeepItemsAfterCheckedOff() === true, "getKeepItemsAfterCheckedOff");
});
QUnit.test("List methods", function(assert) {
    var li = new VIMAT.MODEL.LISTS.ListItem('testDescription'),
        lst = new VIMAT.MODEL.LISTS.List('testListName'),
        newLi, flag;
        
    lst.addListItem(li);
    newLi = lst.getListItemAt(0);
    assert.ok(newLi.getDescription() === 'testDescription', "addListItem/getListItemAt");
    
    lst.setName('newListName');
    assert.ok(lst.getName() === 'newListName', "getName / setName");
    
    lst.setKeepItemsAfterCheckedOff(false);
    flag = lst.getKeepItemsAfterCheckedOff();
    assert.ok(flag === false,"getKeepItemsAfterCheckedOff/setKeepItemsAfterCheckedOff");
    
    li = new VIMAT.MODEL.LISTS.ListItem('testDescription2');
    lst.addListItem(li);
    li = new VIMAT.MODEL.LISTS.ListItem('testDescription3');
    lst.addListItem(li);
    lst.setCheckedAll(true);
    assert.ok((lst.getListItemAt(0).getChecked() & lst.getListItemAt(1).getChecked() &
            lst.getListItemAt(2).getChecked()), "addListItem / getListItemAt / setCheckedAll");
    
    assert.ok((lst.getLength() === 3), "getLength");
});
QUnit.test("List Of Lists test", function(assert) {
    var li1 = new VIMAT.MODEL.LISTS.ListItem('testDescription1'),
        li2 = new VIMAT.MODEL.LISTS.ListItem('testDescription2'),
        li3 = new VIMAT.MODEL.LISTS.ListItem('testDescription3'),
        lst1 = new VIMAT.MODEL.LISTS.List('testListName1'),
        lst2 = new VIMAT.MODEL.LISTS.List('testListName2'),
        lst3 = new VIMAT.MODEL.LISTS.List('testListName3'),
        myLOL = new VIMAT.MODEL.LISTS.listOfLists(),
        loln = [],
        newLi, newList, flag, string;
        
    lst1.addListItem(li1);
    lst2.addListItem(li2);
    lst3.addListItem(li3);
    myLOL.addList(lst1);
    myLOL.addList(lst2);
    myLOL.addList(lst3);
    assert.ok(myLOL.getNumberOfLists() === 3, "addList/getNumberOfLists");
    
    loln = myLOL.getListOfListNames();
    string = loln[1];
    assert.ok(string === 'testListName2', "getListOfListNames");
    
    newList = myLOL.getListByListName('testListName1');
    newLi = newList.getListItemAt(0);
    assert.ok(newLi.getDescription() === 'testDescription1', "getListByListName");
    
    string = myLOL.getListNameAt(2);
    assert.ok(string === 'testListName3', "getListNameAt");
    
    newList = myLOL.getListAt(1);
    newLi = newList.getListItemAt(0);
    assert.ok(newLi.getDescription() === 'testDescription2', "getListItemAt");
    
    myLOL.removeListAt(0);
    loln = myLOL.getListOfListNames();
    flag = ((loln[0] === 'testListName2') & (loln[1] === 'testListName3'));
    assert.ok(flag & (myLOL.getNumberOfLists() === 2), "removeListAt");
});