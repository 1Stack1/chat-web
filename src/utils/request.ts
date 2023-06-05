import axios from "axios";

// 默认配置
const instance = axios.create({
    baseURL: 'http://abnlch.fun:8443/chatroom/api',
    timeout: 10000,
    withCredentials: true,
    headers: {
        post: {
            "Content-Type": "application/json"
        }
    }
})

export default instance
