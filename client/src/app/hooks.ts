import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';

import type { RootState, AppDispatch } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()


export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}