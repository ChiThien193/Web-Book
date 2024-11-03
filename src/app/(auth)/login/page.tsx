import LoginFrom from '@/app/(auth)/login/login-form'
import React from 'react'


export const Login = () => {
return (
  <div>
    <h1 className='text-xl font-semibold text-center'> ĐĂNG NHẬP </h1>
    <div className='flex justify-center'>
      <LoginFrom />
    </div>
  </div>
)
}

export default Login
