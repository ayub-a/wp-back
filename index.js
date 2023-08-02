import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

const whitelist = [
  'https://wipe-splash.vercel.app',
  'https://wipe-splash-ayub-a.vercel.app',
  'https://wipe-splash-git-main-ayub-a.vercel.app',
]

const corsOptions = {
  origin: (origin, cb) => {
    if (whitelist.indexOf(origin) > -1) {
      cb(null, true)
    } else {
      cb('CORS request did not succeed.')
    }
  },
}

app.options('*', cors())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))

// ROUTES
import SEARCH_ROUTE from './routes/search.route.js'
import PHOTO_ROUTE from './routes/photo.route.js'
import COLLECTIONS_ROUTE from './routes/collection.route.js'
import TOPICS_ROUTE from './routes/topic.route.js'

app.use('/search', SEARCH_ROUTE)
app.use('/photos', PHOTO_ROUTE)
app.use('/collections', COLLECTIONS_ROUTE)
app.use('/topics', TOPICS_ROUTE)

app.listen(PORT, () => {
  console.log(`[server]: Server running on port ${PORT}`)
})
