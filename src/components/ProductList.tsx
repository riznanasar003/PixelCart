
import { wixClientServer } from '@/lib/wixClientServer';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Pagination from '@/components/Pagination';
import DOMPurify from 'isomorphic-dompurify';


const PRODUCT_PER_PAGE = 8

type SearchParams = {
  name?: string;
  type?: string;
  min?: string;
  max?: string;
  sort?: string;
  page?: string;
  cat?: string;
};


const ProductList = async ({

  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: SearchParams;
}) => {

  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0)

  if (searchParams?.sort) {
    const [sortType, sortByRaw] = searchParams.sort.split(" ");

    const allowedSortFields = [
      "name",
      "price",
      "_id",
      "slug",
      "productType",
      "numericId",
      "sku",
      "price",
      "lastUpdated",
    ] as const;

    type SortField = (typeof allowedSortFields)[number];

    if (sortType && sortByRaw && allowedSortFields.includes(sortByRaw as SortField)) {
      const sortBy = sortByRaw as SortField;

      if (sortType === "asc") {
        productQuery.ascending(sortBy);
      } else if (sortType === "desc") {
        productQuery.descending(sortBy);
      }
    }
  }

  const res = await productQuery.find();


  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8, lg: 16 }, py: 4 }}>
      <Grid container spacing={4}>
        {res.items.map((product: products.Product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product._id} >
            <Link href={`/product?product=${product.slug}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 250,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={product.media?.mainMedia?.image?.url || '/product.png'}
                    alt=""
                    fill
                    sizes="100%"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontFamily="serif">
                      {product.name}
                    </Typography>
                    <Typography variant="h6" fontFamily="serif" color="red">
                      $ {product.price?.price}
                    </Typography>
                  </Box>
                  {product.additionalInfoSections && (
                    <Typography
                      variant="body2"
                      fontFamily="serif"
                      color="text.secondary"
                      lineHeight={1.5}
                      textAlign="justify"
                      mb={2}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.additionalInfoSections?.find(
                          (section) => section.title === 'shortDesc')?.description || "")
                      }}
                    >
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      fontFamily: 'serif',
                      borderColor: 'black',
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      color: 'black',
                      padding: '8px 20px',
                      '&:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        borderColor: 'black',
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Link>

          </Grid>
        ))}

      </Grid>
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />) : null}
    </Box>
  );
};


export default ProductList;