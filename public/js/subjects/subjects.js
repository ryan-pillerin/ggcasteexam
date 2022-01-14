export default class Subjects {

    constructor() {
        /**
         * Code - Course Number
         * Title - Course Title
         * Description - Course Description
         * Lec Units - Lecture Units
         * Lab Units - Laboratory Units
         * State - Status of the subject either active or inactive
         * Status - Prepared, Reviewed, or Approved
         */
        this.code = null
        this.title = null
        this.description = null
        this.lecUnits = null
        this.labUnits = null
        this.state = 0 // 0 - inactive; 1 = active
        this.status = ''

        // Container for adding the subjects
        this.subjects = []
    }
    
    // Add Subjects
    addSubject = (code, title, description, lecUnits, labUnits) => {
        this.code = code
        this.title = title
        this.description = description
        this.lecUnits = lecUnits
        this.labUnits = labUnits

        // Action will be composing of save, delete, and update
        this.subjects.push({
            code: this.code,
            title: this.title,
            description: this.description,
            lecUnits: this.lecUnits,
            labUnits: this.labUnits,           
            status: 0,
        })
        
        /**
         * Add subject into the database under subject
         */
        axios({
            method: 'POST',
            url: '/subjects/_addsubject',
            data: {
                code: this.code,
                title: this.title,
                description: this.description,
                lecunits: this.lecUnits,
                labunits: this.labUnits,
                status: 0
            }
        }).then( (res) => {
            console.log(res)
        })
    }

    // Get Added Subjects
    getAddedSubjects = () => {
        return this.subjects
    }

    /**
     * Edit Information of the subject.
     * In order to edit the information, the subject will automatically switch to
     * inactive move and no one will be able to use it until the data being editted
     * will be reviewed and approved.
     */
    editActiveSubject = (code, title, description, lecUnits, labUnits) => {
        this.code = code
        this.title = title
        this.description = description
        this.lecUnits = lecUnits
        this.labUnits = labUnits
        this.state = 0
    }
}