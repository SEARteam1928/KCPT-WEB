
//=====Загрузка страницы==
var groupname = "";
var dataJson = {};
var oldDataPopUp = {}
ajaxPULL();


var popUpEllement = new PopUp();

//============END=============

//=========================BLOCK-HEADER=========================
//Клик
document.querySelector(".block-header").addEventListener("click",function(e){
    if(e.target.classList.contains("block-header__add")){
        // $(".wrap-pop-up").append(popUpEllement.getPopUp({ title: "Группа", who: "group", data: dataJson["list_group"]}));

        if (oldDataPopUp.group){
            console.log("if",oldDataPopUp);
			//создание popup по данным 
            $(".wrap-pop-up").append( popUpEllement.getPopUp(
                {title:"Группа",who:"group",data: dataJson["list_group"] ,value: oldDataPopUp["group"] },
                {title:"Предмет",who:"lesson",data: dataJson["list_lesson"] ,value: oldDataPopUp["lesson"] },
                {title:"Номер урок",who:"numlesson",data: [1,2,3,4,5,6,7,8,9,10,11,12] ,value: oldDataPopUp["numlesson"] },
                {title:"Подгруппа",who:"subgroup",data: [1,2,3,4] ,value: oldDataPopUp["subgroup"] },
                {title:"Кабинет",who:"room",data: dataJson["list_room"] ,value: oldDataPopUp["room"] },
                {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] ,value: oldDataPopUp["week"] }, 
                {title:"Перподаватель",who:"teacher",data: dataJson["list_teacher"] ,value: oldDataPopUp["teacher"] }
                ) 
            );
        } else {
            console.log("else",oldDataPopUp);
            
            $(".wrap-pop-up").append( popUpEllement.getPopUp(
                {title:"Группа",who:"group",data: dataJson["list_group"] },
                {title:"Предмет",who:"lesson",data: dataJson["list_lesson"] },
                {title:"Номер урок",who:"numlesson",data: [1,2,3,4,5,6,7,8,9,10,11,12]},
                {title:"Подгруппа",who:"subgroup",data: [1,2,3,4]},
                {title:"Кабинет",who:"room",data: dataJson["list_room"] },
                {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] }, 
                {title:"Перподаватель",who:"teacher",data: dataJson["list_teacher"]}
                ) 
            );
        }
    }
})
//==============================END=============================

//===================WRAP-CONTENT-BLOCK=========================
//Клик
document.querySelector(".wrap-content-block").addEventListener("click",function(e){
    if(e.target.classList.contains("days-items__tool")){
        if (this.parentElement.querySelector(".days-items__input").value != ""){
            this.parentElement.querySelector(".days-items__input").outerHTML =
                                CreateElementHTML("div",this.parentElement.querySelector(".days-items__input")
                                .value,{"class":"days-items__text"}).outerHTML;
            this.parentElement.querySelector(".days-items__tool").outerHTML = "";
            ajaxPUSH(findAncestorTarget(e,"content-block"));
        }
    }

    if (e.target.classList.contains("content-block-day__tool")){

        if(!this.parentElement.querySelector(".days-items__input")){
            $(".wrap-pop-up").append( popUpEllement.getPopUp(
                {title:"Группа",who:"group",data: dataJson["list_group"] ,value: findAncestorTarget(e, "content-block").querySelector(".content-block__text").innerText},
                {title:"Предмет",who:"lesson",data: dataJson["list_lesson"] },
                {title:"Номер урок",who:"numlesson",data: [1,2,3,4,5,6,7,8,9,10,11,12]},
                {title:"Подгруппа",who:"subgroup",data: [1,2,3,4]},
                {title:"Кабинет",who:"room",data: dataJson["list_room"] },
                {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] , value: findAncestorTarget(e,"content-block-day").querySelector(".day-items__title").innerText  }, 
                {title:"Перподаватель",who:"teacher",data: dataJson["list_teacher"]}
                ) 
            );

        }
    }
});

document.body.addEventListener("closepopup",function(e){
	//AJAX запрос для записи содержимого popup в базу данных
    ajaxPUSH(popUpEllement.getAllValue());

    //Здесь когда будет полностью ооп проект то надо сделать это через интерфейс соответсвующего элемента(самой структуры)
    createStructureTree(popUpEllement.getAllValue());

    oldDataPopUp = popUpEllement.getAllValue();
});

