import { generateHMAC } from "./utils";

export const key1 = "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL";
export const key2 = "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz";
export const appid = "2553";
export const appuser = "demo";

export const generateAppTransID = (date: Date) => {
    const year = date.getFullYear().toString().substr(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);

    const yymmdd = year + month + day;

    const rand = Math.random().toString().slice(2, 13);

    return `${yymmdd}_${rand}`;
};

export const generateHMACSignature = async (payload: {
    app_id: string;
    app_user: string;
    app_trans_id: string;
    app_time:string;
    amount: string;
    item: string;
    description: string;
    bank_code: string;
    embed_data: string;
}): Promise<string> => {
    // convert app_time to Date object
    const date = new Date(Number(payload.app_time));
    const req = date.getTime().toString();
    const message = `${appid}|${payload.app_trans_id}|${payload.app_user}|${payload.amount}|${req}|${payload.embed_data}|${payload.item}`;

	console.log("message", message);

    return generateHMAC(message, key1);
};
