import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '../../theme';
import type { MainTabParamList } from '../types';
import { LearnIcon, ProfileIcon } from './TabIcons';

const TABS: Record<
  keyof MainTabParamList,
  { label: string; Icon: ComponentType<{ color: string }> }
> = {
  Learn: { label: 'Aprender', Icon: LearnIcon },
  Profile: { label: 'Perfil', Icon: ProfileIcon },
};

/** Barra inferior em formato de pílula, com a aba ativa destacada. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + spacing.sm }]}>
      <View accessibilityRole="tablist" style={styles.pill}>
        {state.routes.map((route, index) => {
          const tab = TABS[route.name as keyof MainTabParamList];
          const focused = state.index === index;
          const color = focused ? colors.tabActive : colors.text;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected: focused }}
              onPress={onPress}
              style={[styles.tab, focused && styles.tabFocused]}
            >
              <tab.Icon color={color} />
              <Text style={[styles.label, { color }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: colors.tabBar,
    borderRadius: radius.round,
    borderWidth: 1.5,
    borderColor: colors.tabBarBorder,
    padding: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
    borderRadius: radius.round,
  },
  tabFocused: { backgroundColor: colors.primarySoft },
  label: { ...typography.label, fontSize: 15 },
});
