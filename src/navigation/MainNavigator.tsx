import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StageResultScreen } from '../screens/learning/StageResultScreen';
import { StageScreen } from '../screens/learning/StageScreen';
import { colors } from '../theme';
import { TabNavigator } from './TabNavigator';
import type { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      {/* As abas ficam na base; etapa e resultado abrem por cima, sem a barra. */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Stage" component={StageScreen} />
      <Stack.Screen name="StageResult" component={StageResultScreen} />
    </Stack.Navigator>
  );
}
