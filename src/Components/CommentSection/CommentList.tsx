import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import List from "@mui/material/List";
import { CommentModel } from "../../Models/DataModels";
import {
  getUserComments,
  createUserComment,
} from "../../Services/CommentsService/CommentsApi";
import CommentBox from "./CommentBox";

interface Ownprops {
  postID?: string;
  userID?: string;
}

function CommentList({ postID, userID }: Ownprops) {
  const intialData = localStorage.getItem("MyData")
    ? JSON.parse(localStorage.getItem("MyData") || "{}")
    : [];

  const [allCommentsData, setAllCommentsData] =
    useState<CommentModel[]>(intialData);

  const [currentComment, setCurrentCommment] = useState(null);

  useEffect(() => {
    if (intialData && !intialData.length) {
      getUserComments()
        .then((data) => {
          setAllCommentsData(data);
          window.localStorage.setItem("MyData", JSON.stringify(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MyData", JSON.stringify(allCommentsData));
  }, [allCommentsData]);

  const getReplyForComment = (commentId: string) => {
    return allCommentsData
      .filter((com) => com.parentId === commentId && com.postID === postID)
      .sort(
        (coma, comb) =>
          new Date(coma.createdAt).getTime() -
          new Date(comb.createdAt).getTime()
      );
  };

  const postComment = (com: string, parentId = null) => {
    console.log(parentId);
    const isReplyComment = parentId === null ? false : true;
    console.log(com);
    createUserComment(com, parentId, "1", "Ashish", "12", isReplyComment).then(
      (data) => {
        setAllCommentsData([data, ...allCommentsData]);
        console.log(data);
        setCurrentCommment(null);
      }
    );
  };

  const deleteComment = (comId: string) => {
    const deleteCommentData = allCommentsData.filter((com) => com.id !== comId);
    setAllCommentsData(deleteCommentData);
  };

  const updateComment = (text: string, comId: string) => {
    const updateComment = allCommentsData.map((com) => {
      if (comId === com.id) {
        return { ...com, commentText: text };
      }
      return com;
    });
    setAllCommentsData(updateComment);
    setCurrentCommment(null);
  };

  return (
    <>
      <List sx={{ width: "100%" }}>
        {allCommentsData && allCommentsData.length
          ? allCommentsData
              .filter((c) => c.postID === postID && c.parentId === null)
              .map((comment) => (
                <Comment
                  commentData={comment}
                  key={comment.id}
                  replyComment={getReplyForComment(comment.id)}
                  userId={userID}
                  deleteCommentHandler={deleteComment}
                  setCurrentComment={setCurrentCommment}
                  postCommentHandler={postComment}
                  currentComment={currentComment}
                  updateCommentHandler={updateComment}
                />
              ))
          : null}
      </List>
      <CommentBox label="Send" handleSubmit={postComment} />
    </>
  );
}

export default CommentList;
