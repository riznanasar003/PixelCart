'use client';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const token = Cookies.get('sessionToken');
    console.log(token)
    if (!token) {
      router.push(`/auth?returnTo=${pathname}`);
      return false;
    }
    return true;
  };

  return checkAuth;
};
