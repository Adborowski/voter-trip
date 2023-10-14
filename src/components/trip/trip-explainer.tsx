import styles from './trip.module.css'

const TripExplainer = () => {
   return (
      <div className={styles.explainerWrapper}>
         <span>
            Możesz zagłosować w dowolnej miejscowości na terenie powiatu. Kliknij ZOBACZ POWIAT i
            znajdź miejscowość najbliższą do twojego miejsca zamieszkania.
         </span>

         <span>
            Przed wyruszeniem w drogę wyszukaj adres konkretnego lokalu wyborczego w tej
            miejscowości. Tej informacji nie znajdziesz na naszej platformie.
         </span>
      </div>
   )
}

export default TripExplainer
