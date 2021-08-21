import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://coding-assignment-v1.now.sh/api/v1'
})
