import axiosW from 'axios'

const weatherAPI = axiosW.create({
  baseURL: 'api.openweathermap.org/data/2.5/weather?',
  withCredentials:false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  axiosW,
  getWeather(){
    return weatherAPI.get('q=Edinburgh&appid=4e8e8d8d2ba66009f35871f6b010f075')
  }
}
