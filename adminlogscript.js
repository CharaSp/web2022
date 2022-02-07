async function loginadm() {
    var adminame = $("#adminame").val();
    var adminpassword = $("#adminpassword").val();
    $.ajax({
        url: '/admlogin',
        method: 'POST',
        data: {
            admin: adminame,
            pass: adminpassword

        },
        error: function(xhr, status, error) { console.log(status, error); }, //opws einai kopi peist
        success: function(response) {
            if (response == 'valid') {
                window.location.href = 'http://localhost:3000/admin';
            } else {
                alert('Λάθος στοιχεία admin');
                window.location.href = 'http://localhost:3000/adminlogin';
            }
        }

    });
}