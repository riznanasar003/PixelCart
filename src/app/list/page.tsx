import Filter from '@/components/Filter/Filter'
import ProductList from '@/components/ProductList'
import { wixClientServer } from '@/lib/wixClientServer'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React, { Suspense } from 'react'

interface ListPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ListPage = async ({ searchParams }: ListPageProps) => {
  const catSlug = typeof searchParams?.cat === 'string' ? searchParams.cat : 'all-products';

  const wixClient = await wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(catSlug);

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'space-between',
          backgroundColor: "#ffe4e6",
          px: 4,
          height: 300,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: "66.666%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography variant='h4' fontFamily='serif' fontWeight={600} textAlign='center'>
            Grab Upto 50% off on <br />Selected Products
          </Typography>
          <Button
            variant='contained'
            sx={{
              borderRadius: '24px',
              px: 3,
              py: 1.5,
              backgroundColor: 'black',
              fontFamily: 'serif',
            }}
          >
            Buy Now
          </Button>
        </Box>
        <Image src='/woman.png' alt='woman' width={300} height={300} style={{ objectFit: 'contain' }} />
      </Box>

      {/* Filter and Product List */}
      <Filter />
      <Typography variant='h4' fontFamily='serif' sx={{ px: '20px', py: '20px' }}>
        {cat?.collection?.name} For You!
      </Typography>
      <Suspense fallback={"loading..."}>
        <ProductList
          categoryId={cat.collection?._id || "00000000-000000-000000-000000000001"}
          searchParams={searchParams}
        />
      </Suspense>
    </Box>
  );
};

export default ListPage;
