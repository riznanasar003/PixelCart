"use client"
import { Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Confetti from 'react-confetti'

const SuccessPage = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const orderId = searchParams.get("orderId");

    useEffect(()=>{
       if(!orderId) return;

    const timer = setTimeout(()=>{
        router.push("/orders/" +orderId)
    },4000)


    return () =>{
        clearTimeout(timer)
    }
},[orderId, router])


  return (
   <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem",
      position: "relative"
    }}>
      <Confetti
        width={2000}
        height={1000}
      />
      <Typography variant='h1' gutterBottom>✅ Thank You!</Typography>
      <Typography variant='h6'>Your order has been placed successfully.</Typography>
    </div>
  )
}

export default SuccessPage