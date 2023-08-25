'use client'
import GoogleMapReact from 'google-map-react'
import styles from './regions-map.module.css'
import { useEffect, useState } from 'react'

const RegionsMap = () => {
   const defaultProps = {
      center: {
         lat: 51.9194,
         lng: 19.1451,
      },
      zoom: 6,
   }

   console.log('Map key:', process.env.MAP_KEY)
   const key: any = process.env.NEXT_PUBLIC_MAP_KEY

   return (
      <div className={styles.mapWrapper}>
         <GoogleMapReact
            bootstrapURLKeys={{ key: key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
         ></GoogleMapReact>
      </div>
   )
}

export default RegionsMap
