/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Add from '../Add/Add';
import CustomizedProducts from '../CustomizedProducts';
import ProductImage from '../ProductImage';
import { useSearchParams } from 'next/navigation';
import { wixClientServer } from '@/lib/wixClientServer';

// export type Product = {
//     _id: string;
//     name: string;
//     slug: string;
//     description: string;
//     visible: boolean;
//     productType: 'physical' | 'digital' | string;
//     collectionIds: string[];
//     convertedPriceData: {
//         currency: string;
//         price: number;
//         discountedPrice: number;
//         formatted: Record<string, any>;
//     };
//     costRange: {
//         minValue: number;
//         maxValue: number;
//     };
//     price: {
//         currency: string;
//         price: number;
//         discountedPrice: number;
//         formatted: Record<string, any>;
//     };
//     priceData: {
//         currency: string;
//         price: number;
//         discountedPrice: number;
//         formatted: Record<string, any>;
//     };
//     priceRange: {
//         minValue: number;
//         maxValue: number;
//     };
//     weightRange: {
//         minValue: number;
//         maxValue: number;
//     };
//     discount: {
//         type: string;
//         value: number;
//     };
//     inventoryItemId: string;
//     exportProductId: string;
//     numericId: string;
//     ribbon: string;
//     ribbons: string[];
//     productPageUrl: {
//         base: string;
//         path: string;
//     };
//     stock: {
//         trackInventory: boolean;
//         quantity: number;
//         inStock: boolean;
//         inventoryStatus: string;
//     };
//     productOptions?: Array<{
//         name: string;
//         optionType: string;
//         choices: Array<{
//             description?: string;
//             value: string;
//             inStock: boolean;
//         }>;
//     }>;
//     variants?: Array<{
//         _id: string;
//         choices: Record<string, string>;
//         price: {
//             currency: string;
//             price: number;
//             discountedPrice: number;
//             formatted: Record<string, any>;
//         };
//         stock: {
//             quantity: number;
//             inStock: boolean;
//         };
//     }>;
//     customTextFields: any[];
//     additionalInfoSections?: Array<{
//         title?: string;
//         description?: string;
//     }>;
//     media?: {
//         mainMedia?: {
//             image?: {
//                 url: string;
//             };
//         };
//         items?: Array<{
//             _id?: string;
//             image?: {
//                 url: string;
//             };
//         }>;
//     };
//     manageVariants: boolean;
//     lastUpdated: string;
//     _createdDate: string;
// };
  

const SlugComponent = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get('product');
    const [product, setProduct] = useState<any | null>(null);
    console.log(slug)
    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            const wixClient =  wixClientServer(); 
            const products = await wixClient.products.queryProducts().eq('slug', slug).find();
            if (products.items.length > 0) {
                console.log(products.items);
                setProduct(products.items[0]);
            }
        };

        fetchProduct();
    }, [slug]);

    if (!product) return <div>Loading...</div>;

    type AdditionalInfoSection = {
        title?: string;
        description?: string;
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
            <Box sx={{ width: '100%', maxWidth: 450 }}>
                <ProductImage
                    items={
                        (product.media?.items ?? [])
                            .filter(
                                (item: { _id: any; image: { url: any; }; }): item is { _id: string; image: { url: string } } =>
                                    !!item._id && !!item.image?.url
                            )
                            .map((item: { _id: any; image: any; }) => ({
                                _id: item._id!,
                                image: { url: item.image!.url },
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
                            ${product.price?.price}
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                sx={{ textDecoration: 'line-through', color: 'gray' }}
                            >
                                ${product.price?.price}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                ${product.price?.discountedPrice}
                            </Typography>
                        </>
                    )}
                </Box>

                <Divider sx={{ my: 2, borderBottomWidth: 1 }} />

                <Box>
                    {product.variants && product.productOptions ? (
                        <CustomizedProducts
                            productId={product._id!}
                            productTitle={product.name || ''}
                            productImage={product.media?.items?.[0]?.image?.url || ''}
                            productDescription={product.description || ''}
                            productPrice={product.price?.discountedPrice || 0}
                            variants={product.variants}
                            productOptions={product.productOptions}
                        />
                    ) : (
                        <Box sx={{ mt: 2 }}>
                            <Add
                                productId={product._id || ''}
                                variantId="00000000-0000-0000-0000-000000000000"
                                stockNumber={product.stock?.quantity || 0}
                            />
                        </Box>
                    )}
                </Box>

                {product.additionalInfoSections?.map((section: AdditionalInfoSection) => (
                    <Box key={section.title}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {section.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ textAlign: 'justify' }}>
                            {section.description}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SlugComponent;
