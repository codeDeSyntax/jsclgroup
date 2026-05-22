import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND_URL } from "@/lib/auth";
import { contactInfo } from "@/lib/contact";

interface HeroState {
  activeImage: number;
  ctaMode: "whatsapp" | "contact";
  contactPhone: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HeroState = {
  activeImage: 0,
  ctaMode: "whatsapp",
  // initialize with fallback so UI has a usable value immediately
  contactPhone: contactInfo.phone,
  status: "idle",
  error: null,
};

// Async thunk to fetch contact phone from backend settings and
// centralize it in Redux so all components can read the same value.
export const fetchContactPhone = createAsyncThunk(
  "hero/fetchContactPhone",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BACKEND_URL}/settings/contact_phone`);
      if (!res.ok) return contactInfo.phone;
      const data = await res.json();
      return data?.data?.value ? String(data.data.value) : contactInfo.phone;
    } catch (err) {
      return contactInfo.phone;
    }
  },
);

const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setActiveImage: (state, action: PayloadAction<number>) => {
      state.activeImage = action.payload;
    },
    setCtaMode: (state, action: PayloadAction<"whatsapp" | "contact">) => {
      state.ctaMode = action.payload;
    },
    setContactPhone: (state, action: PayloadAction<string>) => {
      state.contactPhone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactPhone.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchContactPhone.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.contactPhone = action.payload;
        },
      )
      .addCase(fetchContactPhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "Failed to load contact phone";
      });
  },
});

export const { setActiveImage, setCtaMode, setContactPhone } =
  heroSlice.actions;
export default heroSlice.reducer;
