import styles from './loading.module.css'

const Loading = () => {
   return (
      <div className={styles.loadingWrapper}>
         <div className={styles.loading}></div>
         <div className={styles.filter} />
      </div>
   )
}

export default Loading
