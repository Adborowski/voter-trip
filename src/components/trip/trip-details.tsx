import styles from './trip.module.css'

interface TripDetailsProps {
   tripStats: TripStats
}

const TripDetails = ({ tripStats }: TripDetailsProps) => {
   const { score, origin, destination, districts } = tripStats

   return (
      <article className={styles.tripDetails}>
         <section className={styles.locations}>
            <span>{origin}</span>
            <span className={styles.arrow}>→</span>
            <span>{destination}</span>
         </section>

         <section className={styles.score}>{score}</section>
         <section className={styles.closestDistricts}>
            {districts.map((district, index) => {
               console.log('ABC', district)
               if (index < 3) {
                  return (
                     <section key={district.district_id}>
                        <span>{district.district_id}</span>
                        <span>{district.distanceFromOrigin}</span>
                     </section>
                  )
               }
            })}
         </section>
      </article>
   )
}

export default TripDetails
