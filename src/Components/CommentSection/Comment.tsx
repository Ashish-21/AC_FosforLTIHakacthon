import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentModel } from "../../Models/DataModels";
import CommentActions from "./CommentActions";

interface OwnProps {
  commentData: CommentModel;
  replyComment: CommentModel[];
  userId?: string;
  deleteCommentHandler?: any;
}

function Comment({
  commentData,
  replyComment,
  userId,
  deleteCommentHandler,
}: OwnProps) {
  const canEditORDelete = commentData.userID === userId;
  const canReply = Boolean(userId);
  return (
    <div>
      <ListItem
        alignItems="flex-start"
        sx={{ paddingLeft: commentData.isReply ? "50px" : "0px" }}
      >
        <ListItemAvatar>
          <Avatar>{commentData.userName?.substring(0, 1)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={commentData.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {commentData.commentText}
              </Typography>
            </React.Fragment>
          }
        />
        <CommentActions
          canEditORDelete={canEditORDelete}
          isReply={canReply}
          commentId={commentData.id}
          deleteCommentHandler={deleteCommentHandler}
        />
      </ListItem>
      <Divider />
      {replyComment.length > 0
        ? replyComment.map((replyCom) => (
            <Comment
              commentData={replyCom}
              replyComment={[]}
              key={replyCom.id}
              userId={userId}
            />
          ))
        : null}
    </div>
  );
}

export default Comment;
