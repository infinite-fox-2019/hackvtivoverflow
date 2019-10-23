import axios from 'axios'

export default axios.create({
    baseURL: process.env.VUE_APP_HOSTURL,
    headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
    }
})