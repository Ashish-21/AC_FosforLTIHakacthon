import React from "react";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { CommentModel } from "../../Models/DataModels";
import CommentActions from "./CommentActions";
import CommentBox from "./CommentBox";
import Box from "@mui/material/Box";
import { BoxProps } from "@mui/system";
import Button from "@mui/material/Button";
import ReplyIcon from "@mui/icons-material/Reply";
import { formatDistanceToNowStrict, format } from "date-fns";
import { differenceInDays } from "date-fns/esm";

interface CommentStyles {
  listItemStyles?: ListItemProps;
  commentActionContainer?: BoxProps;
  userNameContainer?: BoxProps;
  currentUserTypography?: TypographyProps;
  userNameBox?: BoxProps;
  dateTypography?: TypographyProps;
}

const commentStyles: CommentStyles = {
  listItemStyles: {
    sx: {
      marginBottom: "24px",
      background: "#fff",
      padding: "28px 20px",
      borderRadius: "14px",
    },
  },
  commentActionContainer: {
    sx: {
      padding: "12px 0px",
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  userNameContainer: {
    sx: {
      display: "flex",
      alignItems: "center",
    },
  },
  userNameBox: {
    sx: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  dateTypography: {
    sx: {
      marginLeft: "8px",
      marginRight: "10px",
    },
  },
  currentUserTypography: {
    sx: {
      background: "#1976d2",
      color: "#fff",
      borderRadius: "8px",
      padding: "4px 10px",
      marginLeft: "12px",
      marginBottom: "14px",
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
            <div>
              <Box {...styles.userNameBox} component="div">
                <Box {...styles.userNameContainer} component="div">
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight="bold"
                    paddingBottom={1}
                  >
                    {commentData.userName}
                  </Typography>
                  {canEditORDelete ? (
                    <Typography {...styles.currentUserTypography}>
                      You
                    </Typography>
                  ) : null}
                  {commentData.createdAt ? (
                    <Typography {...styles.dateTypography} paddingBottom={1}>
                      {differenceInDays(
                        new Date(),
                        new Date(commentData.createdAt)
                      ) > 1
                        ? format(
                            new Date(commentData.createdAt),
                            "MMM dd, yyyy"
                          )
                        : formatDistanceToNowStrict(
                            new Date(commentData.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                    </Typography>
                  ) : null}
                </Box>
                {canReply ? (
                  <Button
                    variant="text"
                    startIcon={<ReplyIcon />}
                    onClick={() =>
                      setCurrentComment({ id: commentData.id, mode: "reply" })
                    }
                  >
                    Reply
                  </Button>
                ) : null}
              </Box>
            </div>
          }
          secondary={
            <div>
              {!modeOfEditAction ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="span"
                >
                  {commentData.commentText}
                </Typography>
              ) : null}
              {canEditORDelete ? (
                <Box {...styles.commentActionContainer}>
                  <CommentActions
                    canEditORDelete={canEditORDelete}
                    isReply={canReply}
                    commentId={commentData.id}
                    deleteCommentHandler={deleteCommentHandler}
                    setCurrentComment={setCurrentComment}
                  />
                </Box>
              ) : null}
            </div>
          }
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
