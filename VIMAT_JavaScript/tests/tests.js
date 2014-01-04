QUnit.test( "Test example", function( assert ){
    assert.ok( true );
});

QUnit.module("ResetPasswordForm");
QUnit.test( "show method", function( assert ){
    // Stub assertion
    assert.ok( true );
});
QUnit.test( "hide method", function( assert ){
    // Stub assertion
    assert.ok( true );
});
QUnit.test( "validateInput method", function( assert ){
    // Stub assertion
    assert.ok( true );
});

QUnit.module("MyNewModule");
QUnit.test("myNewTest", function( assert ){
    assert.ok("Hello World", "hello world is not equal to zero");
});

QUnit.module("taskList");
QUnit.test("newTaskForTaskList", function( assert ){
    Tasks.create({ title: "test task title",
        civlife: "test task civlife",
        date: 19000000,
        duedatestring: "Wed Apr 19 2019",
        repeat: "n",
        context: "test task context"
    });
    assert.ok;
});


