import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use these typed hooks throughout your app instead of the plain `useDispatch` and `useSelector`.
// This provides type safety out of the box.

/**
 * A typed version of the `useDispatch` hook.
 * This ensures that you can only dispatch actions that are known to your Redux store,
 * including async thunks.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

/**
 * A typed version of the `useSelector` hook.
 * This hook knows the exact shape of your entire Redux state (the `RootState`),
 * so you will get autocompletion and type checking for your state selectors.
 */
export const useAppSelector = useSelector.withTypes<RootState>()

