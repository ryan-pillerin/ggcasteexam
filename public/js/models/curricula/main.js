import curricula from '/js/models/curricula/curricula.js'

let curriculum = new curricula()

$(document).ready( function() {
    let btnSaveCurriculum = $('#addCurriculum')

    // Form Object
    let txtCode = $('#programCode')
    let txtTitle = $('#programTitle')
    let txtMajor = $('#programMajor')
    let txtYearsToFinish = $('#yearstofinish')
    let txtEffectivityDate = $('#effectivityDate')

    let btnActivateDeactivate = $('.btnactivatedeactivate')
    /**
     * Event method will be put here!
     */
    
    // Save Curriculum Event
    btnSaveCurriculum.on('click', function(e) {
        e.preventDefault();
        let code = txtCode.val()
        let program = txtTitle.val()
        let major = txtMajor.val()
        let yearstofinish = txtYearsToFinish.val()
        let effectivitydate = moment(txtEffectivityDate.val()).format('YYYY-MM-DD')

        curriculum.saveCurriculum(code, program, major, yearstofinish, effectivitydate)

    })  

    btnActivateDeactivate.on('click', function() {
        
        if ( $(this).hasClass('btn-warning') ) {
            $(this).removeClass('btn-warning')
            $(this).addClass('btn-success')
            $(this).attr('title', 'The Program is currently Activated.')
            $(this).find('i').html('toggle_on')
        } else {
            $(this).removeClass('btn-success')
            $(this).addClass('btn-warning')
            $(this).attr('title', 'The Program is currently Deactivated.')
            $(this).find('i').html('toggle_off')
        }

    })
    /*$('#effectivityDate').blur( () => {
        console.log(moment($('#effectivityDate').val()).format('MM/DD/YYYY'))
    })*/


})
