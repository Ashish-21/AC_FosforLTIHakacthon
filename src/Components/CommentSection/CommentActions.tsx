import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
      {canEditORDelete ? (
        <Button
          variant="text"
          onClick={() => deleteCommentHandler(commentId)}
          startIcon={<DeleteIcon />}
          color="error"
        >
          Delete
        </Button>
      ) : null}
      {canEditORDelete ? (
        <Button
          variant="text"
          onClick={() => setCurrentComment({ id: commentId, mode: "edit" })}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ) : null}
    </>
  );
}

export default CommentActions;
