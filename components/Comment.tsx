import { fetchComment } from '@/app/apis/hackerNewsAPI';
import { CommentType } from '@/app/types/storyTypes';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  id: number;
}

const Comment: React.FC<Props> = ({ id }) => {
  const [comment, setComment] = useState<CommentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComment();
  }, []);

  const loadComment = async () => {
    const data = await fetchComment(id);
    setComment(data);
    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="small" style={styles.loader} />;

  if (!comment || !comment.text) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{comment.by}:</Text>
      <Text style={styles.text}>{comment.text.replace(/<[^>]+>/g, '')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  author: { fontWeight: 'bold', marginBottom: 4 },
  text: { fontSize: 14, color: '#333' },
  loader: { marginVertical: 10 },
});

export default Comment;
