import DirectoryList from "/js/libraries/directorylist.js";

let directory = new DirectoryList()

$(document).ready(() => {
    let cmbProvince = $('#cmbProvince')
    let cmbCities = $('#cmbCities')
    let cmbBarangays = $('#cmbBarangays')

    cmbProvince.on('change', () => {
        let provinceCode = cmbProvince.val()
        
        let htmlData = directory.getCities(provinceCode)
        cmbCities.html(htmlData);

    })

    cmbCities.on('change', () => {
        let htmlData = directory.getBarangays(cmbProvince.val(), cmbCities.val())

        cmbBarangays.html(htmlData)
    })

})
