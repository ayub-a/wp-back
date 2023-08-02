import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'

export const UnsplashAPI = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
})
