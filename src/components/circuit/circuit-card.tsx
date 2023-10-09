import styles from './circuits.module.css'
import SwingInfo from './swing-info'
import VotesToChange from './votes-to-change'

const CircuitCard = (circuit: any) => {
   const {
      circuit_number,
      city_name,
      mandates,
      residents,
      residentsPerMandate,
      votes_ko_2019,
      votes_pis_2019,
      swing_factor,
      votesToGain,
      votesToLose,
   } = circuit.circuit

   const voteStrength = residentsPerMandate / 100

   return (
      <div key={circuit_number + city_name} className={styles.circuitCard}>
         <section className={styles.circuitBasics}>
            <span className={styles.circuitNumber}>Okręg nr {circuit_number}</span>
            <span className={styles.circuitCity}>{city_name}</span>
         </section>
         <section className={styles.circuitStats}>
            <VotesToChange votesToGain={votesToGain} votesToLose={votesToLose} />
         </section>
      </div>
   )
}

export default CircuitCard
