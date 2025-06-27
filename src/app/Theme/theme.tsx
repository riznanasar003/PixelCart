"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

interface Props{
  children : React.ReactNode
}

const theme  = createTheme({
  typography:{
    fontFamily : "serif"
  },

  palette:{
    mode  :"light",
    primary:{
      main:"#000000"
    },
    text:{
      primary:"#000000"
    }
  },
  components:{
    MuiInputBase :{
      styleOverrides:{
        input:{
          fontFamily:"serif"
        }
      }
      
    },
  },
})

function Theme ({children}: Props){
  return(
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Theme