//Двойной клик
document.querySelector(".wrap-content-block").addEventListener("dblclick",function(e){
  if(e.target.classList.contains("days-items__text")){
      if (!e.target.parentElement.querySelector(".days-items__input")){
        var input = CreateElementHTML("input","",{"class":"days-items__input"});
        input.defaultValue = e.target.innerText;
        var items__tool = CreateElementHTML("div","",{"class":"days-items__tool"});
        e.target.outerHTML = items__tool.outerHTML + input.outerHTML;
      }
  }
  if (e.target.classList.contains("content-block__text")){
      $(".wrap-pop-up").append(popUpEllement.getPopUp({title:"Группа",who:"group",data: dataJson["list_group"] ,value: e.target.innerText}));
  }
});
//==============================END=============================

//==============CREATE-ELEMENT=================
function createEll_ContentBlock (){
    // var block__tool = CreateElementHTML("div","",{"class":"content-block__tool"})
    var day__tool = CreateElementHTML("div","",{ "class":"content-block-day__tool"});
    var block__text = CreateElementHTML("div",groupname,{"class":"content-block__text"});
    var contentBlock = CreateElementHTML("div",block__text.outerHTML,{"class":"content-block"});
    var daysItems = CreateElementHTML("div","",{"class":"wrap-days-items"});

    ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"].forEach(function(item) {
        var days__text = CreateElementHTML("div",item,{"class":"day-items__title"});
        contentBlock.innerHTML += CreateElementHTML("div",day__tool.outerHTML +
                                                    days__text.outerHTML + daysItems.outerHTML,{"class":"content-block-day"}).outerHTML;
    });

    return contentBlock;
};

function createEll_DaysItems(vall){
    var vall = vall || "";
    var input = CreateElementHTML("input","",{"class":"days-items__input"})
    input.defaultValue = vall
    var items__tool = CreateElementHTML("div","",{"class":"days-items__tool"})
    var items = CreateElementHTML("div",items__tool.outerHTML +
                                    input.outerHTML,{"class":"days-items"})
    return items
};
//====================END======================

//===========AJAX==============
function ajaxPUSHSeccess(data){
    // alert(data);

    // var answer = data;
    // document.querySelector(".block-header__text").innerHTML ="(PHP REQUEST:"+answer+")"
};

//Получение данных с сервера
function ajaxPULLSeccess(data){
	// console.log(data);
    // console.log(JSON.stringify(data));
    // dataJson = JSON.parse(data);
    dataJson = data;
    // alert(data);
    // var data_text = "";
    // groupname = dataJson["data"][0]["group"]|| "ошибка";
    // $(".wrap-content-block").append(createEll_ContentBlock());
    // dataJson = dataJson || {};
    let checkGroupInTree = function (ell , check){
        for(let i = 0; i < ell.length; i++){
            if (ell[i].innerText == check){
                return true;
            }
        }
        return false;
    }
    console.log(dataJson);
    dataJson["data"] = dataJson["data"] || {};
    for(let i = 0; i < dataJson["data"].length ; i++){
        if (checkGroupInTree ( document.querySelectorAll(".content-block__text") , dataJson["data"][i]["group"])){
            // let groupList = document.querySelectorAll(".content-block__text");

            createStructureTree(dataJson["data"][i]);

            // for(let j = 0; j < groupList.length; j++){
            //     console.log(dataJson["data"][i]["group"]);
            //     if (dataJson["data"][i]["group"] == groupList[j].innerText){
            //         createStructureTree(dataJson["data"][i]);
            //     }
            // }

        }else{
            groupname = dataJson["data"][i]["group"]|| "ошибка";
            $(".wrap-content-block").append(createEll_ContentBlock());
            createStructureTree(dataJson["data"][i]);
        }
        
        
    }
    // lesson = document.querySelectorAll(".content-block-day")

    // //Генерация страницы из данных
    // for (var i = 0;i<lesson.length;i++){
    //     data_text = "";
    //     if (i in dataJson){
    //         for (var j = 0;j<Object.keys(dataJson[i]).length;j++){
    //             //Создание элемента в поле дня
    //             data_text += CreateElementHTML("div",dataJson[i][j],{"class":"days-items__text"}).outerHTML;
    //         }
    //         //Создание обертки для элементов дня
    //         lesson[i].querySelector(".wrap-days-items").innerHTML =
    //                                 CreateElementHTML("div",data_text,{"class":"days-items"}).outerHTML;
    //     }
    // }
};

//ajax push request in the server
// function ajaxPUSH(ancestor){
//     var PUSH = {};
//     var group = ancestor
//     var nameGroup = group.querySelector(".content-block__text").innerText;
//     PUSH["group"] = nameGroup;
//     var day = group.querySelectorAll(".content-block-day")
//     for (var j = 0;j<day.length; j++){
//         var lessons = day[j].querySelectorAll(".days-items__text");
//         var lesson = [];
//         for (var k = 0;k<lessons.length; k++){

