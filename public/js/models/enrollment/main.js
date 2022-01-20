import enrollment from '/js/models/enrollment/enrollment.js'

let enroll = new enrollment()

$(document).ready( () => {

    $('#searchStudents').keyup( (e) => {
        //console.log('test')
        //console.log('Test: ' + $('#searchStudents').val())
        //enroll.getStudentDataBySearchValue($('#searchStudents').val(), $("#datalistOptions"))
        //console.log($("#datalistOptions option[value='" + $('#searchStudents').val() + "']").attr('data-id'))
    })

    
})