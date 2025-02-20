import axios from 'axios';
import { CommentType, Story } from '../types/storyTypes';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

//type can be 'topstories', 'newstories', 'beststories'
export const fetchStories = async (type: string = 'topstories', limit: number = 10): Promise<Story[]> => {
  try {
    const { data: storyIds } = await axios.get<number[]>(`${BASE_URL}/${type}.json`);
    const stories = await Promise.all(
      storyIds.slice(0, limit).map(async (id) => {
        const { data } = await axios.get<Story>(`${BASE_URL}/item/${id}.json`);
        return data;
      })
    );
    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
};

export const fetchStoryDetails = async (id: number): Promise<Story | null> => {
  try {
    const { data } = await axios.get<Story>(`${BASE_URL}/item/${id}.json`);
    return data;
  } catch (error) {
    console.error('Error fetching story details:', error);
    return null;
  }
};

export const fetchComment = async (id: number): Promise<CommentType | null> => {
  try {
    const { data } = await axios.get<CommentType>(`${BASE_URL}/item/${id}.json`);
    return data;
  } catch (error) {
    console.error('Error fetching comment:', error);
    return null;
  }
};

export default {};