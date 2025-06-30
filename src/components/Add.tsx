"use client"
import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

const Add = ({productId, variantId, stockNumber}: {
  productId: string;
  variantId:string; 
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1)

  const stock = 4

  const handleQuantity = (type: "i" | "d") => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === 'i' && quantity < stock) {
      setQuantity((prev) => prev + 1)
    }

  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography fontWeight="bold" mb={1}>
          Choose a Quantity
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 4,
          }}
        >

          <ButtonGroup variant="contained" aria-label="quantity buttons" sx={{ borderRadius: '24px' }}>
            <Button
              onClick={() => handleQuantity("d")}
              sx={{ borderRadius: "24px" }}
            >
              -
            </Button>
            <Button>{quantity}</Button>
            <Button
              onClick={() => handleQuantity("i")}
              sx={{ borderRadius: "24px" }}
            >
              +
            </Button>

          </ButtonGroup>
          
         {stockNumber < 1 ?(<Box component="span" sx={{ color: "red" }}>Product is out of stock</Box>) : (
          <Box component="span" sx={{ color: "black" }}>
            Only <span style={{ color: "orange", fontWeight: 'bold' }}>{stockNumber}</span> left!<br /> {"Don't"} miss it
          </Box>
        )}

          
        </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            borderRadius: "24px",
            borderColor: 'black',
            transition: 'all 0.3s ease',
            color: 'black',
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
              borderColor: 'black',
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
      </Box>
      

    </Box>


  )
}

export default Add
