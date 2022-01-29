//const Connection = require("mysql2/typings/mysql/lib/Connection");
//για να αρχικοποιησεις ενα χαρτη
    var map = L.map('my_map').setView([38.245865, 21.732860], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiY2hhcmFzcCIsImEiOiJja3k3NzJqbGQweHE2MnBzMXgwY2xmeXBrIn0.0brZgWWB8AGuWCgagIX4BA'
    }).addTo(map);


    let options = {
        timeout: 10000
    }


    function success(position) {
        console.log(position);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log(lat, lng);

        const m1 = L.marker([lat, lng]);

        m1.bindPopup('<p> test </p> <button>I\'m here </button>')
        m1.addTo(map)
        map.flyTo([lat, lng], 17)
        
        L.circle({lat, lng},{
            color: 'steelblue',
            radius:20,
            fillColor: 'steelblue',
            opacity: 0.5 
        }).addTo(map)

    }

    function fail() {
        alert('failed tracing you... reload');
        console.log("failed tracing you...");
    }

    //gia thn paron topo8esia sou otan sumdeesai uparxei: to navigator  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition?retiredLocale=el
    //αναλογα αν πετυχει η διαδικασια εντοπισμου του χρηστη τρεξε mia συναρτηση allios 8a trexei thn allh sunartisi 
    navigator.geolocation.getCurrentPosition(success, fail, options)


//!!!!!!!!!!SYNARTHSH GIA EMFANISH MARKERS
async function fetchData() {
    let resp =  await axios.get('/showstores'); //fere dedomena apo vash
    //console.log(resp)

    const data1=resp.data; //pare dedonena(data) apo pinaka resp
    
    console.log(data1);
    
    console.log(data1.length);
   // const lati = data1.coordinates.Lat;
   for(let i=0; i<data1.length; i++)
   {    
        let poptypes=JSON.parse(data1[i].populartimes);
        const myMarker = L.marker([data1[i].coordinates.x,data1[i].coordinates.y]);
        for(let j=0; j<7; j++)
        {
            myMarker.bindPopup(data1[i].name, poptypes[j].name)
        }
        myMarker.addTo(map);
    }   
     
    /*for(let i=0; i<3; i++)
    {    
         let poptypes=JSON.parse(data1[i].populartimes);
         const myMarker = L.marker([data1[i].coordinates.x,data1[i].coordinates.y])
         for(let j=0; j<7; j++)
         {
             console.log(data1[i].name, poptypes[j].name)
         }
         myMarker.addTo(map) 
    }*/
}  
    
  /*  */


  /* myMarker.bindPopup(`data1[i].name,"Hello", poptypes[j].name`
       for(let i=0; i<3; i++)
    {    
        let poptypes=JSON.parse(data1[i].populartimes);
        console.log(poptypes[0].name);
    }*/

  
    /*for(let i=0; i<3; i++)
    {
        console.log(poptypes)
    }*/
   /*for(let i=0; i<2; i++)
    {
        let poptypes=JSON.parse(data1[i].populartimes);
        for(let j=0; j<7; j++)
        {   
            for(let k=0; k<2; k++)
            {
                if(k==1)
                {
                    for(l=0; l<24; l++)
                    {
                        console.log(poptypes[j].data[K])

                    }
                }
            }
            
        }   
    }
}
*/
//   for(let j=0; j<7; j++){ 

   // const long = data1.coordinates.Long;

   /* for(let i=0; i<Object.keys(data1).length; i++)
    {
        const myMarker = L.marker([lati, long]);
        myMarker.addTo(map)
        
        
        
    }*/

    /*resp.data.map(place=>{
        let this_marker = L.marker([place.coordinates.lat, place.coordinates.lng]);
        
        this_marker.bindPopup(${place.name})
        this_marker.addTo(map);
    })*/

    /*for(let i=0; i<data1.length; i++)
    {
        const myMarker = L.marker([data1.coordinates.x,data1.coordinates.y]);
        myMarker.addTo(map)
    }*/

