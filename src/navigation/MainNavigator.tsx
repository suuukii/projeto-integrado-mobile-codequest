import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TrackScreen } from '../screens/learning/TrackScreen';
import { colors } from '../theme';
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
      <Stack.Screen name="Track" component={TrackScreen} />
    </Stack.Navigator>
  );
}
