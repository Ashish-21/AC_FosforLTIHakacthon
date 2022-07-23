import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

function CommentBox() {
  const [comment, setComment] = useState<string | undefined>();
  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };
  return (
    <div>
      <Box
        component="form"
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
                  <Button variant="contained">Send</Button>
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
