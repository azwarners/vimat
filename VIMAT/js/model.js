

var VIMAT = VIMAT || {};

// time tracker
var trackedTimes = [];
var msInDay = 60000 * 60 * 24;
var msInWeek = msInDay * 7;
var msInMonth = msInWeek * (13/3);
function TrackedTime(st, c) {
    // expects a JSON time/date string for st and a string for c
    this.startTime = st;
    this.endTime;
    this.compass = c;
}
function timeTrackerStatsForCompass() {
    var stats = [];
    for (var j in compassCategories) {
        var dt = new Date();
        var h = 'D ';
        var d = 0;
        var ds = 0;
        var w = 0;
        var m = 0;
        for (var i in trackedTimes) {
            if (trackedTimes[i].compass === compassCategories[j]) {
                if (dt - new Date(trackedTimes[i].startTime) < msInMonth) {
                    if (trackedTimes[i].endTime) {
                        m += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        m += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInWeek) {
                    if (trackedTimes[i].endTime) {
                        w += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        w += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
                if (dt - new Date(trackedTimes[i].startTime) < msInDay) {
                    if (trackedTimes[i].endTime) {
                        d += (new Date(trackedTimes[i].endTime) - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                    else {
                        d += (dt - new Date(trackedTimes[i].startTime)) / 60000;
                    }
                }
            }
        }
        ds = (d - Math.floor(d)) * 60;
        if (ds < 10) {
            ds = '0' + Math.floor(ds).toString();
            h += Math.floor(d) + ':' + ds + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
        }
        else {
            h += Math.floor(d) + ':' + Math.floor(ds) + ' / W ' + Math.floor(w) + ' / M ' + Math.floor(m);
    
        }
        stats[j] = h;
    }
    return stats;
}

// calendar
VIMAT.namespace("VIMAT.MODEL.CALENDAR");
VIMAT.MODEL.CALENDAR.Event = function (d) {
    // *** Private Properties
    var description = d,
        date = '';
        
    // *** Private Methods
    function getDescription() {
        return description;
    }
    function setDescription(d) {
        description = d;
    }
    function getDate() {
        return date;
    }
    function setDate (d) {
        date = d;
    }
    
    // *** Public API
    return {
        getDescription:     getDescription,
        setDescription:     setDescription,
        getDate:            getDate,
        setDate:            setDate
    };
};
VIMAT.MODEL.CALENDAR.calendar = (function () {
    // *** Private Properties
    var arrayContent = [];
    
    // *** Private Methods
    function addEvent(e) {
        arrayContent.push(e);
    }
    
    // *** Public API
    return {
        addEvent:       addEvent
    };
}());

// Notes
function Note(description, content) {
    this.description = description;
    this.content = content;
    this.project = '';
}
var notes = [];

// settings
function Settings() {
    
    // task list
    var defaultTaskDueDate = '';
    var defaultTaskCompass = 'Chores';
    var taskListToolIsDisplayed = false;
    
    // tickler
    var ticklerToolIsDisplayed = false;
    
    // calendar
    var calendarToolIsDisplayed = false;
    
    // compass
    var compassToolIsDisplayed = false;

    // notes
    var notesToolIsDisplayed = false;

}
var settings = new Settings();

// Misc Data
VIMAT.namespace("VIMAT.MODEL.MISC");
VIMAT.MODEL.MISC = (function () {
    // *** Private Properties
    var compassCategories = [   "Wellness",
                                "Education",
                                "Finance",
                                "Art",
                                "Chores",
                                "Relations",
                                "Projects",
                                "Tools" ];
    var msInHour = 1000 * 60 * 60;
    var msInDay = msInHour * 24;
    var msInWeek = msInDay * 7;
    var msInYear = msInDay * 365;
    var msInMonth = msInYear / 12;

    // *** Private Methods
    function getCompassCategories() {
        return compassCategories;
    }
    function getMsInHour() {
        return msInHour;
    }
    function getMsInDay() {
        return msInDay;
    }
    function getMsInWeek() {
        return msInWeek;
    }
    function getMsInMonth() {
        return msInMonth;
    }
    function getMsInYear() {
        return msInYear;
    }
    
    // *** Public API
    return {
        getCompassCategories:   getCompassCategories,
        getMsInHour:            getMsInHour,
        getMsInDay:             getMsInDay,
        getMsInWeek:            getMsInWeek,
        getMsInMonth:           getMsInMonth,
        getMsInYear:            getMsInYear
    };
}());
var compassCategories = [   "Wellness",
                            "Education",
                            "Finance",
                            "Art",
                            "Chores",
                            "Relations",
                            "Projects",
                            "Tools"     ];