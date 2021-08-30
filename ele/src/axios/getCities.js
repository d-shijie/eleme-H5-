import { request } from './request'
export function getCities(type) {
    return request({
        url: "/v1/cities",
        params: {
            type
        }
    })
}
export function getCityInfo(id) {
    return request({
        url: '/v1/cities/' + id
    })
}
export function getCityLocation(city_id, keyword) {
    return request({
        url: '/v1/pois',
        params: {
            city_id,
            keyword
        }
    })
}
export function getCityDetail(geohash) {
    return request({
        url: "/v2/pois/" + geohash
    })
}