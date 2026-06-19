import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "@/constants/themes";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (isoTimestamp: string) => void;
}
export function ScheduleModal({ visible, onClose, onConfirm }: Props) {
  const [date, setDate] = useState(new Date(Date.now() + 60 * 60 * 1000)); //default 1 hour
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={style.backdrop}>
        <View style={style.sheet}>
          <Text style={style.title}>Schedule Post</Text>{" "}
          <DateTimePicker
            value={date}
            mode="datetime"
            minimumDate={new Date()}
            onChange={(_, selected) => selected && setDate(selected)}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
          <View style={style.actions}>
            <TouchableOpacity style={style.cancelBtn} onPress={onClose}>
              <Text style={style.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.confirmBtn}
              onPress={() => onConfirm(date.toISOString())}
            >
              <Text style={style.confirmText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: "700",
    color: theme.colors.ink,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
  },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 16 },
  cancelText: { color: theme.colors.inkMuted, fontWeight: "600" },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
  },
  confirmText: { color: "#fff", fontWeight: "700" },
});
