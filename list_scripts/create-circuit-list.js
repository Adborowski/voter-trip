var fs = require('fs')
var XLSX = require('xlsx')

var workbook = XLSX.readFile('okregi.xlsx')
var sheet_name_list = workbook.SheetNames
var circuits = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

// find special polish characters and remove their diacritics, replace space with underscore
const cleanString = (dirtyString) => {
   const substitutions = {
      ą: 'a',
      ę: 'e',
      ó: 'o',
      ś: 's',
      ł: 'l',
      ż: 'z',
      ź: 'z',
      ć: 'c',
      ń: 'n',
   }

   let cleanString = dirtyString
   Object.keys(substitutions).forEach((key) => {
      cleanString = cleanString.replace(key, substitutions[key])
      cleanString = cleanString.replace(' ', '_')
   })

   return cleanString.toLowerCase()
}

const newCircuits = circuits.map((circuit) => {
   if (circuit.circuit_number == 19) {
      return { ...circuit, city_id: 'warszawa_central' }
   }

   if (circuit.circuit_number == 20) {
      return { ...circuit, city_id: 'warszawa_suburb' }
   }

   return { ...circuit, city_id: cleanString(circuit.city_name) }
})

console.log(newCircuits)
const fileId = Math.floor(Math.random() * 10000)
fs.writeFileSync(`circuit-list-${fileId}.json`, JSON.stringify(newCircuits))
