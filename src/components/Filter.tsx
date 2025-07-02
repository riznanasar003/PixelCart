"use client";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Filter = () => {

    const pathname = usePathname();
    const searchParams = useSearchParams()
    const {replace} = useRouter()

    const handleFilterChange = (e : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>{
        const {name, value} = e.target;
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        replace(`${pathname}?${params.toString()}`)

    }

    
    return (
        <Box sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'flex-end',
            px: 6,
            
            
        }}>
            <Box sx={{
                display: 'flex',
                gap: 6,
                alignItems: "flex-end",
                justifyContent:"flex-end"
                
            }}
                flexWrap={'wrap'}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }} >Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='type'
                            label='Type'
                            onChange={handleFilterChange}
                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="physical" sx={{ fontFamily: 'serif' }}>Physical</MenuItem>
                            <MenuItem value="digital" sx={{ fontFamily: 'serif' }}>Digital</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: 120,
                        borderRadius: "40px",
                    }}
                >
                    <TextField 
                    id="outlined-basic" 
                    label="min price" 
                    variant="outlined" 
                    name='min'
                    onChange={handleFilterChange}
                    fullWidth slotProps={{ input: { sx: { borderRadius: "40px" } } }} />
                </Box>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: 120,
                        borderRadius: "40px",
                    }}
                >
                    <TextField 
                    id="outlined-basic" 
                    label="max price" 
                    variant="outlined" 
                    name='max'
                    onChange={handleFilterChange}
                    fullWidth slotProps={{ input: { sx: { borderRadius: "40px", fontFamily: "serif" } } }} />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"  sx={{ fontFamily: 'serif' }}>Sort By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id=""
                            label="Sort By"
                            name='sort'
                            onChange={handleFilterChange}

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="asc">Price (low to high)</MenuItem>
                            <MenuItem value="desc price">Price (high to low)</MenuItem>
                            <MenuItem value="asc lastUpdated" >Newest</MenuItem>
                            <MenuItem value="desc lastUpdated" >Oldest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default Filter