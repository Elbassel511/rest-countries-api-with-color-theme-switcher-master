let filter = document.querySelector('.filter-box');
let darkMood = document.querySelector('.dark-mood');
let search = document.querySelector('.search-txt');
let cardsContainer =  document.querySelector('.cards-container');
let resdata =[];
const url = 'https://restcountries.com/v2/';


let data = async (restUrl)=> {
    let answer = await fetch(`${url}${restUrl}`)
    try{
    resdata =  await answer.json(); 
    }
    catch(error){
        console.log(error)
    }
};

window.onload=async()=>{
    console.log(filter.value)
    await data(filter.value).then(()=>updateUi(resdata))
} 

let updateUi = (data)=>{
    let cards =[]
    for(let item of data) {
       let card = `<div class="card" id="${item.name}">
       <img src="${item.flags.png}" class="card-img-top" alt="${item.name}">
       <div class="card-body">
         <h5 class="card-title bold">${item.name}</h5>
         <div class="info"><span class="semi-bold">Population:</span> <span class="info_input">${item.population}</span></div>
         <div class="info"><span class="semi-bold">Region:</span><span class="info_input">${item.region}</span></div>
         <div class="info"><span class="semi-bold">Capital:</span><span class="info_input">${item.capital}</span></div>
       </div>
     </div>`
     cards.push(card)
    }
    cardsContainer.innerHTML =cards.join('')
    document.querySelectorAll('.card').forEach(item => item.addEventListener('click',(ev)=>{console.log(ev.target)}))
}

filter.addEventListener('change',async (event)=>{
    value = event.target.value
    await data(value).then(()=>updateUi(resdata))
})

search.addEventListener('keyup',async (e)=>{
    let resturl = `name/${search.value}`
    await data(resturl).then(()=>updateUi(resdata))
})

// let details = async ()=> {

// }