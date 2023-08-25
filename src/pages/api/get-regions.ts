// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const xlsx = require('xlsx')
var fs = require('fs')
var XLSX = require('xlsx')

var workbook = XLSX.readFile('public/okregi.xlsx')
var sheet_name_list = workbook.SheetNames
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))

type Data = {
   name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   res.status(200).json({ name: 'John Doe' })
}
