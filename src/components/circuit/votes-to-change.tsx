import styles from './circuits.module.css'

const VotesToChange = (props: any) => {
   const { votesToGain, votesToLose } = props

   let infoString = ''
   let infoClass = ''

   if (votesToGain < 5000) {
      infoString = 'Duża szansa na kolejny mandat dla opozycji'
      infoClass = styles.safe
   }

   if (votesToLose < 5000) {
      infoString = 'Duża szansa na stratę mandatu dla opozycji'
      infoClass = styles.danger
   }

   return (
      <div className={styles.votesToChange}>
         <div className={`${styles.voteInfoHeader} ${infoClass}`}> {infoString}</div>
         <div className={styles.voteInfoBlock}>
            Do kolejnego mandatu brakuje {votesToGain} głosów.
         </div>
         <div className={styles.voteInfoBlock}>Do straty mandatu brakuje {votesToLose} głosów.</div>
      </div>
   )
}

export default VotesToChange
