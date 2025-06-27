"use client";
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react'

const CartModal = () => {

    const cartItems = [
        {
            id: 1,
            name: 'Aura',
            price: 49,
            qty: 2,
            available: true,
            image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        // {
        //     id: 2,
        //     name: 'Fresh Fruits',
        //     price: 69,
        //     qty: 1,
        //     available: false,
        //     image: 'https://img.freepik.com/free-vector/vegetables-shopping-realistic-concept-with-shopping-cart-goods-vector-illustration_1284-16246.jpg?semt=ais_hybrid&w=740'

        // }
    ];


    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                top: '3rem',
                right: '0',
                p: '2',
                minWidth: '250px',
                borderRadius: '2',
                display: 'flex',
                flexDirection: 'column',
                mb: '2',
                gap: '2',
                zIndex :'10'

            }}

        >
            <Box sx={{ padding: "10px 20px" }}>
                <Typography variant='h6'>Shopping Cart</Typography>
            </Box>
            {cartItems.length === 0 ? (
                <Typography variant='h4'>Cart is Empty</Typography>
            ) : (
                cartItems.map((item) => (
                    <Box key={item.id}>
                        <Box
                            display="flex"
                            alignItems="flex-start"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                mb: 2,
                                gap: 2,
                                bgcolor: 'background.paper',
                            }}
                        >

                            <Box
                                component="img"
                                src={item.image}
                                alt="Cart item"
                                sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                }}
                            />


                            <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>

                                <Box>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body1" color="error">
                                        $ {item.price}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: item.available ? 'darkgreen' : 'gray' }}>
                                        {item.available ? 'Available' : 'Out of stock'}
                                    </Typography>
                                </Box>


                                <Box display="flex" alignItems="center" gap={3} mt={1}>
                                    <Typography variant="subtitle2">Quantity : {item.qty}</Typography>
                                    <Button variant="text" color="error" sx={{ textTransform: 'none' }}>
                                        Remove
                                    </Button>
                                </Box>
                            </Box>


                        </Box>
                        <Box
                            display='flex'
                            justifyContent='center'
                            paddingBottom='10px'

                            sx={{ gap: 5, mb: 2 }}
                        >
                            <Button variant='outlined' sx={{ borderColor: 'black', color: 'black', fontFamily: 'serif', borderRadius : '20px'}} >View Cart</Button>
                            <Button variant='contained' sx={{ background: 'black', fontFamily: 'serif', borderRadius : '20px' }}>Checkout</Button>
                        </Box>

                    </Box>

                ))
            )}
        </Paper>
    )
}

export default CartModal