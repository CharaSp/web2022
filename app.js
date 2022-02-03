var express = require('express');
var ejs = require('ejs');
var path = require('path');
const bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql2/promise');
const { promisePool } = require('./config/db_connect');
const fileupload = require('express-fileupload');
//const Connection = require('mysql2/typings/mysql/lib/Connection');


app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/public', express.static(path.join(__dirname, "public")));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.json());
app.use(bodyParser());





app.listen(3000, function () {
    console.log("running on port 3000");
})





app.get('/', function (req, res) {
    res.render('login.ejs')
})


app.get('/signup', function (req, res) {
    res.render('signup2.ejs')
})


app.get('/mainpage', function (req, res) {
    res.render('mainpage.ejs')
})

app.get('/editusrprofile', function (req, res) {
    res.render('edit_usr_profile.ejs')
})


app.get('/userhistory', function (req, res) {
    res.render('usr_history.ejs')
})

app.get('/admin', function (req, res) {
    res.render('adminaddst.ejs')
})


//!!!!!!!!!!!!KAINOURGIO ENDPOINT GIA MARKERS
app.get('/showstores', async function (req, res){
    
        const storeshow="SELECT * FROM place";
        let response2;
        // εκτελεσε το query
        try {

            response2 = await promisePool.query(storeshow);
        } catch (error) {
            console.log('cant extract stores,', error);
        }
        console.log(response2[0]);
        res.send(response2[0]);
    })
 

app.post('/test', function (req, res) {

    console.log(req.body)

    const myVal = req.body.file
    

    
    res.send(myVal)

})

//app.get('/mainpage', function (req, res) {

 //   res.render('mainpage.ejs')
//})

app.get('/sentdata', function (req, res) {

})

app.post('/sentdata', function (req, res) {
    console.log(req.body);
    //oles tis plirofories keimenoy poy stelnw
    //prepei na psaxw th vash na vrw poies topothesies exoun type auto poy egrapse o xristis
    //ti egrapse omws o xroistis?
    const usersearchFor = req.body.writtenData
     
});

app.post('/userlogin', async function(req, res) {
    const username = req.body.user;

    const password = req.body.pass;

    const sqlQeuryString = `SELECT username,password FROM user WHERE username='${username}' AND password='${password}'`;
    const dataBaseUsersResponse = await promisePool.query(sqlQeuryString);

    if (dataBaseUsersResponse[0].length > 0) {
        res.send('valid');
        console.log('valid'); //einai xristis kai tupwnetai sto console valid
    } else {
        res.send('invalid');
        console.log('invalid'); //den einai xristis kai tupwnetai sto cosnole invalid
    }

});


app.post('/uploadjson', async function (req, res) {
    //1 na anevoun ta arxeia ston server
    //2 na analuyseis to json opos kaname sto arxeio jsobject.js
    //3 na ta peraseis sthn vash

    //1
    const myFiles = req.files.myFile;
        const fileData = myFiles.data;

    // pleon edw exoume diavasei to arxeio
    const getFileJsonData = JSON.parse(fileData);
    // console.log(getFlieJsonData);


    // edw kovoume apo thn ka8e eggrafi kai kratame mono ta dedomena pou 9eloume..
    const allPlaces = getFileJsonData.map(place => {
        return {
            coοrdinates: place.coordinates, // kratame tin topo9esia
            name: place.name, // to onoma
            types: place.types, // to types
            populartimes: place.populartimes, // 
            id: place.id
        }
    });

    console.log(allPlaces);



    // prepei na peraseis ta dedomena sthn vash...

    // ta dedomena pleon vriskontai ston pinaka allPlaces..
    allPlaces.map(async (place) => {
        // ftiaxnw to query
        const sql = `INSERT INTO PLACE (name, coordinates, types, populartimes) 
        VALUES('${place.name}', Point(${place.coordinates.lat}, ${place.cordinates.lng}), '${JSON.stringify(place.types)}', '${JSON.stringify(place.populartimes)}' )`;
        // console.log(sql);
        let response;
        // εκτελεσε το query
        try {

            response = await promisePool.query(sql)
        } catch (error) {
            console.log('cant insert,', error);
        }
    })
});

app.post('/signuped',async function(req, res) {
    const user = req.body;
    console.log(req.body);

    const sql= `INSERT INTO USER (username,password,firstname,lastname,email,dateofbirth) VALUES('${user.userappname}','${user.userpass}','${user.userfirst}','${user.usersecond}','${user.useremail}','${user.userbirth}')`;
    let response1;
    try {

        response1 = await promisePool.query(sql)
    } catch (error) {
        console.log('cant insert user info,', error);
    }
    
});

app.post('/edit', async function(req, res) {
    const username = req.body.usern1;
    const password = req.body.pass1;
    const user = req.body.usern2;
    const pass = req.body.pass3;
    const date = req.body.bdate;
    const qeurystring = `UPDATE user SET username='${user}',password='${pass}', dateofbirth='${date}' WHERE username='${username}' AND password='${password}'`;
    const dataBaseUsersResponse = await promisePool.query(qeurystring);
    console.log(req.body);


})

/*app.post('/uploadjson',async function(res,req){
    
    const myFiles=req.files.myFiles;
    const fileData= myFiles.data;

    const getFlieJsonData = JSON.parse(fileData);
    // console.log(getFlieJsonData);

    //2:

    const allPlaces = getFlieJsonData.map(place => {
        return {
            cordinates: place.coordinates,
            name: place.name,
            types: place.types,
            populartimes: place.populartimes,
            id: place.id
        }

    })


    // 3:
    // gia ka8e place (dld gia ka8e stoixieio tou pinaka)
    allPlaces.map(place => {
        // ftiaxnw to query
        const sql = `INSERT INTO PLACE (name, cordinates, types, populartimes) 
        VALUES('${place.name}', Point(${place.cordinates.lat}, ${place.cordinates.lng}), '${JSON.stringify(place.types)}', '${JSON.stringify(place.populartimes)}' )`;


        promisePool.query(sql)


        // // // DEUTERH POROSEGGISI
        // console.log(place.populartimes);
        // place.populartimes.map(pt => {
        //     const sql = `INSERT INTO populartimes (name, h00, h01,h02...) VALUES(${pt.name}, ${pt.data[0]}, ${pt.data[1]}, ${pt.data[2]})`
        // })




        //milaw me thn vash
    })
    // console.log(allPlaces);

    res.send('ok')
})


______________________
 if(password != ${password}){
        alert('Wrong password, try again!')
     }

    if(password1 == password2){
     window.location.href='http://localhost:3000/history'


*/
