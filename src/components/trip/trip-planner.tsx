import styles from './trip.module.css'
import CircuitCard from '../circuit/circuit-card'
import { useEffect } from 'react'

interface TripPlannerProps {
   startCircuit: Circuit
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit } = props
   const { city_name } = startCircuit

   const routePayload = {
      startCityName: 'Warszawa',
      destinationCityName: 'Kraków',
   }

   return (
      <section className={styles.tripPlanner}>
         <CircuitCard circuit={startCircuit} />
         <article className={styles.tripDestinationCircuits}>
            <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} />
         </article>
      </section>
   )
}

export default TripPlanner
