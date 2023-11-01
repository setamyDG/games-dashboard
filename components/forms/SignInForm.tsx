'use client';

import { GoogleCircleFilled, GithubOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { CircularProgress, Divider } from '@nextui-org/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { UserValidation } from '@/validations/user.form';

const SignInForm = (): JSX.Element => {
  const [errorMessage, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setIsLoading(false);
        setErrorMsg('Invalid credentials');
        return;
      }

      if (response?.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-4'>
        <CircularProgress aria-label='Loading...' />
      </div>
    );
  }

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
          <div className='flex justify-end items-center text-xs'>
            <p className='text-gray-400'>Dont have account ? </p>
            <Link href='/sign-up' className='font-semibold text-red-500 ml-2'>
              Create Account
            </Link>
          </div>
          <Button type='submit' color='danger' className='w-full mt-8'>
            Login
          </Button>
        </form>
      </Form>
      <Divider />
      <Button color='danger' variant='bordered' startContent={<GoogleCircleFilled />} onClick={() => signIn('google')}>
        Sign up with Google
      </Button>
      <Button
        startContent={<GithubOutlined />}
        color='danger'
        variant='bordered'
        onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/' })}
      >
        Sign up with Github
      </Button>
    </>
  );
};

export default SignInForm;
