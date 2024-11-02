'use client'
import { useRouter } from "next/navigation";

import React from 'react'

export default function LoginRedirectButton() {
    const router = useRouter()
    const handleNavigate = () => {
        router.push('/login')
}
  return (
    <button 
    onClick = {handleNavigate}
  >
    Chuyển sang trang Login
  </button>
  )
}
