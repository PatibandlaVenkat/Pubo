import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState, type ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { connectionsApi } from "@/api/connectionsApi";
import useTheme from "@/hooks/useTheme";

type Provider = "bluesky" | "linkedin";

export default function ConnectApplicationsScreen() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { colors } = useTheme();
  const [provider, setProvider] = useState<Provider>("bluesky");
  const [handle, setHandle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isBluesky = provider === "bluesky";
  const canSubmit = isBluesky
    ? Boolean(handle.trim() && password)
    : Boolean(displayName.trim() && accessToken);

  const submit = async () => {
    if (!canSubmit || loading) return;

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = await getToken();
      if (!token)
        throw new Error("Your session has expired. Please sign in again.");

      if (isBluesky) {
        await connectionsApi.connectBluesky(token, {
          Handle: handle.trim(),
          Password: password,
          PlatformId: 3,
          ...(displayName.trim() ? { DisplayName: displayName.trim() } : {}),
        });
        setPassword("");
        setSuccess("Your Bluesky account is connected.");
      } else {
        await connectionsApi.connectLinkedin(token, {
          displayName: displayName.trim(),
          acessToken: accessToken,
          platformId: 2,
        });
        setAccessToken("");
        setSuccess("Your LinkedIn account is connected.");
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not connect the account.",
      );
    } finally {
      setLoading(false);
    }
  };

  const chooseProvider = (nextProvider: Provider) => {
    setProvider(nextProvider);
    setError(null);
    setSuccess(null);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.authbackground }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={26} color={colors.text} />
          </Pressable>
          <Text style={[styles.title, { color: colors.text }]}>
            Connect applications
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Add an account to publish from Pubo.
        </Text>

        <View style={styles.providerRow}>
          <ProviderButton
            active={isBluesky}
            color="#1185FE"
            label="Bluesky"
            onPress={() => chooseProvider("bluesky")}
          />
          <ProviderButton
            active={!isBluesky}
            color="#0A66C2"
            label="LinkedIn"
            onPress={() => chooseProvider("linkedin")}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Connect {isBluesky ? "Bluesky" : "LinkedIn"}
          </Text>

          {isBluesky && (
            <>
              <Field label="Handle" color={colors.text}>
                <TextInput
                  value={handle}
                  onChangeText={setHandle}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="you.bsky.social"
                  placeholderTextColor={colors.textMuted}
                  style={[
                    styles.input,
                    {
                      borderColor: colors.border,
                      color: colors.text,
                      backgroundColor: colors.backGround,
                    },
                  ]}
                />
              </Field>
            </>
          )}

          <Field label="Display name" color={colors.text}>
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              placeholder="Your name"
              placeholderTextColor={colors.textMuted}
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.backGround,
                },
              ]}
            />
          </Field>

          {isBluesky ? (
            <Field label="Account password" color={colors.text}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Bluesky Account Password"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.backGround,
                  },
                ]}
              />
            </Field>
          ) : (
            <Field label="Access token" color={colors.text}>
              <TextInput
                value={accessToken}
                onChangeText={setAccessToken}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="LinkedIn access token"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.backGround,
                  },
                ]}
              />
            </Field>
          )}

          {error && <Text style={styles.error}>{error}</Text>}
          {success && (
            <Text style={[styles.success, { color: colors.success }]}>
              {success}
            </Text>
          )}

          <Pressable
            onPress={submit}
            disabled={!canSubmit || loading}
            style={({ pressed }) => [
              styles.submit,
              { backgroundColor: isBluesky ? "#1185FE" : "#0A66C2" },
              (!canSubmit || loading) && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitText}>
                Connect {isBluesky ? "Bluesky" : "LinkedIn"}
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ProviderButton({
  active,
  color,
  label,
  onPress,
}: {
  active: boolean;
  color: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.providerButton,
        { borderColor: color },
        active && { backgroundColor: color },
      ]}
    >
      <Text
        style={[styles.providerText, { color: active ? "#FFFFFF" : color }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Field({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flexGrow: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerSpacer: { width: 26 },
  title: { fontSize: 21, fontWeight: "700" },
  subtitle: { fontSize: 15, marginBottom: 24 },
  providerRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  providerButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 11,
  },
  providerText: { fontWeight: "700" },
  card: { borderWidth: 1, borderRadius: 16, padding: 18 },
  cardTitle: { fontSize: 19, fontWeight: "700", marginBottom: 18 },
  field: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  helper: { fontSize: 12, lineHeight: 18, marginTop: -7, marginBottom: 14 },
  error: {
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  success: { fontWeight: "600", marginBottom: 14 },
  submit: {
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 4,
  },
  submitText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.8 },
});
