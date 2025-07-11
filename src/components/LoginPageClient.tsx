"use client";

import { useWixClient } from '@/hooks/useWixClient'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { LoginState } from '@wix/sdk'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

enum MODE {
    LOGIN = "LOGIN",
    REGISTER = 'REGISTER',
    RESET_PASSWORD = 'RESET_PASSWORD',
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION'
}

const LoginPageClient = () => {
    const wixClient = useWixClient()
    const router = useRouter()
    const pathName = usePathname()

    const [redirecting, setRedirecting] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const isLoggedIn = wixClient.auth.loggedIn();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get("returnTo") || "/";

    useEffect(() => {
        if (isLoggedIn && !redirecting) {
            setRedirecting(true);
            router.push(returnTo);
        }
    }, [isLoggedIn, redirecting]);

    if (redirecting) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            let response;

            switch (mode) {
                case MODE.LOGIN:
                    response = await wixClient.auth.login({ email, password });
                    break;
                case MODE.REGISTER:
                    response = await wixClient.auth.register({
                        email,
                        password,
                        profile: { nickname: username },
                    });
                    break;
                case MODE.RESET_PASSWORD:
                    response = await wixClient.auth.sendPasswordResetEmail(email, pathName);
                    setMessage("Password reset email sent. Please check your email.");
                    break;
                case MODE.EMAIL_VERIFICATION:
                    response = await wixClient.auth.processVerification({
                        verificationCode: emailCode,
                    });
                    break;
            }

            switch (response?.loginState) {
                case LoginState.SUCCESS:
                    setMessage("Success! Redirecting...");
                    const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
                        response.data.sessionToken!
                    );
                    Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                        expires: 2,
                    });
                    wixClient.auth.setTokens(tokens);
                    router.push(returnTo);
                    break;
                case LoginState.FAILURE:
                    setError("Login failed. Please try again.");
                    break;
                case LoginState.EMAIL_VERIFICATION_REQUIRED:
                    setMode(MODE.EMAIL_VERIFICATION);
                    break;
                case LoginState.OWNER_APPROVAL_REQUIRED:
                    setMessage("Your account is pending approval.");
                    break;
                default:
                    setError("Something went wrong.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "calc(100vh - 80px)",
                px: { xs: 2, md: 8, lg: 16, xl: 32 },
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
                    <TextField label="Username" onChange={(e) => setUsername(e.target.value)} fullWidth />
                )}

                {mode !== MODE.EMAIL_VERIFICATION ? (
                    <TextField label="Email" type="email" onChange={(e) => setEmail(e.target.value)} fullWidth />
                ) : (
                    <TextField label="Verification Code" onChange={(e) => setEmailCode(e.target.value)} fullWidth />
                )}

                {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
                    <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} fullWidth />
                )}

                {mode === MODE.LOGIN && (
                    <Typography sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }} onClick={() => setMode(MODE.RESET_PASSWORD)}>
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
                            backgroundColor: "#d1d1d0",
                            color: "#fff",
                        },
                    }}
                >
                    {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : buttonTitle}
                </Button>

                {error && <Typography color="error">{error}</Typography>}
                {message && <Typography color="success.main">{message}</Typography>}

                {mode === MODE.LOGIN && (
                    <Typography sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }} onClick={() => setMode(MODE.REGISTER)}>
                        Don’t have an account?
                    </Typography>
                )}

                {mode === MODE.REGISTER && (
                    <Typography sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }} onClick={() => setMode(MODE.LOGIN)}>
                        Have an account?
                    </Typography>
                )}

                {mode === MODE.RESET_PASSWORD && (
                    <Typography sx={{ fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer" }} onClick={() => setMode(MODE.LOGIN)}>
                        Go back to Login
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default LoginPageClient;
