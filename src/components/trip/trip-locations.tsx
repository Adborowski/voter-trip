import styles from './trip.module.css'

const TripLocations = ({ originCity, destinationCity }: any) => {
   return (
      <section className={styles.locations}>
         <span className={styles.origin}>{originCity}</span>
         <div className={styles.arrow}></div>
         <span className={styles.destination}>{destinationCity}</span>
      </section>
   )
}

export default TripLocations
