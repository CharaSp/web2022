async function loginuser() {
    let username_email = document.getElementById('usernemail').value;
    let password = document.getElementById('examplepassword').value;

    let userinfo = {
        usern: username_email,
        pass: password
    }

    let response = await axios.get('/userlogin', userinfo)
    console.log(response)
}