import styles from './trip.module.css'

const TripStats = ({ circuit }: any) => {
   console.log('Trip stats for', circuit)

   let time = circuit.route.duration.text
   time = time.replace('hours', 'h')
   time = time.replace('hour', 'h')
   time = time.replace('mins', 'min')
   time = time.replaceAll(' ', '')
   time = time.replace('h', 'h ')

   return (
      <section className={styles.tripStats}>
         <div className={styles.statItem}>{circuit.route.distance.text}</div>
         <div className={styles.statItem}>{time}</div>
      </section>
   )
}

export default TripStats
