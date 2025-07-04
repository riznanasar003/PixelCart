import { NextRequest, NextResponse } from 'next/server';
import { createClient, OAuthStrategy } from '@wix/sdk';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const refreshToken = request.cookies.get("refreshToken");

  if (refreshToken) return res;

  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();

  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
}
