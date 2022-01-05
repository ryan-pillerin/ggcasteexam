export default class Subjects {

    constructor() {
        this.code = null
        this.title = null
        this.description = null
        this.lecUnits = null
        this.labUnits = null

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

        this.subjects.push({
            code: this.code,
            title: this.title,
            description: this.description,
            lecUnits: this.lecUnits,
            labUnits: this.labUnits,
            state: 'save'
        })        
    }

    // Get Added Subjects
    getAddedSubjects = () => {
        return this.subjects
    }

}