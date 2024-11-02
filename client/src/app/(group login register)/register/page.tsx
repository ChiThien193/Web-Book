'use client'

import RegisterFrom from '@/app/(group login register)/register/register-form'
import React from 'react'


const Register = () => {
return (
  <div>
    <h1 className='text-xl font-semibold text-center'> ĐĂNG KÝ </h1>
    <div className='flex justify-center'>
      <RegisterFrom />
    </div>
  </div>
)
}

export default Register
