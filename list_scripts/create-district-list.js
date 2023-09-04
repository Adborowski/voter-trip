var fs = require('fs')
var path = require('path')

// district = powiat, circuit = okręg wyborczy
const districtList = path.join(process.cwd(), 'district-map.json')
const districts = JSON.parse(fs.readFileSync(districtList))

const circuitList = path.join(process.cwd(), 'circuit-list.json')
const circuits = JSON.parse(fs.readFileSync(circuitList))

const key = 'AIzaSyAMPmsY6KO8UGZ-Zyj_CSdxd9PJZUTouGA'

const getDistrictInfo = async function (districtName) {
   const urlString = `
    https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=name%2Cgeometry%2Cplace_id&input=${
       'powiat' + districtName
    }&inputtype=textquery&key=${key}&types=administrative_area_level_2`

   const info = await fetch(urlString, {
      method: 'GET',
   })
      .then((res) => res.json())
      .then((json) => {
         json.candidates[0].district_id = districtName
         return json.candidates[0]
      })

   return info
}

const getDistrictInfoForCircuit = async function (circuitNumber) {
   const districtNames = districts[circuitNumber.toString()]
   const circuitDistricts = []

   for (districtName of districtNames) {
      const districtInfo = await getDistrictInfo(districtName)
      circuitDistricts.push(districtInfo)
   }

   return circuitDistricts
}

const addDistrictInfo = async function (circuits) {
   for (circuit of circuits) {
      console.clear()
      console.log('Adding district info to', circuit.city_name)
      const districtInfo = await getDistrictInfoForCircuit(circuit.circuit_number)
      console.log(districtInfo.length, 'districts added.')
      circuit.districts = districtInfo
   }

   const fileId = Math.floor(Math.random() * 1000)
   fs.writeFileSync(`circuit-map-${fileId}.json`, JSON.stringify(circuits))
}

addDistrictInfo(circuits)
