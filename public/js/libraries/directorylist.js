export default class DirectoryList {
    constructor () {       

        this.provinces = {
            "davor": {
                "province": "Davao Oriental",
                "cities": {
                    "bag": {
                        "city": "Bagangga",
                        "barangays": {
                            "pob": "Poblacion"
                        }
                    }
                }
            },
            "davnor": "Davao Del Norte"
        }       
    }

    getProvince = () => {
        
        let htmlData = ''

        let cities = this.provinces[$('cbmProvince').val()].cities


    }

    getCities = (provinceCode) => {

        let cities = this.provinces[provinceCode].cities
        let htmlData = '<option value="">Select City</option>'

        for (const citycode in cities ) {
            htmlData += `
                <option value="` + citycode + `">` + cities[citycode].city + `</option>
            `
        }

        return htmlData;

    }

    getBarangays = (provinceCode, cityCode) => {
        let barangays = this.provinces[provinceCode].cities[cityCode].barangays

        let htmlData = '<option value="">Select Barangay</option>'
        for (const barangayCode in barangays ) {
            htmlData += `
                <option value="` + barangayCode + `">` + barangays[barangayCode] + `</option>
            `
        }
        return htmlData
    }

}