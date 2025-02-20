import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  StoryDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TabScreen() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hacker News' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ title: 'Story Details' }} />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
