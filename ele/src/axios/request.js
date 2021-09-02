import axios from 'axios'
axios.defaults.withCredentials = true
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://elm.cangdu.org',
        timeout: 3000,
        withCredentials: true
    })
    return instance(config)
}
