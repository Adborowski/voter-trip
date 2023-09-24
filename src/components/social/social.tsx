import styles from './social.module.css'

import {
   EmailShareButton,
   FacebookShareButton,
   HatenaShareButton,
   InstapaperShareButton,
   LineShareButton,
   LinkedinShareButton,
   LivejournalShareButton,
   MailruShareButton,
   OKShareButton,
   PinterestShareButton,
   PocketShareButton,
   RedditShareButton,
   TelegramShareButton,
   TumblrShareButton,
   TwitterShareButton,
   ViberShareButton,
   VKShareButton,
   WhatsappShareButton,
   WorkplaceShareButton,
} from 'react-share'

import {
   EmailIcon,
   FacebookIcon,
   FacebookMessengerIcon,
   HatenaIcon,
   InstapaperIcon,
   LineIcon,
   LinkedinIcon,
   LivejournalIcon,
   MailruIcon,
   OKIcon,
   PinterestIcon,
   PocketIcon,
   RedditIcon,
   TelegramIcon,
   TumblrIcon,
   TwitterIcon,
   ViberIcon,
   VKIcon,
   WeiboIcon,
   WhatsappIcon,
   WorkplaceIcon,
} from 'react-share'

export const ShareFacebook = (props: any) => {
   return (
      <FacebookShareButton
         className={styles.shareButton}
         title={'hi'}
         url={`https://voter-trip.vercel.app/map`}
         quote={'Jedziemy na wycieczkę'}
         hashtag={'#wycieczkawyborcza'}
      >
         <FacebookIcon />
      </FacebookShareButton>
   )
}

export const ShareLinkedIn = (props: any) => {
   return (
      <LinkedinShareButton
         url={'www.wycieczkawyborcza.pl'}
         className={styles.shareButton}
         title={'Wycieczka Wyborcza'}
         summary={'Jedziemy na wycieczkę wyborczą'}
         source={'www.wycieczkawyborcza.pl'}
      >
         <LinkedinIcon />
      </LinkedinShareButton>
   )
}

export const ShareTwitter = (props: any) => {
   return (
      <TwitterShareButton url={`https://voter-trip.vercel.app/map`}>
         <TwitterIcon />
      </TwitterShareButton>
   )
}
