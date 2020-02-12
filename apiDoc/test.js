var group = localStorage.getItem("group");
if (group === null) {
    group = 1;
}
let date = new Date();
var day = date.getDay();
if (day === 0) {
    day = 1;
}

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
            for(let i = 0; i < data.timetable.length; i++){
                createTableLine(data,i);
            }
        },
        error(header, textError) {
            console.log(header.status, header.statusText);
            alert("ААА ПАНИКА ПАНИКАААААА");
        }

    });
}

function createTableLine(data,numSubject) {
    let dive = document.createElement('div');

    dive.setAttribute("class","tableLine");

    dive.innerHTML  ="<div class='dayOfWeek'>" + data.timetable[numSubject].day + "</div>"
        +"<div>" + data.timetable[numSubject].groupname + "</div>"
        + "<div> номер урока " + data.timetable[numSubject].hour + "</div>"
        + "<div> подгруппа " + data.timetable[numSubject].subgroup +"</div>"
        + "<div>" + data.timetable[numSubject].subject +" </div>"
        + "<div>" + data.timetable[numSubject].teacher +"</div>";
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
