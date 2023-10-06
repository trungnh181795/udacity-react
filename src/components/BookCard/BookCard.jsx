import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BookControlSelector from "../BookControlSelector/BookControlSelector";

const BookCard = ({ book, getBook }) => {
  const { id, authors, title } = book

  const handleOnClick = (e) => {
    if (e.target.closest("a")) {
      e.preventDefault();
    }
  }

  return (
    <Paper component="a" href={`/book/${id}`} sx={{
      marginRight: { xs: 0, lg: '16px' }, '&:last-child': {
        marginRight: 0,
        marginBottom: 0
      },
      marginBottom: { xs: '16px', lg: 0 },
      boxShadow: 'none',
      padding: '16px',
      width: '190px',
      maxWidth: '190px',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        boxShadow: 3
      },
      height: '100%',
      transition: '0.2s ease-in-out',
      position: 'relative'
    }}>
      <Box sx={{ flex: 1, height: '175px', minHeight: '175px', mb: '8px' }}>
        <img src={book?.imageLinks?.smallThumbnail} alt={title} style={{ height: '100%', objectFit: 'contain' }} />
      </Box>
      <Typography variant="h6" component="h3" sx={{
        flex: 1, display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        mb: 1
      }}>
        {title}
      </Typography>
      <Typography variant="body" component="span" sx={{ flex: 1 }}>
        {authors && authors.length ? authors?.join(', ') : 'Updating...'}
      </Typography>
      {getBook ? <Box sx={{ position: 'absolute', bottom: '-10px', right: '-10px' }} onClick={handleOnClick}>
        <BookControlSelector getBook={getBook} id={id} currentShelf={book?.shelf} />
      </Box> : null}
    </Paper>
  );
};

export default BookCard;
