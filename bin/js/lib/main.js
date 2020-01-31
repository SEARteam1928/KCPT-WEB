//Поиск у отца с классом у элементу
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
};

//поиск у отца элемента с классом по e.target у элемента
function findAncestorTarget(el,cls){
    for (var i = 0;i<el.path.length;i++){
        var ell = el.path[i];
        if (ell.classList.contains(cls)){
            return ell;
        }
    }
    return el;
};

//функция содания html объекта
function CreateElementHTML(tag,text,attributes){
    var is_atr = ["class","id","name","src","alt"];
    var html = document.createElement(tag);
    html.innerHTML = text;
    for (var key in attributes){
        if(is_atr.indexOf(key)!=-1){
           html.setAttribute(key,attributes[key])
        }
    }
    return html;
};

function PopUp(){
    let self = this;
    let allValue = {};

    let defaultOptions = {title:"День недели",who:"week",data: ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"] };

    let callback = function (optRest){
        let self = this; 
        let rest = optRest.length ? optRest : defaultOptions;
         
        for(let i = 0; i < rest.length; i++){

            let selector = new SelectorWichFind(rest[i]).getSelector();
            
            self.append(selector);
        }
    }

    let create = function (tag){
        return document.createElement(tag);
    }

    let open = function(el){
        el.classList.add("open");
    }
    
    let close = function(el){
        el.classList.remove("open");
    }
    
    let toggle = function(el){
        !el.classList.contains("open") ? open(el) : close(el);
    }

    let isValue = function(el){
        let isValueInput = true;
        let inputs = el.querySelectorAll("input");
        [].forEach.call(inputs,function(item){
            if (item.value == "") {
                isValueInput = false;
            };
        });
        return isValueInput;
    }

    // let allValue = (function(){
    //     let value = {};
    //     return function (...rest){
    //         if(rest.length != 0){
    //             value[rest[0]] = rest[1]
    //         } else {
    //             return value
    //         }
    //     }
    // })();

    let findAllValue = function(el){
        let inputs = el.querySelectorAll("input");
        allValue = {};
        [].forEach.call(inputs,function(item){
            let value = item.value;
            let key = findAncestor(item,"selector").dataset["whoIs"];
            allValue[key] = value

        });
    }

    let render = function(options){
        let popUp = create("div");
        popUp.classList = "pop-up";

        let blur = CreateElementHTML("div", "", {"class" : "pop-up__blur"} );
        let selectors = CreateElementHTML("div","", {"class":"pop-up-content flex"} );
        callback.call(selectors,options);

        popUp.append(blur);
        popUp.append(selectors);

        popUp.onclick = function(e){
            if(e.target.classList.contains("pop-up__blur")){
                let check = isValue(popUp);
                if(check){
                    findAllValue(popUp);
                    let event = new CustomEvent("closepopup",{bubbles:true});
                    popUp.dispatchEvent(event);
                    popUp.outerHTML = "";
                }
            }
        }

        return popUp;
    }

    let getPopUp = function(...rest) {
        return render(rest);
    }

    let getAllValue = function() {
        return allValue;
    }

    this.getAllValue = getAllValue;
    this.getPopUp = getPopUp;
}


function SelectorWichFind(options = {}){
    var self = this;
    
    let create = function (tag){
        return document.createElement(tag);
    }
    
    let open = function(el){
        el.classList.add("open");
    }
    
    let close = function(el){
        el.classList.remove("open");
    }
    
    let toggle = function(el){
        !el.classList.contains("open") ? open(el) : close(el);
    }

    let render = function(){
        let {title="",who="",data=[],value=""} = options;
        
        //create selector DOM
        let selector = create("div");
        selector.classList = "selector";
        selector.setAttribute("data-who-is",who);
    
        //create ul-list DOM
        let ul = create("ul");
        ul.classList = "selector__list";
    
        //create heading DOM
        let heading = create("div");
        heading.classList = "selector__title";
        heading.innerHTML = title;
    
        //create find DOM
        let find = create("input");
        find.defaultValue = value;
        find.classList = "selector__list list";
    
        //filling selector, DOM elements
        selector.append(heading);
        selector.append(find);
        selector.append(ul);
        
        //event onClick on selector
        selector.onclick = function(e){
    
            if(e.target.classList.contains("selector__list")){
                //if ul-list close
                if(!ul.classList.contains("open")){
                    //create elements for ul-list
                    for (let i = 0; i < data.length; i++){
                        let li = create("li");
                        li.classList = "list__item";
                        li.innerHTML = data[i];
        
                        ul.append(li);
                    }
    
                } else {
                    ul.innerHTML = "";
                }
                toggle(ul);
                
            }
    
            if(e.target.classList.contains("list__item")){
                find.value = e.target.innerText;
                ul.innerHTML = "";
                ul.classList.remove("open");
            }
        };
        //event onInput on selector
        selector.oninput = function(e){
    
            if(e.target.classList.contains("selector__list")){
                value = e.target.value;
                //search value in array 'data'
                let search = data.filter( item => item.startsWith(find.value));
                
                ul.innerHTML = "";
    
                for (let i = 0; i < search.length; i++){
                    let li = create("li");
                    li.classList = "list__item";
                    li.innerHTML = search[i];
    
                    ul.append(li);
                }
            }
        };
        return selector;
    }

    let getSelector = function(){
        return render();
    }

    let getOptions = function (){
        return options.copy();
    }

    let setOptions = function(newOptions){
        options = newOptions;
    }

    let upDataOptions = function(upDataOptions){
        for (let key in upDataOptions){
            options[key] = upDataOptions[key];
        }
    }

    this.getSelector = getSelector;
    this.getOptions = getOptions;
    this.setOptions = setOptions;
    this.upDataOptions = upDataOptions;
    
    
}

