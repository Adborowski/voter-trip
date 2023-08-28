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

   let cleanString
   Object.keys(substitutions).forEach((key) => {
      cleanString = dirtyString.replace(key, substitutions[key])
      cleanString = cleanString.replace(' ', '_')
   })

   return cleanString
}

console.log(circuits)
