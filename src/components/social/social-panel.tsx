import styles from './social.module.css'
import { ShareFacebook, ShareLinkedIn } from './social'

const SocialPanel = () => {
   return (
      <div className={styles.socialPanel}>
         <ShareFacebook />
         <ShareLinkedIn />
      </div>
   )
}

export default SocialPanel
