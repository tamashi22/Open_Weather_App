import axios from 'axios'
const access_token = '2G66_3i79DimftLse7HZN09HbviecNwhB77g8N1Lyg4'
const baseUrl = 'https://api.unsplash.com/search/photos'
export const EventsApi = {
  getEvents(place, per_page) {
    return axios.get(baseUrl, {
      headers: {
        Authorization: `Client-ID ${access_token}`,
      },
      params: {
        query: place,
        per_page: per_page,
      },
    })
  },
}
