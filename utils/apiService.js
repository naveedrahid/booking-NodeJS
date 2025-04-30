const axios = require('axios');

const apiInstance = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
});

apiInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
});

const get = (url, config) => apiInstance.get(url, config);
const post = (url, data, config) => apiInstance.post(url, data, config);
const put = (url, data, config) => apiInstance.put(url, data, config);
const patch = (url, data, config) => apiInstance.patch(url, data, config);
const deleteRequest = (url, config) => apiInstance.delete(url, config);

function getToken() {
    return null;
}

module.exports = {
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
}