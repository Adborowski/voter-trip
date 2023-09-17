import styles from './circuits.module.css'
import SwingInfo from './swing-info'

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
   } = circuit.circuit

   const voteStrength = residentsPerMandate / 100
   console.log(voteStrength)

   return (
      <div key={circuit_number + city_name} className={styles.circuitCard}>
         <section className={styles.circuitBasics}>
            <span className={styles.circuitNumber}>Okręg nr {circuit_number}</span>
            <span className={styles.circuitCity}>{city_name}</span>
         </section>

         <SwingInfo circuit={circuit} />
         <section className={styles.circuitStats}>
            {/* <span className={styles.mandates}>Mandatów: {mandates}</span> */}
            {/* <span className={styles.population}>Mieszkańców: {residents}</span> */}
            <span className={styles.residentsPerMandate}>
               Mieszkańców na mandat: {residentsPerMandate}
            </span>
         </section>
         {/* <section className={styles.circuitVoteHistory}>
            <span className={styles.historicVotes}>[2019] głosy KO {votes_ko_2019}</span>
            <span className={styles.population}>[2019] głosy PIS {votes_pis_2019}</span>
         </section> */}
      </div>
   )
}

export default CircuitCard
