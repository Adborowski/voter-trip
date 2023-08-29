import styles from './trip.module.css'
import CircuitCard from '../circuit/circuit-card'

interface TripPlannerProps {
   startCircuit: Circuit
}

const TripPlanner = (props: TripPlannerProps) => {
   const { startCircuit } = props
   return (
      <section>
         <CircuitCard circuit={startCircuit} />
         <button className={'btnPlanTrip'}>Zaplanuj wycieczkę</button>
      </section>
   )
}

export default TripPlanner
