"use client";
import { Box } from '@mui/material'
import React, { useState } from 'react'
import Image from 'next/image'


const ProductImage = ({items}:{items:any}) => {


    const [pimage, setPimage] = useState(0)

    return (
        <Box>
            <Box sx={{
                height: "500px",
                position: "relative",

            }}>
                <Image src={items[pimage].image?.url}
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
                {items.map((item: any, i:number) => (
                    <Box
                        key={item._id}
                        sx={{ width: 150, height: 100, position: "relative", cursor: "pointer" }}
                        onClick={() => setPimage(i)}
                    >
                        <Image
                            src={item.image?.url}
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