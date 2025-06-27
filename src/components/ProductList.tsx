
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const products = [
    {
        id: 1,
        title: 'Aura',
        image:
            'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: '46',
        description: 'A stylish and breezy floral dress perfect for sunny days and casual outings.'
    },
    {
        id: 2,
        title: 'Zara',
        image:
            'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: '57',
        description: 'A stylish and breezy floral dress perfect for sunny days and casual outings.'
    },
    {
        id: 3,
        title: 'Shein',
        image:
            'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: '100',
        description: 'A stylish and breezy floral dress perfect for sunny days and casual outings.'
    },
    {
        id: 4,
        title: 'Zerah',
        image:
            'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: '46',
        description: 'A stylish and breezy floral dress perfect for sunny days and casual outings.'
    },
];

const ProductList = () => {
    return (
        <Box sx={{px : {xs :2 , sm  : 4, md : 8, lg : 16},py  : 4}}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg : 3 }} key={product.id}>
                        <Card sx={{ height: '100%' }} >
                            <Box
                                sx={{
                                    position: 'relative',
                                    maxWidth: '100%',
                                    height: 300,
                                }}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="50%"
                                    style={{ objectFit : 'initial', borderRadius: '4px 4px 0 0'}}
                                />
                            </Box>
                            <CardContent>
                                <Box display="flex"  gap={15}>
                                <Typography variant="h6" fontFamily="serif">
                                    {product.title}
                                </Typography>
                                <Typography variant="h6" fontFamily="serif" color='red'>
                                    $ {product.price}
                                </Typography>
                                </Box>
                                <Typography variant="subtitle1" fontFamily="serif" color='gray' lineHeight='1.5' textAlign='justify'>
                                    {product.description}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        mt: 3,
                                        fontFamily: 'serif',
                                        borderColor: 'black',
                                        borderRadius: '20px', 
                                        transition: 'all 0.3s ease',
                                        color: 'black',
                                        padding: '8px 20px',
                                        
                                        '&:hover': {
                                            backgroundColor: 'black',
                                            color: 'white',
                                            borderColor: 'black',

                                        },
                                    }}
                                >
                                    Add to Cart
                                </Button>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        </Box>
    );
};

export default ProductList;
