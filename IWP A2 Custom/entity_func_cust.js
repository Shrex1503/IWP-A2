const output = document.querySelector('.entities_list');
const output1 = document.createElement('div');
const ul = document.createElement('ul');

output.append(output1);
output.append(ul);

const url = 'input.json';

//don't need this?
// class entityInfo{
//     constructor(img_url, description){
//         this.img_url = img_url;
//         this.description = description;
//     }
// }

class entity{
    constructor(entity_name, entity_info_dict){
        this.entity_name = entity_name;
        this.entity_info_dict = entity_info_dict;
    }
}

const all_entity_data = {}; //dict of entity name and entity class

window.addEventListener('DOMContentLoaded', ()=>{
    loadData();
})

function loadData(){
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            populateDict(data);
        });
}

function populateDict(entity_arr){
    entity_arr.forEach(each_entity =>{  //to populate all_entitiy_data dict
        let name_of_entity = each_entity.entity;
        let img_list = each_entity.images;
        let desc_list = each_entity.Desc;
        let img_desc_dict = {};

        img_list.forEach((ele, i)=>{    //to populate the images and descriptions for each of the entities
            img_desc_dict[ele] = desc_list[i]
        })

        let entity_obj = new entity(name_of_entity, img_desc_dict);

        all_entity_data[name_of_entity] = entity_obj;  //appending the entity in the dict
    });
    renderData(all_entity_data);
}

console.log(all_entity_data);
let no_of_times_called_img = 0;

function renderData(entity_dict_final){
    let dict_key_list = Object.keys(entity_dict_final);
    console.log(dict_key_list);
    dict_key_list.forEach(each_entity => {
        console.log(each_entity);
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = each_entity;
        li.append(button);
        ul.append(li);



        li.addEventListener('entity_click', (e)=>{
            // console.log("entity click listener")
            // console.log(e);
            // console.log(entity_dict_final[e.detail.entity_name].entity_info_dict);
            renderImgs(entity_dict_final[e.detail.entity_name].entity_info_dict);
        })

        li.addEventListener('click', (e) =>{
            // console.log("entity click event");
            // console.log(e);
            var event = new CustomEvent('entity_click', {
                bubbles: true,
                cancelable: true,
                detail: {
                    entity_name : e.target.innerText
                }
            });

            li.dispatchEvent(event);
        })
    })
}

function RemoveBaseUrl(url) {
    /*
     * Replace base URL in given string, if it exists, and return the result.
     *
     * e.g. "http://localhost:8000/api/v1/blah/" becomes "/api/v1/blah/"
     *      "/api/v1/blah/" stays "/api/v1/blah/"
     */
    var baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    var result = "";
    
    var match = baseUrlPattern.exec(url);
    if (match != null) {
        result = match[0];
    }
    
    if (result.length > 0) {
        url = url.replace(result, "");
    }
    
    return url;
}

const imgs_output = document.querySelector('.images_list');

function renderImgs(desc_imgs_dict){
    let imgs_list = Object.keys(desc_imgs_dict);
    console.log(imgs_list);

    const span_outer = document.createElement('span');
    
    
    imgs_list.forEach(img =>{
        console.log(img);

        const span = document.createElement('span');

        const img_tag = document.createElement('img');
        img_tag.src = img;

        img_tag.addEventListener('entity_img_click', (e)=>{
            console.log("entity img click listener")
            console.log(e);
            console.log("images and desc dictionary")
            console.log(desc_imgs_dict);

            let relative_url = RemoveBaseUrl(e.detail.entity_img_url);

            renderDesc(desc_imgs_dict[relative_url]);
        })

        img_tag.addEventListener('click', (e) =>{
            console.log("entity img click event");
            console.log(e);
            var event = new CustomEvent('entity_img_click', {
                bubbles: true,
                cancelable: true,
                detail: {
                    entity_img_url : e.target.currentSrc
                }
            });

            img_tag.dispatchEvent(event);
        })

        // img_tag.addEventListener('click', (e)=>{
        //     renderDesc(desc_imgs_dict[img]);
        // })

        span.append(img_tag);
    

        span.style.padding="7px";

        span_outer.appendChild(span);
    })

    imgs_output.innerHTML="";

    imgs_output.appendChild(span_outer);
}

const desc_output = document.querySelector('.description_list');
function renderDesc(desc_content){

    console.log(desc_content);

    desc_output.innerHTML = desc_content;
}