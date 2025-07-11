// app/list/ProductListWrapper.tsx (or wherever your page is)
'use client';

import React from 'react';
import ProductList from '@/components/ProductList';

const ProductListWrapper = ({
    categoryId,
    limit,
}: {
    categoryId: string;
    limit?: number;
}) => {
    return <ProductList categoryId={categoryId} limit={limit} />;
};

export default ProductListWrapper;
