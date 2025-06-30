"use client";
import { Box, Button, Typography } from '@mui/material'
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react'
import Add from '@/components/Add';

const CustomizedProducts = ({
  productId,
  variants,
  productOptions
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v => {
      const variantChoices = v.choices
      if (!variantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      )
    }))
    setSelectedVariant(variant)

  }, [selectedOptions, variants])


  const handleOptionSelected = (optionType: string, choice: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionType]: choice }))
  }

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices

      if (!variantChoices) return false

      return Object.entries(choices).every(
        ([key, value]) => variantChoices[key] === value
      ) && variant.stock?.inStock
    })

  }



  return (
    <>
      <Box mt={3} display="flex" flexDirection="column" gap={4}>
        {productOptions.map((option) => (
          <Box key={option.name}>
            <Typography fontWeight="bold" gutterBottom>
              Choose a {option.name}
            </Typography>

            <Box component="ul" display="flex" gap={2} p={0} m={0} sx={{ listStyle: "none" }}>
              {option.choices?.map((choice) => {
                const disabled = !isVariantInStock({
                  ...selectedOptions,
                  [option.name!]: choice.description!,
                });

                const selected = selectedOptions[option.name!] === choice.description;

                const clickHandler = disabled
                  ? undefined
                  : () => handleOptionSelected(option.name!, choice.description!);

                return option.name === "Color" ? (
                  <Box
                    component="li"
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1px solid #d1d5db",
                      position: "relative",

                    }}
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      backgroundColor: choice.value,
                    }}
                    onClick={clickHandler}
                    key={choice.description}
                  >
                    {selected && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "2px solid black",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                    {disabled && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: 40,
                          height: "2px",
                          backgroundColor: "#f87171",
                          transform: "translate(-50%, -50%) rotate(45deg)",
                        }}

                      />
                    )}
                  </Box>
                ) : (
                  <Box component="li">
                    <Button
                      sx={{
                        textTransform: "none",
                        py: 0.5,
                        px: 2,
                        fontSize: "0.875rem",
                        borderRadius: "999px",
                        
                      }}
                      style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? "#000000"
                      : disabled
                      ? "#d1d5db"
                      : "white",
                    color: selected || disabled ? "white" : "#000000",
                    boxShadow: disabled ? "none" : "",
                   
                    
                  }}
                      key={choice.description}
                      onClick={clickHandler}
                    >
                      {choice.description}
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
         <Add productId={productId} variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"} stockNumber={selectedVariant?.stock?.quantity || 0} />
      </Box>
    </>
  );

}

export default CustomizedProducts