import Subjects from "/js/subjects/subjects.js"

let subject = new Subjects()
/**
 * Events
 */
$(document).ready( () => {

    $('#btnAddSubject').on('click', (e) => {
        e.preventDefault()
        addSubject()
    })

    validateFields([
        $('#coursenumber'), 
        $('#coursetitle'),
        $('#coursedescription'),
        $('#unitlec'),
        $('#unitlab')
    ])

})
// ==================================================================

const validateFields = (elem) => {
    
    elem.forEach( (value, key) => {
        
        value.on('blur', () => {
            if ( value.val() == '') {
                value.removeClass('is-valid')
                value.removeClass('is-invalid')
                value.addClass('is-invalid')
            } else {
                // Check if the data dictionary is lec unit or lab unit
                if ( (parseInt($('#unitlec').val()) <= 0 &&  parseInt($('#unitlab').val()) <= 0) && (value.attr('data-dic') == 'lecunit' || value.attr('data-dic') == 'labunit') ) {
                    $('#unitlec, #unitlab').removeClass('is-valid')
                    $('#unitlec, #unitlab').removeClass('is-invalid')
                    $('#unitlec, #unitlab').addClass('is-invalid')
                } else if (value.attr('data-dic') == 'lecunit' || value.attr('data-dic') == 'labunit') {
                    $('#unitlec, #unitlab').removeClass('is-valid')
                    $('#unitlec, #unitlab').removeClass('is-invalid')
                    $('#unitlec, #unitlab').addClass('is-valid')
                } else {
                    value.removeClass('is-valid')
                    value.removeClass('is-invalid')
                    value.addClass('is-valid')
                }
            }
        })
    })
    
}

const addSubject = () => {
    let code = $('#coursenumber').val()
    let title = $('#coursetitle').val()
    let description = $('#coursedescription').val()
    let lecUnits = $('#unitlec').val()
    let labUnits = $('#unitlab').val()
    let isValidated = true

    if ( code == '' || title == '' || description == '' || (lecUnits <= 0 && labUnits <= 0) ) {
        isValidated = false
    }

    if ( isValidated == true ) {
        subject.addSubject(code, title, description, lecUnits, labUnits)
        let subjectsBeingAdded = subject.getAddedSubjects()

        let subjectList = $('#table-content')
        let htmlData = ''

        subjectsBeingAdded.forEach( (value, key) => {
            htmlData += `
                <tr>
                    <td>
                        <div>${value.code} - ${value.title}</div>
                        <div class="text-muted" style="font-size: 0.8rem;border-bottom: 1px solid #000;text-align: justify;">
                            ${value.description}
                        </div>
                        <div class="container-fluid">
                            <div class="row" style="font-size: 0.8rem;">
                                <div class="col-12 my-2">
                                    <div>John Doe <strong>prepared</strong> this document at 8:00 AM on January 1, 2021.</div>
                                    <div>John Doe <strong>evaluated</strong> this document at 9:00 AM on January 2, 2021.</div>
                                    <div>John Doe <strong>approved</strong> this document at 10:00 AM on January 3, 2021.</div>
                                </div>
                                <div class="col-12">
                                    <span>Status</span>: <span class="badge bg-success">Active</span>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="p-0 m-0">
                        <div class="text-center p-0 m-0 px-2 border-bottom">Lec</div>
                        <div class="text-center">${value.lecUnits}</div>
                    </td>
                    <td class="p-0 m-0">
                        <div class="text-center p-0 m-0 px-2 border-bottom">Lab</div>
                        <div class="text-center">${value.labUnits}</div>
                    </td>
                    <td class="p-0 m-0">    
                        <div class="text-center p-0 m-0 px-2 border-bottom">Total</div>
                        <div class="text-center">${parseInt(value.labUnits) + parseInt(value.lecUnits)}</div>
                    </td>
                    <td>
                        
                    </td>
                </tr>
            `
        })
        subjectList.html(htmlData)

        // Clear input data and set focus on code input
        $('#coursenumber').val('')
        $('#coursetitle').val('')
        $('#coursedescription').val('')
        $('#unitlec').val(0)
        $('#unitlab').val(0)

        $('#coursenumber').focus()
    }
}