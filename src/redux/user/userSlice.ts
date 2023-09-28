import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    searchUserData: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export const { searchUserData } = userSlice.actions;

export default userSlice.reducer;
