async function edit() {
    var testpsw = document.getElementById("password2").value;
    var testpsw2 = document.getElementById("password3").value;

    if (testpsw !== testpsw2 || !(testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8)) {
        alert("Wrong password, try again!");
        window.location.href = 'http://localhost:3000/editprofile';
        return;
    } else if (testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8 && testpsw === testpsw2) {
        window.location.href = 'http://localhost:3000/mainpage';

        let username1 = document.getElementById("username1").value;
        let username2 = document.getElementById("username2").value;
        let password1 = document.getElementById("password1").value;
        let password2 = document.getElementById("password2").value;
        let password3 = document.getElementById("password3").value;
        let birthdate = document.getElementById("dateofbirth").value;

        let info = {
            usern1: username1,
            usern2: username2,
            pass1: password1,
            pass2: password2,
            pass3: password3,
            bdate: birthdate
        }

        let response = await axios.post('/edit', info)
        console.log(response);
    }

}

// async function uploadDataToServer() {
//     const fileHtmlElement = document.getElementById('formFile')
//     const selectedFile = fileHtmlElement.files[0];
//     console.log(selectedFile);

//     // gia na steilouyme to arxeio ston server prepei na mpei mesa sto FormData

//     let pinakasMeTaJson = new FormData();

//     pinakasMeTaJson.append('myFile', selectedFile)
//     await axios.post('/uploadjson', pinakasMeTaJson)
// }
