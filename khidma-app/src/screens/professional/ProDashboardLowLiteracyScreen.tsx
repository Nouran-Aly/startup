import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { Colors } from "../../theme/colors";

type Props = {
  onOpenChat: () => void;
  onOpenSchedule?: () => void;
  onCallSupport?: () => void;
};

/** Large icon buttons — minimal text for low-literacy workers */
export default function ProDashboardLowLiteracyScreen({
  onOpenChat,
  onOpenSchedule,
  onCallSupport
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ThemedText variant="title" style={styles.header}>
        شغلك
      </ThemedText>

      <View style={styles.row}>
        <Pressable
          onPress={onCallSupport}
          style={[styles.bigBtn, styles.phoneBtn]}
          accessibilityLabel="اتصل"
        >
          <ThemedText style={styles.bigEmoji}>📞</ThemedText>
          <ThemedText variant="label" style={styles.btnLabel}>
            اتصل
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={onOpenSchedule}
          style={[styles.bigBtn, styles.calBtn]}
          accessibilityLabel="المواعيد"
        >
          <ThemedText style={styles.bigEmoji}>📅</ThemedText>
          <ThemedText variant="label" style={styles.btnLabel}>
            المواعيد
          </ThemedText>
        </Pressable>
      </View>

      <Pressable
        onPress={onOpenChat}
        style={[styles.bigBtn, styles.chatBtn, styles.full]}
        accessibilityLabel="محادثة"
      >
        <ThemedText style={styles.bigEmoji}>💬</ThemedText>
        <ThemedText variant="label" style={styles.btnLabel}>
          محادثة العميل
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    gap: 16
  },
  header: { textAlign: "center", marginBottom: 8 },
  row: { flexDirection: "row", gap: 12 },
  full: { width: "100%" },
  bigBtn: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
    borderWidth: 2,
    borderColor: Colors.border
  },
  phoneBtn: { backgroundColor: "#DCFCE7", borderColor: Colors.success },
  calBtn: { backgroundColor: "#EEF2FF", borderColor: Colors.primary },
  chatBtn: { backgroundColor: Colors.surface, borderColor: Colors.primary },
  bigEmoji: { fontSize: 48, marginBottom: 10 },
  btnLabel: { fontSize: 20 }
});
