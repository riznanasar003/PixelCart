"use client";
import { Box, Typography, Card, CardContent, CardMedia, Divider, Grid } from "@mui/material";

const dummyOrders = [
  {
    id: "ORD123456",
    date: "2025-07-01",
    total: 2999,
    products: [
      {
        name: "Dress",
        image: "https://static.wixstatic.com/media/nsplsh_3097e5ca237b473da62dfb16ff5413db~mv2.jpg/v1/fill/w_680,h_680,al_c,q_85,usm_0.66_1.00_0.01/nsplsh_3097e5ca237b473da62dfb16ff5413db~mv2.webp",
        price: 1499,
        quantity: 1,
      },
      {
        name: "Shoes",
        image: "https://static.wixstatic.com/media/nsplsh_915d736d5a4c43e9a76f69fc36e35d9f~mv2.jpg/v1/fill/w_680,h_680,al_c,q_85,usm_0.66_1.00_0.01/nsplsh_915d736d5a4c43e9a76f69fc36e35d9f~mv2.webp",
        price: 750,
        quantity: 2,
      },
    ],
  },
  {
    id: "ORD654321",
    date: "2025-06-28",
    total: 1249,
    products: [
      {
        name: "Chair",
        image: "https://static.wixstatic.com/media/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.jpg/v1/fill/w_680,h_680,al_c,q_85,usm_0.66_1.00_0.01/22e53e_b53f9a53db034e178a3f2d794ae70f1c~mv2.webp",
        price: 499,
        quantity: 1,
      },
      {
        name: "Cap",
        image: "https://static.wixstatic.com/media/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.jpg/v1/fill/w_680,h_680,al_c,q_85,usm_0.66_1.00_0.01/22e53e_7066c7318bb34be38d3a4f2e3a256021~mv2.webp",
        price: 750,
        quantity: 1,
      },
    ],
  },
];

const OrderPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" textAlign='center' fontWeight='bolder' gutterBottom>
        ORDER HISTORY
      </Typography>

      {dummyOrders.map((order) => (
        <Card key={order.id} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order ID: {order.id}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Order Date: {order.date}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {order.products.map((product, index) => (
                <Grid size={{xs :12, md:6, }} key={index}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ width: 80, height: 80, borderRadius: 2, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">{product.name}</Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ₹{product.price}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">
              Total: ₹{order.total}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default OrderPage;
