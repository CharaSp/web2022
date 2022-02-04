async function signedupuser() {
    var testpsw = document.getElementById("psswordId").value;
    var testpsw2 = document.getElementById("psswordId2").value;

    if (testpsw !== testpsw2 || !(testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8)) {
        alert("Wrong password, try again!");
        return;
    } else if (testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8 && testpsw === testpsw2) {
        window.location.href = 'http://localhost:3000/mainpage';

        let frstnme = document.getElementById("frstname").value;
        let lstnme = document.getElementById("lstname").value;
        let emailusr = document.getElementById("emailId").value;
        let dateofbrthusr = document.getElementById("dateofbrth").value;
        let usrnmeId = document.getElementById("usrnameId").value;
        let psswrdId = document.getElementById("psswordId").value;

        let userinfo = {
            userfirst: frstnme,
            usersecond: lstnme,
            useremail: emailusr,
            userbirth: dateofbrthusr,
            userappname: usrnmeId,
            userpass: psswrdId
        }
        let response1 = await axios.post('/signuped', userinfo)
        console.log(response1)
    }

}


