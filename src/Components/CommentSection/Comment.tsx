import React from "react";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentModel } from "../../Models/DataModels";
import CommentActions from "./CommentActions";
import CommentBox from "./CommentBox";

interface CommentStyles {
  listItemStyles?: ListItemProps;
}

const commentStyles: CommentStyles = {
  listItemStyles: {
    sx: {
      marginBottom: "24px",
      background: "#fff",
      padding: "28px 20px",
    },
  },
};

interface OwnProps {
  commentData: CommentModel;
  replyComment: CommentModel[];
  userId?: string;
  deleteCommentHandler?: any;
  postCommentHandler?: any;
  updateCommentHandler?: any;
  setCurrentComment?: any;
  parentId?: any;
  currentComment?: any;
}

const styles = commentStyles;
function Comment({
  commentData,
  replyComment,
  userId,
  deleteCommentHandler,
  currentComment,
  postCommentHandler,
  parentId = null,
  setCurrentComment,
  updateCommentHandler,
}: OwnProps) {
  const canEditORDelete = commentData.userID === userId;
  const canReply = Boolean(userId);
  const modeOfReplyAction =
    currentComment &&
    currentComment.id === commentData.id &&
    currentComment.mode === "reply";
  const modeOfEditAction =
    currentComment &&
    currentComment.id === commentData.id &&
    currentComment.mode === "edit";
  const replyId = parentId ? parentId : commentData.id;

  return (
    <div>
      <ListItem
        alignItems="flex-start"
        sx={{
          ...styles.listItemStyles?.sx,
          marginLeft: commentData.isReply ? "5%" : "unset",
          width: commentData.isReply ? "95%" : "100%",
        }}
      >
        <ListItemAvatar>
          <Avatar>{commentData.userName?.substring(0, 1)}</Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight="bold"
                paddingBottom={1}
              >
                {commentData.userName}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              {!modeOfEditAction ? (
                <Typography variant="body2" color="text.secondary">
                  {commentData.commentText}
                </Typography>
              ) : null}
            </React.Fragment>
          }
        />
        <CommentActions
          canEditORDelete={canEditORDelete}
          isReply={canReply}
          commentId={commentData.id}
          deleteCommentHandler={deleteCommentHandler}
          setCurrentComment={setCurrentComment}
        />
      </ListItem>
      {modeOfReplyAction ? (
        <CommentBox
          handleSubmit={(text: string) => postCommentHandler(text, replyId)}
          label="Reply"
        />
      ) : null}
      {modeOfEditAction ? (
        <CommentBox
          handleSubmit={(text: string) =>
            updateCommentHandler(text, commentData.id)
          }
          label="Update"
          commentText={commentData.commentText}
          cancelButtonHandler={() => setCurrentComment(null)}
          cancelButton={true}
        />
      ) : null}
      {replyComment.length > 0
        ? replyComment.map((replyCom) => (
            <Comment
              commentData={replyCom}
              replyComment={[]}
              key={replyCom.id}
              userId={userId}
              parentId={replyCom.parentId}
              currentComment={currentComment}
              setCurrentComment={setCurrentComment}
              postCommentHandler={postCommentHandler}
              deleteCommentHandler={deleteCommentHandler}
              updateCommentHandler={updateCommentHandler}
            />
          ))
        : null}
    </div>
  );
}

export default Comment;
