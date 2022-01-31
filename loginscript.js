async function loginuser() {
    let username = document.getElementById('exampleInputEmail1').value;
    let password = document.getElementById('exampleInputPassword1').value;

    let info = {
        user: username,
        pass: password
    }

    let response = await axios.get('/userlogin', info)
    console.log(response)
}