
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSpecializations } from "@/api/api";

export type Specialization = {
  specializationName: string;
  description: string;
};

interface SpecializationsState {
  items: Specialization[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecializationsState = {
  items: [],
  loading: false,
  error: null,
};

// thunk לקריאת ההתמחויות מהשרת
export const getSpecializations = createAsyncThunk(
  "specializations/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSpecializations();
    } catch (err: any) {
      return rejectWithValue(err.message || "שגיאה בטעינת התמחויות");
    }
  }
);

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecializations.fulfilled, (state, action: PayloadAction<Specialization[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default specializationsSlice.reducer;
