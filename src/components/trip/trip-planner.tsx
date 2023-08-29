import styles from './trip.module.css'
import CircuitCard from '../circuit/circuit-card'

interface TripPlannerProps {
   startCircuit: Circuit
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit } = props
   const { city_name } = startCircuit
   return (
      <section className={styles.tripPlanner}>
         <CircuitCard circuit={startCircuit} />
         <button className={styles.btnPlanTrip}>Zaplanuj wycieczkę do innego okręgu</button>
         <article className={styles.tripDestinationCircuits}>
            <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} />
         </article>
      </section>
   )
}

export default TripPlanner
