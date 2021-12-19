// Setup event for loading
const btnconnect = () => {
    let hostname = $('#txthost').val()
    let username = $('#txtusername').val()
    let password = $('#txtpassword').val()

    $('#lblresult').html(hostname + ' ' + username + ' ' + password)
}