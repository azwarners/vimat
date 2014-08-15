/*
	******************************************************************
	 Copyright 2013 Nicholas Warner

	 This file is part of vimat.

    vimat is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    vimat is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with vimat.  If not, see <http://www.gnu.org/licenses/>.
	******************************************************************
*/

function loadData(){
    if(typeof(Storage) !== "undefined") {
        if (localStorage.tasksdb) {
            var t = JSON.parse(localStorage.tasksdb);
            if (isArray(t)){
                tasks = t;
            }
        } 
        if (localStorage.projectsdb) {
            var p = JSON.parse(localStorage.projectsdb);
            if (isArray(p)){
                projects = p;
            }
        } 
    } else {
        alert('Sorry, no local storage on this browser.');
    }
}

function persistTasks(){
    localStorage.tasksdb = JSON.stringify(tasks);
}

function persistProjects(){
    localStorage.projectsdb = JSON.stringify(projects);
}