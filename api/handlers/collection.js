import axios from 'axios'
import { serializeApiResponse } from '../../helpers/serializeApiResponse.js'
import { UnsplashAPI } from '../unsplashApi.js'

export default class Collection {
  static async list(page = 1, per_page = 20) {
    const response = await UnsplashAPI.get('/collections', { params: { page, per_page } })
    return serializeApiResponse(response)
  }

  static async photosById(id, page = 1, per_page = 20) {
    const endpoints = [`/collections/${id}`, `/collections/${id}/photos`]

    const response = await axios.all(
      endpoints.map((endpoint) => UnsplashAPI.get(endpoint, { params: { page, per_page } }))
    )

    const serializeAll = response.map((res) => serializeApiResponse(res))

    const responseBody = {
      collectionAbout: serializeAll[0].data,
      collectionPhotos: serializeAll[1].data,
      headers: serializeAll[0].headers,
    }

    return responseBody
  }
}
