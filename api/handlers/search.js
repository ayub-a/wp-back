import axios from 'axios'
import { serializeApiResponse } from '../../helpers/serializeApiResponse.js'
import { UnsplashAPI } from '../unsplashApi.js'

export default class Search {
  static async photosByQuery(query, page = 1, per_page = 20) {
    const endpoints = ['/search/photos', '/search/collections', '/search/users']

    const response = await axios.all(
      endpoints.map((endpoint) => UnsplashAPI.get(endpoint, { params: { query, page, per_page } }))
    )

    const serializeAll = response.map((res) => serializeApiResponse(res))

    const responseBody = {
      photos: {
        total: serializeAll[0].data.total,
        items: serializeAll[0].data.results,
      },
      collections_amount: serializeAll[1].data.total,
      users_amount: serializeAll[2].data.total,
      headers: serializeAll[2].headers,
    }

    return responseBody
  }

  static async collectionsByQuery(query, page = 1, per_page = 20) {
    const endpoints = ['/search/photos', '/search/collections', '/search/users']

    const response = await Promise.all(
      endpoints.map(
        async (endpoint) => await UnsplashAPI.get(endpoint, { params: { query, page, per_page } })
      )
    )

    const serializeAll = response.map((res) => serializeApiResponse(res))

    const responseBody = {
      photos_amount: serializeAll[0].data.total,
      collections: {
        total: serializeAll[1].data.total,
        items: serializeAll[1].data.results,
      },
      users_amount: serializeAll[2].data.total,
      headers: serializeAll[2].headers,
    }

    return responseBody
  }

  static async usersByQuery(query, page = 1, per_page = 20) {
    const endpoints = ['/search/photos', '/search/collections', '/search/users']

    const response = await axios.all(
      endpoints.map((endpoint) => UnsplashAPI.get(endpoint, { params: { query, page, per_page } }))
    )

    const serializeAll = response.map((res) => serializeApiResponse(res))

    const responseBody = {
      photos_amount: serializeAll[0].data.total,
      collections_amount: serializeAll[1].data.total,
      users: {
        total: serializeAll[2].data.total,
        items: serializeAll[2].data.results,
      },
      headers: serializeAll[2].headers,
    }

    return responseBody
  }
}
