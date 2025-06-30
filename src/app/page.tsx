"use client"

import CategoryList from "@/components/CategoryList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { Box, Typography } from "@mui/material"
import { Suspense } from "react"




const page = async ()  => {

  // const wixClient = useWixClient()

  // useEffect(()=>{
  // const getProducts = async () =>{
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res)
  // }
  // getProducts()
  // },[wixClient])

// const wixClient  = await wixClientServer();
// const res = await wixClient.products.queryProducts().find();
// console.log(res)

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
        <Suspense fallback={"loading"}>
        <ProductList categoryId ={process.env.FEATURED_PRODUCT_CATEGORY_ID!} limit={4}/>
        </Suspense>
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
        <Suspense fallback={"loading"}>
        <CategoryList />
        </Suspense>
      </Box>

    </Box>
  )
}

export default page