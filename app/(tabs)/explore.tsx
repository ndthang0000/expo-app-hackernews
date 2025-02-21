import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, Avatar, Text, Button, Divider } from 'react-native-paper';
const ExploreScreen: React.FC = () => {
  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <Card style={styles.card}>
        <Card.Title
          title="Nguyen Duc Thang"
          subtitle="Fullstack Developer | Nodejs Developer"
          left={(props) => <Avatar.Image {...props} source={require('../../assets/images/Thang.jpg')} />}
        />
        <Card.Content>
          <Text style={styles.bio}>
            Passionate about building modern, high-performance mobile applications. I love working with React Native, Expo, and creating great user experiences.
          </Text>
        </Card.Content>
      </Card>

      {/* Skills Section */}
      <Card style={styles.card}>
        <Card.Title title="💡 Tech Stack" />
        <Card.Content>
          <Text>⚡ Node.js</Text>
          <Text>⚡ Nest.js</Text>
          <Text>⚡ React Native</Text>
          <Text>⚡ TypeScript</Text>
          <Text>⚡ Expo</Text>
          <Text>⚡ Firebase</Text>
          <Text>⚡ ...Other</Text>
        </Card.Content>
      </Card>

      {/* Social Links */}
      <Card style={styles.card}>
        <Card.Title title="🌐 Connect With Me" />
        <Card.Content>
          <Button icon="github" mode="outlined" onPress={() => openURL('https://github.com/ndthang0000')}>
            GitHub
          </Button>
          <Divider style={styles.divider} />
          <Button icon="linkedin" mode="outlined" onPress={() => openURL('https://linkedin.com/in/thang-nguyen-duc-0b75071b5')}>
            LinkedIn
          </Button>

          <Divider style={styles.divider} />
          <Button icon="email" mode="outlined" onPress={() => openURL('mailto:ndthang0000@gmail.com')}>
            Email Me
          </Button>
        </Card.Content>
      </Card>

      {/* Hire Me Button */}
      <Button mode="contained" style={styles.hireMe} onPress={() => openURL('https://thangnguyen.cloud')}>
        🚀 Hire Me - My portfolio
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 10,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  divider: {
    marginVertical: 5,
  },
  hireMe: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
});

export default ExploreScreen;
