import styles from './trip.module.css'
import CircuitList from '../circuit/circuit-list'

interface TripPlannerProps {
   startCircuit: Circuit
   scoredCircuits: Circuit[]
   tripCount: number
   ref?: any
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit, scoredCircuits, tripCount } = props
   const { city_name } = startCircuit

   return (
      <section className={styles.tripPlanner}>
         <h2>Twój lokalny okręg wyborczy</h2>
         <CircuitList circuits={[startCircuit]} length={1} />
         <h2>Twoja wycieczka</h2>
         <article className={styles.tripDestinationCircuits}>
            <CircuitList circuits={scoredCircuits} length={tripCount} />
         </article>
      </section>
   )
}

export default TripPlanner
