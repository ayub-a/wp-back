export function serializeApiResponse(response) {
  const fullData = {
    data: response.data,
    headers: {
      limit: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining'],
    },
  }

  return fullData
}
