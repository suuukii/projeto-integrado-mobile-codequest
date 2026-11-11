import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { getAuthErrorMessage } from '../../features/auth/authErrors';
import { signOut } from '../../features/auth/authService';
import { useAuth } from '../../features/auth/AuthProvider';
import { DEFAULT_TRACK_SLUG } from '../../features/learning/constants';
import { Avatar } from '../../features/profile/components/Avatar';
import { AvatarPicker } from '../../features/profile/components/AvatarPicker';
import { useProfile } from '../../features/profile/useProfile';
import { colors, radius, spacing, typography } from '../../theme';

export function ProfileScreen() {
  const { session } = useAuth();
  const { data, failed, reload, changeAvatar } = useProfile(
    session?.user.id ?? '',
    DEFAULT_TRACK_SLUG,
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  const openPicker = () => {
    setAvatarError(null);
    setPickerOpen(true);
  };

  const handleSelectAvatar = (avatarId: string) => {
    setSavingAvatar(true);
    setAvatarError(null);
    changeAvatar(avatarId)
      .then(() => setPickerOpen(false))
      .catch(() =>
        setAvatarError(
          'Não foi possível salvar a foto. Verifique sua conexão.',
        ),
      )
      .finally(() => setSavingAvatar(false));
  };

  const handleSignOut = () => {
    setSignOutError(null);
    signOut().catch(error => setSignOutError(getAuthErrorMessage(error)));
  };

  if (!data) {
    return (
      <Screen insideTabs>
        <View style={styles.centered}>
          {failed ? (
            <>
              <MessageBanner message="Não foi possível carregar o perfil. Verifique sua conexão." />
              <PrimaryButton title="Tentar novamente" onPress={reload} />
            </>
          ) : (
            <ActivityIndicator color={colors.primary} size="large" />
          )}
        </View>
      </Screen>
    );
  }

  const { profile, summary } = data;

  return (
    <Screen insideTabs>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.identity}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Alterar foto de perfil"
            onPress={openPicker}
          >
            <Avatar avatarId={profile.avatar} size={112} />
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✎</Text>
            </View>
          </Pressable>
          <Text style={styles.username}>{profile.username}</Text>
          <Pressable accessibilityRole="button" hitSlop={8} onPress={openPicker}>
            <Text style={styles.link}>Alterar foto</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Progresso em {data.languageName}</Text>
          <Text style={styles.cardTitle}>{data.trackTitle}</Text>
          <View style={styles.progressRow}>
            <ProgressBar progress={summary.percent / 100} />
            <Text style={styles.percent}>{summary.percent}%</Text>
          </View>
          <View style={styles.stats}>
            <Stat
              value={`${summary.completedStages}/${summary.totalStages}`}
              label="Etapas concluídas"
            />
            <Stat
              value={`${summary.firstTryCorrect}/${summary.answeredQuestions}`}
              label="Acertos de primeira"
            />
          </View>
        </View>

        {signOutError && <MessageBanner message={signOutError} />}
        <PrimaryButton
          title="Sair da conta"
          variant="outlined"
          onPress={handleSignOut}
        />
      </ScrollView>

      <AvatarPicker
        visible={pickerOpen}
        selectedId={profile.avatar}
        saving={savingAvatar}
        error={avatarError}
        onSelect={handleSelectAvatar}
        onClose={() => setPickerOpen(false)}
      />
    </Screen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', gap: spacing.md },
  scroll: { flex: 1 },
  content: { gap: spacing.lg, paddingBottom: spacing.md },
  identity: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadgeText: { color: colors.onPrimary, fontSize: 15, fontWeight: '800' },
  username: { ...typography.title, color: colors.text, marginTop: spacing.sm },
  link: { ...typography.label, color: colors.primary },
  card: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    borderBottomWidth: 6,
    borderColor: colors.primarySoftEdge,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardLabel: { ...typography.label, color: colors.textMuted },
  cardTitle: { ...typography.heading, color: colors.text },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  percent: { ...typography.label, color: colors.text },
  stats: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  stat: {
    flex: 1,
    backgroundColor: colors.primarySoftEdge,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  statValue: { ...typography.heading, color: colors.text },
  statLabel: { ...typography.caption, color: colors.textMuted },
});
