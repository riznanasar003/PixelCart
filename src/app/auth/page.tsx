// /app/auth/page.tsx
import LoginForm from '@/components/LoginForm';
import React, { Suspense } from 'react';

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
