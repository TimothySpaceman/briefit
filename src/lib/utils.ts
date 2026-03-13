import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function extractByPrefix<T>(source: Record<string, T>, prefix: string){
    return Object.fromEntries(Object.entries(source)
        .filter(([path]) => path.startsWith(prefix))
        .map(([path, value]) => [path.replace(prefix, ""), value])
    )
}