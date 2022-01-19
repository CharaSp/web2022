async function edit() {
    let username = document.getElementById('exampleInputUsername1').value;
    let email = document.getElementById('exampleInputEmail1').value;
    let password1 = document.getElementById('exampleInputPassword1').value;
    let password2 = document.getElementById('exampleInputPassword2').value;

    let info = {
        user: username,
        pass: password1
    }
    let response = await axios.post('/login', info)


    if (password1 != password2) {
        alert('Wrong password, try again!')
    }

    if (password1 == password2) {
        window.location.href = 'http://localhost:3000/history'
    }
    console.log(response);
}