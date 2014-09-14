{"changed":true,"filter":false,"title":"view.js","tooltip":"/VIMAT/js/view.js","ace":{"folds":[{"start":{"row":31,"column":34},"end":{"row":35,"column":4},"placeholder":"..."},{"start":{"row":36,"column":37},"end":{"row":55,"column":4},"placeholder":"..."},{"start":{"row":56,"column":51},"end":{"row":91,"column":4},"placeholder":"..."},{"start":{"row":128,"column":33},"end":{"row":199,"column":0},"placeholder":"..."}],"scrolltop":240,"scrollleft":0,"selection":{"start":{"row":98,"column":2},"end":{"row":98,"column":2},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":21,"state":"start","mode":"ace/mode/javascript"}},"value":"/*\n\t******************************************************************\n\t Copyright 2013 Nicholas Warner\n\n\t This file is part of vimat.\n\n    vimat is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    vimat is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with vimat.  If not, see <http://www.gnu.org/licenses/>.\n\t******************************************************************\n*/\n\n// Root Namespace\nvar VIMAT = VIMAT || {};\n\n// Create the namespace for the task list\ncreateNS(\"VIMAT.VIEW\");\n \nVIMAT.VIEW.taskList = ( function () {\n    // private variables\n\n    // private methods\n    var hideTaskList = function(){\n        document.getElementById('taskList').innerHTML = '';\n        VIMAT.SETTINGS.setTaskListIsDisplayed(false);\n        // saveSettings();\n    };\n    var displayTaskList = function(){\n        var htmlToAdd   = '',\n            i           = 0;\n    \n        htmlToAdd += '<button onclick=\"newTaskButtonClicked()\">New<br/>Task</button>';\n        htmlToAdd += '<button onclick=\"clearCompletedButtonClicked()\">Clear<br/>';\n        htmlToAdd += 'completed</button>';\n        htmlToAdd += '<button onclick=\"moveToProjectButtonClicked()\">Move to<br/>';\n        htmlToAdd += 'project</button>';\n        htmlToAdd += '<div id=\"newTaskForm\"></div>';\n        htmlToAdd += '<div id=\"tasksDiv\"></div>';\n        \n        document.getElementById('taskList').innerHTML = htmlToAdd;\n        // clearing the <div> for the new string\n        document.getElementById('tasksDiv').innerHTML = '';\n        \n        for (i = 0; i < VIMAT.TOOLS.taskList.getLength(); i++) {\n            displayTaskListItemById(i);\n        }\n    };\n    var displayTaskListItemById = function(taskId){\n        // creating a string to store the html for the task list item\n        var htm = '';\n    \n        // creating a variable with the current time/date stamp for comparing\n        var now = (new Date()).toJSON();\n    \n        // checkbox\n        htm += VIMAT.returnCheckBoxMarkup('checkBoxChanged(event)', taskId, VIMAT.TOOLS.taskList.tasks[taskId].getFinished());\n\n        // description\n        htm += '<span onclick=\"taskClicked(event)\" id=\"td';\n        htm += taskId + '\">';\n        htm += (VIMAT.TOOLS.taskList.tasks[taskId].getDescription()).toString();\n        htm += '</span><br/>';\n        \n        // compass\n        if (VIMAT.TOOLS.taskList.tasks[taskId].getCompass()) {\n            htm += VIMAT.TOOLS.taskList.tasks[taskId].getCompass() + '   ';\n        }\n        \n        // due date\n        if (typeof VIMAT.TOOLS.taskList.tasks[taskId].getDueDate() === 'string') {\n            htm += (new Date(VIMAT.TOOLS.taskList.tasks[taskId].getDueDate())).toDateString() + '<br/>';\n        }\n        \n        // container for an optional edit form\n        htm += '<div id=\"ef' + taskId.toString() + '\"></div><br/>';\n        \n        // put the task on the page\n        if (!(VIMAT.TOOLS.taskList.tasks[taskId].getDueDate() > now)) {\n            document.getElementById('tasksDiv').innerHTML += htm;\n        }\n        VIMAT.SETTINGS.setTaskListIsDisplayed(true);\n        // saveSettings();\n    };\n        \n   // public API\n    return {\n        hideTaskList: hideTaskList,\n        displayTaskList: displayTaskList\n    };\n}) ();\n\n\n\n\n// Tasks\n\n\n\n\n\n\nfunction displayNewTaskForm() {\n    var htmlToAdd = '';\n    \n    htmlToAdd += 'Enter a task:<br/><input type=\"text\" id=\"taskInput\"/><br/>';\n    htmlToAdd += '<button onclick=\"addTaskButtonClicked()\">Add Task</button>';\n    \n    document.getElementById('newTaskForm').innerHTML = htmlToAdd;\n}\n\nfunction hideNewTaskForm() {\n    document.getElementById('newTaskForm').innerHTML = '';\n}\n\nvar editTaskFormIsDisplayed = false;\n\n// id of task description <span> of task being edited\nvar currentTaskBeingEdited;\n\nfunction displayEditTaskForm(t) {\n    hideNewTaskForm();\n    if (editTaskFormIsDisplayed) {\n        hideEditTaskForm(currentTaskBeingEdited);\n    }\n\n    // tasks[] index of the task being edited    \n    var i = parseInt(t.slice(2), 10);\n    \n    var htmlToAdd = '';\n    \n    // description text box\n    htmlToAdd += 'Description: <input type=\"text\" id=\"taskInput\"';\n    htmlToAdd += ' value=\"' + tasks[i].description + '\"/><br/>';\n    \n    // compass drop down\n    if (tasks[i].compass === 'Wellness') {\n        htmlToAdd += 'Compass: <select id=\"compass\"><option value=\"Wellness\" selected>Wellness</option>';\n    } else {\n        htmlToAdd += 'Compass: <select id=\"compass\"><option value=\"Wellness\">Wellness</option>';\n    }\n    if (tasks[i].compass === 'Education') {\n        htmlToAdd += '<option value=\"Education\" selected>Education</option>';\n    } else {\n        htmlToAdd += '<option value=\"Education\">Education</option>';\n    }\n    if (tasks[i].compass === 'Finance') {\n        htmlToAdd += '<option value=\"Finance\" selected>Finance</option>';\n    } else {\n        htmlToAdd += '<option value=\"Finance\">Finance</option>';\n    }\n    if (tasks[i].compass === 'Art') {\n        htmlToAdd += '<option value=\"Art\" selected>Art</option>';\n    } else {\n        htmlToAdd += '<option value=\"Art\">Art</option>';\n    }\n    if (tasks[i].compass === 'Chores') {\n        htmlToAdd += '<option value=\"Chores\" selected>Chores</option>';\n    } else {\n        htmlToAdd += '<option value=\"Chores\">Chores</option>';\n    }\n    if (tasks[i].compass === 'Relations') {\n        htmlToAdd += '<option value=\"Relations\" selected>Relations</option>';\n    } else {\n        htmlToAdd += '<option value=\"Relations\">Relations</option>';\n    }\n    if (tasks[i].compass === 'Projects') {\n        htmlToAdd += '<option value=\"Projects\" selected>Projects</option>';\n    } else {\n        htmlToAdd += '<option value=\"Projects\">Projects</option>';\n    }\n    if (tasks[i].compass === 'Tools') {\n        htmlToAdd += '<option value=\"Tools\" selected>Tools</option>';\n    } else {\n        htmlToAdd += '<option value=\"Tools\">Tools</option>';\n    }\n    htmlToAdd += '</select><br/>';\n    \n    // date picker\n    var d = new Date(); // for setting the default to today's date\n    htmlToAdd += 'Date: <input type=\"date\" id=\"dueDate\" value=\"';\n    htmlToAdd += tasks[i].dueDate.slice(0, 10) + '\"><br/>';\n    \n    // save button\n    htmlToAdd += '<button onclick=\"editTaskButtonClicked()\">Save Changes</button>';\n    \n    var ef = 'ef' + i.toString();\n    document.getElementById(ef).innerHTML = htmlToAdd;\n    \n    editTaskFormIsDisplayed = true;\n    currentTaskBeingEdited = t;\n}\n\nfunction hideEditTaskForm(t) {\n    document.getElementById('ef' + t.slice(2)).innerHTML = '';\n}","undoManager":{"mark":0,"position":-1,"stack":[]},"timestamp":1410458031912}