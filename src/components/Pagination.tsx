"use client";
import { Box, Button } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Pagination = ({
    currentPage,
    hasPrev,
    hasNext,
}:{
    currentPage: number;
    hasPrev: boolean;
    hasNext: boolean
}) => {

 const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <Box mt={12} display="flex" justifyContent="space-between" width="100%">
      <Button
        variant="contained"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
        sx={{
          borderRadius: "6px", 
          backgroundColor: "#000000", 
          color: "white", 
          padding: "8px",
          fontSize: "0.875rem", 
          width: "96px", 
          textTransform: "none",
          "&:disabled": {
            backgroundColor: "#d1d1d0 ", 
            cursor: "not-allowed", 
          },
        }}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
        sx={{
          borderRadius: "6px",
          backgroundColor: "#000000",
          color: "white",
          padding: "8px",
          fontSize: "0.875rem",
          width: "96px",
          textTransform: "none",
          "&:disabled": {
            backgroundColor: "#d1d1d0",
            cursor: "not-allowed",
          },
        }}
      >
        Next
      </Button>
    </Box>
  )
}

export default Pagination