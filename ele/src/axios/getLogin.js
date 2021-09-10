import { request } from './request'
// 获取验证码
export function getCaptchas() {
    return request({
        url: "/v1/captchas",
        method: 'post'
    })
}
//登录
export function login(query) {
    return request({
        url: "/v2/login",
        method: 'post',
        data: query
    })
}
// 管理员登录
export function getAdminLogin(query) {
    return request({
        url: '/admin/login',
        method: 'post',
        data: query
    })
}
//退出登录
export function loginout() {
    return request({
        url: "/v2/signout"
    })
}
// 添加用户地址
export function addAddress(id, query) {
    return request({
        url: '/v1/users/' + id + '/addresses',
        method: 'post',
        data: query
    })
}
// 获取用户地址
export function getAddress(user_id) {
    return request({
        url: '/v1/users/' + user_id + '/addresses',
        params: {
            user_id
        }
    })
}
// 删除用户地址
export function deleteAddress(id, address_id) {
    return request({
        url: '/v1/users/' + id + '/addresses/' + address_id,
        method: 'delete'
    })
}
// 修改密码
export function changePssword(queryInfo) {
    return request({
        url: '/v2/changepassword',
        method: 'post',
        data: queryInfo
    })
}