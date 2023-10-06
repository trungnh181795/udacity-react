import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get } from '../api/books'
import { Box, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
import Loading from '../components/Loading'
import { languages } from '../constants/countries'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookDetail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState(null)

    useEffect(() => {
        setLoading(true)
        get(params?.id).then(data => setBook(data)).finally(() => setLoading(false))
    }, [])

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <IconButton onClick={() => navigate(-1)} sx={{
                bgcolor: 'info.main', mr: '8px', '&:hover': {
                    bgcolor: 'info.dark'
                }
            }}>
                <ArrowBackIcon />
            </IconButton>
            <Stack direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
                {loading ? <Loading /> : book ? <Grid container spacing={4} sx={{ width: '100%', height: '100%' }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img style={{ width: '200px', objectFit: 'contain' }} src={book?.imageLinks?.thumbnail} alt={book?.title} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack direction="column" alignItems="flex-start" sx={{ height: '100%', width: '100%' }}>
                            <Typography variant="h4" fontWeight={700} component="h1" sx={{}}>
                                {book?.title}
                            </Typography>
                            <Typography variant="body2" fontWeight={400} component="span" color="grey">
                                {book?.authors && book?.authors.length ? book?.authors?.join(', ') : 'Updating...'}
                            </Typography>
                            <Divider />
                            <Typography variant="subtitle1" fontWeight={400} component="span" sx={{
                                mt: 2, display: '-webkit-box',
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {book?.description}
                            </Typography>
                            <Box sx={{ my: 2 }}>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey" sx={{ minWidth: '100px', mr: 4 }}>
                                        PUBLISHER
                                    </Typography>
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey">
                                        {book?.publisher}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey" sx={{ minWidth: '100px', mr: 4 }}>
                                        FIRST PUBLISH
                                    </Typography>
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey">
                                        {book?.publishedDate}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey" sx={{ minWidth: '100px', mr: 4 }}>
                                        LANGUAGE
                                    </Typography>
                                    <Typography variant="body2" fontWeight={400} component="span" color="grey">
                                        {languages[book?.language]}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid> : <Typography variant="body" component="span" sx={{ flex: 1 }}>
                    No result found
                </Typography>}
            </Stack>
        </Box>
    )
}

export default BookDetail