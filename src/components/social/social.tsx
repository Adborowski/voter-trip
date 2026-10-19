import styles from './social.module.css'

import {
   FacebookShareButton,
   LinkedinShareButton,
   XShareButton,
   FacebookIcon,
   LinkedinIcon,
   XIcon,
} from 'react-share'

// og metatag testing needs to be done on a link

export const ShareFacebook = (props: any) => {
   return (
      <FacebookShareButton
         className={styles.shareButton}
         title={'hi'}
         url={`https://voter-trip.vercel.app/map`}
         hashtag={'#wycieczkawyborcza'}
      >
         <FacebookIcon />
      </FacebookShareButton>
   )
}

export const ShareLinkedIn = (props: any) => {
   return (
      <LinkedinShareButton url={'www.wycieczkawyborcza.pl'} className={styles.shareButton}>
         <LinkedinIcon />
      </LinkedinShareButton>
   )
}

export const ShareTwitter = (props: any) => {
   return (
      <XShareButton className={styles.shareButton} url={`https://voter-trip.vercel.app/map`}>
         <XIcon />
      </XShareButton>
   )
}
