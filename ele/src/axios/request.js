import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'https://elm.cangdu.org',
        timeout: 3000
    })
    return instance(config)
}
