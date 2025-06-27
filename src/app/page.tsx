"use client"

import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { WixClientContext } from "@/context/wixContext"
import { Box, Typography } from "@mui/material"
import { useContext, useEffect } from "react"


const page = () => {

  const wixClient = useContext(WixClientContext)

  useEffect(()=>{
  const getProducts = async () =>{
  const res = await wixClient.products.queryProducts().find();
  console.log(res)
  }
  getProducts()
  },[wixClient])

  return (
    <Box>
      <Box>
        <Slider />
      </Box>
      <Box>
        <Box sx={{
          paddingTop: 2,
          paddingLeft: 4,
          marginBottom: 4,
        }}
        >
          <Typography variant="h4" fontFamily="serif">
            Featured Products
          </Typography>
        </Box>
        <ProductList />
      </Box>
      <Box>
        <Box sx={{
          paddingTop: 2,
          paddingLeft: 4,
          marginBottom: 4,
        }}
        >
          <Typography variant="h4" fontFamily="serif">
            Categories
          </Typography>
        </Box>
        <CategoryList />
      </Box>

    </Box>
  )
}

export default page