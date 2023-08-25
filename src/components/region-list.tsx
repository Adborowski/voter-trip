import { useEffect, useState } from 'react'
import styles from './regions.module.css'

const RegionList = () => {
   console.log('%cGetting region list...', 'color: yellow')

   interface Region {
      nr_okregu: number
      siedziba_okregu: string
   }

   const [regionsData, setRegionsData] = useState<Region[]>()

   useEffect(() => {
      fetch('/api/get-regions')
         .then((res) => res.json())
         .then((regionsData) => {
            if (regionsData) {
               console.log(regionsData.regions)
               setRegionsData(regionsData.regions)
            }
         })
   }, [])
   if (regionsData) {
      return (
         <>
            {regionsData.map((region) => (
               <div className={styles.region}>
                  <span>{region.nr_okregu}</span>
                  <span>{region.siedziba_okregu}</span>
               </div>
            ))}
         </>
      )
   }
}

export default RegionList