//             lesson[k] = lessons[k].innerText;
//         }
//         PUSH[j] = lesson;
//     }

//     $.ajax({
//         url: "bin/php/ajaxPUSH.php",
//         type:"POST",
//         data: PUSH ,
//         datatype: "json",
//         success: ajaxPUSHSeccess
//     });
//     // console.log(parametrs);
// };

let ajaxPUSH = function(options,prefics){
    let {is_del ="false"} = prefics || {is_del:"false"};
    let req = {
        who: "all",
        is_del,
    }
    req["data"] = options;
	console.log(req);
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/admin/push",
        type:"POST",
        data: req ,
        datatype: "json",
        success: ajaxPUSHSeccess
    });
}

function ajaxPULL(){
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/admin/pull",
        type:"POST",
        data: {
            who:"all"
        } ,
		datatype: "json",
        success: ajaxPULLSeccess
    });
};
//=============END=============
//======POP-UP=====
function onClickPopUPEditor(ell){
    $(".pop-up__blur").click(function(){
        groupname = document.querySelector(".selector__input").value
        document.querySelector(".wrap-pop-up").innerHTML = "";
        ell.innerText = groupname;
    });
};

// функция для создания pop up окна,
//     val - значение input'а (для изменений по двойному щелчку, по умолчанию ""),
//     func() - функция дял создания контента(по умалчанию создает один инпут + название{группа} + генерируемое содержимое(список групп совпавших с введенным текстом));
// Я решил внедрить функцию потому что контент может отличаться и тем саммым я делаю создание pop up окна более универсальным
function createEll_popUP(val,func){
    var val = val || "";

    var func = func || function (select){

        let selector = new SelectorWichFind({title:"Группа",who:"group",data: dataJson["list_group"] }).getSelector();

        // var text = CreateElementHTML("div","Группа",{"class":"selector__text"});
        // var input = CreateElementHTML("input","",{"class":"selector__input"});
        // var inputId = CreateElementHTML("div","",{"class":"input-id"});

        // var text = CreateElementHTML("div","Группа",{"class":"pop-up__text"});
        // var input = CreateElementHTML("input","",{"class":"pop-up__input"});
        // input.defaultValue = val;

        // let html = CreateElementHTML("div",text.outerHTML + input.outerHTML + inputId.outerHTML,{"class":"selector"}).outerHTML;
        return select.append(selector);
    }

    let html = document.createElement("div");
    html.classList = "pop-up";

    var blur = CreateElementHTML("div", "", {"class" : "pop-up__blur"} );
    let selectors = CreateElementHTML("div","", {"class":"pop-up-content flex"} );
    func(selectors);
    
    // selector.append(func());
    // var selector = CreateElementHTML("div", func(), {"class":"pop-up-content"} );
    html.append(blur);
    html.append(selectors);
    // var html = CreateElementHTML("div",blur.outerHTML + selector.outerHTML,{"class":"pop-up"});
    console.log(html);
    
    return html;
}

