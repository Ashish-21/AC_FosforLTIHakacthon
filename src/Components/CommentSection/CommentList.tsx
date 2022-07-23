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
  useEffect(() => {
    getUserCommentsData()
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {comments
          .filter((c) => c.postID === postID && c.userID === userID)
          .map((comment) => (
            <Comment
              key={comment.id}
              userName={comment.userName}
              commentText={comment.commentText}
            />
          ))}
      </List>
    </>
  );
}

export default CommentList;
