import axios from 'axios'

const energyAPI = axios.create({
  baseURL: 'https://pbt3g11w0i.execute-api.us-east-1.amazonaws.com/dev/',
  withCredentials:false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getPing(){
    return energyAPI.get('/ping')
  },
  getDailyStats(){
    return energyAPI.get('dailyStats')
  }
}
