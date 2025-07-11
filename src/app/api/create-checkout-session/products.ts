// pages/api/products.ts

import { wixClientServer } from '@/lib/wixClientServer';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        name = '',
        type = 'physical',
        min = '0',
        max = '999999',
        sort,
        page = '0',
        categoryId,
        limit = '8',
    } = req.query;

    if (!categoryId || typeof categoryId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid categoryId' });
    }

    const wixClient = wixClientServer();
    let query = wixClient.products
        .queryProducts()
        .startsWith('name', String(name))
        .eq('collectionIds', categoryId)
        .hasSome('productType', [String(type), 'digital'])
        .gt('priceData.price', Number(min))
        .lt('priceData.price', Number(max))
        .limit(Number(limit))
        .skip(Number(page) * Number(limit));

    if (sort) {
        const [sortDir, rawField] = String(sort).split(' ');
        const sortField = rawField as SortField;

        if (allowedSortFields.includes(sortField)) {
            if (sortDir === 'asc') query = query.ascending(sortField);
            if (sortDir === 'desc') query = query.descending(sortField);
        } else {
            return res.status(400).json({ error: `Invalid sort field: ${rawField}` });
        }
    }

    const result = await query.find();

    res.status(200).json({
        items: result.items,
        currentPage: Number(page),
        hasPrev: result.hasPrev(),
        hasNext: result.hasNext(),
    });
}
