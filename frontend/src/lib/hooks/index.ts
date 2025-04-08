// Typescript extension for the react-redux

//This code is a TypeScript extension for integrating Redux with React or Next.js applications. The primary goal is to enhance the type safety and developer experience when using Redux hooks (useDispatch and useSelector) within a React or Next.js application.

// In React we use useDispatch() & useSelector();
// In Next js we replace with useAppDispatch() & useAppSelector();

//useAppDispatch is a custom hook that wraps useDispatch with the AppDispatch type, ensuring that the dispatch function knows about the types of actions it can handle.

//useAppSelector is a custom hook that wraps useSelector with the RootState type, ensuring that the state selected from the store is correctly typed according to your root state.

//useAppStore is a custom hook that wraps useStore with the AppStore type, ensuring that the store returned has the correct types.

import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export type dispatchType = AppDispatch;
