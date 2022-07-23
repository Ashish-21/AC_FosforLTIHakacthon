import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import List from "@mui/material/List";
import { CommentModel } from "../../Models/DataModels";
import { getUserComments as getUserCommentsData } from "../../Services/CommentsService/CommentsApi";

interface Ownprops {
  postID?: string;
  userID?: string;
}

function CommentList({ postID, userID }: Ownprops) {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [allCommentsData, setAllCommentsData] = useState<CommentModel[]>([]);
  useEffect(() => {
    getUserCommentsData()
      .then((data) => {
        setComments(data.filter((c) => c.parentId === null));
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

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments
          .filter((c) => c.postID === postID && c.userID === userID)
          .map((comment) => (
            <Comment
              commentData={comment}
              key={comment.id}
              replyComment={getReplyForComment(comment.id)}
            />
          ))}
      </List>
    </>
  );
}

export default CommentList;
