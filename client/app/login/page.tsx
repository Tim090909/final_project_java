"use client"

import { useEffect, useState } from 'react';
import LoginForm from './form'
import { redirect, useRouter} from 'next/navigation';

const LoginPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      router.push('/');
    }
  }, [router]);
  return (
    <LoginForm />
  )
}

export default LoginPage
