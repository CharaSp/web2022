//const Connection = require("mysql2/typings/mysql/lib/Connection");
//για να αρχικοποιησεις ενα χαρτη _firstLatLng,_firstPoint,_secondLatLng,_secondPoint,_distance,_length,_polyline,
    var map = L.map('my_map').setView([38.245865,21.732860], 5);

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
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log(lat, lng);

        const m1 = L.marker([lat, lng]);

        m1.bindPopup('<p><b> I\'m Here!</b> </p> <button id="loccationbutton" onclick="distance()">I\'m here <input id="cb2" type="checkbox" /></button>')
        m1.addTo(map)
        map.flyTo([lat, lng], 17)
        
        L.circle({lat, lng},{
            color: 'steelblue',
            radius:40,
            fillColor: 'steelblue',
            opacity: 0.5 
        }).addTo(map)

        return lat,lng;

    }


    
    /*async function userloc(){
        if()
        alert("im here!");
    }*/

    function fail() {
        alert('failed tracing you... reload');
        console.log("failed tracing you...");
    }

    //gia thn paron topo8esia sou otan sumdeesai uparxei: to navigator  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition?retiredLocale=el
    //αναλογα αν πετυχει η διαδικασια εντοπισμου του χρηστη τρεξε mia συναρτηση allios 8a trexei thn allh sunartisi 
    navigator.geolocation.getCurrentPosition(success, fail, options);

