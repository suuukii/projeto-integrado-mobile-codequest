import type { PropsWithChildren, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';
import { BackButton } from './BackButton';

type ScreenProps = PropsWithChildren<{
  /** Permite rolagem e ajusta o conteúdo quando o teclado abre. */
  scrollable?: boolean;
  /** Mostra a seta de voltar no canto superior esquerdo. */
  showBackButton?: boolean;
  /** Conteúdo exibido ao lado da seta, como uma barra de progresso. */
  headerContent?: ReactNode;
  /** Em telas de aba, a barra inferior já reserva o espaço do rodapé. */
  insideTabs?: boolean;
}>;

export function Screen({
  children,
  scrollable = false,
  showBackButton = false,
  headerContent,
  insideTabs = false,
}: ScreenProps) {
  const contentStyle = [
    scrollable ? styles.scrollContent : styles.content,
    showBackButton && styles.belowHeader,
  ];

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={insideTabs ? ['top', 'left', 'right'] : undefined}
    >
      {showBackButton && (
        <View style={styles.header}>
          <BackButton />
          {headerContent && (
            <View style={styles.headerContent}>{headerContent}</View>
          )}
        </View>
      )}
      {scrollable ? (
        <KeyboardAvoidingView behavior="height" style={styles.flex}>
          <ScrollView
            contentContainerStyle={contentStyle}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <View style={contentStyle}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { flex: 1, padding: spacing.lg },
  scrollContent: { flexGrow: 1, padding: spacing.lg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.md,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  belowHeader: { paddingTop: spacing.md },
});
