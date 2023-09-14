console.log('Tourism')

const { Configuration, OpenAIApi } = require('openai')
const readlineSync = require('readline-sync')
require('dotenv').config()

let APIcall = async () => {
   const newConfig = new Configuration({
      apiKey: process.env.OPENAI_SECRET_KEY,
   })
   const openai = new OpenAIApi(newConfig)
}

APIcall()
