import { UPLOAD, POST } from "../fetch";

export function sendPhoto(uri) {
    return UPLOAD(uri);
}

export function checkIn(method, params) {
    return POST({
        method: method,
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "AbsensiService.php");
}