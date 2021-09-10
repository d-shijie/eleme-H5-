import { request } from './request'
//获取城市列表
export function getCities(type) {
    return request({
        url: "/v1/cities",
        params: {
            type
        }
    })
}
//获取城市信息
export function getCityInfo(id) {
    return request({
        url: '/v1/cities/' + id
    })
}
// 搜索城市
export function getCityLocation(city_id, keyword) {
    return request({
        url: '/v1/pois',
        params: {
            city_id,
            keyword
        }
    })
}
// 获取地址详情
export function getCityDetail(geohash) {
    return request({
        url: "/v2/pois/" + geohash
    })
}
// 搜索附近店铺
export function getNearBy(keyword) {
    return request({
        url: "/v1/pois",
        params: {
            city_id: 1,
            type: 'nearby',
            keyword
        }
    })
}