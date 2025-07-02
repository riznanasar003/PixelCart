"use client";
import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { Box, Button, Paper, Typography } from '@mui/material';
import { media as wixMedia } from "@wix/sdk"
import { useRouter } from 'next/navigation';



const CartModal = () => {


    const wixClient = useWixClient()

    const { cart, isLoading, removeItem } = useCartStore()

    const subtotal = cart?.lineItems?.reduce((acc, item) => {
        const price = parseFloat(item?.price?.amount || '0');
        const quantity = item?.quantity || 1;
        return acc + price * quantity;
    }, 0) || 0;


    const router = useRouter()
    const handleCheckout = () => {
        router.push("/checkout")
    }

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                top: '3rem',
                right: '0',
                p: '2',
                minWidth: '350px',
                maxHeight: '80vh',
                borderRadius: '2',
                display: 'flex',
                flexDirection: 'column',
                mb: '2',
                gap: '2',
                zIndex: '10',
            }}
        >
            <Box sx={{ padding: "10px 20px" }}>
                <Typography variant='h6'>Shopping Cart</Typography>
            </Box>

            {!cart.lineItems ? (
                <Typography variant='h6' color='error' sx={{ px: 2, py: 1, textAlign: 'center' }}>
                    Cart is Empty
                </Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            overflowY: 'auto',
                            px: 2,
                            flex: 1, // Takes available vertical space in the Paper
                        }}
                    >
                        {cart.lineItems.map((item) => (
                            <Box key={item._id}>
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
                                    {item.image && (
                                        <Box
                                            component="img"
                                            src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                                            alt="Cart item"
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                objectFit: 'cover',
                                                borderRadius: 1,
                                            }}
                                        />
                                    )}

                                    <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
                                        <Box>
                                            <Typography variant="h6">{item.productName?.original}</Typography>
                                            <Typography variant="body1" color="dark">
                                                $ {item.price?.amount}
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ color: item.availability?.status ? 'darkgreen' : 'gray' }}>
                                                {item.availability?.status ? 'Available' : 'Out of stock'}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={8} mt={1}>
                                            <Typography variant="subtitle2">Qty : {item.quantity}</Typography>
                                            <Button variant="text" color="error" sx={{ textTransform: 'none' }}
                                                onClick={() => removeItem(wixClient, item._id!)}>
                                                Remove
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                        <Box display='flex'
                            paddingLeft='20px'
                            sx={{ mt: 2, gap: 15 }}
                        >
                            <Typography variant='h6' sx={{ gap: 6 }}>Subtotal</Typography>
                            <Typography variant='h6' color='success'> ₹ {subtotal.toFixed(2)}</Typography>

                        </Box>
                        <Typography variant='subtitle1' color='gray' sx={{ padding: '0px 20px' }}>Shipping and taxes calculated at checkout.</Typography>

                        <Box
                            display='flex'
                            justifyContent='center'
                            paddingBottom='10px'
                            sx={{ gap: 5, mb: 2, mt: 2 }}
                        >
                            <Button
                                variant='outlined'
                                onClick={() => router.push("/cart")}
                                sx={{
                                    borderColor: 'black',
                                    color: 'black',
                                    fontFamily: 'serif',
                                    borderRadius: '20px'
                                }}
                            >
                                View Cart
                            </Button>
                            <Button
                                variant='contained'
                                disabled={isLoading}
                                onClick={handleCheckout}
                                sx={{
                                    background: 'black',
                                    fontFamily: 'serif',
                                    borderRadius: '20px',
                                    "&:disabled": {
                                        backgroundColor: "#d1d1d0",
                                        cursor: "not-allowed",
                                    },
                                }}

                            >
                                Checkout
                            </Button>
                        </Box>
                    </Box>
                </>


            )}
        </Paper>
    )
}

export default CartModal