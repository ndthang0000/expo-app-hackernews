import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Story } from '../types/storyTypes';
import { RootStackParamList } from '../(tabs)';
import { fetchStories } from '../apis/hackerNewsAPI';
import StoryItem from '@/components/StoryItem';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [storyType, setStoryType] = useState<string>('topstories')

  useEffect(() => {
    loadStories();
  }, [storyType]);

  const loadStories = async () => {
    setLoading(true);
    const data = await fetchStories('topstories', 10);
    setStories(data);
    setLoading(false);
  };

  // if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value: string) => setStoryType(value)}
        items={[
          { label: 'Top Stories', value: 'topstories' },
          { label: 'New Stories', value: 'newstories' },
          { label: 'Best Stories', value: 'beststories' },
        ]}
        value={storyType}
        style={pickerSelectStyles}
      />
      {loading ? <ActivityIndicator size="large" style={styles.loader} /> : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <StoryItem story={item} onPress={() => navigation.navigate('StoryDetail', { id: item.id })} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 5,
    marginBottom: 2,
  },
  inputAndroid: { fontSize: 16, padding: 10, borderWidth: 1, borderColor: 'yellow', borderRadius: 5, marginBottom: 2 },
};
export default HomeScreen;
