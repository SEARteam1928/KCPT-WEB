function clock(){
    var date = new Date(),
        hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
        minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();


    var day=new Date();
    var weekday=new Array(7);
    weekday[0]="Воскресенье";
    weekday[1]="Понедельник";
    weekday[2]="Вторник";
    weekday[3]="Среда";
    weekday[4]="Четверг";
    weekday[5]="Пятница";
    weekday[6]="Суббота";

    var mounth = new Array(12);
    mounth[0]="янв.";
    mounth[1]="фев.";
    mounth[2]="мар.";
    mounth[3]="апр.";
    mounth[4]="май.";
    mounth[5]="июн.";
    mounth[6]="июл.";
    mounth[7]="авг.";
    mounth[8]="сен.";
    mounth[9]="окт.";
    mounth[10]="ноя.";
    mounth[11]="дек.";

    document.getElementById("clock").innerHTML = hours + ':' + minutes + ":"+ seconds +"   "+ weekday[day.getDay()]+" "+day.getDate() + " " + mounth[day.getMonth()] +" "+day.getFullYear();
}

setInterval(clock, 2000);
clock();

let group = localStorage.getItem("group");
if (group === null) {
    group = 1;
}
let room = null;
if (room === null) {
    room = "1";
}
let subject = null;
if (subject === null) {
    subject = 1;
}
let teacher = null;
if (teacher === null) {
    teacher = 1;
}
let date = new Date();
let day = date.getDay();
if (day === 0) {
    day = 1;
}


class Lesson {
    constructor(id, day, group, numLesson, subGroup, subject, teacher, room) {
        this.id = id;
        this.day = day;
        this.group = group;
        this.numLesson = numLesson;
        this.subGroup = subGroup;
        this.subject = subject;
        this.teacher = teacher;
        this.room = room;
    }

    clearAllData() {
        this.id = null;
        this.day = null;
        this.group = null;
        this.numLesson = null;
        this.subGroup = null;
        this.subject = null;
        this.teacher = null;
        this.room = null;
    }

    addOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/addLessonInTimetable",
            type: "post",
            dataType: "json",
            data: {
                day: this.day,
                group: this.group,
                numLesson: this.numLesson,
                subgroup: this.subGroup,
                subject: this.subject,
                teacher: this.teacher,
                room: this.room
            },
            success(data) {
                console.log(" added!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
    editOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/editLessonInTimetable",
            type: "post",
            dataType: "json",
            data: {
                id: this.id,
                day: this.day,
                group: this.group,
                numLesson: this.numLesson,
                subgroup: this.subGroup,
                subject: this.subject,
                teacher: this.teacher,
                room: this.room
            },
            success(data) {
                console.log(" added!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
    delOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/removeLessonInTimetable",
            type: "post",
            dataType: "json",
            data: {
                id: this.id
            },
            success(data) {
                console.log(" added!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
}

class TeacherOption {
    constructor(optName, id, firstName, middleName, lastName, fullName) {
        this.id = id;
        this.optName = optName;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = fullName;
    }

    clearAllData() {
        this.id = null;
        this.firstName = null;
        this.middleName = null;
        this.lastName = null;
        this.fullName = null;
    }

    addOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/addOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                fullName: this.fullName
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Добавлено!";
                console.log(" added!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
    editOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/editOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                oldId: this.id,
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                fullName: this.fullName
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Отредактировано!";
                console.log(" edited!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
    delOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/removeOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                id: this.id
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Удалено!";
                console.log(" deleted!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }
}

// optName, id, name
class Options {
    constructor(optName, id, name) {
        this.id = id;
        this.name = name;
        this.optName = optName;
    }

    clearAllData() {
        this.id = null;
        this.name = null;
    }

    addOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/addOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                name: this.name,
                shortName: ""
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Добавлено!";
                console.log(" added!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }

    delOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/removeOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                id: this.id
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Удалено!";
                console.log(" deleted!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }

    editOpt() {
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/v3/editOptions" + this.optName,
            type: "post",
            dataType: "json",
            data: {
                oldId: this.id,
                name: this.name,
                shortName: ""
            },
            success(data) {
                document.getElementById("clock").innerHTML = "Отредактировано!";
                console.log(" edited!");
                refreshData()
            },
            error(header, textError) {
                console.log(header.status, header.statusText);
                alert(textError);
            }
        });
    }

}

function create(optIndex) {
    let optName = "";
    let opt = undefined;
    if(optIndex===0){
        optName = "Group";
        opt = new Options(optName, null, prompt("Введите название группы"));
    }
    if(optIndex===2){
        optName = "Room";
        opt = new Options(optName, null, prompt("Введите номер кабинета"));
    }
    if(optIndex===3){
        optName = "Subject";
        opt = new Options(optName, null, prompt("Введите название предмета"));
    }
    if(optIndex===4){
        optName = "Teacher";
        opt = new TeacherOption(optName, null, prompt("Введите Имя преподавателя"),prompt("Введите Отчество преподавателя"),prompt("Введите фамилию преподавателя"),undefined);
    }
    if(optIndex===5){
        opt = new Lesson( null,day,group,lessonNumInput.value,subGroupNumInput.value,subject,teacher,room);
    }
    alert("группа "+group+" день "+day+" предмет "+subject+" номер урока "+lessonNumInput.value
        +" номер подгруппы "+subGroupNumInput.value+" преподаватель "+teacher+" кабинет "+room);
    opt.addOpt();
    opt.clearAllData();
    refreshData()
}
function del(optIndex) {
    let optName = "";
    let opt = undefined;
    if(optIndex===0){
        optName = "Group";
        opt = new Options(optName, group,null);
    }
    if(optIndex===2){
        optName = "Room";
        opt = new Options(optName, room,null);
    }
    if(optIndex===3){
        optName = "Subject";
        opt = new Options(optName, subject,null);
    }
    if(optIndex===4){
        optName = "Teacher";
        opt = new Options(optName, teacher,null);
    }
    if(optIndex===5){
        opt = new Lesson(lessonIdInput.value, null,null,null,null,null,null,null);
    }
    opt.delOpt();
    opt.clearAllData();
    refreshData()
}


const timeLessonMnFr = ["", "8:15\n9:00", "9:00\n9:45", "10:00\n10:45", "10:45\n11:30", "12:00\n12:45", "12:45\n13:30", "14:00\n14:45", "14:45\n15:30", "15:45\n16:30", "16:30\n17:15", "17:25\n18:10", "18:10\n18:55"];
const timeLessonSt = ["", "8:15\n9:00", "9:00\n9:45", "9:50\n10:35", "10:35\n11:20", "11:50\n12:35", "12:35\n13:20", "13:30\n14:15", "14:15\n15:00", "15:10\n15:55", "15:55\n16:40", "16:45\n17:30", "17:30\n18:15"];


function getOptionsList() {
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/v3/viewAllOptions",
        type: "get",
        dataType: "json",
        data: {},
        success(data) {
            console.log(data);

            let selectDayOrGroup = [group, day, room, subject, teacher];
            clearSelect(groupSelect);
            clearSelect(daySelect);
            clearSelect(roomSelect);
            clearSelect(subjectSelect);
            clearSelect(teacherSelect);
            appendInView(data.groups, 'option', groupSelect, selectDayOrGroup[0], 0);
            appendInView(data.dayOfWeek, 'option', daySelect, selectDayOrGroup[1], 0);
            appendInView(data.rooms, 'option', roomSelect, selectDayOrGroup[2], 0);
            appendInView(data.subject, 'option', subjectSelect, selectDayOrGroup[3], 0);
            appendInView(data.teachers, 'option', teacherSelect, selectDayOrGroup[4], 1);
        },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}

function clearSelect(selectName) {
    selectName.innerHTML = ""
}

function appendInView(arr, createdElement, appendIn, selectDayOrGroups, teacherOrNot) {
    let list = [];
    let element1 = document.createElement(createdElement);
    element1.setAttribute("value", "Выберите");
    element1.innerHTML = "Выберите";
    element1.setAttribute("selected", "selected")

    list.push(element1);
    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement(createdElement);
        if (teacherOrNot === 0) {
            element.append(arr[i].name);
        }
        if (teacherOrNot === 1) {
            element.append(arr[i].full_name);
        }
        element.setAttribute("value", arr[i].id);
        element.dataset["id"] = arr[i].id;
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
            dive.innerHTML = "<br>" +"<div>"+data.timetable[numSubject].id+"</div>"+ "<div class='numLesson lessonBlock'>" + data.timetable[numSubject].numLesson + "</div>" + "<div class='subject lessonBlock'>" + data.timetable[numSubject].subject + " </div>" + "<div class='teacher lessonBlock'>" + "<img src=\"baseline_person_black_48.png\" alt=\"person\" class=\"teacher_ico_img\">" + "<div>" + data.timetable[numSubject].teacher + "</div>" + "</div>" + "<div class='room lessonBlock'>" + "<img src=\"baseline_room_black_48.png\" alt=\"person\" class=\"room_ico_img\">" + "<div>" + data.timetable[numSubject].room + "</div>" + "</div>" + "<div class='timeLesson lessonBlock'>" + timeLessonSt[data.timetable[numSubject].numLesson] + "</div>" + "<br>";
        } else {
            dive.innerHTML = "<br>" + "<div>"+data.timetable[numSubject].id+"</div>"+ "<div class='numLesson lessonBlock'>" + data.timetable[numSubject].numLesson + "</div>" + "<div class='subject lessonBlock'>" + data.timetable[numSubject].subject + " </div>" + "<div class='teacher lessonBlock'>" + "<img src=\"baseline_person_black_48.png\" alt=\"person\" class=\"teacher_ico_img\">" + "<div>" + data.timetable[numSubject].teacher + "</div>" + "</div>" + "<div class='room lessonBlock'>" + "<img src=\"baseline_room_black_48.png\" alt=\"person\" class=\"room_ico_img\">" + "<div>" + data.timetable[numSubject].room + "</div>" + "</div>" + "<div class='timeLesson lessonBlock'>" + timeLessonMnFr[data.timetable[numSubject].numLesson] + "</div>" + "<br>";
        }
    } else {
        if (day === "6") {
            dive.innerHTML = "<br>"+"<div>"+data.timetable[numSubject].id+"</div>"+ "<div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>" + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + " </div>" + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>" + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>" + "<div class='room'>" + data.timetable[numSubject].room + "</div>" + "<div class='timeLesson'>" + timeLessonSt[data.timetable[numSubject].numLesson] + "</div>" + "<br>";
        } else {
            dive.innerHTML = "<br>"+"<div>"+data.timetable[numSubject].id+"</div>"+ "<div class='numLesson'>" + data.timetable[numSubject].numLesson + "</div>" + "<div class='subGroup'>" + data.timetable[numSubject].subgroup + "</div>" + "<div class='subject'>" + data.timetable[numSubject].subject + " </div>" + "<div class='teacher'>" + data.timetable[numSubject].teacher + "</div>" + "<div class='room'>" + data.timetable[numSubject].room + "</div>" + "<div class='timeLesson'>" + timeLessonMnFr[data.timetable[numSubject].numLesson] + "</div>" + "<br>";
        }
    }
    allTable.append(dive);
}

function selectGroup(opt) {
    localStorage.setItem("group", opt.value);
    group = opt.value;
    updateTimetableList("Расписание на ");
}

function selectRoom(opt) {
    room = opt.value;
    updateTimetableList("Расписание на ");
}
function selectSubject(opt) {
    subject = opt.value;
    updateTimetableList("Расписание на ");
}

function selectTeacher(opt) {
    teacher = opt.value;
    updateTimetableList("Расписание на ");
}
function selectDay(opt) {
    day = opt.value;
    updateTimetableList("Расписание на ");
}


getOptionsList();
updateTimetableList("Расписание на сегодня: ");

function refreshData() {
    getOptionsList();
    updateTimetableList("Расписание на сегодня: ");
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


/*let groupOpt = new Options("Group",18,null,null,null,null,null);
alert(groupOpt.id)
groupOpt.clearAllData()
alert(groupOpt.id)*/
/*let groupOpt = new Options("Group",18,null,null,null,null,null);
groupOpt.delOpt();
groupOpt.id = null;
groupOpt.name = "CreatedNew2";
groupOpt.addOpt();
groupOpt.name = prompt("He");
groupOpt.addOpt();*/