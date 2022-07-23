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
  const [allCommentsData, setAllCommentsData] = useState<CommentModel[]>([]);
  const [currentComment, setCurrentCommment] = useState(null);
  useEffect(() => {
    getUserComments()
      .then((data) => {
        setAllCommentsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getReplyForComment = (commentId: string) => {
    return allCommentsData
      .filter((com) => com.parentId === commentId && com.postID === postID)
      .sort(
        (coma, comb) =>
          new Date(coma.createdAt).getTime() -
          new Date(comb.createdAt).getTime()
      );
  };

  const postComment = (com: string, parentId: string) => {
    const isReplyComment = parentId === null ? false : true;
    createUserComment(com, parentId, "1", "Ashish", "12", isReplyComment).then(
      (data) => {
        setAllCommentsData([data, ...allCommentsData]);
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
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {allCommentsData
          .filter(
            (c) =>
              c.postID === postID && c.userID === userID && c.parentId === null
          )
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
          ))}
      </List>
      <CommentBox label="Send" handleSubmit={postComment} />
    </>
  );
}

export default CommentList;
