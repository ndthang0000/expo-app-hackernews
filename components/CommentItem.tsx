import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { CommentType } from '@/app/types/storyTypes';

interface CommentProps {
  comment: CommentType;
  level?: number; // Used for indentation of replies
}

const CommentItem: React.FC<CommentProps> = ({ comment, level = 0 }) => {
  const [expanded, setExpanded] = useState<boolean>(true); // Toggle child comments

  return (
    <View style={[styles.container, { marginLeft: level * 15 }]}>
      {/* Comment Author & Time */}
      <View style={styles.header}>
        <Text style={styles.author}>{comment.by}</Text>
        <Text style={styles.time}>
          {formatDistanceToNow(new Date(comment.time * 1000), { addSuffix: true })}
        </Text>
      </View>

      {/* Comment Text */}
      <Text style={styles.text}>{comment.text.replace(/<[^>]+>/g, '')}</Text>

      {/* Toggle Replies Button (if there are child comments) */}
      {comment.kids && comment.kids.length > 0 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.replyToggle}>{expanded ? '▼ Hide Replies' : '▶ Show Replies'}</Text>
        </TouchableOpacity>
      )}

      {/* Child Comments */}
      {expanded &&
        comment.kids &&
        comment.kids.map((childId) => (
          <CommentItem key={childId} comment={comment} level={level + 1} />
        ))}
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
});

export default CommentItem;
