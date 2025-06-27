"use client";
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'

const CustomizedProducts = () => {

    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')

     const colors = [
    { name: 'Navy Blue', value: '#130f6c', disabled: false },
    { name: 'Purple', value: '#841d7f', disabled: false },
    { name: 'Yellow', value: '#eade20', disabled: true },
  ];

  const sizes = [
    { label: 'Small', disabled: false },
    { label: 'Medium', disabled: false },
    { label: 'Large', disabled: true },
  ];


  return (
    <>
    <Box mt={3}>
     
      <Typography fontWeight="bold" gutterBottom>
        Choose a color
      </Typography>
      <Box display="flex" gap={2}>
        {colors.map((color) => (
          <Box
            key={color.name}
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: color.value,
              border: '1px solid #ccc',
              cursor: color.disabled ? 'not-allowed' : 'pointer',
              position: 'relative',
              opacity: color.disabled ? 0.4 : 1,
            }}
            onClick={() => !color.disabled && setSelectedColor(color.name)}
          >
            {selectedColor === color.name && !color.disabled && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '2px solid black',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
            {color.disabled && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 43,
                  height: '2px',
                  backgroundColor: 'red',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Typography fontWeight=" bold" gutterBottom mt={3}>
        Choose a size
      </Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
        {sizes.map((size) => (
          <Button
            key={size.label}
            variant={
              selectedSize === size.label && !size.disabled ? 'contained' : 'outlined'
            }
            disabled={size.disabled}
            onClick={() => !size.disabled && setSelectedSize(size.label)}
            sx={{
              textTransform: 'none',
              py: 0.5,
              px: 2,
              borderRadius: "240px",
              fontSize: '0.875rem',
              ...(size.disabled && {
                backgroundColor: '',
                color: '#fff',

              }),
            }}
          >
            {size.label}
          </Button>
        ))}
      </Box>
    </Box>
    </>
  )
}

export default CustomizedProducts