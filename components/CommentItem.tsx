import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { CommentType } from '@/app/types/storyTypes';
import { Text, Card, IconButton, ActivityIndicator } from 'react-native-paper';
import { fetchNestedComments } from '@/app/apis/hackerNewsAPI';

interface CommentProps {
  comment: CommentType;
  level?: number; // Used for indentation of replies
}

const CommentItem: React.FC<CommentProps> = ({ comment, level = 0 }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [replies, setReplies] = useState<CommentType[]>(comment.replies || []);

  const handleExpand = async () => {
    if (expanded || !comment.kids) {
      setExpanded(!expanded);
      return;
    }

    setLoading(true);
    const updatedComment = await fetchNestedComments(comment);
    setReplies(updatedComment.replies || []);
    setExpanded(true);
    setLoading(false);
  };

  return (
    <View style={[styles.container, { marginLeft: level * 15 }]}>
      <Card style={styles.card}>
        <Card.Title
          title={comment.by}
          titleStyle={styles.author}
          subtitle={formatDistanceToNow(new Date(comment.time * 1000), { addSuffix: true })}
          subtitleStyle={styles.time}
          left={(props) => <IconButton {...props} icon="account" />}
        />
        <Card.Content>
          <Text style={styles.text}>{comment.text?.replace(/<[^>]+>/g, '')}</Text>
        </Card.Content>

        {/* Expand Replies Button */}
        {comment.kids && (
          <Card.Actions>
            <IconButton icon={expanded ? "chevron-up" : "chevron-down"} onPress={handleExpand} />
            <Text style={styles.replyToggle}>
              {expanded ? 'Hide Replies' : `Show Replies (${comment.kids.length})`}
            </Text>
          </Card.Actions>
        )}
      </Card>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="small" color="#007aff" />}

      {/* Render Nested Comments */}
      {expanded &&
        replies.map(reply => <CommentItem key={reply.id} comment={reply} level={level + 1} />)}
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
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  author: { fontWeight: 'bold', color: '#007aff' },
  time: { fontSize: 12, color: '#666' },
  text: { fontSize: 14, color: '#333', marginTop: 5, marginBottom: 5 },
  replyToggle: { fontSize: 12, color: '#007aff', marginTop: 5, fontWeight: 'bold' },
});

export default CommentItem;
