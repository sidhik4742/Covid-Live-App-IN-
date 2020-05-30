$(document).ready(function(){

const url_covidStatus = 'https://api.rootnet.in/covid19-in/stats/latest';
const url_covidTest = 'https://api.rootnet.in/covid19-in/stats/testing/latest';
const url_covidMediCollage = 'https://api.rootnet.in/covid19-in/hospitals/medical-colleges';
const url_covidAvailableBed = 'https://api.rootnet.in/covid19-in/hospitals/beds';
const url_covidContact = 'https://api.rootnet.in/covid19-in/contacts';

 getCovidData();

async function getCovidData(){
    const data_covidStatustemp = await fetch(url_covidStatus);
    const data_covidStatus  = await data_covidStatustemp.json();

    const data_covidTesttemp = await fetch(url_covidTest);
    const data_covidTest  = await data_covidTesttemp.json();

    const data_covidMediCollagetemp = await fetch(url_covidMediCollage);
    const data_coviMediCollage  = await data_covidMediCollagetemp.json();

    const data_covidAvailableBedtemp = await fetch(url_covidAvailableBed);
    const data_covidAvailableBed  = await data_covidAvailableBedtemp.json();

    const data_covidContacttemp = await fetch(url_covidContact);
    const data_covidContact  = await data_covidContacttemp.json();

    let lastOriginUpdate = data_covidStatus.lastOriginUpdate;
    let totalCases = data_covidStatus.data.summary.total;
    let confirmedCasesForeign = data_covidStatus.data.summary.confirmedCasesForeign;
    let discharged = data_covidStatus.data.summary.discharged;
    let deaths = data_covidStatus.data.summary.deaths;
    var activeCases = totalCases-(discharged+deaths+confirmedCasesForeign);
    //  console.log(totalCases+ " "+ discharged+ " "+ deaths);
    // console.log(activeCases);

    // **********************Total conformed cases state wide*****************//
    // console.log(data_covidStatus.data.regional.length)
    var state_name_totalCases = [];
    for(var dist_num=0;dist_num<(data_covidStatus.data.regional.length);dist_num++){
        // console.log(data_covidStatus.data.regional[dist_num].loc+":"+data_covidStatus.data.regional[dist_num].totalConfirmed);
        state_name_totalCases.push({state_name:data_covidStatus.data.regional[dist_num].loc,state_cases:data_covidStatus.data.regional[dist_num].totalConfirmed});
    }
    // state_name_totalCases.forEach(function(item,index,array) {
    //     console.log(item.state_name+":"+item.state_cases);
        
    // });
     

    document.getElementById("updation").innerHTML = "updated on:" + lastOriginUpdate + "(GMT+5:30)";
    document.getElementById("totalCases").innerHTML = totalCases;
    document.getElementById("activeCases").innerHTML = activeCases;
    document.getElementById("discharged").innerHTML = discharged;
    document.getElementById("deaths").innerHTML = deaths;

    state_name_totalCases.forEach(function(item,index,array) {
        document.getElementById("state_name_totalCases").innerHTML += item.state_name+":"+item.state_cases+"\t|\t"; 
    });
    

    
}
});
    
   
