import React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";
import { CairoFonts } from "../theme/fonts";

type Props = TextProps & {
  variant?: "body" | "title" | "label" | "caption";
};

export function ThemedText({ style, variant = "body", ...rest }: Props): React.JSX.Element {
  const base: TextStyle = {
    fontFamily: CairoFonts.regular,
    color: "#0F172A",
    textAlign: "right",
    writingDirection: "rtl"
  };
  const variantStyle: TextStyle =
    variant === "title"
      ? { fontFamily: CairoFonts.bold, fontSize: 22 }
      : variant === "label"
        ? { fontFamily: CairoFonts.semibold, fontSize: 16 }
        : variant === "caption"
          ? { fontSize: 13 }
          : { fontSize: 16 };

  return <Text {...rest} style={[base, variantStyle, style]} />;
}
