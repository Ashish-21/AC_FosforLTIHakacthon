import { CommentModel } from "../../Models/DataModels";

export const getUserComments = async () => {
  return [
    {
      id: "1",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat dolor nec efficitur egestas. Sed suscipit lectus quis vehicula fringilla. In hac habitasse platea dictumst. Vivamus tincidunt purus justo. Maecenas accumsan dolor a elit placerat aliquet. Aliquam sollicitudin ut elit quis lacinia. Nam varius sapien tellus, ut fermentum augue semper quis.",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userID: "12",
      userName: "Ashish",
    },
    {
      id: "2",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat dolor nec efficitur egestas. Sed suscipit lectus quis vehicula fringilla. In hac habitasse platea dictumst. Vivamus tincidunt purus justo. Maecenas accumsan dolor a elit placerat aliquet. Aliquam sollicitudin ut elit quis lacinia. Nam varius sapien tellus, ut fermentum augue semper quis.",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userName: "Sandra A. Lamb",
      userID: "122",
    },
    {
      id: "3",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit-Reply",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: "1",
      userName: "Ashish",
      userID: "12",
      isReply: true,
    },
    {
      id: "4",
      commentText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat dolor nec efficitur egestas. Sed suscipit lectus quis vehicula fringilla. In hac habitasse platea dictumst. Vivamus tincidunt purus justo. Maecenas accumsan dolor a elit placerat aliquet. Aliquam sollicitudin ut elit quis lacinia. Nam varius sapien tellus, ut fermentum augue semper quis.",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "1",
      parentId: null,
      userName: "Pattrick E. Wiggins",
      userID: "123",
    },
  ];
};

export const createUserComment = async (
  commentText: string,
  parentId = null,
  postID: string,
  userName: string,
  userID: string,
  isReply = false
) => {
  console.log(isReply);
  const comment: CommentModel = {
    id: Math.random().toString(32).substring(2, 6),
    commentText: commentText,
    createdAt: new Date().toISOString(),
    parentId: parentId,
    score: 0,
    postID: postID,
    userName: userName,
    userID: userID,
    isReply: isReply,
  };
  return comment;
};
