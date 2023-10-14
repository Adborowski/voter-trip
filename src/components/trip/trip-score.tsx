import styles from './trip.module.css'

const TripScore = (props: any) => {
   const { score } = props
   return (
      <section className={styles.scoreWrapper}>
         {/* <div className={`${styles.score} ${score > 0 ? styles.good : styles.bad}`}>{score}</div> */}
         {score < 0 && (
            <div className={styles.scoreNote}>
               <span>Twój lokalny okręg jest najlepszym w okolicy.</span>
               <span>
                  Głosuj u siebie aby maksymalnie zwiększyć szanse opozycji. Wyjeżdżając, zwiększasz
                  ryzyko straty mandatu przez opozycję.
               </span>
            </div>
         )}
      </section>
   )
}

export default TripScore
