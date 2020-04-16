import { POST } from "../fetch";

export function getTodayAttendance(params) {
    return POST({
        method: 'getAbsenceTodayByUser',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "AbsensiService.php");
}
export function getHistoryData(params) {
    return POST({
        method: 'getListHistory',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "AbsensiService.php");
}

export function getTimeServer(params) {
    return POST({
        method: 'getCurrentTimeServer',
        deviceId: "WEBSITE",
        version: 1,
        params: params
    }, "AbsensiService.php");
}
