import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import { ComposePostScreen } from "./composePostScreen";

export default function FloatingPenButton() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.container,
          {
            backgroundColor: colors.primary,
            bottom: insets.bottom + 20,
          },
        ]}
        onPress={() => setIsComposeOpen(true)}
      >
        <FontAwesome6 name="add" size={30} color="black" />
      </TouchableOpacity>

      <Modal
        visible={isComposeOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsComposeOpen(false)}
      >
        <ComposePostScreen onClose={() => setIsComposeOpen(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginRight: 7,
    marginBottom: 55,
    elevation: 6,
  },
});