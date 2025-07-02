"use client";
import { Box, Button, Stepper, Step, StepLabel, Typography, TextField, Divider } from "@mui/material";
import { useCartStore } from "@/hooks/useCartStore";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const steps = ["Shipping Info", "Review Cart", "Place Order"];

const validationSchema = Yup.object({
  name: Yup.string().min(3).required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  address: Yup.string().required("Address is required"),
});

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = useCartStore();

  const generateOrderId = () => {
    return "order_" + Math.random().toString(36).substring(2, 10);
  };

  const handleFinish = () => {
    const fakeOrderId = generateOrderId();
    window.location.href = `/success?orderId=${fakeOrderId}`;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: () => {
      setActiveStep((prev) => prev + 1);
    },
  });

  return (
    <Box maxWidth="700px" mx="auto" p={4}>
      <Typography variant="h4" mb={3}>Checkout</Typography>

      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="name"
                label="Full Name"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="address"
                label="Address"
                fullWidth
                multiline
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" type="submit">
                  Next
                </Button>
              </Box>
            </Box>
          </form>
        )}

        {activeStep === 1 && (
          <>
            <Box>
              {cart.lineItems?.map((item) => (
                <Box key={item._id} display="flex" justifyContent="space-between" py={1}>
                  <Typography>{item.productName?.original} x{item.quantity}</Typography>
                  <Typography>₹ {item.price?.amount * item.quantity}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="h4" color="success">Subtotal: ₹ {cart.subtotal?.amount || 0}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={() => setActiveStep((prev) => prev - 1)}>Back</Button>
              <Button variant="contained" onClick={() => setActiveStep((prev) => prev + 1)}>Next</Button>
            </Box>
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography variant="h5" mb={2}>Confirm Your Order</Typography>
            <Typography variant="body1">Name: {formik.values.name}</Typography>
            <Typography variant="body1">Email: {formik.values.email}</Typography>
            <Typography variant="body1">Address: {formik.values.address}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" color="darkgreen">Total: ₹{cart.subtotal?.amount || 0}</Typography>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={() => setActiveStep((prev) => prev - 1)}>Back</Button>
              <Button variant="contained" onClick={handleFinish}>Place Order</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
