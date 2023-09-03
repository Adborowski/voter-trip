// https://wybory.gov.pl/sejmsenat2023/pl/sejm/okregi
// run this in the browser under this address
// to rip districts from circuits and create an object
// this was used to create district-map.js
// this is NOT part of the app

// big boys are <td> elements in an array
bigBoys.forEach((boy) => {
   // 	console.log(boy.dataset.id)
   let localDistrictElements = Array.from(boy.querySelectorAll('li'))
   let localDistrictNames = localDistrictElements.map((elm) => {
      return elm.innerText
   })

   districtMap[boy.dataset.id] = localDistrictNames
})

console.log(districtMap)