async function userSearch() {
    
    var leafletIcon1 = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    var leafletIcon2 = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    
    var leafletIcon3 = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
    
    let usrsrch=document.getElementById("searchbar").value;

    let usersearches= {
        srchbar: usrsrch
    }
    //console.log(usersearches.srchbar);
    let response3 = await axios.post('/usersearch', usersearches);
    //console.log(response3);
    var data2 = response3.data;
    console.log(data2);
    const today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(new Date().getDate()+1);

    for(let i=0; i<data2.length; i++)
    {    
         let poptypes=JSON.parse(data2[i].populartimes);
         var myMarker1 = L.marker([data2[i].coordinates.x,data2[i].coordinates.y],{icon:leafletIcon1}).on('click', onClick); 
         var myMarker2 = L.marker([data2[i].coordinates.x,data2[i].coordinates.y],{icon:leafletIcon2}).on('click', onClick);       
         var myMarker3 = L.marker([data2[i].coordinates.x,data2[i].coordinates.y],{icon:leafletIcon3}).on('click', onClick);       
         //map.on('click', onClick);
        
         
         var distance=calcCrow(38.24014040000001,21.7452834,data2[i].coordinates.x,data2[i].coordinates.y).toFixed(2);
         //console.log(distance);
         //console.log(today);
         //obj me ta name poptimes
         const myday=poptypes.find(ele=>ele.name==today.toLocaleString('en-us', {weekday:'long'}));
         const k=today.getHours();
         //console.log(k);

         const nextday=poptypes.find(ele=>ele.name==tomorrow.toLocaleString('en-us', {weekday:'long'}));
         //console.log(nextday);
         const currhour=k;
       
         if (k<22){
             nexthour1=myday.data[k+1];
             nexthour2=myday.data[k+2];
         } else if(k===22){
             nexthour1=myday.data[k+1];
             nexthour2=nextday.data[0];
         } else if(k===23){
             nexthour1=nextday.data[0];
             nexthour2=nextday.data[1];
         }
       
        var distnnum=parseFloat(distance);        
        //console.log(distnnum);

        if(distnnum <=0.02)
        {
            if(nexthour1<33){
                myMarker1.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα:${currhour}<br>Εκτιμώμενη Επισκεψιμότητα τις επόμενες 2 ώρες: <br> ${nexthour1}%, ${nexthour2}% <br>Μέσος αριθμός επισκεπτών τις προηγούμενες 2 ώρες:<br> Καταχωρήστε εκτιμώμενο αριθμό ατόμων: <input type="number" min="0" max="200"class="login__input" id="peoplenum" placeholder="Αριθμός ατόμων τώρα"><button id="userinsert" onclick="usersestimation()">Αποθήκευση</button></div>`);
                myMarker1.addTo(map);  
            }
            else if(nexthour1> 32 && nexthour1<65){
                myMarker2.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα:${currhour}<br>Εκτιμώμενη Επισκεψιμότητα τις επόμενες 2 ώρες: <br> ${nexthour1}%, ${nexthour2}% <br>Μέσος αριθμός επισκεπτών τις επόμενες 2 ώρες:<br> Καταχωρήστε εκτιμώμενο αριθμό ατόμων: <input type="number" min="0" max="200"class="login__input" id="peoplenum" placeholder="Αριθμός ατόμων τώρα"><button id="userinsert" onclick="usersestimation()">Αποθήκευση</button></div>`);
                myMarker2.addTo(map);    
            }
            else if(nexthour1>=65){
                myMarker3.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα:${currhour}<br>Εκτιμώμενη Επισκεψιμότητα τις επόμενες 2 ώρες: <br> ${nexthour1}%, ${nexthour2}% <br>Μέσος αριθμός επισκεπτών τις επόμενες 2 ώρες:<br> Καταχωρήστε εκτιμώμενο αριθμό ατόμων: <input type="number" min="0" max="200"class="login__input" id="peoplenum" placeholder="Αριθμός ατόμων τώρα"><button id="userinsert" onclick="usersestimation()">Αποθήκευση</button></div>`);
                myMarker3.addTo(map);  
            }
        } 
        else
        {
             if(nexthour1<33){
                 myMarker1.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα: ${currhour}<br> Μέσος αριθμός επισκεπτών τις επόμενες 2 ώρες:<br>  ${nexthour1}%, ${nexthour2}% <br>Μέσος αριθμός επισκεπτών τις προηγούμενες 2 ώρες:<br></div>`);
                 myMarker1.addTo(map);  
             }
             else if(nexthour1> 32 && nexthour1<65){
                 myMarker2.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα: ${currhour}<br> Εκτιμώμενη Προσέλευση τις επόμενες 2 ώρες:<br> ${nexthour1}%, ${nexthour2}%<br> Μέσος αριθμός επισκεπτών τις προηγούμενες 2 ώρες:<br> </div> `);
                 myMarker2.addTo(map);  
             }
             else if(nexthour1>=65){
                 myMarker3.bindPopup(`<div><b> ${data2[i].name}</b><br>Ώρα τώρα:${currhour}<br> Εκτιμώμενη Προσέλευση τις επόμενες 2 ώρες:<br> ${nexthour1}%, ${nexthour2}% <br>Μέσος αριθμός επισκεπτών τις προηγούμενες 2 ώρες:<br> </div>`);
                 myMarker3.addTo(map);  
             }
         }
    }
}


async function onClick(){
    let visitday = new Date();
    let hourz=visitday.getHours();
    //let visitedday=visitday.getDate()
    //console.log(hourz);
    let placecoords=this.getLatLng();
    console.log(placecoords);
    let latid2=placecoords.lat;
    let long2=placecoords.lng;
    var myposition=await getPosition();
    var latid1=myposition.coords.latitude;
    var long1=myposition.coords.longitude;
    var distance=(calcCrow(38.24014040000001,21.7452834,latid2,long2).toFixed(2));
    console.log(distance + "km ");
    
    if (distance<=0.02){
        //window.confirm("Έχετε δυνατοτητα καταχωρησης της επισκεψης σας. Αν πατήσετε οκ συναινείται στην αποθήκευση της τοποθεσίας σας.")
       if(confirm("Έχετε δυνατοτητα καταχωρησης της επισκεψης σας. Αν πατήσετε οκ συναινείται στην αποθήκευση της τοποθεσίας σας."))
       {//(confirm("You pressed OK!"))
            var useragrees='true';

            let userwants={
                useriscool: useragrees,
                userslat: latid2,
                userslong: long2,
                dayofvisit: visitday,
                hourzofvisit:hourz
            }            
            //console.log(userwants);
             let response4 = await axios.post('/usercool', userwants);
             var data3=response4.data;
             console.log(data3);

             //if(data3==='userok')

        } else {
            txt = "Δεν θα γίνει καταψώρηση των στοιχείων σας!";
        }
    }  
} 

async function usersestimation()
{
    //console.log(h);
    
    let userputs = document.getElementById('peoplenum').value;
    if(userputs!=='')
    {
        alert("Επιτυχής καταχώρηση ατόμων")
        let infos = {
            userputts: userputs,
        }         

        //console.log(infos.userputts);

        var response6 = await axios.post('/userinsert', infos)
        var data7=response6.data;
        console.log(data7);
    }
}  


function calcCrow(lat1, lon1, lat2, lon2) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

function getPosition(options){
    return new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}

async function userlogout() {

    let userlog = {
        username: '',
        password:'',
        firstame:'',
        lastname:'',
        email: '',
        dateofbirth:'',
        userId: '',
        admin: 0
        
    }

    let logresp = await axios.post('/userlogout', userlog);
    console.log(logresp.data);
    if(logresp.data==='')
    {
        alert("Αποσύνδεση χρήστη");
        window.location.href=('http://localhost:3000/');
    }
}
