
// import Add from '@/components/Add/Add';
// import CustomizedProducts from '@/components/CustomizedProducts';
// import ProductImage from '@/components/ProductImage';
// import { wixClientServer } from '@/lib/wixClientServer';
// import { Box, Divider, Typography } from '@mui/material';
// import { notFound } from 'next/navigation';
import SlugComponent from '@/components/SlugComponent/SlugComponent';
import React, { Suspense } from 'react';


const SinglePage = async () => {
  return <Suspense>
    <SlugComponent />;
  </Suspense>
};

export default SinglePage;