import { request } from './request'
// 获取食品分类
export function getFoodCategory() {
    return request({
        url: "/v2/index_entry"
    })
}
// 获取分类商铺
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
//搜索店铺
export function getSearchShops(geohash, keyword) {
    return request({
        url: "/v4/restaurants",
        params: {
            geohash,
            keyword
        }
    })
}
// 获取分类店铺
export function getCategory(latitude, longitude) {
    return request({
        url: '/shopping/v2/restaurant/category',
        params: {
            latitude,
            longitude,

        }
    })
}
// 获取配送方式
export function getDeliveryWay() {
    return request({
        url: '/shopping/v1/restaurants/delivery_modes',

    })
}
// 获取商家活动
export function getActivity() {
    return request({
        url: '/shopping/v1/restaurants/activity_attributes',
    })
}
// 获取食品列表
export function getFoodList(restaurant_id) {
    return request({
        url: '/shopping/v2/menu',
        params: {
            restaurant_id
        },
        timeout: 10000
    })
}
// 获取评论
export function getCommentInfo(restaurant_id, tag_name, offset, limit) {
    return request({
        url: '/ugc/v2/restaurants/' + restaurant_id + '/ratings',
        params: {
            restaurant_id, tag_name, offset, limit
        }
    })
}