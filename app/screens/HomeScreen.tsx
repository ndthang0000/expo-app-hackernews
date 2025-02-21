import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Story } from '../types/storyTypes';
import { RootStackParamList } from '../(tabs)';
import { fetchStories } from '../apis/hackerNewsAPI';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import StoryItem from '@/components/StoryItem';

const dropdownData = [
  { label: 'Top Stories', value: 'topstories' },
  { label: 'New Stories', value: 'newstories' },
  { label: 'Best Stories', value: 'beststories' },

];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const PAGE_SIZE = 5;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [storyType, setStoryType] = useState<string>('topstories')
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isEnding, setIsEnding] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);



  const loadFirstStories = async () => {
    setLoading(true);
    const data = await fetchStories(storyType, 0, PAGE_SIZE);
    setStories(data);
    setLoading(false);
  };

  const handleClickStory = (story: Story) => {
    navigation.navigate('StoryDetail', { id: story.id })
  }

  const loadMoreStories = () => {
    if (!isEnding && !isFetchingMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchMoreStories = async () => {
      setIsFetchingMore(true);
      const data = await fetchStories(storyType, stories.length, PAGE_SIZE);
      if (data.length === 0) {
        setIsEnding(true);
        return
      }
      setStories((prev) => [...prev, ...data]);
      setIsFetchingMore(false);
    };

    if (page > 1) {
      fetchMoreStories();
    } else {
      loadFirstStories();
    }
  }, [page, storyType]);

  useEffect(() => {
    setPage(1);
  }, [storyType]);

  useEffect(() => {
    loadFirstStories();
  }, []);

  return (
    <View style={styles.container}>

      <Dropdown
        style={styleDropdown.dropdown}
        placeholderStyle={styleDropdown.placeholderStyle}
        selectedTextStyle={styleDropdown.selectedTextStyle}
        inputSearchStyle={styleDropdown.inputSearchStyle}
        iconStyle={styleDropdown.iconStyle}
        data={dropdownData}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={storyType}
        onChange={item => {
          setStoryType(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styleDropdown.icon} color="black" name="book" size={24} />
        )}
      />
      <Text style={styles.textDes}>Has {stories.length} stories 📒.</Text>
      {loading ? <ActivityIndicator size="large" style={styles.loader} /> : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <StoryItem story={item} onPress={() => handleClickStory(item)} />
          )}
          onEndReached={loadMoreStories} // Load more when reaching the bottom
          onEndReachedThreshold={0.8} // Trigger when 50% close to bottom
          ListFooterComponent={isEnding ? <Text style={styles.textDes}>No more stories</Text> : (isFetchingMore ? <ActivityIndicator size="large" /> : null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textDes: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 5,
  }
});

const styleDropdown = StyleSheet.create({
  dropdown: {
    paddingInline: 16,
    marginBlock: 16,
    height: 50,
    marginBottom: 0,
    fontWeight: 'bold',
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 28,
    height: 28,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default HomeScreen;
