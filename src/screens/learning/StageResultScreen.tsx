import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { Logo } from '../../components/Logo';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Screen } from '../../components/Screen';
import type { MainStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type StageResultScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'StageResult'
>;

export function StageResultScreen({
  navigation,
  route,
}: StageResultScreenProps) {
  const { title, firstTryCorrect, totalQuestions, nextStages } = route.params;
  const [nextStage, ...remainingStages] = nextStages;

  const goToNextStage = () => {
    if (nextStage) {
      // Substitui o resultado para que voltar da próxima etapa leve à trilha.
      navigation.replace('Stage', {
        stageId: nextStage.id,
        title: nextStage.title,
        nextStages: remainingStages,
      });
    }
  };

  return (
    <Screen showBackButton>
      <View style={styles.content}>
        <Logo size={140} />
        <Text style={styles.title}>Etapa concluída!</Text>
        <Text style={styles.stage}>{title}</Text>
        <Text style={styles.score}>
          Acertos de primeira: {firstTryCorrect} de {totalQuestions}
        </Text>
        {nextStage && (
          <Text style={styles.next}>A seguir: {nextStage.title}</Text>
        )}
      </View>
      <View style={styles.actions}>
        {nextStage && (
          <PrimaryButton title="Próxima etapa" onPress={goToNextStage} />
        )}
        <PrimaryButton
          title="Voltar à trilha"
          variant={nextStage ? 'outlined' : 'filled'}
          onPress={navigation.goBack}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    ...typography.title,
    color: colors.text,
    marginTop: spacing.lg,
  },
  stage: { ...typography.heading, color: colors.primary },
  actions: { gap: spacing.sm },
  score: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  next: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.sm,
  },
});
