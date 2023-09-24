import Map from '../map'
import { useRouter } from 'next/router'

const TripMap = () => {
   const router = useRouter()
   let { originId } = router.query

   return (
      <>
         <Map originId={originId} />
      </>
   )
}

export default TripMap
