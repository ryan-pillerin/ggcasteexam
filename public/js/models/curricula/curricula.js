export default class Curricula {

    constructor() {
        this.curriculum = []
    }

    addCurriculum = (programId, semester, yearLevel, effectivityDate) => {
        
        this.curriculum.push({
            programId: programId,
            semester: semester,
            yearLevel: yearLevel,
            effectivityDate: effectivityDate,
            curriculumDetails: []
        })

    }

    addCurriculumDetails = (courseId, prerequisiteId) => {
        this.curriculum.curriculumDetails.push({
            courseId: courseId,
            prerequisiteId: prerequisiteId
        })
    }

    saveCurriculum = () => {
        /**
         * Save the Curriculum in the database  
         */
        
    }

}