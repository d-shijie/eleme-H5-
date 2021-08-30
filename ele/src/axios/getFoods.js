import { request } from './request'
export function getFoodCategory() {
    return request({
        url: "/v2/index_entry"
    })
}
export function getFoodShops(latitude, longitude) {
    return request({
        url: "/shopping/restaurants",
        params: {
            latitude,
            longitude
        }
    })
}
export function getSearchShops(geohash, keyword) {
    return request({
        url: "/v4/restaurants",
        params: {
            geohash,
            keyword
        }
    })
}