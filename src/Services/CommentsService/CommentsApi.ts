import { CommentModel } from "../../Models/DataModels";

export const getUserComments = async () => {
  return [
    {
      id: "1",
      commentText: "First Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userID: "12",
      userName: "Ashish",
    },
    {
      id: "2",
      commentText: "Second Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userName: "Ashish",
      userID: "12",
    },
    {
      id: "3",
      commentText: "Reply Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: "1",
      userName: "Rahul",
      userID: "24",
      isReply: true,
    },
    {
      id: "4",
      commentText: "Third  Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userName: "Ashish",
      userID: "12",
    },
  ];
};

export const createUserComment = async (
  commentText: string,
  parentId = null,
  postID: string,
  userName: string,
  userID: string
) => {
  const comment: CommentModel = {
    id: Math.random().toString(32).substring(2, 6),
    commentText: commentText,
    createdAt: new Date().toISOString(),
    parentId: parentId,
    score: 0,
    postID: postID,
    userName: userName,
    userID: userID,
  };
  return comment;
};
