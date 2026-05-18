import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeroState {
  activeImage: number;
  ctaMode: "whatsapp" | "contact";
  contactPhone: string;
}

const initialState: HeroState = {
  activeImage: 0,
  ctaMode: "whatsapp",
  contactPhone: "",
};

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
});

export const { setActiveImage, setCtaMode, setContactPhone } = heroSlice.actions;
export default heroSlice.reducer;
