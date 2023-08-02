import { formatBytes } from '../../helpers/formatBytes.js'
import { serializeApiResponse } from '../../helpers/serializeApiResponse.js'
import { UnsplashAPI } from '../unsplashApi.js'

export default class Photo {
  static async list(page = 1, per_page = 20) {
    const response = await UnsplashAPI.get('/photos', { params: { page, per_page } })

    return serializeApiResponse(response)
  }

  static async random() {
    const response = await UnsplashAPI.get('/photos/random')
    return serializeApiResponse(response)
  }

  static async byId(id) {
    const response = await UnsplashAPI.get(`/photos/${id}`)

    const serialize = serializeApiResponse(response)

    const responseImg = await fetch(serialize.data.urls.full)
    const responseBlob = await responseImg.blob()

    serialize.data.size = formatBytes(responseBlob.size)

    return serialize
  }

  static async download(id) {
    const response = await UnsplashAPI.get(`/photos/${id}/download`)
    return response.data
  }
}
