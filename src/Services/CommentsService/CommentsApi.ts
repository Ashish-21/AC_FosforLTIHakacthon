export const getUserComments = async () => {
  return [
    {
      id: "1",
      commentText: "First Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      userID: "1",
      parentId: null,
      userName: "Ashish",
    },
    {
      id: "2",
      commentText: "Second Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      userID: "1",
      parentId: null,
      userName: "Ashish",
    },
    {
      id: "3",
      commentText: "Reply Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      userID: "1",
      parentId: 1,
      userName: "Ashish",
    },
    {
      id: "4",
      commentText: "Third  Comment",
      createdAt: "2022-07-23T10:10:42.619Z",
      score: 5,
      userID: "1",
      parentId: null,
      userName: "Ashish",
    },
  ];
};
