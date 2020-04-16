import { POST } from "../fetch";

export function signIn(params) {
    return POST({
        method: 'login',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "LoginService.php");
}

export function signOut(params) {
    return POST({
        method: 'logout',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "LoginService.php");
}

export function getUserData(params) {
    return POST({
        method: 'getUserInfo',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "UserService.php");
}