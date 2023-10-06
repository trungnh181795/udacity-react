import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { useDebounce } from '../hooks/use-debounce';
import { search } from '../api/books';
import Loading from '../components/Loading/Loading';
import BookCard from '../components/BookCard/BookCard';

const Search = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const searchQuery = location?.search?.replace('?q=', '')
    const [value, setValue] = useState(searchQuery)
    const [maxResult, setMaxResult] = useState(12)
    const [books, setBooks] = useState([])

    const debouncedSearchQuery = useDebounce(value, 300)

    const handleOnChange = (newValue) => {
        setValue(newValue)
    }

    const handleSearch = async (query) => {
        setLoading(true)
        await search(query, maxResult).then(data => {
            if (data?.length > 0) {
                setBooks(data)
                return
            }

            setBooks(data?.items)
            return
        })
        setLoading(false)
    }

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery)
        }
    }, [searchQuery])

    useEffect(() => {
        if (debouncedSearchQuery) {
            handleSearch(debouncedSearchQuery, maxResult)
        }
    }, [debouncedSearchQuery, maxResult])

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
                <IconButton onClick={() => navigate(-1)} sx={{
                    bgcolor: 'info.main', mr: '8px', '&:hover': {
                        bgcolor: 'info.dark'
                    }
                }}>
                    <ArrowBackIcon />
                </IconButton>
                <SearchBox defaultValue={debouncedSearchQuery} onChange={handleOnChange} />
                <FormControl sx={{ ml: '8px', width: '100px' }}>
                    <InputLabel id="demo-simple-select-label">Max result</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={maxResult}
                        label="Max result"
                        onChange={(e) => setMaxResult(parseInt(e.target.value))}
                    >
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={36}>36</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%', mt: '16px' }}>
                {loading ? <Loading /> : books.length > 0 ? (
                    <Grid spacing={4} container sx={{ width: '100%' }}>
                        {books?.map(book => (
                            <Grid key={book.id} item xs={12} md={6} lg={3} sx={{ mb: '16px' }}>
                                <BookCard book={book} />
                            </Grid>
                        ))}
                    </Grid>
                ) : <Typography variant="body" component="span" sx={{ flex: 1 }}>
                    No result found
                </Typography>}
            </Stack>
        </Box>
    )
}

export default Search