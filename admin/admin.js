var group = localStorage.getItem("group");
if (group === null) {
    group = 1;
}
let date = new Date();
var day = date.getDay();
if (day === 0) {
    day = 1;
}
/*window.addEventListener("resize", function () {
    checkScreenSize.innerHTML = innerWidth + "x" + innerHeight;
}, false);*/
/*
"  2| \nперемена 15 минут\n\n 3|  4| \nперемена 30 минут\n\n 5| 6|
\n\nперемена 30 минут\n\n 7|  8| \nперемена 15 минут\n\n 9| 10|
\n\nперемена 10 минут\n\n11| 17:25 - 18:10\n12| 18:10 - 18:55\n\n"

"Cуббота\n\n\n 1|2| \n\nперемена 5 минут\n\n3|4| \n\nперемена 30 минут\n\n
5| 6| \n\nперемена 10 минут\n\n 7|  8| \n\nперемена 10 минут\n\n
9| 10| \nперемена 5 минут\n\n11| \n12|\n\n"
*/

const timeLessonMnFr = ["", "8:15\n9:00", "9:00\n9:45", "10:00\n10:45", "10:45\n11:30", "12:00\n12:45", "12:45\n13:30", "14:00\n14:45", "14:45\n15:30", "15:45\n16:30", "16:30\n17:15", "17:25\n18:10", "18:10\n18:55"];
const timeLessonSt = ["", "8:15\n9:00", "9:00\n9:45", "9:50\n10:35", "10:35\n11:20", "11:50\n12:35", "12:35\n13:20", "13:30\n14:15", "14:15\n15:00", "15:10\n15:55", "15:55\n16:40", "16:45\n17:30", "17:30\n18:15"];

function deleteOptionsList() {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/removeOptionsRoom",
        type: "post",
        dataType: "json",
        data: {
            "id":2
        },
        success(data) {
            console.log("removed");
 },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}
deleteOptionsList();
function getOptionsList() {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/viewAllOptions",
        type: "get",
        dataType: "json",
        data: {},
        success(data) {
            console.log(data);

            let selectDayOrGroup = [group, day];
            appendInView(data.groups, 'option', groupSelect, selectDayOrGroup[0]);
            appendInView(data.dayOfWeek, 'option', daySelect, selectDayOrGroup[1]);
        },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}

function appendInView(arr, createdElement, appendIn, selectDayOrGroups) {
    let list = [];
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement(createdElement);
        element.append(arr[i].name);
        element.setAttribute("value", arr[i].id);
        element.dataset["id"] = arr[i].id;
        if ((i + 1).toString() === selectDayOrGroups) {
            element.setAttribute("selected", "selected")
        }
        if ((i + 1) === selectDayOrGroups) {
            element.setAttribute("selected", "selected")
        }
        list.push(element);
    }
    appendIn.append(...list);
}

function updateTimetableList(timetableOn) {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/viewTimetable",
        type: "get",
        dataType: "json",
        data: {
            "group": group,
            "day": day
        },
        success(data) {
            console.log(data);

            allTable.innerHTML = "";
            /*
                        userInfo.innerHTML = "";
            */

            let groupNameDiv = document.createElement("div");
            let dayOfWeek = document.createElement("div");

            groupNameDiv.setAttribute("class", "groupName");
            dayOfWeek.setAttribute("class", "dayOfWeek");

            if (data.timetable[0] !== undefined) {
                groupNameDiv.append(data.timetable[0].groupname);
                dayOfWeek.append(data.timetable[0].dayOfWeek);
            } else {
                groupNameDiv.append("Нет занятий!");
            }

            /*
                        userInfo.append(groupNameDiv);
                        userInfo.append(" ");
                        userInfo.append(dayOfWeek);
            */

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
    if (data.timetable[numSubject].subgroup !== 1 || data.timetable[numSubject].subgroup !== "1") {
        if (day === "6") {
            dive.innerHTML = "<br>"
                + "<div class='numLesson lessonBlock'>"
                + data.timetable[numSubject].numLesson
                + "</div>"
                + "<div class='subject lessonBlock'>"
                + data.timetable[numSubject].subject
                + " </div>"
                +
                "<div class='teacher lessonBlock'>"
                + "<img src=\"baseline_person_black_48.png\" alt=\"person\" class=\"teacher_ico_img\">"
                +
                "<div>"
                + data.timetable[numSubject].teacher
                + "</div>"
                + "</div>"
                +
                "<div class='room lessonBlock'>"
                + "<img src=\"baseline_room_black_48.png\" alt=\"person\" class=\"room_ico_img\">"
                +
                "<div>"
                + data.timetable[numSubject].room
                + "</div>"
                + "</div>"
                + "<div class='timeLesson lessonBlock'>"
                + timeLessonSt[data.timetable[numSubject].numLesson]
                + "</div>"
                + "<br>";
        } else {
            dive.innerHTML = "<br>" +
                "<div class='numLesson lessonBlock'>"
                + data.timetable[numSubject].numLesson
                + "</div>"
                + "<div class='subject lessonBlock'>"
                + data.timetable[numSubject].subject
                + " </div>"
                +
                "<div class='teacher lessonBlock'>"
                + "<img src=\"baseline_person_black_48.png\" alt=\"person\" class=\"teacher_ico_img\">"
                +
                "<div>"
                + data.timetable[numSubject].teacher
                + "</div>"
                + "</div>"
                +
                "<div class='room lessonBlock'>"
                + "<img src=\"baseline_room_black_48.png\" alt=\"person\" class=\"room_ico_img\">"
                +
                "<div>"
                + data.timetable[numSubject].room
                + "</div>"
                + "</div>"
                + "<div class='timeLesson lessonBlock'>"
                + timeLessonMnFr[data.timetable[numSubject].numLesson]
                + "</div>"
                + "<br>";
        }
    } else {
        if (day === "6") {
            dive.innerHTML = "<br><div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>"
                + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + " </div>"
                + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>"
                + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>"
                + "<div class='room'>" + data.timetable[numSubject].room + "</div>"
                + "<div class='timeLesson'>" + timeLessonSt[data.timetable[numSubject].numLesson] + "</div>"
                + "<br>";
        } else {
            dive.innerHTML = "<br><div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>"
                + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + "</div>"
                + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>"
                + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>"
                + "<div class='room'>" + data.timetable[numSubject].room + "</div>"
                + "<div class='timeLesson'>" + timeLessonMnFr[data.timetable[numSubject].numLesson] + "</div>"
                + "<br>";
        }
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
