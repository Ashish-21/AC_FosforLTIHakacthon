export interface Comment {
  id: string;
  commentText: string;
  createdAt: Date;
  score: number;
  userId: string;
  username: string;
  replies: [];
}
