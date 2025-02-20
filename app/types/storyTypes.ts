export interface Story {
  id: number;
  title: string;
  by: string;
  score: number;
  kids: number[];
  url?: string;
  time: number;
  descendants: number;
  type: string;
  comments?: any[];

}

export interface CommentType {
  id: number;
  by: string;
  text: string;
  kids?: number[];
  time: number;
  type: string;
  parent: number;
  replies?: CommentType[];
}

export default {};