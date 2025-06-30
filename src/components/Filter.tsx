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
            justifyContent: 'center',
            px: 6,
            
            
        }}>
            <Box sx={{
                display: 'flex',
                gap: 6,
                alignItems: "center",
                
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
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }}>Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Size"
                            name='size'
                            onChange={handleFilterChange}

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="XS">XS</MenuItem>
                            <MenuItem value="S">S</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="XL">XL</MenuItem>
                            <MenuItem value="XXL">XXL</MenuItem>
                            <MenuItem value="XXL">XXXL</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" >Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Color"
                            name='color'
                            onChange={handleFilterChange}

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="Black" >Black</MenuItem>
                            <MenuItem value="White">White</MenuItem>
                            <MenuItem value="White">White</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Green">Green</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }}>Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Category"
                            name='category'
                            onChange={handleFilterChange}

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="Men" >Men</MenuItem>
                            <MenuItem value="Women" >Women</MenuItem>
                            <MenuItem value="Kids" >Kids</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }}>All Filters</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="All Filters"
                            name='allfilter'
                            onChange={handleFilterChange

                            }

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="digital">Digital</MenuItem>
                        </Select>
                    </FormControl>
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