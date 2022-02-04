// paw sto signup.ejs arxeio kai pros8etw panw auto 
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> 
//opws exw kanei gia axios
async function signedupuser() {
    var testpsw = document.getElementById("psswordId").value;
    var testpsw2 = document.getElementById("psswordId2").value;

    if (testpsw !== testpsw2 || !(testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8)) {
        alert("Wrong password, try again!");
        return;
    } else if (testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8 && testpsw === testpsw2) {
        window.location.href = 'http://localhost:3000/mainpage'; //mexri edw idio..kai twra pros8etw ajax
        //oti eixa balei se let
        var firstname = $("#frstname").val();
        var secondname = $("#lstname").val();
        var email = $("#emailId").val();
        var bdate = $("#dateofbrth").val();
        var username = $("#usrnameId").val();
        var password = $("#psswordId").val();

        $.ajax({
            url: '/signuped', // to path pou eixa mesa sto axios.post
            method: 'POST',
            data: {
                //oti eixa balei mesa sto obj userinfo
                userfirst: firstname,
                usersecond: secondname,
                useremail: email,
                userbirth: bdate,
                userappname: username,
                userpass: password

            },
            error: function(xhr, status, error) { console.log(status, error); }, //opws einai kopi peist
            success: function(response) {} //opws einai kopi peist



        });
    }
}


//************* palios kwdikas *************************************



//     let frstnme = document.getElementById("frstname").value;
//     let lstnme = document.getElementById("lstname").value;
//     let emailusr = document.getElementById("emailId").value;
//     let dateofbrthusr = document.getElementById("dateofbrth").value;
//     let usrnmeId = document.getElementById("usrnameId").value;
//     let psswrdId = document.getElementById("psswordId").value;

//     let userinfo = {
//         userfirst: frstnme,
//         usersecond: lstnme,
//         useremail: emailusr,
//         userbirth: dateofbrthusr,
//         userappname: usrnmeId,
//         userpass: psswrdId
//     }
//     let response1 = await axios.post('/signuped', userinfo)
//     console.log(response1)
// }
