import express from 'express'
import fs from 'fs'
import Photo from '../api/handlers/photo.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router
  .get('/', async (req, res) => {
    const { page } = req.query

    const response = await Photo.list(page)
    res.json(response)
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params
    const response = await Photo.byId(id)
    res.json(response)
  })

  .get('/random', async (req, res) => {
    const response = await Photo.random()
    res.json(response)
  })

  // Work only on "localhost"
  .get('/:id/download/:aboutPhoto', async (req, res) => {
    const { id, aboutPhoto } = req.params
    const { url } = await Photo.download(id)

    const imagePath = `${__dirname}${aboutPhoto}.jpg`

    const responseImg = await fetch(url)
    const blob = await responseImg.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    fs.writeFileSync(imagePath, buffer)

    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', blob.type)
      res.download(imagePath, () => fs.unlinkSync(imagePath))
    }
  })

export default router
