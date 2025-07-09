'use client'
import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material'
import { RootState } from '../redux/store'
import { removeFromWishlist } from '../redux/slices/wishlistSlice'

export default function WishlistPage() {
    const wishlist = useSelector((state: RootState) => state.wishlist.items)
    console.log(wishlist)
    const dispatch = useDispatch()

    if (wishlist.length === 0) {
        return <Typography variant="h6" mt={4} color='error' textAlign='center'>Your wishlist is empty.</Typography>
    }


    return (
        <Box p={4}>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bolder' }} gutterBottom>MY WISHLIST</Typography>
            <Grid container spacing={4} mt={4}>
                {wishlist.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="350"
                                width='50'
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="h5">{product.title}</Typography>

                                <Typography variant="body1" sx={{ textAlign: 'justify', mt: 1 }}>
                                    {product.description}
                                </Typography>

                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>₹{product.price}</Typography>
                                    <Button
                                        color="error"
                                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                                        onClick={() => dispatch(removeFromWishlist(product.id))}
                                    >
                                        REMOVE
                                    </Button>
                                </Box>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}