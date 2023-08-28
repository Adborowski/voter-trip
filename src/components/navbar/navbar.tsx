import styles from './navbar.module.css'

const Navbar = () => {
   return (
      <div className={styles.navbar}>
         <section className={styles.instructionWrapper}>
            <span>Wybierz swój lokalny okręg wyborczy</span>
         </section>
      </div>
   )
}

export default Navbar
