function testpsw() {
    var testpsw = document.getElementById("psswordId").value;
    var res;
    if(testpsw.match(/[a-z]/g) && testpsw.match(/[A-Z]/g) && testpsw.match(/[0-9]/g) && testpsw.match(/[^a-zA-Z\d]/g) && testpsw.length >= 8)
                window.location.href = "mainpage.ejs";
                else
                alert("You need a more powerful password.");
}

function testpsw2() {
    var testpsw = document.getElementById("psswordId").value;
    var testpsw2 = document.getElementById("psswordId2").value;
    var res;
    if (testpsw === testpsw2)
      //console.log("ok");
      window.location.href = "mainpage.ejs";
      else if(testpsw !== testpsw2)
      alert("Wrong password, try again!");
    
}

async function signedupuser() {

    testpsw();
    testpsw2();

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

}
   //console.log(response1);




