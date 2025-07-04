"use client"
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Confetti from 'react-confetti'

const SuccessPage = () => {

  const router = useRouter();



  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/orders');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  

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