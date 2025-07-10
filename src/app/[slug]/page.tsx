
// import Add from '@/components/Add/Add';
// import CustomizedProducts from '@/components/CustomizedProducts';
// import ProductImage from '@/components/ProductImage';
// import { wixClientServer } from '@/lib/wixClientServer';
// import { Box, Divider, Typography } from '@mui/material';
// import { notFound } from 'next/navigation';
import SlugComponent from '@/components/SlugComponent/SlugComponent';
import React from 'react';


const SinglePage = async ({ params }: { params: { slug: string } }) => {
  return <SlugComponent slug={params.slug} />;
};

export default SinglePage;