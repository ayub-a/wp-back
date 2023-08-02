import axios from 'axios'
import { serializeApiResponse } from '../../helpers/serializeApiResponse.js'
import { UnsplashAPI } from '../unsplashApi.js'

export default class Topic {
  static async list(page = 1, per_page = 20) {
    const response = await UnsplashAPI.get('/topics', { params: { page, per_page } })
    const { data, headers } = serializeApiResponse(response)

    const filteredList = data.filter((_, i) => i !== 0)

    return { data: filteredList, headers }
  }

  static async byIdOrSlug(id_or_slug = '', page = 1, per_page = 20) {
    const endpoints = [`/topics/${id_or_slug}`, `/topics/${id_or_slug}/photos`]

    const response = await axios.all(
      endpoints.map((endpoint) => UnsplashAPI.get(endpoint, { params: { page, per_page } }))
    )

    const serializeAll = response.map((res) => serializeApiResponse(res))

    const responseBody = {
      topicAbout: serializeAll[0].data,
      topicPhotos: serializeAll[1].data,
      headers: serializeAll[0].headers,
    }

    return responseBody
  }
}
