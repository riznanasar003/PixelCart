import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import nookies from "nookies";


export const wixClientServer  = (ctx?: any) => {
  let refreshToken;

  try {
    const cookieStore = nookies.get(ctx);
    refreshToken = JSON.parse(cookieStore.refreshToken || "{}");
  } catch (e) {
    console.log(e)
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};