import CircuitList from '@/components/circuit/circuit-list'
import HomeButton from '@/components/navbar/home-button'
import { useEffect, useState } from 'react'
import styles from '@/components/circuit/circuits.module.css'

const ListaOkregow = (props: any) => {
   const [circuits, setCircuits] = useState<Circuit[]>()
   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               setCircuits(circuits)
            }
         })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (circuits) {
      return (
         <>
            <HomeButton />
            <main className={styles.listPage}>
               <h1>Okręgi wyborcze</h1>
               <CircuitList circuits={circuits} length={41} />
            </main>
         </>
      )
   }
}

export default ListaOkregow
