import fs from 'fs'
import { read, writeFileXLSX } from 'xlsx'

const RegionList = () => {
   console.log('Getting region list...')

   fetch('/api/get-regions')
      .then((res) => res.json())
      .then((data) => {
         console.log(data)
      })

   return <h1>Region list!</h1>
}

export default RegionList
