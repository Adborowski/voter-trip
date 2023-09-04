var fs = require('fs')
var path = require('path')
const districtMap = require('./district-map-old')

console.log(districtMap)

// district = powiat, circuit = okręg wyborczy
const districtList = path.join(process.cwd(), 'district-map.js')
const districts = JSON.parse(fs.readFileSync(districtList))

const getDistricts = (startCity, endCity) => {
   fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startCity}&destination=${endCity}&key=${key}`
   ).then((res) =>
      res.json().then((data) => {
         console.log(data.routes[0].bounds)
      })
   )
}
