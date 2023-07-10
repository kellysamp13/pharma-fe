import { useState, useEffect } from 'react'

export const useDebounce = (value: any, wait: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, wait)

        return () => clearTimeout(timer)
    }, [value, wait])

    return debouncedValue
}
