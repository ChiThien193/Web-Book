"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType,  } from '@/schemaValidations/auth.schema'
import envConfig from "@/config"

const LoginrFrom = () => {
  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
        email: "",
        password: "",
    },
  })
 
  async function onSubmit(values: LoginBodyType) {
    const result = await  fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, 
      {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    ).then(res => res.json())
    console.log(result)
  }
  return (
    <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
      noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" type = 'email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type = 'password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!mt-9 w-full">
            LOGIN
            </Button>
      </form>
    </Form>
  )
}

export default LoginrFrom
