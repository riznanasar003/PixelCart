"use client"
import { useWixClient } from '@/hooks/useWixClient'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { LoginState } from '@wix/sdk'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION'
}

const LoginPage = () => {

  const [mode, setMode] = useState(MODE.LOGIN)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const pathName = usePathname()
  const router = useRouter()

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify";

  const wixClient = useWixClient()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setError(" ")

    try {

      let response

      switch (mode) {
        case MODE.LOGIN:
          response  = await wixClient.auth.login({
            email,
            password,
          });
          console.log(response)
          break;

          case MODE.REGISTER:
          response  = await wixClient.auth.register({
            email,
            password,
            profile:{nickname: username}
          });
          break;

          case MODE.RESET_PASSWORD:
          response  = await wixClient.auth.sendPasswordResetEmail(
            email,
            pathName
          );
          break;

          case MODE.EMAIL_VERIFICATION:
          response  = await wixClient.auth.processVerification({
            verificationCode : emailCode,
          });
          break;

          default:
            break;

      }

      console.log(response)

      switch(response?.loginState){
        case  LoginState.SUCCESS:
          setMessage("Successful! You're being redirected")
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          )

          console.log(tokens)

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken),{
            expires: 2
          })

          wixClient.auth.setTokens(tokens)
          router.push("/")
          break;

          default:
            break;
      }

      } catch (err) {
      console.log(err)
      setError("something went wrong")

    } finally {
      setIsLoading(false)
    }

  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 80px)",
        px: { xs: 2, md: 8, lg: 16, xl: 32, "2xl": 64 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3, width: 300 }}>
        <Typography variant="h5" fontWeight={600}>
          {formTitle}
        </Typography>

        {mode === MODE.REGISTER && (
          <TextField
            label="Username"
            name="username"
            placeholder="john"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        )}

        {mode !== MODE.EMAIL_VERIFICATION ? (
          <TextField
            label="E-mail"
            type="email"
            name="email"
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        ) : (
          <TextField
            label="Verification Code"
            name="emailCode"
            placeholder="Code"
            onChange={(e) => setEmailCode(e.target.value)}
            fullWidth
          />
        )}

        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <TextField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        )}

        {mode === MODE.LOGIN && (
          <Typography
            sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot Password?
          </Typography>
        )}

        <Button
          variant="contained"
          disabled={isLoading}
          type="submit"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&.Mui-disabled": {
              backgroundColor: "#fbcfe8",
              color: "#fff",
              cursor: "not-allowed",
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : buttonTitle}
        </Button>

        {error && (
          <Typography color="error" fontSize="0.875rem">
            {error}
          </Typography>
        )}

        {mode === MODE.LOGIN && (
          <Typography
            sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don't have an account?
          </Typography>
        )}

        {mode === MODE.REGISTER && (
          <Typography
            sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setMode(MODE.LOGIN)}
          >
            Have an account?
          </Typography>
        )}

        {mode === MODE.RESET_PASSWORD && (
          <Typography
            sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setMode(MODE.LOGIN)}
          >
            Go back to Login
          </Typography>
        )}

        {message && (
          <Typography color="success.main" fontSize="0.875rem">
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default LoginPage