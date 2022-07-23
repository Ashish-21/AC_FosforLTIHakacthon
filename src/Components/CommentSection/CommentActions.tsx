import React from "react";
import Button from "@mui/material/Button";

interface OwnProps {
  canEditORDelete: boolean;
  isReply: boolean;
  deleteCommentHandler?: any;
  editCommentHandler?: any;
  replyCommentHandler?: any;
  commentId?: string;
  setCurrentComment?: any;
}

function CommentActions({
  canEditORDelete,
  isReply,
  deleteCommentHandler,
  commentId,
  setCurrentComment,
}: OwnProps) {
  return (
    <>
      {isReply ? (
        <Button
          variant="contained"
          onClick={() => setCurrentComment({ id: commentId, mode: "reply" })}
        >
          Reply
        </Button>
      ) : null}
      {canEditORDelete ? (
        <Button
          variant="text"
          onClick={() => setCurrentComment({ id: commentId, mode: "edit" })}
        >
          Edit
        </Button>
      ) : null}
      {canEditORDelete ? (
        <Button variant="text" onClick={() => deleteCommentHandler(commentId)}>
          Delete
        </Button>
      ) : null}
    </>
  );
}

export default CommentActions;
