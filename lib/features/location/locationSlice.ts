import {createAppSlice} from "@/lib/createAppSlice";
import type {AppThunk} from "@/lib/store";
import type {PayloadAction} from "@reduxjs/toolkit";
import {fetchLocation} from "./locationAPI";

export interface LocationSliceState {
    lon: number,
    lat: number,
    status: "idle" | "loading" | "failed";
}

const initialState: LocationSliceState = {
    lon: 0,
    lat: 0,
    status: "idle",
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const locationSlice = createAppSlice({
    name: "location",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: (create) => ({
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        setCoords: create.reducer(
            (state, action: PayloadAction<Array<number>>) => {
                state.lon = action.payload[0];
                state.lat = action.payload[1];
            },
        ),
        // The function below is called a thunk and allows us to perform async logic. It
        // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
        // will call the thunk with the `dispatch` function as the first argument. Async
        // code can then be executed and other actions can be dispatched. Thunks are
        // typically used to make async requests.
        incrementAsync: create.asyncThunk(
            async (amount: number) => {
                const response = await fetchLocation(amount);
                // The value we return becomes the `fulfilled` action payload
                return response.data;
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.value += action.payload;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectCoords: (location) => {
            return [location.lon, location.lat]
        },
    },
});

// Action creators are generated for each case reducer function.
export const {setCoords} = locationSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {selectCoords} = locationSlice.selectors;

