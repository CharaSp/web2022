async function covid_info() {
    let firstname = document.getElementById('exampleInputFirstName1').value;
    let lastname = document.getElementById('exampleInputLastName1').value;
    // let date= document.getElementById('exampleInputDate').value;

    let info = {
        fname: firstname,
        lname: lastname,
        // Date: date
    }
    let response = await axios.post('/covid_info', info)
    console.log(response);
}