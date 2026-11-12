import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import type { AnswerFeedback } from '../stageSession';
import type { Question } from '../types';
import { CodeBlock } from './CodeBlock';
import { CodeCompletionView } from './CodeCompletionView';
import { CodeInputView } from './CodeInputView';
import { CodeOrderView } from './CodeOrderView';
import { OptionButton } from './OptionButton';
import { getOptionState } from './optionState';

type QuestionViewProps = {
  question: Question;
  answer: readonly string[];
  feedback: AnswerFeedback | null;
  onSelect: (optionId: string) => void;
  onChangeText: (text: string) => void;
};

const TYPE_LABELS: Record<Question['type'], string> = {
  multiple_choice: 'Escolha a resposta',
  code_completion: 'Complete o código',
  code_order: 'Ordene o código',
  code_input: 'Escreva o código',
};

export function QuestionView({
  question,
  answer,
  feedback,
  onSelect,
  onChangeText,
}: QuestionViewProps) {
  const renderAnswer = () => {
    switch (question.type) {
      case 'code_completion':
        return (
          <CodeCompletionView
            question={question}
            answer={answer}
            feedback={feedback}
            onSelect={onSelect}
          />
        );
      case 'code_order':
        return (
          <CodeOrderView
            question={question}
            answer={answer}
            feedback={feedback}
            onSelect={onSelect}
          />
        );
      case 'code_input':
        return (
          <CodeInputView
            question={question}
            answer={answer}
            feedback={feedback}
            onChangeText={onChangeText}
          />
        );
      case 'multiple_choice':
        return (
          <>
            {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}
            {question.options.map(option => (
              <OptionButton
                key={option.id}
                text={option.text}
                state={getOptionState(option, answer[0] ?? null, feedback)}
                disabled={feedback !== null}
                onPress={() => onSelect(option.id)}
              />
            ))}
          </>
        );
    }
  };

  return (
    <View>
      <Text style={styles.typeLabel}>{TYPE_LABELS[question.type]}</Text>
      <Text style={styles.prompt}>{question.prompt}</Text>
      {renderAnswer()}
    </View>
  );
}

const styles = StyleSheet.create({
  typeLabel: {
    ...typography.label,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  prompt: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
});
