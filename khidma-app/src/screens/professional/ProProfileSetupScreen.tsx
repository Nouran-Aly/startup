import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { SERVICE_CATEGORIES_AR, type CategoryKeyAr } from "../../constants/categoriesAr";
import { Colors } from "../../theme/colors";
import { CairoFonts } from "../../theme/fonts";

type Props = {
  onComplete: (payload: { categoryKey: CategoryKeyAr; idPhotoUri: string | null }) => void;
};

export default function ProProfileSetupScreen({ onComplete }: Props): React.JSX.Element {
  const [selected, setSelected] = useState<CategoryKeyAr | null>(null);
  const [idUri, setIdUri] = useState<string | null>(null);

  const pickId = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      const lib = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!lib.granted) {
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.85
      });
      if (!res.canceled && res.assets[0]) {
        setIdUri(res.assets[0].uri);
      }
      return;
    }
    const cam = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!cam.canceled && cam.assets[0]) {
      setIdUri(cam.assets[0].uri);
    }
  };

  const submit = () => {
    if (!selected) {
      return;
    }
    onComplete({ categoryKey: selected, idPhotoUri: idUri });
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} style={styles.flex}>
      <ThemedText variant="title" style={styles.center}>
        اختار شغلك
      </ThemedText>
      <ThemedText style={[styles.center, styles.sub]}>
        اضغط على الصورة الكبيرة
      </ThemedText>

      <View style={styles.grid}>
        {SERVICE_CATEGORIES_AR.map((c) => (
          <Pressable
            key={c.key}
            onPress={() => setSelected(c.key)}
            style={[styles.tile, selected === c.key && styles.tileOn]}
          >
            <ThemedText style={styles.tileEmoji}>{c.icon}</ThemedText>
            <ThemedText variant="label"> {c.labelAr}</ThemedText>
            <ThemedText style={styles.hint}>{c.hintAr}</ThemedText>
          </Pressable>
        ))}
      </View>

      <View style={styles.card}>
        <ThemedText variant="label">صورة البطاقة</ThemedText>
        <ThemedText style={styles.small}>صوّر البطاقة (وجه) عشان التوثيق</ThemedText>
        <Pressable onPress={pickId} style={styles.idBox}>
          {idUri ? (
            <Image source={{ uri: idUri }} style={styles.idPreview} resizeMode="cover" />
          ) : (
            <ThemedText style={styles.idPlaceholder}>📷 اضغط صورة البطاقة</ThemedText>
          )}
        </Pressable>
      </View>

      <Pressable
        onPress={submit}
        style={[styles.primaryBtn, !selected && styles.primaryBtnDisabled]}
        disabled={!selected}
      >
        <ThemedText style={styles.primaryBtnText}>حفظ ومتابعة</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, paddingBottom: 32 },
  center: { textAlign: "center" },
  sub: { marginTop: 6, color: Colors.textSecondary },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
    justifyContent: "center"
  },
  tile: {
    width: "44%",
    minWidth: 140,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  },
  tileOn: {
    borderColor: Colors.primary,
    backgroundColor: "#EEF2FF"
  },
  tileEmoji: { fontSize: 40, marginBottom: 8 },
  hint: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  card: {
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 8
  },
  small: { fontSize: 14, color: Colors.textSecondary },
  idBox: {
    minHeight: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  idPreview: { width: "100%", height: 180 },
  idPlaceholder: { padding: 24, textAlign: "center" },
  primaryBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center"
  },
  primaryBtnDisabled: { opacity: 0.45 },
  primaryBtnText: { color: Colors.onPrimary, fontFamily: CairoFonts.bold, fontSize: 17 }
});
