// Purpose of this module is to fetch and 
// assign the planets api and info


const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
let placement = document.querySelector(".planets");
let sction = document.createElement("section");



async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
    console.log(data);

    return data.key;
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': key
        }
    });
    const data = await response.json();
    console.log(data);



    for (let index = 0; index < data.bodies.length; index++) {
        let temp = document.createElement("section");
        console.log(data.bodies[index].name);
        // temp.innerHTML = data.bodies[index].name;
        //Runs through each object and creates a section for it
        let placement = document.querySelector(".planets");
        //Places each section inside the article tag.
        placement.insertBefore(temp, placement.children[index]);
        temp.onclick = function(){
            console.log('1');
            hidePlanets(data.bodies[index]);
            // create a display function that hides current stuff and shows other
            displayInfo(data.bodies[index]);
        }
        //Creates an onclick event for each object with the current index path of the for loop.
    }
    
}

function hidePlanets(input){
console.log(input);

for (let index = 1; index < 9; index++) {
    let elements = document.querySelectorAll('section');
    elements[index].style.display ='none';  

}
}

function displayInfo(input){

    document.querySelector('div').style.flexDirection = "column";

    // resets the page onclick
    setTimeout(() =>{
    document.body.onclick = function(){

         resetPage();
    }
}, "100");

    console.log(input.id);
    let colors = ["yellow","gray","rgb(192, 192, 192)","rgb(0, 123, 255)","rgb(255, 46, 46)","rgb(255, 158, 31)","rgb(255, 201, 131)","rgb(182, 242, 255)","rgb(117, 155, 164)"];

    document.querySelector(".pInfo").style.position = "initial";
    document.querySelector(".pInfo").style.top = "";
    document.querySelector(".pInfo").style.right = "";
    document.querySelector(".pInfo").style.textAlign ="left";
    document.querySelector(".pInfo").style.width ="50%";
    document.querySelector(".name").innerHTML = input.name;
    document.querySelector(".latinName").innerHTML = input.latinName;
    document.querySelector(".desc").innerHTML = input.desc;
    document.querySelector(".circumference").innerHTML = "Omkrets";
    document.querySelector(".cInfo").innerHTML = input.circumference;
    document.querySelector(".distance").innerHTML = "Km från solen";
    document.querySelector(".dInfo").innerHTML = input.distance;
    document.querySelector(".temp").innerHTML = "Max temperatur";
    document.querySelector(".tInfo").innerHTML = input.temp.day;
    document.querySelector(".temp2").innerHTML = "Min temperatur";
    document.querySelector(".tInfo2").innerHTML = input.temp.night;
    document.querySelector(".moons").innerHTML = "Månar";
    document.querySelector(".mInfo").innerHTML = input.moons;
    document.querySelector("section").style.borderColor = colors[input.id];
    document.querySelector(".pInfoBoxOm").style.display = "block";
    document.querySelector(".pInfoBoxDist").style.display = "block";
    document.querySelector(".pInfoBoxTemp").style.display = "block";
    document.querySelector(".pInfoBoxTemp2").style.display = "block";

}

function resetPage(){
    window.location.reload();
}      

export { getPlanets }