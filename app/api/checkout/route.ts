import qs from "qs";
import {
    generateAppTransID,
    generateHMACSignature,
} from "../../../lib/zalopay";

export const key1 = "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL";
export const key2 = "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz";
export const appid = "2553";
export const appuser = "demo";

const base = "https://sb-openapi.zalopay.vn/v2/create";

export async function POST(request: Request) {
    const time = new Date();

    const formData = await request.formData();

    const body = {
        app_id: appid,
        app_user: appuser,
        app_trans_id: generateAppTransID(time),
        app_time: time.getTime().toString(),
        amount: formData.get("amount")?.toString() ?? "",
        item: formData.get("item")?.toString() ?? "",
        description: "Thanh toan don hang",
        embed_data: formData.get("embed_data")?.toString() ?? "",
        bank_code: formData.get("bank_code")?.toString() ?? "zalopayapp",
    };

    const signature = await generateHMACSignature(body);

    // append signature to payload
    const payload = {
        ...body,
        mac: signature,
    };

    const response = await fetch(base, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(payload),
        mode: "no-cors",
    });

    return new Response(JSON.stringify(await response.json()), {
        headers: { "Content-Type": "application/json" },
    });
}
