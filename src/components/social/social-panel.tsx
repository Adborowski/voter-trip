import styles from './social.module.css'
import { ShareFacebook, ShareLinkedIn, ShareTwitter } from './social'

const SocialPanel = (props: any) => {
   const { originId } = props
   return (
      <div className={styles.socialPanel}>
         <ShareFacebook />
         <ShareLinkedIn />
         <ShareTwitter />
      </div>
   )
}

export default SocialPanel
