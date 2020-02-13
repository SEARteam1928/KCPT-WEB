var group = localStorage.getItem("group");
if (group === null) {
    group = 1;
}
let date = new Date();
var day = date.getDay();
if (day === 0) {
    day = 1;
}
/*
" 8:15 - 9:00\n 2| 9:00 - 9:45\n\nперемена 15 минут\n\n 3| 10:00 - 10:45\n 4| 10:45 - 11:30\n\nперемена 30 минут\n\n 5| 12:00 - 12:45\n 6| 12:45 - 13:30\n\nперемена 30 минут\n\n 7| 14:00 - 14:45\n 8| 14:45 - 15:30\n\nперемена 15 минут\n\n 9| 15:45 - 16:30\n10| 16:30 - 17:15\n\nперемена 10 минут\n\n11| 17:25 - 18:10\n12| 18:10 - 18:55\n\n"
"Cуббота\n\n\n 1| 8:15 - 9:00\n 2| 9:00 - 9:45\n\nперемена 5 минут\n\n3| 9:50 - 10:35\n 4| 10:35 - 11:20\n\nперемена 30 минут\n\n 5| 11:50 - 12:35\n 6| 12:35 - 13:20\n\nперемена 10 минут\n\n 7| 13:30 - 14:15\n 8| 14:15 - 15:00\n\nперемена 10 минут\n\n 9| 15:10 - 15:55\n10| 15:55 - 16:40\n\nперемена 5 минут\n\n11| 16:45 - 17:30\n12| 17:30 - 18:15\n\n"
*/

const timeLessonMnFr = ["","8:15 - 9:00", "9:00 - 9:45", "10:00 - 10:45", "10:45 - 11:30", "12:00 - 12:45", "12:45 - 13:30", "14:00 - 14:45", "14:45 - 15:30", "15:45 - 16:30", "16:30 - 17:15", "17:25 - 18:10", "18:10 - 18:55"];
const timeLessonSt = ["","8:15 - 9:00", "9:00 - 9:45", "9:50 - 10:35", "10:35 - 11:20", "11:50 - 12:35", "12:35 - 13:20", "13:30 - 14:15", "14:15 - 15:00", "15:10 - 15:55", "15:55 - 16:40", "16:45 - 17:30", "17:30 - 18:15"];

function getOptionsList() {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/allOptions",
        type: "get",
        dataType: "json",
        data: {},
        success(data) {
            console.log(data);

            appendInView(data.groups, 'option', groupSelect);
            appendInView(data.dayOfWeek, 'option', daySelect);
        },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}

function appendInView(arr, createdElement, appendIn) {
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement(createdElement);
        element.append(arr[i].name);
        element.setAttribute("value", arr[i].id);
        element.dataset["id"] = arr[i].id;
        list.push(element);
    }
    appendIn.append(...list);
}

function updateTimetableList(timetableOn) {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/timetable",
        type: "get",
        dataType: "json",
        data: {
            "group": group,
            "day": day
        },
        success(data) {
            console.log(data);
            allTable.innerHTML = "";
            userInfo.innerHTML = "";
            userInfo.innerHTML = data.timetable[0].groupname + " " + data.timetable[0].dayOfWeek;
            for (let i = 0; i < data.timetable.length; i++) {
                createTableLine(data, i);
            }
        },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}

function createTableLine(data, numSubject) {
    let dive = document.createElement('div');

    dive.setAttribute("class", "tableLine");

    if (day === "6") {
        dive.innerHTML = "<br><div class='numLesson'> номер урока " + data.timetable[numSubject].numLesson + "</div>"
            + "<div class='subGroup'> подгруппа " + data.timetable[numSubject].subgroup + "</div>"
            + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>"
            + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>"
            + "<div class='timeLesson'>" + timeLessonSt[data.timetable[numSubject].numLesson] + "</div>"
            + "<br>";
    } else {
        dive.innerHTML = "<br><div class='numLesson'> номер урока " + data.timetable[numSubject].numLesson + "</div>"
            + "<div class='subGroup'> подгруппа " + data.timetable[numSubject].subgroup + "</div>"
            + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>"
            + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>"
            + "<div class='timeLesson'>" + timeLessonMnFr[data.timetable[numSubject].numLesson] + "</div>"
            + "<br>";
    }

    allTable.append(dive);
}

function selectGroup(opt) {
    localStorage.setItem("group", opt.value);
    group = opt.value;
    updateTimetableList("Расписание на ");
}

function selectDay(opt) {
    day = opt.value;
    updateTimetableList("Расписание на ");
}


getOptionsList();
updateTimetableList("Расписание на сегодня: ");
