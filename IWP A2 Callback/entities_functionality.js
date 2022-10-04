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
            /*
            so use data[0] for one entity and so on

            in the entity objects set name to a variable
            create a dict for entityinfo and after appending all the values 
                create the object using constructor n all
            
            add this created object in the dict
            */
            //console.log(data);
            populateDict(data);
            //addtoPage(data);
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

        li.addEventListener('click', (e)=>{
            console.log(entity_dict_final[each_entity].entity_info_dict);
            if(no_of_times_called_img>0){
                location.reload();
            }
            no_of_times_called_img += 1;
            renderImgs(entity_dict_final[each_entity].entity_info_dict);
        })
    })
}


const imgs_output = document.querySelector('.images_list');
const imgs_output1 = document.createElement('span');

imgs_output.append(imgs_output1);

function renderImgs(desc_imgs_dict){
    let imgs_list = Object.keys(desc_imgs_dict);
    console.log(imgs_list);
    
    let imgs_output_content;
    
    imgs_list.forEach(img =>{
        console.log(img);

        const span = document.createElement('span');

        const img_tag = document.createElement('img');
        img_tag.src = img;

        span.append(img_tag);
        imgs_output1.append(span);

        imgs_output_content += img_tag;

        img_tag.addEventListener('click', (e)=>{
            renderDesc(desc_imgs_dict[img]);
        })
    })

    // imgs_output.innerHTML.replace(output1);

    // imgs_output.innerHTML = imgs_output_content;
}

const desc_output = document.querySelector('.description_list');
// const desc_output1 = document.createElement('p');

// desc_output.append(desc_output1);

// const desc_output = document.querySelector('.desc_p_class');

// let no_of_times_called_desc = 0;

function renderDesc(desc_content){

    console.log(desc_content);
    // const p = document.createElement('p');

    // p.setAttribute('id', 'desc_p');

    desc_output.innerHTML = desc_content;

    //p.textContent = desc_content;

    // desc_output1.append(p);
}