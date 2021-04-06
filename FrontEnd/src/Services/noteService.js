import Axios from "./axiosServices";

const http = new Axios();

const baseUrl = "http://localhost:8000/note";

export default class services {
    addNote = (data, token) => {
        return http.Post(`${baseUrl}`, data, {
            headers: {
                token: token
            }
        })

    }

}