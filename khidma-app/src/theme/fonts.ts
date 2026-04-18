import {
  Cairo_400Regular,
  Cairo_600SemiBold,
  Cairo_700Bold
} from "@expo-google-fonts/cairo";

export const CairoFonts = {
  regular: "Cairo_400Regular",
  semibold: "Cairo_600SemiBold",
  bold: "Cairo_700Bold"
};

export const useCairoFontMap = () =>
  ({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold
  }) as const;
