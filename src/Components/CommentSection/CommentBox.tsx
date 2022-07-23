import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

interface OwnProps {
  label?: string;
  handleSubmit?: any;
  commentText?: string;
  cancelButtonHandler?: any;
  cancelButton?: boolean;
}

function CommentBox({
  label,
  handleSubmit,
  commentText = "",
  cancelButton = false,
  cancelButtonHandler,
}: OwnProps) {
  const [comment, setComment] = useState<string | undefined>(commentText);
  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  const commentSubmitHandler = (event: any) => {
    event.preventDefault();
    handleSubmit(comment);
    setComment("");
  };
  return (
    <div>
      <Box
        component="form"
        onSubmit={commentSubmitHandler}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "90%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-textarea"
          placeholder="Add a comment..."
          multiline
          rows={4}
          value={comment}
          onChange={commentHandler}
          required={true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={comment?.length === 0}
                    sx={{ marginRight: "10px" }}
                  >
                    {label}
                  </Button>
                  {cancelButton ? (
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={cancelButtonHandler}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </InputAdornment>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </div>
  );
}

export default CommentBox;
