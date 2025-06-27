"use client";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'

const Filter = () => {

    const [type, setType] = React.useState('');

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };


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
                            value={type}
                            label="Type"
                            onChange={handleTypeChange}
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
                    <TextField id="outlined-basic" label="min price" variant="outlined" fullWidth slotProps={{ input: { sx: { borderRadius: "40px" } } }} />
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
                    <TextField id="outlined-basic" label="max price" variant="outlined" fullWidth slotProps={{ input: { sx: { borderRadius: "40px", fontFamily: "serif" } } }} />
                </Box>


                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }}>Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Size"

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

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="physical">Physical</MenuItem>
                            <MenuItem value="digital">Digital</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontFamily: 'serif' }}>Sort By</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Sort By"

                            sx={{ fontFamily: "serif", borderRadius: "40px" }}
                        >
                            <MenuItem value="Price (low to high)" >Price (low to high)</MenuItem>
                            <MenuItem value=">Price (high to low)" >Price (high to low)</MenuItem>
                            <MenuItem value="Newest" >Newest</MenuItem>
                            <MenuItem value="Oldest" >Oldest</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default Filter