"use client";
import React from "react";
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { useCartStore } from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import { media as wixMedia } from '@wix/sdk';
import { useWixClient } from '@/hooks/useWixClient';

const CartPage = () => {
  const { cart, removeItem, isLoading } = useCartStore();
  const wixClient = useWixClient()
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (!cart.lineItems || cart.lineItems.length === 0) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" sx={{textAlign:'center',color:'error'}}>Your cart is empty</Typography>
      </Box>
    );
  }

  const subtotal = cart?.lineItems?.reduce((acc, item) => {
  const price = parseFloat(item?.price?.amount || '0'); 
  const quantity = item?.quantity || 1;
  return acc + price * quantity;
}, 0) || 0;


  return (
    <Box maxWidth="md" mx="auto" mt={6} px={2}>
      <Typography variant="h4" fontWeight="bold" textAlign='center' gutterBottom>
        SHOPPING CART
      </Typography>

      {cart.lineItems.map((item) => (
        <Card key={item._id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            <Box
              component="img"
              src={wixMedia.getScaledToFillImageUrl(item.image || "", 100, 100, {})}
              alt={item.productName?.original || "Product image"}
              sx={{ width: 150, height: 150, borderRadius: 2 }}
            />
            <Box flex={2} padding="0px 20px">
              <Typography variant="h5" sx={{fontWeight:"bold"}}>{item.productName?.original}</Typography>
              <Typography variant="h6" color="success">
                Price: ₹ {item.price?.amount}
              </Typography>
              <Typography variant="body1">Qty: {item.quantity}</Typography>
              <Button
                onClick={() => removeItem(wixClient, item._id!)}
                color="error"
                sx={{ mt: 1, textTransform: 'none',fontSize:'18px' }}
              >
                Remove
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Subtotal:</Typography>
        <Typography variant="h4" color='success'>₹ {subtotal.toFixed(2)}</Typography>
      </Box>

      <Typography variant="body2" color="gray" mt={1}>
        Shipping and taxes calculated at checkout.
      </Typography>

      <Box textAlign="right" mt={3}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={handleCheckout}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '20px',
            px: 4,
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
