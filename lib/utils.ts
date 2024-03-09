import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toVND(price: number) {
  return new Intl.NumberFormat("vi-VN", {
	style: "currency",
	currency: "VND",
  }).format(price)
}