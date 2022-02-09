var express = require('express');
var ejs = require('ejs');
var path = require('path');
const bodyParser = require('body-parser');
var app = express();
const mysql = require('mysql2/promise');
const { promisePool } = require('./config/db_connect');
const fileupload = require('express-fileupload');
//const Connection = require('mysql2/typings/mysql/lib/Connection');
// Using encryption lib (install by npm i bcryptjs)
const bcrypt = require('bcryptjs');

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



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VAR USER NEO!!!!!!!!!!
// let user = {
//     username: '',
//     password:'',
//     firstame:'',
//     lastname:'',
//     email: '',
//     dateofbirth:'',
//     userId: '',
//     admin: 0
//   }



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

app.get('/welcome', function(req, res) {
    res.render('welcome.ejs')
})

app.get('/adminlogin', function(req, res) {
    res.render('adminlogin.ejs')
})

app.get('/chart', function (req, res) {
    res.render('chart.ejs')
})

app.get('/chartcovid', function (req, res) {
    res.render('chartTotalCovidCases.ejs')
})

app.get('/chartvisit', function (req, res) {
    res.render('chartTotalVisits.ejs')
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

//από άννα για log in:

app.post('/userlogin', async function(req,res){

    const data = req.body;
    const sqlQeuryString = `SELECT * FROM USER WHERE username='${data.user}'`;
    const dataBaseUsersResponse = await promisePool.query(sqlQeuryString);



    if (dataBaseUsersResponse[0].length > 0) {
        const hash = dataBaseUsersResponse[0][0]['passwordHash'];
         //console.log(hash);
        const verified = bcrypt.compareSync(data.pass, hash);
        if (verified){
            res.send('success');
            console.log('you made it');
        } else {
            res.send('fail');
            console.log('wrong password');

        }
    }
    else {
        res.send('fail')
        console.log('Wrong Username')
    }

});

//telos anna gia log in




//!!!!!!!!!!!!!!!!!!!!!NEO LOGIN!!!!!!!!!!!!!!
// app.post('/userlogin' , async function (req, res) {
    
//     const username= req.body.user;
//     const password= req.body.pass;



//     const sqlQeuryString = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`;
//     let dataBaseUsersResponse = await promisePool.query(sqlQeuryString);
//     //console.log(dataBaseUsersResponse[0]);
//     user=dataBaseUsersResponse[0];

//     console.log(user);
//     //u need dis
//     //console.log(user[0].password);

//       if (user.admin===1) {
//         res.redirect('/admin')
//       }
//       else if(dataBaseUsersResponse[0].length>0)
//       {
//         res.send('valid');
//       }
//       else{
//           res.send('invalid');
//       }
// });

app.post('/admlogin', async function(req, res) {
    const adminame = req.body.admin;
    const password = req.body.pass;

    const sqlQeuryString = `SELECT * FROM admin WHERE adminame='${adminame}' AND password='${password}'`;
    let dataresponse = await promisePool.query(sqlQeuryString);
    if (dataresponse[0].length > 0)
        res.send('valid'); //yparxei admin
    else
        res.send('invalid'); //den yparxei admin


})

////NEO ENDPOINT
app.post('/userlogout',async function (req, res){

    var user1 = {
    firstame: req.body.firstame,
    lastname:  req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    userId: req.body.userId,
    email: req.body.email,
    birthday: req.body.dateofbirth,
    admin:req.body.admin
    }

    console.log(user1.username);

    res.send(user1.username);
    console.log("BYEE")
})



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



apo anna part2:
app.post('/chartvisit2',  async function(req,res)
{
    const sqlQeuryString =  `SELECT * FROM userhistory`;
    
    let response1;
    try{ 
        const dataBaseUsersResponse =  await promisePool.query(sqlQeuryString);
        response1 = dataBaseUsersResponse[0];
        console.log(dataBaseUsersResponse[0].length);

    }catch (error){
        response1=error;
        console.log('database stuff went wrong:', error);
    }
    res.send(response1);
});

app.post('/chartcovid2',  async function(req,res)
{
    const sqlQeuryString = `SELECT * FROM userhistory WHERE userpositive='ON'`;
        
    let response2;
    try{ 
        const dataBaseUsersResponse =  await promisePool.query(sqlQeuryString);
        response2 = dataBaseUsersResponse[0];
        console.log(dataBaseUsersResponse[0].length);

    }catch (error){
        response2=error;
        console.log('database stuff went wrong:');
    }
    res.send(response2);
});

app.post('/signuped',async function(req, res) {
    const user = req.body;
    console.log(req.body);

    const password_hash = bcrypt.hashSync(user.userpass, 10);

    const sql= `INSERT INTO USER (username,passwordHash,firstname,lastname,email,dateofbirth) VALUES('${user.userappname}','${password_hash}','${user.userfirst}','${user.usersecond}','${user.useremail}','${user.userbirth}')`;
    let response1;
    try {

        response1 = await promisePool.query(sql)
    } catch (error) {
        //Mine, testing
        response1=error;
        //End Mine
        console.log('cant insert user info,', error);
    }
    
});

telos apo anna




//!!!!!!!!!!!!!!!!!!!!NEO SIGNUP!!!!!!!!!!!!!!
// app.post('/signuped',async function(req, res) {
//     //const user = req.body;
//     user.firstame= req.body.userfirst,
//     user.lastname=  req.body.usersecond
//     user.username= req.body.userappname
//     user.password= req.body.userpass
//     user.userId= req.body.userId
//     user.email= req.body.useremail
//     user.birthday= req.body.userbirth

//     const sql= `INSERT INTO USER (username,password,firstname,lastname,email,dateofbirth,admin) VALUES('${user.username}','${user.password}','${user.firstname}','${user.lastname}','${user.email}','${user.birthday}','0')`;
//     let response1;
//     try {

//         response1 = await promisePool.query(sql)
//     } catch (error) {
//         console.log('cant insert user info,', error);
//     }
    
// });  


//!!!!!!!!!!!!!!!!!endoint gia covidinfo
app.post('/sendcovidinfo',async function(req,res){
    const positivecheck = req.body.usrpstive;
    const whencovid = req.body.covidate; 

    console.log(positivecheck);
    console.log(whencovid);
//    const sql= `INSERT INTO USER (username,password,firstname,lastname,email,dateofbirth,admin) VALUES('${user.username}','${user.password}','${user.firstname}','${user.lastname}','${user.email}','${user.birthday}','0')`;
//FROM user INNER JOIN userhistory ON user.userId=userhistory.userId
    console.log(user[0].username);
     if(user[0].username.length>0)
     {
         //const usersId= `SELECT userId FROM user INNER JOIN userhistory ON user.userId=userhistory.userId` ;
         //const userdIdres = await promisePool.query(usersId);
         //console.log(userdIdres);
         const usrhascovid = `INSERT INTO userhistory (userId,userpositive,usernegative,dateofcovid)  VALUES( '${user[0].userId}','${positivecheck}','off','${whencovid}')`;
         const dbaseres=await promisePool.query(usrhascovid);
         console.log(dbaseres[0]);
         res.send();
    }
     else{
         alert("Παρακαλώ συνδεθείτε στην εφαρμογή για καταχώρηση των στοιχείων σας");
         console.log("Παρακαλώ συνδεθείτε στην εφαρμογή για καταχώρηση των στοιχείων σας")
     }
});


app.post('/edit', async function(req, res) {
    const username = req.body.usern1;
    const password = req.body.pass1;
    const user = req.body.usern2;
    const pass = req.body.pass3;
    const date = req.body.bdate;
    const sql = `UPDATE user SET username='${user}',password='${pass}', dateofbirth='${date}' WHERE username='${username}' AND password='${password}'`;
    const dataBaseUsersResponse = await promisePool.query(sql);
    if (dataBaseUsersResponse[0].affectedRows == 0)
        res.send('invalid');
    else
        res.send('valid');

});

let storesecific= {
    currstore:''
}

app.post('/usercool',async function (req, res) {
   
    const useragree= req.body.useriscool
    const userlat= req.body.userslat
    const userlong= req.body.userslong
    const dayofvisit=req.body.dayofvisit;
    const hourofvisit=req.body.hourzofvisit

    console.log(useragree);
    console.log(userlat);
    console.log(userlong);
    console.log(dayofvisit);
    console.log(hourofvisit);


    const getstore = `SELECT name FROM place WHERE coordinates = POINT('${userlat}', '${userlong}')`;
    const dbgetuserinfo = await promisePool.query(getstore);
    //console.log(dbgetuserinfo[0][0].name);
    storesecific.currstore=dbgetuserinfo[0][0].name;
    //console.log(storesecific.currstore);
    
    console.log(user[0].username);
     if(user[0].username.length>0)
     {
        const insertstore=`INSERT INTO userhistory (userId,placevisited,placevisitedday,placevisitedhour) VALUES( '${user[0].userId}','${dbgetuserinfo[0][0].name}','${dayofvisit}','${hourofvisit}')`;
        let dbinsertuserinfo = await promisePool.query(insertstore);
        console.log(dbinsertuserinfo[0]);
     }

     res.send('userok');
})

// var counter=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// var updatedhour=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

app.post('/userinsert',async function (req, res) {
   
    const today = new Date();
    const hourvisit=today.getHours();
    var currstoore=storesecific.currstore;
    console.log(currstoore);
    const storesusrestim = req.body.userputts;

    var storesusrestimation=(parseInt(storesusrestim));
    console.log(storesusrestimation);
    console.log(typeof hourvisit);
    
    console.log(user[0].username);

    const insertstore=`UPDATE userhistory SET usersestimation='${storesusrestimation}' WHERE placevisited='${currstoore}' AND userId='${user[0].userId}'`;
    let dbinsertuserinfo = await promisePool.query(insertstore);
    console.log(dbinsertuserinfo[0]); 

    const peoplenow=`SELECT count(userId) as usernum,sum(usersestimation) as peoplesum,placevisitedhour FROM userhistory WHERE placevisited='${currstoore}' AND placevisitedhour='${hourvisit}' OR placevisitedhour='${hourvisit-1}' OR placevisitedhour='${hourvisit-2}' GROUP BY placevisitedhour`;
    
    let dbstoreinfo = await promisePool.query(peoplenow);
    console.log(dbstoreinfo[0]);
    // console.log(dbstoreinfo[0][0].peoplesum);
    // console.log(dbstoreinfo[0][0].usernum);
    // console.log(dbstoreinfo[0][0].placevisitedhour); 
    var vistittime=(dbstoreinfo[0][0].placevisitedhour);
    var visittime=[0,0,0];
    var mesosorosatomwnthnwra=[0,0,0];
    for(let i=0; i<3; i++)
    {
        mesosorosatomwnthnwra[i]=Math.round(dbstoreinfo[0][i].peoplesum/dbstoreinfo[0][i].usernum);
        //console.log(mesosorosatomwnthnwra);
        visittime[i]=parseInt(dbstoreinfo[0][i].placevisitedhour);
    }

    var whatineed={
        visitime: visittime,
        peoplestimate: mesosorosatomwnthnwra
    }

    //console.log(whatineed);

    res.send(whatineed);

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
