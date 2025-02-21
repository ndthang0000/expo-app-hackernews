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
    if (!isFetchingMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchMoreStories = async () => {
      setIsFetchingMore(true);
      const data = await fetchStories(storyType, stories.length, PAGE_SIZE);
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
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={storyType}
        onChange={item => {
          setStoryType(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styleDropdown.icon} color="black" name="book" size={20} />
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
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" /> : null}
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
  }
});

const styleDropdown = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    marginBottom: 0,
    fontWeight: 'bold'
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default HomeScreen;
