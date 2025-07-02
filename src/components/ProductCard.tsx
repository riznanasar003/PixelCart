'use client'
import { addToWishlist } from '@/app/redux/slices/wishlistSlice'
import { Product } from '@/app/types/product'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'


interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch()

  return (
    <Card>
      <CardMedia component="img" height="200" image={product.image} alt={product.title} />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ₹ {product.price}
        </Typography>
        <Button onClick={() => dispatch(addToWishlist(product))} sx={{ mt: 2 }}>
          Add to Wishlist
        </Button>
      </CardContent>
    </Card>
  )
}
