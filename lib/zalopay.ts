import { generateHMAC } from "./utils";

export const key1 = "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL";
export const key2 = "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz";
export const appid = "2553";
export const appuser = "demo";

export const generateAppTransID = (date: Date) => {
    const year = date.getFullYear().toString().substr(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const yymmdd = year + month + day;

    const rand = Math.random().toString().slice(2, 13);

    return yymmdd + "_" + rand;
};

export const generateHMACSignature = async (
	date: Date,
    embed: string,
    item: string,
    amount: string
): Promise<string> => {
    const apptransid = generateAppTransID(date);
    const req = date.getTime().toString();
    const message = `${appid}|${apptransid}|${appuser}|${amount}|${req}|${embed}|${item}`;

    return generateHMAC(message, key1);
};
