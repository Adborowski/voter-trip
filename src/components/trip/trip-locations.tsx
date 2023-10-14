import styles from './trip.module.css'

const TripLocations = ({ originCity, destinationCity }: any) => {
   return (
      <section className={styles.locations}>
         <span>{originCity}</span>
         <div className={styles.arrow}></div>
         <span>{destinationCity}</span>
      </section>
   )
}

export default TripLocations
