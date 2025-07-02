"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
    {
        id: 1,
        title: "Summer Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "linear-gradient(to right, #FFFBEB, #FFE4E6)", 
    },
    {
        id: 2,
        title: "Winter Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "linear-gradient(to right, #FFE4E6, #EFF6FF)", 
    },
    {
        id: 3,
        title: "Spring Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "linear-gradient(to right, #EFF6FF, #FFFBEB)", 
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 3000);
        return () => clearInterval(interval)
    }, [])

    const router = useRouter()
    const handleBuyNow = () =>{
        router.push("/list")
    }

    return (
        <Box sx={{ height: "calc(92vh - 80px)", overflow: "hidden", position: "relative" }}>
            <Box
                sx={{
                    display: "flex",
                    width: `${slides.length * 100}vw`,
                    height: "100%",
                    transform: `translateX(-${current * 100}vw)`,
                    transition: "transform 1s ease-in-out",
                }}
            >
                {slides.map((slide) => (
                    <Box
                        key={slide.id}
                        sx={{
                            width: "100vw",
                            height: "100%",
                            display: "flex",
                            flexDirection: { xs: "column", xl: "row" },
                            background: slide.bg,
                            gap: 4,
                        }}
                    >
                        {/* TEXT CONTAINER */}
                        <Box
                            sx={{
                                width: { xs: "100%", xl: "50%" },
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                gap: { xs: 4, xl: 6 },
                                px: 2,

                            }}
                        >
                            <Typography variant="h5" fontFamily="serif">{slide.description}</Typography>
                            <Typography variant="h2" fontFamily="serif" fontWeight={800}>
                                {slide.title}
                            </Typography>
                            
                                <Button variant="contained"
                                onClick={handleBuyNow}
                                sx={{ backgroundColor: "black", color: "white", fontFamily:"serif", borderRadius:"24px", padding:"10px 30px" }}>
                                    SHOP NOW
                                </Button>
                          
                        </Box>
                        <Box
                            sx={{
                                width: { xs: "100%", xl: "50%" },
                                height: "1050px",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                sizes="100%"
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>

         
            <Box
                sx={{
                    position: "absolute",
                    bottom: 32,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 2,
                }}
            >
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrent(index)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            border: "1px solid gray",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transform: current === index ? "scale(1.5)" : "scale(1)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        {current === index && (
                            <Box sx={{ width: 6, height: 6, backgroundColor: "gray", borderRadius: "50%" }} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Slider;
