import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export function toVND(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
}

export async function generateHmacClientSide(message: string, key: string) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const msgData = encoder.encode(message);
    const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        msgData
    );
    const digest = Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return digest;
}

export function generateHMAC(message: string, key: string) {
    const hmac = crypto.createHmac("sha256", key);
    hmac.update(message);
    const digest = hmac.digest("hex");
    return digest;
}

// if window is not availabl