/*        data1.map(place => {
            const myMarker = L.marker([place.coordinates.x,place.coordinates.y]);
            myMarker.bindPopup(`<b>${place.name}'!</b>
            <br>
            την αλλη ωρα ειναι αυτο: 12.
            <br>
            <input placeholder="# ατομων" type="number"/>
            <br>
            <button onclick="userwashere('${place.placeId}')"> Ημουν εδω </button>
            <br>
            `);
            myMarker.addTo(map);
            }) */

    // για να βαλεις μαρκερς <a class="navbar-brand" href="logo_transparent.png">Logo goes here</a>
    // ftiaxneis ena marker
  /*  const myMarker = L.marker([38.245865, 21.732860]);
    const myMarker1 = L.marker([38.245865, 21.762860]);
    const myMarker2 = L.marker([38.24577550327074, 21.73570455863372]);
    const myMarker3 = L.marker([38.24621365531029, 21.733172553512265]);
    const myMarker4 = L.marker([38.244502077349765, 21.735900553946067]);//μακινα
    const myMarker5 = L.marker([38.24440938937929, 21.737788828951892]);
    const myMarker6 = L.marker([38.24490653254032, 21.740363749542258]);
    const myMarker7 = L.marker([38.24443466790345, 21.740943106646316]);
    const myMarker8 = L.marker([38.24460319133964, 21.73553577367508]);
    const myMarker9 = L.marker([38.242190984213174, 21.731624966423308]);
    const myMarker10 = L.marker([38.24215816244813, 21.730767955082676]);
    const myMarker11 = L.marker([38.2450502127522, 21.737294499699832]); //συνδετηρας
    const myMarker12 = L.marker([38.24503463975806, 21.737991161546997]); // ακροβατηης οκατεια
    
    
    
    myMarker.addTo(map);
    myMarker1.addTo(map);
    myMarker2.addTo(map);
    myMarker3.addTo(map);
    myMarker4.addTo(map);
    myMarker5.addTo(map);
    myMarker6.addTo(map);
    myMarker7.addTo(map);
    myMarker8.addTo(map);
    myMarker9.addTo(map);
    myMarker10.addTo(map);
    myMarker11.addTo(map);
    myMarker12.addTo(map);*/
    
    

    async function sendData(){
        
        let inputvalue= document.getElementById('my_input').value;

        let info =
        {
            writtenData: inputvalue
        }

        console.log(info.writtenData);
        //milaw me to server(axios) se ayto to endpoint(sentdata)me methodo post kai tou stelnw to info poy einai oti egrapse o xristis.
        await axios.post('/sentdata',info)
    }
/*
//FOR POPULAERTIMES
let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
  
for(let i=0; i<7; i++)
{
    for(let j=0; j<2; i++)
    {
        for(let k=0; k<7; k++)
        {
            switch(weekday)
            {
                case 'Monday':


                for(let i=0; i<data1.length; i++)
                {
                    for(let j=0; j<7; j++){
                        data1[i].populartimes[j].name
                        for(let k=0; k<2; k++){
                            if (k==1){        
                                for(let l=0; l<24; l++){
                                   data1[i].populartimes[j][k][l]}}}
                    break;

                case 'Tuesday':
                    printf("%.1lf - %.1lf = %.1lf",n1, n2, n1-n2);
                    break;

                case 'Wednesday':
                    printf("%.1lf * %.1lf = %.1lf",n1, n2, n1*n2);
                    break;

                case 'Thursday':
                    printf("%.1lf / %.1lf = %.1lf",n1, n2, n1/n2);
                    break;

                case 'Friday':
                    printf("%.1lf / %.1lf = %.1lf",n1, n2, n1/n2);
                    break;

                case 'Saturday':
                    printf("%.1lf / %.1lf = %.1lf",n1, n2, n1/n2);
                    break;

                case 'Sunday':
                    printf("%.1lf / %.1lf = %.1lf",n1, n2, n1/n2);
                    break;
            }
        }
            // operator doesn't match any case constant +, -, *, /
    default:
        printf("Error! operator is not correct");
}*/
