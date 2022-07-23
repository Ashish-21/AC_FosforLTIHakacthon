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
      parentId: 1,
      userName: "Ashish",
      userID: "12",
    },
    {
      id: "4",
      commentText: "Third  Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      postID: "2",
      parentId: null,
      userName: "Ashish",
      userID: "12",
    },
  ];
};
