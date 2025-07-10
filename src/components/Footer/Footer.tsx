
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


const Footer = () => {
  return (

    <Box sx={{
      backgroundColor:"#eff1f1",
      px : {xs:2, md : 8, lg : 16, xl:32},
      py : 6,
      mt : 12,
      fontSize : '0.875rem',
      fontFamily : 'serif'
      }}>
        <Grid container spacing={6} fontFamily='serif'>
          <Grid size={{xs : 12, md : 6, lg : 3}} >
              <Box display='flex' flexDirection='column' gap={2}>
                <Link href='/' style={{fontSize:32, letterSpacing:'1px', fontWeight:'bolder'}}>PIXELCART</Link>
                <Typography variant='subtitle1' fontFamily='serif'> 3252 Winding Way, Central Plaza, Willobrook, CA 90210, United States</Typography>
                <Typography fontWeight={600} fontFamily='serif'>hello@pixelcart.dev</Typography>
                <Typography fontWeight={600} fontFamily='serif'>+1 234 567 890</Typography>

                <Box display='flex' gap={2}>
                  <Image src="/facebook.png" alt="fb" width={16} height={16} />
                  <Image src="/instagram.png" alt="insta" width={16} height={16} />
                  <Image src="/youtube.png" alt="yt" width={16} height={16} />
                  <Image src="/pinterest.png" alt="pin" width={16} height={16} />
                  <Image src="/x.png" alt="x" width={16} height={16} />
                  
                </Box>
              </Box>
          </Grid>

            <Grid size={{lg : 6}} sx={{display:{xs:'none', lg : 'flex'}, justifyContent:'space-between'}}>
              {['COMPANY', 'SHOP', 'HELP'].map((section, i)=>(
                <Box key={section} display='flex' flexDirection='column' gap={2}>
                  <Typography fontWeight={600} fontSize={20} fontFamily='serif'>{section}</Typography>
                  {[
                    ["About Us", "Careers","Affiliates", "Blog", "Contact Us"],
                    ["New Arrivals", "Accessories", "Men", "Women", "All Products"],
                    ["Customer Service", "My Account","Find a Store", "Legal and Privacy","Gift Card"]
                  ][i].map((text)=>(
                    <Link key={text} href='#' style={{fontSize:16}}>{text}</Link>
                  ))}
                </Box>
              ))}
            </Grid>  

                <Grid size={{xs :12, md : 6, lg:3}}>
                  <Box display='flex' flexDirection="column" gap={2}>
                    <Typography fontWeight={600} fontFamily='serif' fontSize={20}>SUBSCRIBE</Typography>
                    <Typography fontFamily='serif'>Be the first to get the latest news about trends, promotions, and much more!</Typography>

                    <Box display='flex' gap={1}>

                      <TextField placeholder='Email address' variant='outlined' size='small' fullWidth sx={{ flex:3}}/>
                      <Button variant='contained' sx={{flex:1, backgroundColor:'black', fontFamily:'serif'}}>JOIN</Button>

                    </Box>
                    <Typography fontWeight={600} fontFamily='serif'>Secure Payments</Typography>

                    <Box display='flex' gap={2}>
                      {['/discover.png', '/skrill.png','/paypal.png','/visa.png','/mastercard.png'].map((img, index)=>(
                        <Image key={index} src={img} alt={'pay'} width={40} height={20}/>
                      ))}
                    </Box>
                  </Box>
                </Grid>
        </Grid>

    </Box>
  )
}

export default Footer