import axios from 'axios'

const Api = axios.create({
    baseURL: 'http://localhost/dashboard/',
})

export default Api
