import styles from './trip.module.css'
import CircuitCard from '../circuit/circuit-card'
import { useEffect } from 'react'

interface TripPlannerProps {
   startCircuit: Circuit
   scoredCircuits: Circuit[]
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit, scoredCircuits } = props
   const { city_name } = startCircuit

   const routePayload = {
      startCityName: 'Warszawa',
      destinationCityName: 'Kraków',
   }

   return (
      <section className={styles.tripPlanner}>
         <h2>Twój lokalny okręg wyborczy</h2>
         <CircuitCard circuit={startCircuit} />
         <h2>Twoje wycieczki</h2>
         <article className={styles.tripDestinationCircuits}>
            {scoredCircuits &&
               scoredCircuits.map((scoredCircuit, index) => {
                  if (index < 5) {
                     return (
                        <CircuitCard
                           key={scoredCircuit.circuit_number + scoredCircuit.city_name}
                           circuit={scoredCircuit}
                        />
                     )
                  }
               })}
            {/* <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} />
            <CircuitCard circuit={startCircuit} /> */}
         </article>
      </section>
   )
}

export default TripPlanner
