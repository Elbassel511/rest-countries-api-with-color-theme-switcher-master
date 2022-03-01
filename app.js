let filter = document.querySelector('.filter-box');
let darkMood = document.querySelector('.dark-mood');
let search = document.querySelector('.search-txt');
let cardsContainer =  document.querySelector('.cards-container');
let resdata =[];
const url = 'https://restcountries.com/v2/';
let dark=(localStorage.getItem('dark')==null)?"off":localStorage.getItem('dark')


// fetching data function
let data = async (restUrl)=> {
    let answer = await fetch(`${url}${restUrl}`)
    try{
    resdata =  await answer.json(); 
    return resdata
    }
    catch(error){
        console.log('error:'+error)
    }
};
// loading data at windows load

window.onload=async()=>{
    if (dark==="on"){
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');  
    }else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)'); 
    }
    
        await data(filter.value).then(()=>updateUi(resdata))
} 
// making home cards data
let updateUi = (data)=>{
    let reducedData = (data.length>100)? data.slice(0,100):data;
    let cards =[]
    for(let item of reducedData) {
       let card = `<div class="card" data-country="${item.name}">
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
    document.querySelectorAll('.card').forEach(item => item.addEventListener('click',(ev)=>details(ev)))
}
// filter functionality
filter.addEventListener('change',async (event)=>{
    value = event.target.value
    let newData = 
    await data(value).then(()=>updateUi(resdata))
})
// Search functionality
search.addEventListener('keyup',async (e)=>{
    let resturl = `name/${search.value}`
    await data(resturl).then(()=>updateUi(resdata))
})

// making details Card  
let details = async (ev)=> {
document.getElementById('home-sec').classList.add('d-none');
document.getElementById('details-sec').classList.remove('d-none');

let detailsData = await data(`/name/${ev.target.getAttribute('data-country')}`);

let bordersCountriesHTML=(detailsData[0].borders)?detailsData[0].borders.map((border)=>`<div>${border}</div>`):['No border countries']
let langsHTML = detailsData[0].languages.map((lang)=>`${lang.name}`); 
let currencies = (detailsData[0].currencies)? detailsData[0].currencies[0].name:'No currency'
let detailsCard = `
        <img class="flag col-12 col-md-6" src="${detailsData[0].flags.png}" alt="${detailsData[0].name}" >
        <div class="details  col-12 col-md-6 align-self-center">
            <h2 class="bold mb-4 mt-5">${detailsData[0].name}</h2>
            <div class="details--info">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div><span class="semi-bold ">Native name:</span> ${detailsData[0].nativeName}</div>
                        <div><span class="semi-bold ">Population:</span> ${detailsData[0].population}</div>
                        <div><span class="semi-bold ">Region:</span> ${detailsData[0].region}</div>
                        <div><span class="semi-bold ">Sub Region:</span> ${detailsData[0].subregion}</div>
                        <div><span class="semi-bold ">Capital:</span> ${detailsData[0].capital}</div>
                    </div>
                    <div class="col-12 col-md-6 mt-4 mt-md-0">
                        <div><span class="semi-bold ">Top level Domain:</span> ${detailsData[0].topLevelDomain}</div>
                        <div><span class="semi-bold ">Currencies:</span> ${currencies}</div>
                        <div><span class="semi-bold ">languages:</span> ${langsHTML.join()}</div> 
                    </div>
                </div>
                <div class="row">
                    <div class="semi-bold mt-5">Border Countries:</div>
                    <div class="bounders-countries">
                        ${bordersCountriesHTML.join("")}
                    </div>
                </div>
            
            </div>   
        </div>`

document.querySelector('.details-card').innerHTML=detailsCard;
}
// back btn
document.querySelector('.bck-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('home-sec').classList.remove('d-none');
    document.getElementById('details-sec').classList.add('d-none');
    document.querySelector('.details-card').innerHTML='';
})

// dark mood
function darkMoodFn(){
    dark=(localStorage.getItem('dark')==null)?"off":localStorage.getItem('dark')
    if (dark==="off"){
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');  
        localStorage.setItem('dark',"on")

    }else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');    
        localStorage.setItem('dark',"off")
    }
}

document.querySelector('.dark-mood').addEventListener('click',()=>darkMoodFn())

// ------------------------------------------------------------
