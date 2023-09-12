import styles from './trip.module.css'

const TripScore = (props: any) => {
   const { score } = props
   return (
      <section className={styles.scoreWrapper}>
         <div className={`${styles.score} ${score > 0 ? styles.good : styles.bad}`}>{score}</div>
         {score < 0 && (
            <div className={styles.scoreNote}>
               <span>Brak korzystnych wycieczek wyborczych.</span>
               <span>Głosuj u siebie.</span>
            </div>
         )}
      </section>
   )
}

export default TripScore
