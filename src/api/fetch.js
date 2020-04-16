import { APP_URL } from "../constant";
import { LoadingIndicator } from "../components"

const HOST_API = APP_URL.HOST_API;

export function POST(params, endpoint, access_token = null) {
    console.log("params post", params);

    return fetch(HOST_API + endpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(params)
    })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            return responseData;
        })
        .catch(error => {
            throw error;
        });
}

export function UPLOAD(uri) {

    const data = new FormData();
    data.append('files', {
        uri: uri,
        type: 'image/jpg',
        name: 'jpg'
    });

    return fetch(HOST_API + "upload.php", {
        method: "POST",
        headers: {
            "Connection": "Keep-Alive",
            "ENCTYPE": "multipart/form-data"
        },
        body: data
    })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            return responseData;
        })
        .catch(error => {
            throw error;
        });
}

export function GET(endRoute, access_token = null) {
    const myHeaders = new Headers({
        "access-token": access_token
    });

    let myInit = {
        method: "GET",
        headers: myHeaders
    };

    return fetch(HOST_API + endRoute, myInit)
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            return responseData;
        });
}
