import { useEffect, useState } from 'react'
import styles from './circuits.module.css'

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
      return (
         <article className={styles.circuitsList}>
            {circuits.map((circuit) => (
               <div
                  key={circuit.circuit_number + circuit.city_name}
                  className={styles.listedCircuit}
               >
                  <section className={styles.circuitBasics}>
                     <span className={styles.circuitNumber}>{circuit.circuit_number}</span>
                     <span className={styles.circuitCity}>{circuit.city_name}</span>
                  </section>
                  <section className={styles.circuitStats}>
                     <span className={styles.mandates}>Mandatów: {circuit.mandates}</span>
                     <span className={styles.population}>Mieszkańców: {circuit.residents}</span>
                     <span className={styles.residentsPerMandate}>
                        Mieszkańców na mandat: {circuit.residentsPerMandate}
                     </span>
                  </section>

                  <section className={styles.circuitVoteHistory}>
                     <span className={styles.historicVotes}>
                        [2019] głosy KO {circuit.votes_ko_2019}
                     </span>
                     <span className={styles.population}>
                        [2019] głosy PIS {circuit.votes_pis_2019}
                     </span>
                     <span className={styles.swingFactor}>
                        Swing Factor: {circuit.swing_factor.toFixed(3)}
                     </span>
                  </section>
               </div>
            ))}
         </article>
      )
   }
}

export default CircuitList
