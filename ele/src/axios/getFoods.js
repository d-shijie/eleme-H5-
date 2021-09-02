import { request } from './request'
export function getFoodCategory() {
    return request({
        url: "/v2/index_entry"
    })
}
export function getFoodShops(latitude, longitude, restaurant_category_id) {
    return request({
        url: "/shopping/restaurants",
        params: {
            latitude,
            longitude,
            restaurant_category_id
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
export function getCategory(latitude, longitude) {
    return request({
        url: '/shopping/v2/restaurant/category',
        params: {
            latitude,
            longitude,

        }
    })
}
export function getDeliveryWay(latitude, longitude) {
    return request({
        url: '/shopping/v1/restaurants/delivery_modes',
        params: {
            latitude,
            longitude
        }
    })
}
export function getActivity(latitude, longitude) {
    return request({
        url: '/v1/restaurants/activity_attributes',
        params: {
            latitude,
            longitude
        }
    })
}