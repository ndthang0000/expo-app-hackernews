import axios from 'axios';
import { CommentType, Story } from '../types/storyTypes';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

//type can be 'topstories', 'newstories', 'beststories'
export const fetchStories = async (type: string = 'topstories', offset: number, limit: number = 10): Promise<Story[]> => {
  try {
    const { data: storyIds } = await axios.get<number[]>(`${BASE_URL}/${type}.json`);
    if (offset >= storyIds.length) return [];
    const stories = await Promise.all(
      storyIds.slice(offset, Math.min(offset + limit, storyIds.length)).map(async (id) => {
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

export const fetchStoryDetails = async (storyId: number): Promise<Story> => {
  try {
    const { data: story } = await axios.get<Story>(`${BASE_URL}/item/${storyId}.json`);

    // Fetch only top-level (level 1) comments
    const comments = story.kids ? await fetchLevel1Comments(story.kids) : [];
    return { ...story, comments };
  } catch (error) {
    console.error('Error fetching story details:', error);
    throw error;
  }
};

const fetchLevel1Comments = async (commentIds: number[]): Promise<CommentType[]> => {
  try {
    const responses = await Promise.all(
      commentIds.map(id => axios.get<CommentType>(`${BASE_URL}/item/${id}.json`))
    );

    return responses.map(({ data }) => data);
  } catch (error) {
    console.error('Error fetching level 1 comments:', error);
    return [];
  }
};

export const fetchCommentDetail = async (id: number): Promise<CommentType | null> => {
  try {
    const { data } = await axios.get<CommentType>(`${BASE_URL}/item/${id}.json`);
    return data;
  } catch (error) {
    console.error('Error fetching comment:', error);
    return null;
  }
};

const fetchCommentsRecursively = async (commentIds: number[]): Promise<CommentType[]> => {
  try {
    const commentRequests = commentIds.map(id => axios.get<CommentType>(`${BASE_URL}/item/${id}.json`));
    const responses = await Promise.all(commentRequests);

    const comments = await Promise.all(responses.map(async ({ data: comment }) => {
      const replies = comment.kids ? await fetchCommentsRecursively(comment.kids) : [];
      return { ...comment, replies };
    }));

    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

export const fetchNestedComments = async (comment: CommentType): Promise<CommentType> => {
  try {
    if (!comment.kids) return comment;

    const responses = await Promise.all(
      comment.kids.map(id => axios.get<CommentType>(`${BASE_URL}/item/${id}.json`))
    );

    return { ...comment, replies: responses.map(({ data }) => data) };
  } catch (error) {
    console.error('Error fetching nested comments:', error);
    return comment;
  }
};

export default {};