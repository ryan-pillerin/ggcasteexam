import curricula from '/js/models/curricula/curricula.js'

let curriculum = new curricula()

$(document).ready( function() {
    
    let btnCreateCurriculum = $('#btnCreateCurriculum')
    let toastMessage = $('.toast')
    /** 
     *  Events
     */
    btnCreateCurriculum.on('click', function(e) {
        e.preventDefault()
        toastMessage.toast('show')
        let programid = $('#program').val()
        let effectivityDate = $('#effectivitydate').val()

    })

})
