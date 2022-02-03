async function covidinfo(){
    let userpositive=document.getElementById('cb1').value;
    let coviddate= document.getElementById('cdate').value;

    let covidinfo = {
        usrpstive: userpositive,
        covidate: coviddate
    }

    console.log(covidinfo);
    if(covidinfo.usrpstive==='on' && covidinfo.covidate!=='')
    {
        console.log(covidinfo);
        alert("Επιτυχής καταχώρηση!");
        let covresponse = await axios.post('/sendcovidinfo', covidinfo);
    }
    else if(covidinfo.usrpstive!=='on' || covidinfo.covidate==='')
    {
        alert("Παρακαλώ συμπληρώστε όλα τα στοιχεία");
    }
    //let covresponse = await axios.post('/sendcovidinfo', covidinfo
}

async function redirected(){
    window.location.href="/mainpage";
}
