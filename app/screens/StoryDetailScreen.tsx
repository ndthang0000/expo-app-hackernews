import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { CommentType, Story } from '../types/storyTypes';
import { fetchCommentDetail, fetchStoryDetails } from '../apis/hackerNewsAPI';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CommentItem from '@/components/CommentItem';

type RootStackParamList = {
  StoryDetail: { id: number };
};
type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const StoryDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log({ comment: story?.comments })
  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    setLoading(true);
    const data = await fetchStoryDetails(id);
    setStory(data);
    setLoading(false);
  };

  useEffect(() => {
    console.log(story)
  }, [story]);
  // if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{story?.title}</Text>
      <Text style={styles.details}>By {story?.by} | {story?.score} points</Text>
      <FlatList
        data={story?.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListEmptyComponent={<Text style={styles.noComments}>No comments yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderLeftWidth: 2,
    borderColor: '#ddd',
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  author: { fontWeight: 'bold', color: '#007aff' },
  time: { fontSize: 12, color: '#666' },
  text: { fontSize: 14, color: '#333', marginTop: 5 },
  replyToggle: { fontSize: 12, color: '#007aff', marginTop: 5, fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 14, color: '#666', marginBottom: 10 },
  noComments: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default StoryDetailScreen;
