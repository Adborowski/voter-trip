import styles from './trip.module.css'
import CircuitCard from '../circuit/circuit-card'
import CircuitList from '../circuit/circuit-list'

interface TripPlannerProps {
   startCircuit: Circuit
   scoredCircuits: Circuit[]
   tripCount: number
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit, scoredCircuits, tripCount } = props
   const { city_name } = startCircuit

   return (
      <section className={styles.tripPlanner}>
         <h2>Twój lokalny okręg wyborczy</h2>
         <CircuitList circuits={[startCircuit]} length={1} />
         <h2>Twoje wycieczki</h2>
         <article className={styles.tripDestinationCircuits}>
            <CircuitList circuits={scoredCircuits} length={tripCount} />
         </article>
      </section>
   )
}

export default TripPlanner
