import React from "react";
import Button from "@mui/material/Button";

interface OwnProps {
  canEditORDelete: boolean;
  isReply: boolean;
  deleteCommentHandler?: any;
  editCommentHandler?: any;
  replyCommentHandler?: any;
  commentId?: string;
}

function CommentActions({
  canEditORDelete,
  isReply,
  deleteCommentHandler,
  commentId,
}: OwnProps) {
  return (
    <>
      {isReply ? <Button variant="contained">Reply</Button> : null}
      {canEditORDelete ? <Button variant="text">Edit</Button> : null}
      {canEditORDelete ? (
        <Button variant="text" onClick={() => deleteCommentHandler(commentId)}>
          Delete
        </Button>
      ) : null}
    </>
  );
}

export default CommentActions;
