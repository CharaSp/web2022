async function loginuser() {
    let username = document.getElementById("usernemail").value;
    let password = document.getElementById("examplepassword").value;

    let info = {
        user: username,
        pass: password
    }

    let response = await axios.post('/userlogin', info)
    console.log(response);

    if (response.data == 'valid') {
        window.location.href = 'http://localhost:3000/mainpage';
    } else {
        alert('Λάθος στοιχεία χρήστη');
        window.location.href = 'http://localhost:3000/';
    }

    //alert("trexei");


    // async function useraccess(){
    //     let response1= await axios.get('/userlogin')
    //     console.log(response1)
    // }

    // window.location.href = 'http://localhost:3000/mainpage'

}
