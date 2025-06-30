import { wixClientServer } from '@/lib/wixClientServer';
import { Box, Card, Link, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'

const CategoryList = async () => {
  const wixClient  = wixClientServer()

  const cats = await wixClient.collections.queryCollections().find();

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
        {cats.items.map((item) => (
          <Link 
         href={`/list?cat=${item.slug}`}
          key={item._id}
          >
          <Card  sx={{ minWidth: 250, flexShrink: 0 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: 300,
              }}
            >
              <Image
                src={item.media?.mainMedia?.image?.url || "/cat.png"}
                alt=""
                fill
                sizes="50%"
                style={{ objectFit: 'initial', borderRadius: '4px 4px 0 0' }}
              />
            </Box>
            <Typography variant="h6" fontFamily="serif" paddingLeft='8px'>
              {item.name}
            </Typography>
          </Card>
          </Link>
        ))}

      </Box>

    </Box>

  )
}

export default CategoryList