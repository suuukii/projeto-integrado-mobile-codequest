import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  error?: string | null;
  isPassword?: boolean;
};

export function TextField({
  label,
  error,
  isPassword = false,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          Boolean(error) && styles.inputRowError,
        ]}
      >
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          placeholderTextColor={colors.textDisabled}
          secureTextEntry={isPassword && !passwordVisible}
          style={styles.input}
          onFocus={event => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={event => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {isPassword && (
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setPasswordVisible(visible => !visible)}
          >
            <Text style={styles.toggle}>
              {passwordVisible ? 'Ocultar' : 'Mostrar'}
            </Text>
          </Pressable>
        )}
      </View>
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  inputRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputRowFocused: { borderColor: colors.primary },
  inputRowError: { borderColor: colors.error },
  input: { ...typography.body, flex: 1, color: colors.text, paddingVertical: 0 },
  toggle: { ...typography.label, color: colors.primary, marginLeft: spacing.sm },
  error: { ...typography.caption, color: colors.error, marginTop: spacing.xs },
});
