import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Story } from '../types/storyTypes';
import { fetchStoryDetails } from '../apis/hackerNewsAPI';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CommentItem from '@/components/CommentItem';
import { ActivityIndicator, Card, Text, IconButton } from 'react-native-paper';
import { formatDistanceToNow } from 'date-fns';

type RootStackParamList = {
  StoryDetail: { id: number };
};
type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const StoryDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    setLoading(true);
    const data = await fetchStoryDetails(id);
    setStory(data);
    setLoading(false);
  };

  // if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!story) {
    return <Text style={styles.noComments}>Story not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={story?.title}
          titleStyle={styles.title}
          subtitle={`By ${story.by} • ${formatDistanceToNow(new Date(story.time * 1000), { addSuffix: true })}`}
          subtitleStyle={styles.subtitle}
          left={(props) => <IconButton {...props} icon="newspaper" />}
        />
        <Card.Content>
          <Text style={styles.details}>
            🔥 {story.score} points • 💬 {story.descendants} comments
          </Text>
        </Card.Content>
      </Card>
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
  card: { marginBottom: 10, backgroundColor: 'white', elevation: 3, borderRadius: 10 },
  subtitle: { fontSize: 14, color: '#666' },
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
