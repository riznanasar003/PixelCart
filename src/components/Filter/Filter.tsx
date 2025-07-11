'use client';

import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const Filter = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQueryParam(e.target.name, e.target.value);
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        updateQueryParam(e.target.name, e.target.value);
    };

    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', px: 6 }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap'
                }}
            >
                {/* Type Filter */}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="type-label" sx={{ fontFamily: 'serif' }}>Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            name="type"
                            label="Type"
                            value={searchParams.get('type') || ''}
                            onChange={handleSelectChange}
                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="physical" sx={{ fontFamily: 'serif' }}>Physical</MenuItem>
                            <MenuItem value="digital" sx={{ fontFamily: 'serif' }}>Digital</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Min Price */}
                <Box sx={{ width: 120 }}>
                    <TextField
                        label="Min Price"
                        name="min"
                        value={searchParams.get("min") || ''}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        sx={{ borderRadius: "40px" }}
                    />
                </Box>

                {/* Max Price */}
                <Box sx={{ width: 120 }}>
                    <TextField
                        label="Max Price"
                        name="max"
                        value={searchParams.get("max") || ''}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        sx={{ borderRadius: "40px" }}
                    />
                </Box>

                {/* Sort Filter */}
                <Box sx={{ minWidth: 160 }}>
                    <FormControl fullWidth>
                        <InputLabel id="sort-label" sx={{ fontFamily: 'serif' }}>Sort By</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort"
                            name="sort"
                            label="Sort By"
                            value={searchParams.get('sort') || ''}
                            onChange={handleSelectChange}
                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="asc price">Price (low to high)</MenuItem>
                            <MenuItem value="desc price">Price (high to low)</MenuItem>
                            <MenuItem value="asc lastUpdated">Newest</MenuItem>
                            <MenuItem value="desc lastUpdated">Oldest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default Filter;
