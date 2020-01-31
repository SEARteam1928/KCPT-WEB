
ajaxPULL()


function createEll_ID (vall) {
    defaultVall = vall || ""
    var save = CreateElementHTML("div","Save",{"class":"id__save"});
    var cancel = CreateElementHTML("div","Cancel",{"class":"id__cancel"});
    var input = CreateElementHTML("input","",{"class":"id__input"});
    input.defaultValue = defaultVall;
    var html = CreateElementHTML("div",save.outerHTML + input.outerHTML + cancel.outerHTML,{"class":"id"})
    return html.outerHTML
}

function createEll_IDText(vall,id){
    var text = CreateElementHTML("div",vall,{"class":"id__text"})
    text.setAttribute("data-id-content",id)
    return text.outerHTML
}

function sortIdContent(e){
    var len = e.childNodes.length;
    // console.log(e);
    for (var i = 1; i<len; i++){
        e.childNodes[i].setAttribute("data-id-content",i);
    }
}

function ajaxPUSH(e,del,vall,oldvall,id){
    var id = id;
    // console.log(id);
    var is_del = del || false;
    var what = vall || "";
    var oldwhat = oldvall || "";
    var who_html = findAncestorTarget(e,"item__items");
    var who = who_html.getAttribute("data-who-is");
    // console.log(what);
    // console.log(oldwhat);
	console.log({
            who:who,
            what:what,
            oldWhat:oldwhat,
            is_del:is_del,
            id:id
        });
    $.ajax({
        url: "http://timetable.kcpt-1.ru/api/admin/push",
        type:"POST",
        data: {
            who:who,
            what:what,
            oldWhat:oldwhat,
            is_del:is_del,
            id:id
        } ,
        datatype: "json",
        success:function(data){
            alert(data);
        }
    });
}

function ajaxPULL(){
    var id = document.querySelectorAll(".item__items")
    id.forEach( items =>{
        var who = items.getAttribute("data-who-is");
		console.log(who);
        $.ajax({
            url: "http://timetable.kcpt-1.ru/api/admin/pull",
            type:"POST",
            data: {
                who:who
            } ,
            datatype: "json",
            success:answer
        });
    })
}

function answer(data){
    // alert(JSON.parse(data));
    // var data = JSON.parse(data);
    // alert(data[1][1]);
    var container = document.querySelector("div[data-who-is="+data[0]+"]")
    for (var i = 1;i<data.length;i++){
        container.innerHTML += createEll_IDText(data[i][1],data[i][0]);
    }

}

document.querySelector(".content-block").addEventListener("click",function(e){
    if (e.target.classList.contains("item__add")){
        if (!e.path[1].querySelector(".id")){
            e.path[1].querySelector(".item__items").innerHTML += createEll_ID();
        }
    }

    if(e.target.classList.contains("id__save")){
        if(e.path[1].querySelector(".id__input").value != ""){
            var vall = e.path[1].querySelector(".id__input").value;
            var id = GLOBAL_oldId || e.path[2].querySelectorAll(".id__text").length + 1;
            e.path[1].outerHTML = createEll_IDText(vall,id);
            ajaxPUSH(e,false,vall,GLOBAL_oldVall,id);
            GLOBAL_oldVall = "";
            GLOBAL_oldId = 0;
        }
    }

    if (e.target.classList.contains("id__cancel")){
        vall = e.path[1].querySelector(".id__input").value;
        e.path[1].outerHTML = "";
        if (GLOBAL_oldVall != ""){
            console.log( findAncestorTarget(e,"item__items") );
            sortIdContent( findAncestorTarget(e,"item__items") );
        }
        id = GLOBAL_oldId || e.path[2].querySelectorAll(".id__text").length + 1; ;
        ajaxPUSH(e,true,vall,GLOBAL_oldVall,id);
        GLOBAL_oldVall = "";
        GLOBAL_oldId = 0;
    }
});

document.querySelector(".content-block").addEventListener("dblclick",function(e){
    if (e.target.classList.contains("id__text")){

        // ajaxPUSH(e,true)
        var vall = e.target.innerText;
        var id = e.target.getAttribute("data-id-content");
        GLOBAL_oldVall = vall;
        GLOBAL_oldId = id;
        e.target.outerHTML = createEll_ID(vall)
    }
});

var GLOBAL_oldVall = "";
var GLOBAL_oldId = 0;
