export interface CommentModel {
  id: string;
  commentText?: string;
  createdAt: string;
  score?: number;
  postID?: string;
  userName?: string;
  userID?: string;
  parentId: string | null;
  isReply?: boolean;
}
