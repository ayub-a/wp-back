import express from 'express'
import Collection from '../api/handlers/collection.js'

const router = express.Router()

router
  .get('/', async (req, res) => {
    const response = await Collection.list()
    res.json(response)
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params
    const { page } = req.query

    const response = await Collection.photosById(id, page)
    res.json(response)
  })

export default router
