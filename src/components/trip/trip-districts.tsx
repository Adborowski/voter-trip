import styles from './trip.module.css'

const TripDistrict = ({ district }: any) => {
   const url = `https://www.google.com/maps/search/powiat+${district.district_id}/`
   district.district_id = district.district_id.replace('powiat', '')

   return (
      <>
         <article className={styles.closestDistrict} key={district.district_id}>
            <section className={styles.name}>
               <span>{district.district_id}</span>
            </section>

            <section>
               <span className={styles.distance}>{district.distanceFromOrigin?.toFixed(0)} km</span>
            </section>
            <button
               onClick={() => {
                  window.open(url, '_blank')
               }}
            >
               Zobacz powiat
            </button>
         </article>
         {district.tourism && <div className={styles.tourism}>{district.tourism}</div>}
      </>
   )
}

const TripDistricts = ({ districts }: any) => {
   if (districts) {
      return (
         <section className={styles.closestDistricts}>
            <h3>Najbliższy powiat</h3>

            {districts.map((district: District, index: number) => {
               if (index < 1) {
                  return <TripDistrict key={district.district_id} district={district} />
               }
            })}
         </section>
      )
   }
}

export default TripDistricts
