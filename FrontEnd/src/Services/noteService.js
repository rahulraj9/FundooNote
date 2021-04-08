import Axios from "./axiosServices";

const http = new Axios();
const token = localStorage.getItem("fundooUsertoken")
const baseUrl = "http://localhost:8000/note";

export default class services {
    addNote = (data, token) => {
        return http.Post(`${baseUrl}`, data, {
            headers: {
                token: token
            }
        })
    }

    getNote = () => {
        console.log("Api heated")
        console.log(token)
        return http.Get(`${baseUrl}/get`, {
            headers: {
                token: token
            }
        })

    }

}