import styles from './trip.module.css'

const TripExplainer = () => {
   return (
      <div className={styles.explainerWrapper}>
         <span>Odległości podane są w przybliżeniu.</span>

         <span>
            Kliknij ZOBACZ POWIAT aby wyświetlić granice i wytyczyć dokładną trasę ze swojej
            lokalizacji.
         </span>

         <span>
            Zanim wyruszysz w drogę, znajdź i zanotuj adres lokalu wyborczego. Tej informacji nie
            znajdziesz w naszym systemie.
         </span>
      </div>
   )
}

export default TripExplainer
