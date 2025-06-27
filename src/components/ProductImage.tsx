"use client";
import { Box } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'

const images = [
    {
        id: "1",
        url: "https://i.pinimg.com/736x/b5/f2/1f/b5f21f680b5ee45601742608d9a89f4c.jpg",

    },
    {
        id: "2",
        url: "https://i.pinimg.com/736x/82/72/cc/8272cc7b6eefa3c40eb937fe8c23f927.jpg",

    },
    {
        id: "3",
        url: "https://i.pinimg.com/736x/f7/3f/c1/f73fc1bd4a2dd694b733bda28fd48052.jpg",

    },
    {
        id :"4",
        url : "https://i.pinimg.com/736x/ff/8d/46/ff8d46ef7c56b5abd6f7231f045e45ec.jpg",

    },

]

const ProductImage = () => {


    const [pimage, setPimage] = useState(0)

    return (
        <Box>
            <Box sx={{
                height: "500px",
                position: "relative",

            }}>
                <Image src={images[pimage].url}
                    alt='product'
                    fill
                    sizes='50vw'
                    style={{ objectFit: 'cover' }} />
            </Box>
            <Box sx={{
                display: "flex",
                gap: 2,
                mt: 2
            }}>
                {images.map((img, index) => (
                    <Box
                        key={img.id}
                        sx={{ width: 150, height: 100, position: "relative", cursor: "pointer" }}
                        onClick={() => setPimage(index)}
                    >
                        <Image
                            src={img.url}
                            alt=''
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Box>
                ))}

            </Box>
           
        </Box>
    )
}

export default ProductImage