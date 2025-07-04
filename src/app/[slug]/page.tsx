
import Add from '@/components/Add';
import CustomizedProducts from '@/components/CustomizedProducts';
import ProductImage from '@/components/ProductImage';
import { wixClientServer } from '@/lib/wixClientServer';
import { Box, Divider, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React from 'react';

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  console.log(params.slug)
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound()
  }

  const product = products.items[0]
  console.log(product.productOptions)

  



  type AdditionalInfoSection = {
    title?:string;
    description?:string
  };

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 4 },
        py: 3,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
      }}
    >

      <Box sx={{ width: '100%', maxWidth: 450, maxheight: 250 }}>
        <ProductImage
          items={
            (product.media?.items ?? [])
              .filter((item): item is { _id: string; image: { url: string } } =>
                !!item._id && !!item.image?.url
              )
              .map(item => ({
                _id: item._id!,
                image: { url: item.image!.url }
              }))
          }
        />
      </Box>

      <Box flex="1" minWidth={300}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {product.name}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ textAlign: 'justify', mb: 3 }}
        >
          {product.description}
        </Typography>


        <Divider sx={{ my: 2, borderBottomWidth: 1 }} />

        <Box display="flex" gap={2} alignItems="center">
          {product.price?.price === product.price?.discountedPrice ? (
            <Typography variant="h6" fontWeight="medium">
              $ {product.price?.price}
            </Typography>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{ textDecoration: 'line-through', color: 'gray' }}
              >
                $ {product.price?.price}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                $ {product.price?.discountedPrice}
              </Typography>
            </>
          )}
        </Box>



        <Divider sx={{ my: 2, borderBottomWidth: 1 }} />
        <Box>
          {product.variants && product.productOptions ? (
            <CustomizedProducts
              productId={product._id!}
              productTitle={product.name || ""}
              productImage={product.media?.items?.[0]?.image?.url || ""}
              productDescription={product.description || ""}
              productPrice={product.price?.discountedPrice || 0}
              variants={product.variants}
              productOptions={product.productOptions}
            />

          ) : (

            <Box sx={{ mt: 2 }}>
              <Add
                productId={product._id || ""}
                variantId="00000000-0000-0000-0000-000000000000"
                stockNumber={product.stock?.quantity || 0}
              />

            </Box>
          )}
        </Box>
        {product.additionalInfoSections?.map((section: AdditionalInfoSection) => (
          <Box key={section.title}>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' sx={{ fontWeight: "bold" }}>{section.title}</Typography>
            <Typography variant='subtitle2' sx={{ textAlign: "justify" }}>{section.description}</Typography>

          </Box>
        ))
        }
      </Box>
    </Box>
  );
};

export default SinglePage;
