import { request } from './request'
export function getFoodCategory() {
    return request({
        url: "/v2/index_entry"
    })
}
export function getFoodShops(latitude, longitude, restaurant_category_id, restaurant_category_ids, order_by, delivery_mode, support_ids) {
    return request({
        url: "/shopping/restaurants",
        params: {
            latitude,
            longitude,
            restaurant_category_id,
            restaurant_category_ids,
            order_by,
            delivery_mode,
            support_ids
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
export function getDeliveryWay() {
    return request({
        url: '/shopping/v1/restaurants/delivery_modes',

    })
}
export function getActivity() {
    return request({
        url: '/shopping/v1/restaurants/activity_attributes',
    })
}