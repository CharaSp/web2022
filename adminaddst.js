//const { append } = require("express/lib/response");

async function uploaddatatoserver(){
    //pare arxeio poy exei epilexthei sto input
    const fileHtmlelement=document.getElementById('formFile');
    const selectedfile=fileHtmlelement.files[0];
    console.log(selectedfile);

    //gia na steilw arxeio sto server prepei na mpei se morfi formdata
    let pinakasMeTaJson=new FormData();
    //vazw ston pinaka to arxeio pou epelexa
    
    pinakasMeTaJson.append('myFile',selectedfile)

//to stelnw sto server. Pws milaw me to server? ME TO AXIOS
    await axios.post('/uploadjson',selectedfile)
}





var map = L.map('my_map').setView([38.245865, 21.732860], 5);

   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox/streets-v11',
       tileSize: 512,
       zoomOffset: -1,
       accessToken: 'pk.eyJ1IjoibGZrc2pmZGtsc2pmbGtzZGpmbGtzZGZqbGsiLCJhIjoiY2twZHZ2emJyMXJpOTJubnhoNXE3dGF5MiJ9.tFk1NMKkfjT7F-0OJ4Z-Sw'
   }).addTo(map);
   
   // για να βαλεις μαρκερς <a class="navbar-brand" href="logo_transparent.png">Logo goes here</a>
   // ftiaxneis ena marker
   const myMarker = L.marker([38.245865, 21.732860]);
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
   myMarker12.addTo(map);
   
   
   let options = {
       timeout: 10000
   }
   
   
   function success(pos) {
       console.log(pos);
       const lat = pos.coords.latitude;
       const lng = pos.coords.longitude;
   
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