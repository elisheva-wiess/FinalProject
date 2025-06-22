import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Specialization } from "@/api/api";  

export type SpecializationType = {
  specializationName: string;
  description: string;
};

interface SpecializationsState {
  items: SpecializationType[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecializationsState = {
  items: [],
  loading: false,
  error: null,
};

async function fetchSpecializations(): Promise<SpecializationType[]> {
  const res = await Specialization.getAll();
  return res.data;
}

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
      .addCase(getSpecializations.fulfilled, (state, action: PayloadAction<SpecializationType[]>) => {
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
