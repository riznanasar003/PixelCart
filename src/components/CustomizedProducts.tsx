"use client";
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react'
import Add from '@/components/Add/Add';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { addToWishlist, removeFromWishlist } from '@/app/redux/slices/wishlistSlice';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWixClient } from '@/hooks/useWixClient';
import { usePathname, useRouter } from 'next/navigation';

const CustomizedProducts = ({
  productId,
  productTitle,
  productImage,
  productDescription,
  productPrice,
  variants,
  productOptions
}: {
  productId: string;
  productTitle: string;
  productImage: string;
  productDescription: string;
  productPrice: number;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({})
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  const wixClient = useWixClient();
  const router = useRouter();
  const pathname = usePathname();

  const toggleWishlist = async () => {
    const loggedIn = await wixClient.auth.loggedIn();

    if (!loggedIn) {
      router.push(`/login?returnTo=${pathname}`);
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist({
        id: productId,
        title: productTitle,
        image: productImage,
        description: productDescription,
        price: productPrice,
      }));
    }
  };


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

  const dispatch = useDispatch()

  const wishlist = useSelector((state: RootState) => state.wishlist.items)
  const isWishlisted = wishlist.some((item) => item.id === productId)




  return (
    <>
      <Box mt={3} display="flex" flexDirection="column" gap={4}>
        <Box display="flex" justifyContent="flex-end" mb={-2}>
          <Tooltip title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}>
            <IconButton onClick={toggleWishlist} sx={{ color: isWishlisted ? 'red' : 'gray' }}>
              {isWishlisted ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        </Box>
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
        <Add productId={productId} variantId={selectedVariant?._id || "00000000-0000-0000-0000-000000000000"}
          stockNumber={selectedVariant?.stock?.quantity || 0} />
      </Box>
    </>
  );

}

export default CustomizedProducts