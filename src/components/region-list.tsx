import { useEffect, useState } from 'react'
import styles from './regions.module.css'

const RegionList = () => {
   interface Region {
      nr_okregu: number
      siedziba_okregu: string
   }

   const [regionsData, setRegionsData] = useState<Region[]>()

   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               console.log(circuits)
            }
         })
   }, [])
   if (regionsData) {
      return (
         <>
            {regionsData.map((region) => (
               <div key={region.nr_okregu + region.siedziba_okregu} className={styles.region}>
                  <span className={styles.regionNumber}>{region.nr_okregu}</span>
                  <span className={styles.regionCity}>{region.siedziba_okregu}</span>
               </div>
            ))}
         </>
      )
   }
}

export default RegionList
