import { request } from './request'
export function getCaptchas() {
    return request({
        url: "/v1/captchas",
        method: 'post'
    })
}
export function login(query) {
    return request({
        url: "/v2/login",
        method: 'post',
        data: query
    })
}
export function getAdminLogin(query) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: query
    })
}
export function loginout() {
    return request({
        url: "/v2/signout"
    })
}
export function addAddress(id, query) {
    return request({
        url: '/v1/users/' + id + '/addresses',
        method: 'post',
        data: query
    })
}
export function getAddress(user_id) {
    return request({
        url: '/v1/users/' + user_id + '/addresses',
        params: {
            user_id
        }
    })
}
export function deleteAddress(id, address_id) {
    return request({
        url: '/v1/users/' + id + '/addresses/' + address_id,
        method: 'delete'
    })
}
export function changePssword(queryInfo) {
    return request({
        url: '/v2/changepassword',
        method: 'post',
        data: queryInfo
    })
}