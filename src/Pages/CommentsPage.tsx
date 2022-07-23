import React from "react";
import CommentList from "../Components/CommentSection/CommentList";
import { Container, ContainerProps } from "@mui/material";

interface CommentsPageStyles {
  containerStyles: ContainerProps;
}

const commentsPageStyles: CommentsPageStyles = {
  containerStyles: {
    sx: {
      padding: "150px 0px",
      background: "#eeeeee",
    },
  },
};

const styles = commentsPageStyles;

function CommentsPage() {
  return (
    <>
      <Container maxWidth="lg" {...styles.containerStyles}>
        <Container maxWidth="md">
          <CommentList userID="12" postID="1" />
        </Container>
      </Container>
    </>
  );
}

export default CommentsPage;
