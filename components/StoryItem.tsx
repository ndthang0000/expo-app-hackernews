import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { Story } from '@/app/types/storyTypes';

interface Props {
  story: Story;
  onPress: (item: Story) => void;
}

const StoryItem: React.FC<Props> = ({ story, onPress: pressCallback }) => {
  const openURL = () => {
    if (story.url) {
      Linking.openURL(story.url);
    }
  };

  return (
    <View style={styles.container} >
      {/* Title */}
      <TouchableOpacity onPress={() => pressCallback(story)}>


      <Text style={styles.title}>{story.title}</Text>

      {/* Story Details */}
      <Text style={styles.details}>
        📝 By {story.by} | 🔥 {story.score} points | 💬 {story.descendants} comments
      </Text>

      {/* Time Ago */}
      <Text style={styles.time}>🕒 {formatDistanceToNow(new Date(story.time * 1000))} ago</Text>

      {/* Story Type */}
      <Text style={styles.type}>📌 Type: {story.type}</Text>
      </TouchableOpacity>
      {/* Open URL Button */}
      {story.url && (
        <TouchableOpacity onPress={openURL} style={styles.button}>
          <Text style={styles.buttonText}>🔗 Open Article in Web</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  details: { fontSize: 14, color: '#666', marginVertical: 5 },
  time: { fontSize: 12, color: '#999' },
  type: { fontSize: 12, color: '#444', fontStyle: 'italic', marginTop: 5 },
  button: {
    marginTop: 8,
    padding: 6,
    backgroundColor: '#007aff',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default StoryItem;
