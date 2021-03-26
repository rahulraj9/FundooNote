import axios from 'axios';

export default class axiosServices {
    Post = (url, data, isHeaderRequired = false) => {
        return axios.post(url, data, isHeaderRequired)
    }
}