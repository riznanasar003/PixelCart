'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/Pagination';
import DOMPurify from 'isomorphic-dompurify';
import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';

type SearchParams = {
  name: string;
  type: string;
  min: string;
  max: string;
  sort: string;
  page: string;
  cat: string;
};

const allowedSortFields = [
  'name',
  'priceData.price',
  '_id',
  'slug',
  'productType',
  'numericId',
  'sku',
  'price',
  'lastUpdated',
] as const;

type SortField = (typeof allowedSortFields)[number];

const DEFAULT_PARAMS: SearchParams = {
  name: '',
  type: 'physical',
  min: '0',
  max: '999999',
  sort: '',
  page: '0',
  cat: '',
};

const ProductList = ({
  categoryId,
  limit,
}: {
  categoryId: string;
  limit?: number;
}) => {
  const searchParamsFromUrl = useSearchParams();
  // const router = useRouter();
  // const pathname = usePathname();
  const isFeatured = false;

  const [searchParams, setSearchParams] = useState<SearchParams>(DEFAULT_PARAMS);

  // const [res, setRes] = useState<{
  //   _items: products.Product[];
  //   currentPage: number;
  //   _fetchNextPage: () => boolean;
  //   _fetchPrevPage: () => boolean;
  // } | null>(null);

  const [res, setRes] = useState<products.ProductsQueryResult | null>(null);

  useEffect(() => {
    const getParamsFromUrl = (): SearchParams => {
      return {
        name: searchParamsFromUrl.get('name') || '',
        type: searchParamsFromUrl.get('type') || 'physical',
        min: searchParamsFromUrl.get('min') || '0',
        max: searchParamsFromUrl.get('max') || '999999',
        sort: searchParamsFromUrl.get('sort') || '',
        page: searchParamsFromUrl.get('page') || '0',
        cat: searchParamsFromUrl.get('cat') || '',
      };
    };

    const getProd = async (params: SearchParams) => {
      const wixClient = wixClientServer();
      let productQuery = wixClient.products
        .queryProducts()
        .eq('collectionIds', categoryId)
        .limit(limit || 8)
        .skip(Number(params.page) * (limit || 8));

      if (!isFeatured) {
        productQuery = productQuery
          .startsWith('name', params.name)
          .eq('productType', params.type)
          .gt('priceData.price', Number(params.min))
          .lt('priceData.price', Number(params.max));

        if (params.sort) {
          const [sortDir, rawField] = params.sort.split(' ');
          const sortField = rawField as SortField;

          if (allowedSortFields.includes(sortField)) {
            if (sortDir === 'asc') productQuery = productQuery.ascending(sortField);
            if (sortDir === 'desc') productQuery = productQuery.descending(sortField);
          }
        }
      }

      const result = await productQuery.find();
      console.log(result)
      setRes(result);
    };

    const parsedParams = getParamsFromUrl();
    setSearchParams(parsedParams);
    getProd(parsedParams);
    console.log(parsedParams.min)
  }, [searchParamsFromUrl?.toString(), categoryId, limit, isFeatured]);

  // const handlePageChange = (newPage: number) => {
  //   const params = new URLSearchParams(searchParamsFromUrl.toString());
  //   params.set('page', newPage.toString());
  //   router.replace(`${pathname}?${params.toString()}`);
  // };

  if (!res) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8, lg: 16 }, py: 4 }}>
      <Grid container spacing={4}>
        {res.items.map((product: products.Product) => (
          <Grid size={{xs: 12, sm: 6, md: 4, lg:3}} key={product._id}>
            <Link
              href={`/product?product=${product.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
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
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="h6" fontFamily="serif">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontFamily="serif"
                      color="red"
                    >
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
                        __html: DOMPurify.sanitize(
                          product.additionalInfoSections.find(
                            (s) => s.title === 'shortDesc'
                          )?.description || ''
                        ),
                      }}
                    />
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

      {(searchParams.cat || searchParams.name) && (
        <Pagination
          currentPage={res.currentPage ?? 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
          // onPageChange={handlePageChange}
        />
      )}
    </Box>
  );
};

export default ProductList;
