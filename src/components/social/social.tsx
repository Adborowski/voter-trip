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
         children={<FacebookIcon />}
         url={'www.wycieczkawyborcza.pl'}
         quote={'Jedziemy na wycieczkę'}
         hashtag={'#wycieczkawyborcza'}
      />
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
         children={<LinkedinIcon />}
      />
   )
}
