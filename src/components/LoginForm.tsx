"use client";

import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("returnTo") ?? "/";

    return <div>Login to continue to {redirect}</div>;
}
