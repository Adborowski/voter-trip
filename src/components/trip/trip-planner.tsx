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

   useEffect(() => {
      fetch('/api/get-route', {
         method: 'POST',
         body: JSON.stringify(routePayload),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               console.log('[get-route]', data)
            }
         })
   }, [])

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
