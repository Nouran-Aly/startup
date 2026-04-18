import { Audio } from "expo-av";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { Colors } from "../../theme/colors";
import { CairoFonts } from "../../theme/fonts";
import { speakEgyptianArabic } from "../../utils/egyptianTts";

export type ChatViewerRole = "homeowner" | "professional";

export type MessageRow = {
  id: string;
  from: "homeowner" | "professional";
  text_content: string | null;
  audio_url: string | null;
  createdAt: number;
};

type Props = {
  viewerRole: ChatViewerRole;
  onBack?: () => void;
};

const INITIAL: MessageRow[] = [
  {
    id: "1",
    from: "homeowner",
    text_content: "مساء الخير، محتاج سباك بكره الصبح",
    audio_url: null,
    createdAt: Date.now() - 60000
  }
];

export default function KhidmaChatScreen({ viewerRole, onBack }: Props): React.JSX.Element {
  const [messages, setMessages] = useState<MessageRow[]>(INITIAL);
  const [input, setInput] = useState("");
  const recordingRef = useRef<Audio.Recording | null>(null);
  const [recording, setRecording] = useState(false);

  const sendText = () => {
    const t = input.trim();
    if (!t) {
      return;
    }
    setMessages((m) => [
      ...m,
      {
        id: String(Date.now()),
        from: viewerRole,
        text_content: t,
        audio_url: null,
        createdAt: Date.now()
      }
    ]);
    setInput("");
  };

  const playListen = (text: string) => {
    speakEgyptianArabic(text);
  };

  const startRecording = async () => {
    if (viewerRole !== "professional") {
      return;
    }
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await rec.startAsync();
      recordingRef.current = rec;
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };

  const stopRecording = useCallback(async () => {
    const rec = recordingRef.current;
    recordingRef.current = null;
    setRecording(false);
    if (!rec) {
      return;
    }
    try {
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      setMessages((m) => [
        ...m,
        {
          id: String(Date.now()),
          from: "professional",
          text_content: null,
          audio_url: uri,
          createdAt: Date.now()
        }
      ]);
    } catch {
      // ignore
    }
  }, []);

  const renderItem = ({ item }: { item: MessageRow }) => {
    const isOwn = item.from === viewerRole;
    const isHomeownerText = item.from === "homeowner" && item.text_content;

    return (
      <View style={[styles.bubbleRow, isOwn ? styles.rowEnd : styles.rowStart]}>
        <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
          {item.text_content ? (
            <View style={styles.textRow}>
              <ThemedText style={styles.msgText}>{item.text_content}</ThemedText>
              {isHomeownerText ? (
                <Pressable
                  onPress={() => playListen(item.text_content!)}
                  style={styles.listenBtn}
                  accessibilityLabel="اسمع الرسالة"
                >
                  <ThemedText style={styles.listenIcon}>🔊</ThemedText>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          {item.audio_url ? (
            <ThemedText style={styles.audioNote}>🎤 رسالة صوتية</ThemedText>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.back}>
          <ThemedText style={styles.backText}>‹ رجوع</ThemedText>
        </Pressable>
      ) : null}
      <ThemedText variant="title" style={styles.title}>
        محادثة
      </ThemedText>

      <FlatList
        data={messages}
        keyExtractor={(x) => x.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {viewerRole === "homeowner" ? (
        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="اكتب رسالة…"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
            textAlign="right"
            multiline
          />
          <Pressable onPress={sendText} style={styles.sendBtn}>
            <ThemedText style={styles.sendBtnText}>إرسال</ThemedText>
          </Pressable>
        </View>
      ) : (
        <View style={styles.pttWrap}>
          <ThemedText style={styles.pttHint}>
            {recording ? "اتكلم… ارفع إصبعك عشان تبعت" : "اضغط واتكلم"}
          </ThemedText>
          <Pressable
            onPressIn={startRecording}
            onPressOut={stopRecording}
            style={[styles.pttBtn, recording && styles.pttBtnActive]}
          >
            <ThemedText style={styles.pttEmoji}>🎙️</ThemedText>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  back: { paddingHorizontal: 12, paddingVertical: 8 },
  backText: { color: Colors.primary, fontFamily: CairoFonts.semibold },
  title: { textAlign: "center", paddingBottom: 8 },
  list: { padding: 12, paddingBottom: 24 },
  bubbleRow: { marginBottom: 10, width: "100%" },
  rowStart: { alignItems: "flex-start" },
  rowEnd: { alignItems: "flex-end" },
  bubble: {
    maxWidth: "88%",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border
  },
  bubbleOwn: { backgroundColor: "#EEF2FF", borderColor: Colors.primary },
  bubbleOther: { backgroundColor: Colors.surface },
  textRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  msgText: { flex: 1, minWidth: 120 },
  listenBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: Colors.background
  },
  listenIcon: { fontSize: 22 },
  audioNote: { marginTop: 6, color: Colors.textSecondary },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: CairoFonts.regular,
    fontSize: 16,
    color: Colors.textPrimary
  },
  sendBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  sendBtnText: { color: Colors.onPrimary, fontFamily: CairoFonts.bold },
  pttWrap: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface
  },
  pttHint: { marginBottom: 8, color: Colors.textSecondary },
  pttBtn: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#C7D2FE"
  },
  pttBtnActive: { backgroundColor: Colors.primaryDark },
  pttEmoji: { fontSize: 36 }
});
