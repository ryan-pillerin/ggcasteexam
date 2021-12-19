const addFacilitatorData = () => {
    let firstname = $('#txtfirstname').val()
    let lastname = $('#txtlastname').val()

    axios({
        method: 'POST',
        url: '/dashboard/addfacilitator',
        data: {  
            firstname: firstname,
            lastname: lastname
        }
    }).then( (result) => {
        // Update the list if successfull           
        if ( result.data.code == 0 && result.status == 200 ) {
            getallfacilitator()
        }
    })

}

const getallfacilitator = () => {

    axios({
        method: 'POST',
        url: '/dashboard/getallfacilitator'
    }).then( (result) => {

        let data = result.data.data
        let htmlData = null

        data.forEach( (value, key) => {
            htmlData += '<tr>'
            htmlData += "<td>" + parseFloat(key + 1) + "</td>"
            htmlData += "<td>" + value.firstname + " " + value.lastname + "</td>"
            htmlData += "<td>" + value.createddate + "</td>"
            htmlData += "<td>" + value.updateddate + "</td>"
            htmlData += "<td class='text-center'><input class='form-check-input selected-facilitator' data-id='" + value.id + "' type='checkbox'></td>"
            htmlData += "</tr>"
        })
        
        $('#facilitator-data').html(htmlData);

        $('#txtfirstname').val('')
        $('#txtlastname').val('')
        $('#exampleModal').modal('hide')
    })
}

const addaccount = () => {

}