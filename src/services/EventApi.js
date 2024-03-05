import axios from 'axios'
const apiKey = 'FltH4KOi3APMp7SDwAI9GyppU8fodCAf'
const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?'
export const EventsApi = {
  getEvents(place) {
    const url = `${baseUrl}city=${place}&apikey=${apiKey}f`

    return axios.get(url)
  },
}
