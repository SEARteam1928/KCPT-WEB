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
"  2| \nперемена 15 минут\n\n 3|  4| \nперемена 30 минут\n\n 5| 6|
\n\nперемена 30 минут\n\n 7|  8| \nперемена 15 минут\n\n 9| 10|
\n\nперемена 10 минут\n\n11| 17:25 - 18:10\n12| 18:10 - 18:55\n\n"

"Cуббота\n\n\n 1|2| \n\nперемена 5 минут\n\n3|4| \n\nперемена 30 минут\n\n
5| 6| \n\nперемена 10 минут\n\n 7|  8| \n\nперемена 10 минут\n\n
9| 10| \nперемена 5 минут\n\n11| \n12|\n\n"
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
            let groupNameDiv = document.createElement("div");
            groupNameDiv.setAttribute("class","groupName");
            groupNameDiv.append(data.timetable[0].groupname);
            userInfo.append(groupNameDiv);
            userInfo.append(" ");
            let dayOfWeek = document.createElement("div");
            dayOfWeek.setAttribute("class","dayOfWeek");
            dayOfWeek.append(data.timetable[0].dayOfWeek);
            userInfo.append(dayOfWeek);
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
        dive.innerHTML = "<br><div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>"
            + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + " подгруппа </div>"
            + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>"
            + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>"
            + "<div class='timeLesson'>" + timeLessonSt[data.timetable[numSubject].numLesson] + "</div>"
            + "<br>";
    } else {
        dive.innerHTML = "<br><div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>"
            + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + " подгруппа </div>"
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
