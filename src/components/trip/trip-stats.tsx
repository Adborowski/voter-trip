import styles from './trip.module.css'

const TripStats = ({ circuit }: any) => {
   let time = circuit.route.duration.text
   time = time.replace('hours', 'h')
   time = time.replace('hour', 'h')
   time = time.replace('mins', 'min')
   time = time.replaceAll(' ', '')
   time = time.replace('h', 'h ')

   return (
      <section className={styles.tripStats}>
         <div className={styles.statItem}>
            <span className={styles.statLabel}>Dystans</span>
            <span className={styles.statValue}>{circuit.route.distance.text}</span>
         </div>
         <div className={styles.statItem}>
            <span className={styles.statLabel}>Czas jazdy</span>
            <span className={styles.statValue}>{time}</span>
         </div>
         <div className={`${styles.statItem} ${styles.date}`}>
            <span className={styles.statLabel}>Wybory</span>
            <span className={styles.statValue}>15.10.2023</span>
         </div>
      </section>
   )
}

export default TripStats
