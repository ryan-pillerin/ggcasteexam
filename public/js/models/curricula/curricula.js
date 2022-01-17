export default class Curricula {

    constructor() {
        this.curriculum = []
    }

    saveCurriculum = (code, program, major, numberofyears, effectivitydate) => {
        /**
         * Save the Curriculum in the database  
         */
        axios({
            method: 'POST',
            url: '/curriculum/addprogram',
            data: {
                code: code,
                program: program,
                major: major,
                numberofyears: numberofyears,
                effectivitydate: effectivitydate
            }
        }).then( (response) => {
            console.log(response)
            if (response.statusText == 'OK' && response.status == 200) {
                console.log(response.data)
            }
        })
        
    }

}