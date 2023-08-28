// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs')
import path from 'path'

type Data = {
   circuits: {}
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const dirRelativeToPublicFolder = 'circuit-list.json'
   const dir = path.resolve('./public', dirRelativeToPublicFolder)

   const circuits = JSON.parse(fs.readFileSync(dir))

   res.status(200).json(circuits)
}
