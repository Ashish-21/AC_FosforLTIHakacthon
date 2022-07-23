import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentModel } from "../../Models/DataModels";

interface OwnProps {
  commentData: CommentModel;
  replyComment: CommentModel[];
}

function Comment({ commentData, replyComment }: OwnProps) {
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
      </ListItem>
      {replyComment.length > 0
        ? replyComment.map((replyCom) => (
            <Comment
              commentData={replyCom}
              replyComment={[]}
              key={replyCom.id}
            />
          ))
        : null}
    </div>
  );
}

export default Comment;
