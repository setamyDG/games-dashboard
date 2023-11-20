'use client';

import { GoogleCircleFilled, GithubOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Chip, CircularProgress, Divider, Input } from '@nextui-org/react';
import { EnvelopeClosedIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { UserValidation } from '@/validations/user.form';

export const SignInForm = (): JSX.Element => {
  const [errorMessage, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

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
      throw new Error('Error signing in');
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

          {/* <FormField
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
          /> */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <Input startContent={<EnvelopeClosedIcon />} type='email' label='Email' {...field} size='sm' />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <Input
                  startContent={<LockClosedIcon />}
                  endContent={
                    isPasswordVisible ? (
                      <EyeOpenIcon className='hover:cursor-pointer' onClick={togglePasswordVisibility} />
                    ) : (
                      <EyeClosedIcon className='hover:cursor-pointer' onClick={togglePasswordVisibility} />
                    )
                  }
                  type={isPasswordVisible ? 'text' : 'password'}
                  label='Password'
                  {...field}
                  size='sm'
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end items-center text-xs'>
            <p className='text-gray-400'>Dont have account ? </p>
            <Link href='/sign-up' className='font-semibold text-red-500 ml-2'>
              <Chip color='warning' variant='shadow' className='text-white'>
                Create account
              </Chip>
            </Link>
          </div>
          <Button variant='shadow' type='submit' color='danger' className='w-full mt-8'>
            Login
          </Button>
        </form>
      </Form>
      <Divider />
      <Button
        color='danger'
        variant='bordered'
        startContent={<GoogleCircleFilled />}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Sign up with Google
      </Button>
      <Button
        startContent={<GithubOutlined />}
        color='danger'
        variant='bordered'
        onClick={() => signIn('github', { callbackUrl: '/' })}
      >
        Sign up with Github
      </Button>
    </>
  );
};
