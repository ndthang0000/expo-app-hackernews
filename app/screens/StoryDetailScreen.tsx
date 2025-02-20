import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Story } from '../types/storyTypes';
import { fetchStoryDetails } from '../apis/hackerNewsAPI';
import Comment from '@/components/Comment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  StoryDetail: { id: number };
};
type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const StoryDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    const data = await fetchStoryDetails(id);
    setStory(data);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story?.title}</Text>
      <Text style={styles.details}>By {story?.by} | {story?.score} points</Text>
      <FlatList
        data={story?.kids || []}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Comment id={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  details: { fontSize: 14, color: 'gray', marginBottom: 10 },
});

export default StoryDetailScreen;
