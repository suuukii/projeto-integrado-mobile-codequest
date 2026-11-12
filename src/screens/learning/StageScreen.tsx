import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MessageBanner } from '../../components/MessageBanner';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Screen } from '../../components/Screen';
import { useAuth } from '../../features/auth/AuthProvider';
import { LessonCardView } from '../../features/learning/components/lesson/LessonCardView';
import { QuestionView } from '../../features/learning/components/QuestionView';
import {
  canCheckAnswer,
  getSessionProgress,
} from '../../features/learning/stageSession';
import type { StageResult } from '../../features/learning/types';
import { useStageSession } from '../../features/learning/useStageSession';
import type { MainStackParamList } from '../../navigation/types';
import { colors, radius, spacing, typography } from '../../theme';

type StageScreenProps = NativeStackScreenProps<MainStackParamList, 'Stage'>;

export function StageScreen({ navigation, route }: StageScreenProps) {
  const { stageId, title, nextStages } = route.params;
  const { session: authSession } = useAuth();

  const handleCompleted = useCallback(
    (result: StageResult) => {
      navigation.replace('StageResult', { title, nextStages, ...result });
    },
    [navigation, title, nextStages],
  );

  const {
    session,
    phase,
    reload,
    choose,
    write,
    verify,
    next,
    retrySave,
    lessonCard,
    lessonProgress,
    isLastLessonCard,
    nextLessonCard,
  } = useStageSession(authSession?.user.id ?? '', stageId, handleCompleted);

  const question = session?.queue[0];
  const feedback = session?.feedback ?? null;

  const renderBody = () => {
    if (phase === 'loading') {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      );
    }
    if (phase === 'load_failed') {
      return (
        <View style={styles.centered}>
          <MessageBanner message="Não foi possível carregar esta etapa. Verifique sua conexão." />
          <PrimaryButton title="Tentar novamente" onPress={reload} />
        </View>
      );
    }
    if (phase === 'saving') {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.centeredText}>Salvando seu progresso...</Text>
        </View>
      );
    }
    if (phase === 'save_failed') {
      return (
        <View style={styles.centered}>
          <MessageBanner message="Não foi possível salvar seu progresso. Verifique sua conexão." />
          <PrimaryButton title="Tentar novamente" onPress={retrySave} />
        </View>
      );
    }
    if (phase === 'ready' && lessonCard) {
      return (
        <>
          {/* A chave reinicia as animações a cada novo cartão. */}
          <LessonCardView key={lessonCard.id} card={lessonCard} />
          <PrimaryButton
            title={isLastLessonCard ? 'Começar exercícios' : 'Continuar'}
            onPress={nextLessonCard}
          />
        </>
      );
    }
    if (!question || !session) {
      return (
        <View style={styles.centered}>
          <Text style={styles.centeredText}>
            Esta etapa ainda não tem questões.
          </Text>
        </View>
      );
    }

    return (
      <>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.questionContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <QuestionView
            question={question}
            answer={session.answer}
            feedback={feedback}
            onSelect={choose}
            onChangeText={write}
          />
          {feedback && (
            <View
              accessibilityLiveRegion="polite"
              style={[
                styles.feedback,
                feedback === 'correct'
                  ? styles.feedbackCorrect
                  : styles.feedbackIncorrect,
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {feedback === 'correct' ? 'Resposta certa!' : 'Não foi dessa vez'}
              </Text>
              <Text style={styles.feedbackText}>{question.explanation}</Text>
              {feedback === 'incorrect' && (
                <Text style={styles.feedbackText}>
                  Esta questão voltará no fim da etapa.
                </Text>
              )}
            </View>
          )}
        </ScrollView>
        {feedback ? (
          <PrimaryButton title="Continuar" onPress={next} />
        ) : (
          <PrimaryButton
            title="Verificar"
            disabled={!canCheckAnswer(session)}
            onPress={verify}
          />
        )}
      </>
    );
  };

  return (
    <Screen
      showBackButton
      headerContent={
        <ProgressBar
          progress={
            lessonCard
              ? lessonProgress
              : session
              ? getSessionProgress(session)
              : 0
          }
        />
      }
    >
      {renderBody()}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center' },
  centeredText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  questionContent: { paddingBottom: spacing.md },
  feedback: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  feedbackCorrect: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  feedbackIncorrect: {
    backgroundColor: colors.errorSoft,
    borderColor: colors.error,
  },
  feedbackTitle: { ...typography.heading, color: colors.text },
  feedbackText: { ...typography.body, color: colors.text },
});
