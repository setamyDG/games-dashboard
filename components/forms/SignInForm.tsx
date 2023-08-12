'use client';

import { GoogleCircleFilled, GithubOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { UserValidation } from '@/validations/user.form';

const SignInForm = (): JSX.Element => {
  const [errorMessage, setErrorMsg] = useState<string>('');
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof UserValidation>) => {
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setErrorMsg('Invalid credentials');
        return;
      }

      if (response?.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          {errorMessage.length > 0 && (
            <span className='text-xs  text-red-500 font-semibold'>Error: {errorMessage}</span>
          )}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel className=''>Email</FormLabel>
                <FormControl className=''>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel className=''>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end items-center text-sm'>
            <p className='text-gray-400'>Dont have account ? </p>
            <Link href='/sign-up' className='font-semibold text-red-500 ml-2'>
              Create Account
            </Link>
          </div>
          <Button type='submit' className='w-full mt-8'>
            Login
          </Button>
        </form>
      </Form>
      <Separator />
      <Button onClick={() => signIn('google')} className='bg-white border border-black text-black hover:bg-gray-100'>
        <GoogleCircleFilled className='mr-4 text-xl' />
        Sign up with Google
      </Button>
      <Button
        onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/' })}
        className='bg-white border border-black text-black hover:bg-gray-100'
      >
        <GithubOutlined className='mr-4 text-xl' />
        Sign up with Github
      </Button>
    </>
  );
};

export default SignInForm;
