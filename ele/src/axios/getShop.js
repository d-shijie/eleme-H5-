import { request } from './request'
export function getShopInfo(id) {
    return request({
        url: "/shopping/restaurant/" + id
    })
}
export function getGoods(restaurant_id) {
    return request({
        url: "/shopping/v2/menu",
        params: {
            restaurant_id
        }
    })
}
// export function getComments(){
//     return request({
//         url:""
//     })
// }