function createStructureTree(options) {
    let titles = document.querySelectorAll(".content-block__text");
    for (let i = 0; i < titles.length; i++){
        if (options.group == titles[i].innerText){
            let wrapDay = findAncestor(titles[i],"content-block").querySelectorAll(".wrap-days-items"); 
            // console.log(wrapDay);
            let listDay = findAncestor(titles[i],"content-block").querySelectorAll(".day-items__title");
            for (let j = 0; j < wrapDay.length; j++ ){
                if (options.week == listDay[j].innerText){
                    let numlesson = document.createElement("div");
                    let subgroup = document.createElement("div");
                    let lesson = document.createElement("div");
                    let teacher = document.createElement("div");
                    let room = document.createElement("div");
                    let remove = document.createElement("div");
                    let edit = document.createElement("div");

                    numlesson.innerText = options.numlesson;
                    subgroup.innerText = options.subgroup;
                    lesson.innerText = options.lesson;
                    teacher.innerText = options.teacher;
                    room.innerText = options.room;
                    remove.innerText = "X";
                    edit.innerText = "C";


                    numlesson.dataset["whoIs"] = "numlesson";
                    subgroup.dataset["whoIs"] = "subgroup";
                    lesson.dataset["whoIs"] = "lesson";
                    teacher.dataset["whoIs"] = "teacher";
                    room.dataset["whoIs"] = "room";

                    numlesson.classList = "items";
                    subgroup.classList = "items";
                    lesson.classList = "items";
                    teacher.classList = "items";
                    room.classList = "items";
                    remove.classList = "items";
                    edit.classList = "items";
                    
                    let continer = document.createElement("div");
                    continer.classList = "day-items";

                    continer.append(numlesson);
                    continer.append(subgroup);
                    continer.append(lesson);
                    continer.append(teacher);
                    continer.append(room);
                    continer.append(remove);
                    continer.append(edit);

                    continer.ondblclick = function (){
                        continer.outerHTML = "";
                        ajaxPUSH(options, {is_del:true});
                        $(".wrap-pop-up").append( popUpEllement.getPopUp(
                            {title:"Группа",who:"group",data: dataJson["list_group"] , value: options.group},
                            {title:"Предмет",who:"lesson",data: dataJson["list_lesson"] , value: options.lesson },
                            {title:"Номер урок",who:"numlesson",data: [1,2,3,4,5,6,7,8,9,10,11,12] , value: options.numlesson},
                            {title:"Подгруппа",who:"subgroup",data: [1,2,3,4] , value: options.subgroup},
                            {title:"Кабинет",who:"room",data: dataJson["list_room"] , value: options.room },
                            {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] , value: options.week }, 
                            {title:"Перподаватель",who:"teacher",data: dataJson["list_teacher"] , value: options.teacher }
                            ) 
                        );
                    }

                    edit.onclick = function (){
                        
                        let items = continer.querySelectorAll(".items[data-who-is]");
                        alert(items);
                        allValue = {};
                        [].forEach.call(items,function(item){
                            let value = item.innerText;
                            let key = item.dataset["whoIs"];
                            allValue[key] = value

                        });

                        allValue["week"] = findAncestor(continer,"content-block-day").querySelector(".day-items__title").innerText;
                        allValue["group"] = findAncestor(continer,"content-block").querySelector(".content-block__text").innerText;
                        
                        console.log(allValue);
                        
                        oldDataPopUp = allValue;
                    }

                    remove.onclick = function(){
                        continer.outerHTML = "";
                        ajaxPUSH(options, {is_del:true});

                    };

                    
                    wrapDay[j].append(continer);

                    // console.log(Day);
                }
            }
            break;
        }
    }
}

// function createSoursAdditions (data){
//     console.log(data);
//     let popup = document.querySelector(".wrap-pop-up");
//     let inputId = this;
//     console.dir(popup);
//     let list = data;

//     popup.onclick = function(e){
//         if(e.target.classList.contains("selector__input")){
//             console.log("click");
//             console.log(list.length);

//             for (let i = 0;i<list.length;i++){
//                 let content = list[i];
//                 let item = CreateElementHTML("li",content,{class:"input-id__item"});
//                 console.log(item);
//             }
//         }
//     };
//     popup.oninput = function(e){
//         // console.log("input1");
//         if(e.target.classList.contains("selector__input")){
//             console.log("input");
//             if(data){

//                 for (let i = 0;i<data.length;i++){
//                     let content = data[i];
//                     let item = CreateElementHTML("div",content,{class:"input-id__item"});
//                     this.append(item)
//                 }

//             }

//         }
//     }
// }


// console.log(optionWeekButton({"title":"День недели",who:"teacher",data: [1,2,3,4]}));
// function autoAdditions (){

// }

//=======END=======

// let selector = new SelectorWichFind({
//     who:"room",
//     data:["КЦПТ","Колдун","Волшебник", "Волун","Россия"]
//     })

// document.body.append(selector.getSelector());
// console.log(selector.getOptions());

// selector.setOptions({
//     who:"teacher",
//     data:["КЦПТ","Колдун","Колшебник", "Колун","Россия"]
//     });

// document.body.append(selector.getSelector());

// selector.upDataOptions({data:["Работает", "Так", "Как", "Надо"]})
// document.body.append(selector.getSelector());

// var popUpEllement = new PopUp(
//     function (self) { 
        
//         let group = {title:"Группа",who:"group",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] };
//         let lesson = {title:"Предмет",who:"lesson",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] };
//         let room = {title:"Кабинет",who:"room",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] };
//         let week = {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"] };  
//         let teacher = {title:"Перподаватель",who:"teacher",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]};  

//         return optionWeekButton.call(self,week,teacher,group,lesson,room);
//     },
//     {title:"Группа",who:"group",data: [] }
// );

// setTimeout( console.log(popUpEllement.getPopUp()),3000);
// document.body.append(popUpEllement.getPopUp());
