import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isBrowser = () => typeof window !== "undefined";

export const isDevEnvironment = process.env.NODE_ENV === 'development';