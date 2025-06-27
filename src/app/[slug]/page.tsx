
import Add from '@/components/Add';
import CustomizedProducts from '@/components/CustomizedProducts';
import ProductImage from '@/components/ProductImage';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const SinglePage = () => {
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
        <ProductImage />
      </Box>

      <Box flex="1" minWidth={300}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Product Name
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ textAlign: 'justify', mb: 3 }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text
          ever since the 1500s.
        </Typography>


        <Divider sx={{ my: 2, borderBottomWidth: 1 }} />

        <Box display="flex" gap={6} alignItems="center">
          <Typography
            variant="h6"
            sx={{ textDecoration: 'line-through', color: 'gray' }}
          >
            $ 78
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            $ 58
          </Typography>
        </Box>


        <Divider sx={{ my: 2, borderBottomWidth: 1 }} />
        <Box>
          <CustomizedProducts />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Add />
        </Box>
        <Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>Title</Typography>
          <Typography variant='subtitle2' sx={{ textAlign: "justify" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant='h6' sx={{ fontWeight: "bold" }}>Title</Typography>
          <Typography variant='subtitle2' sx={{ textAlign: "justify" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SinglePage;
