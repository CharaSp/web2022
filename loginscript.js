// paw sto login.ejs arxeio kai pros8etw panw auto 
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> 
//opws exw kanei gia axios
async function loginuser() { //pros8etw ajax
    //oti eixa balei se let
    var username = $("#usernemail").val();
    var password = $("#examplepassword").val();
    $.ajax({
        url: '/userlogin', // to path pou eixa mesa sto axios.post
        method: 'POST',
        data: { // oti eixa balei mesa sto obj info  
            user: username,
            pass: password

        },
        error: function(xhr, status, error) { console.log(status, error); }, //opws einai kopi peist
        success: function(response) { //opws einai kopi peist
            //idiow kwdikas me prin
            if (response == 'valid') {
                window.location.href = 'http://localhost:3000/mainpage';
            } else {
                alert('Λάθος στοιχεία χρήστη');
                window.location.href = 'http://localhost:3000/';
            }


        }

    });

}
//************* palios kwdikas *************************************


// let username = document.getElementById("usernemail").value;
// let password = document.getElementById("examplepassword").value;

// let info = {
//     user: username,
//     pass: password
// }

// let response = await axios.post('/userlogin', info)
// console.log(response);

// if (response.data == 'valid') {
//     window.location.href = 'http://localhost:3000/';
// } else {
//     alert('Λάθος στοιχεία χρήστη');
//     window.location.href = 'http://localhost:3000/';
// }

//alert("trexei");


// async function useraccess(){
//     let response1= await axios.get('/userlogin')
//     console.log(response1)
// }

// window.location.href = 'http://localhost:3000/mainpage'
