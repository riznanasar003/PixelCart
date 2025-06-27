import { Box, Card, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'

const CategoryList = () => {

  const products = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Men',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Men',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Women',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Women',
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kids',
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kids',
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kids',
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kids',
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Kids',
    },
  ];

  return (

    <Box sx={{ px: 4, py: 2 }}>
      <Box sx={{
        display: 'flex',
        overflow: 'auto',
        gap: 2,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        {products.map((Products) => (
          <Card key={Products.id} sx={{ minWidth: 250, flexShrink: 0 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 300,
              }}
            >
              <Image
                src={Products.image}
                alt={Products.category}
                fill
                sizes="50%"
                style={{ objectFit: 'initial', borderRadius: '4px 4px 0 0' }}
              />
            </Box>
            <Typography variant="h6" fontFamily="serif" paddingLeft='8px'>
              {Products.category}
            </Typography>
          </Card>
        ))}

      </Box>

    </Box>

  )
}

export default CategoryList