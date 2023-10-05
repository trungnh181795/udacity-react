import { Box, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAll } from "../api/books"
import Loading from "../components/Loading/Loading"
import _ from "lodash"
import { shelfNames } from '../constants/shelfNames';
import BookCard from "../components/BookCard/BookCard"

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [shelves, setShelves] = useState()

    const getAllBooks = async () => {
        setLoading(true)
        await getAll().then(data => setShelves(_.groupBy(data, 'shelf')))
        setLoading(false)
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
            {loading ? <Loading /> : shelves && Object.keys(shelves)?.map(key => (
                <Box key={key} sx={{ width: '100%', height: '100%', mb: '24px', paddingBottom: '24px', '&:not(:last-child)': { borderBottom: '1px solid grey' } }}>
                    <Typography variant="h4" component="h2" sx={{ mb: '8px' }}>{shelfNames[key]}</Typography>
                    <Grid spacing={4} container sx={{ width: '100%', mb: '24px' }}>
                        {shelves[key]?.map(book => (
                            <Grid key={book.id} item xs={12} md={6} lg={3} sx={{ mb: '16px'}}>
                                <BookCard getBook={getAllBooks} book={book} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Stack>
    )
}

export default Home