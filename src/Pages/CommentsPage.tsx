import React from "react";
import CommentList from "../Components/CommentSection/CommentList";
import { Container } from "@mui/material";

function CommentsPage() {
  return (
    <>
      <Container maxWidth="lg">
        <CommentList userID="12" postID="1" />
      </Container>
    </>
  );
}

export default CommentsPage;
