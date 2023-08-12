'use client';

import { GoogleCircleFilled, GithubOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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
import { checkIfUserExists, createUser } from '@/actions/user.actions';
import { UserValidationCreate } from '@/validations/user.form';

const SignUpForm = (): JSX.Element => {
  const router = useRouter();
  const [errorMessage, setErrorMsg] = useState<string>('');
  const form = useForm({
    resolver: zodResolver(UserValidationCreate),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof UserValidationCreate>) => {
    const userExists = await checkIfUserExists(data.email);

    if (userExists) {
      setErrorMsg('User already exists');
      form.reset();
      return;
    }

    try {
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push('/sign-in');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <>
      <ArrowLeftOutlined
        className='text-lg mb-4 w-fit cursor-pointer text-red-500'
        onClick={() => router.push('/sign-in')}
      />
      <div className='mb-4'>
        <Image src='/next.svg' alt='logo' width={85} height={85} />
      </div>
      <h1 className='font-bold text-4xl'>Welcome to setamyDG</h1>
      <p className='text-xl mb-4'>Register your account</p>
      <Form {...form}>
        {errorMessage.length > 0 && <span className='text-xs  text-red-500 font-semibold'>Error: {errorMessage}</span>}
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel className=''>Name</FormLabel>
                <FormControl className=''>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel className=''>Repeat password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end items-center text-xs'>
            <span className=' text-gray-400'>Already have an account ? </span>
            <Link href='/sign-in' className='font-semibold text-red-500 ml-2'>
              Login
            </Link>
          </div>
          <Button type='submit' className='w-full mt-8'>
            Create Account
          </Button>
        </form>
      </Form>
      <Separator />
      <Button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className='bg-white border border-black text-black hover:bg-gray-100'
      >
        <GoogleCircleFilled className='mr-4 text-xl' />
        Sign up with Google
      </Button>
      <Button
        onClick={() => signIn('github', { callbackUrl: '/' })}
        className='bg-white border border-black text-black hover:bg-gray-100'
      >
        <GithubOutlined className='mr-4 text-xl' />
        Sign up with Github
      </Button>
    </>
  );
};

export default SignUpForm;
