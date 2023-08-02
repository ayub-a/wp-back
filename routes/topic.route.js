import express from 'express'
import Topics from '../api/handlers/topic.js'

const router = express.Router()

router
  .get('/', async (req, res) => {
    const response = await Topics.list()
    res.json(response)
  })
  .get('/:id_or_slug', async (req, res) => {
    const { id_or_slug } = req.params
    const { page } = req.query

    const response = await Topics.byIdOrSlug(id_or_slug, page)
    res.json(response)
  })

export default router
