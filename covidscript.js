async function covidinfo() {
    var userpositive = document.getElementById('cb1').value;
    var coviddate = document.getElementById('cdate').value;

    if (userpositive !== 'on' || coviddate === '') {
        alert("Παρακαλώ συμπληρώστε όλα τα στοιχεία");
    } else if (userpositive === 'on' && coviddate !== '') {
        var userpositive = $("#cb1").val();
        var coviddate = $("#cdate").val();

        $.ajax({
            url: '/sendcovidinfo', // to path pou eixa mesa sto axios.post
            method: 'POST',
            data: { //oti eixa balei mesa sto obj info
                usrpstive: userpositive,
                covidate: coviddate
            },
            error: function(xhr, status, error) { console.log(status, error); }, //opws einai kopi peist
            success: function(response) {
                if (response == 'valid') {
                    alert("Επιτυχής καταχώρηση!");
                    window.location.href = 'http://localhost:3000/mainpage';
                } else if (response == 'invalid') {
                    alert('Δεν επιτρέπεται η καταχώρηση νέας δήλωσης!')
                    window.location.href = 'http://localhost:3000/mainpage';
                }
            }
        });
    }
}

async function redirected() {
    window.location.href = 'http://localhost:3000/mainpage';
}
