import express from 'express'
import Search from '../api/handlers/search.js'

const router = express.Router()

router
  .get('/photos', async (req, res) => {
    const { query, page } = req.query

    const response = await Search.photosByQuery(query, page)
    res.json(response)
  })
  .get('/collections', async (req, res) => {
    const { query, page } = req.query

    const response = await Search.collectionsByQuery(query, page)
    res.json(response)
  })
  .get('/users', async (req, res) => {
    const { query, page } = req.query

    const response = await Search.usersByQuery(query, page)
    res.json(response)
  })

export default router
