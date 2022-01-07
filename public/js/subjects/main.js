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
            htmlData += `<tr>`
            htmlData += `   <td class="text-center align-middle"><input type="checkbox" class=` + value.code.replace(' ', '-') + ` ></td>`
            htmlData += `   <td><a class="btn" data-bs-toggle="collapse" href="#` + value.code.replace(' ', '-') + `" aria-expanded="false" aria-controls="` + value.code.replace(' ', '-') + `">` + value.code + ' - ' + value.title + `</a>`
            htmlData += `       <div style="font-size: 0.8rem;" class="text-muted collapse" id="` + value.code.replace(' ', '-') + `">` + value.description + `</div></td>`
            htmlData += `   <td class="text-center align-middle"><div> Lec: ` + value.lecUnits + ` units</div> <div> Lab: ` + value.labUnits + ` unit</div>   </td>`
            htmlData += `   <td class="text-center align-middle">
                                <span class="badge rounded-pill bg-success">Active</span>
                            </td>
                            <td class="text-center align-middle">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                                </div>
                            </td>`
            htmlData += `</tr>`
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