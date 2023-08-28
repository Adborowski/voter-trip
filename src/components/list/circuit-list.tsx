import { useEffect, useState } from 'react'
import styles from './circuits.module.css'
import CircuitCard from './circuit-card'

interface CircuitListProps {
   circuitList: {}[] | undefined
}

const CircuitList = (props: CircuitListProps) => {
   const [circuits, setCircuits] = useState<Circuit[]>()

   useEffect(() => {
      fetch('/api/get-circuits')
         .then((res) => res.json())
         .then((circuits) => {
            if (circuits) {
               console.log(circuits)
               setCircuits(circuits)
            }
         })
   }, [])
   if (circuits) {
      console.log('XXX', circuits[0])
      return (
         <article className={styles.circuitsList}>
            <CircuitCard circuit={circuits[0]} />
         </article>
      )
   }
}

export default CircuitList
