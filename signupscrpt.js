async function signedupuser() {
    let frstnme = document.getElementById('frstname').value;
    let lstnme = document.getElementById('lstname').value;
    let emailusr = document.getElementById('emailId').value;
    let dateofbrthusr = document.getElementById('dateofbrth').value;
    let usrnmeId = document.getElementById('usrnameId').value;
    let psswrdId = document.getElementById('psswordId').value;

    let userinfo = {
        userfirst: frstnme,
        usersecond: lstnme,
        useremail: emailusr,
        userbirth: dateofbrthusr,
        userappname: usrnmeId,
        userpass: psswrdId
    }
    console.log(userinfo.userfirst)
    let response1 = await axios.post('/signuped', userinfo)
     console.log(response1)
    /*if (password1 != password2) {
        alert('Wrong password, try again!')
    }
    if (password1 == password2) {
        window.location.href = 'http://localhost:3000/history'
    }*/
}
   //console.log(response1);}




