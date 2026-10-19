// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const { startCityName, destinationCityName } = req.body

   fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startCityName}&destination=${destinationCityName}&key=${process.env.NEXT_PUBLIC_MAP_KEY}`
   )
      .then((res) => res.json())
      .then((data) => {
         if (data) {
            res.status(200).json(data)
         } else {
            res.status(500).json({ message: 'Failed to receive route data.' })
         }
      })
}
