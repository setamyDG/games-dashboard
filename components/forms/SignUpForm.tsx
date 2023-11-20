'use client';

import { GoogleCircleFilled, GithubOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Chip, CircularProgress, Divider, Input } from '@nextui-org/react';
import {
  ChevronLeftIcon,
  EnvelopeClosedIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  IdCardIcon,
  LockClosedIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { checkIfUserExists, createUser } from '@/actions/user.actions';
import { UserValidationCreate } from '@/validations/user.form';

const SignUpForm = (): JSX.Element => {
  const router = useRouter();
  const [errorMessage, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

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
      setIsLoading(true);
      await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push('/sign-in');
    } catch (error) {
      throw new Error('Error creating user');
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
      <Button
        className='text-white mb-4'
        variant='shadow'
        color='warning'
        isIconOnly
        startContent={<ChevronLeftIcon />}
        onClick={() => router.push('/sign-in')}
      />
      <div className='mb-4'>
        <Image src='/next.svg' alt='logo' width={85} height={85} priority />
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
                <Input startContent={<IdCardIcon />} label='Name' {...field} size='sm' />
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name='repeatPassword'
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
                  label='Repeat password'
                  {...field}
                  size='sm'
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end items-center text-xs'>
            <span className=' text-gray-400'>Already have an account ? </span>
            <Link href='/sign-in' className='font-semibold text-red-500 ml-2'>
              <Chip color='warning' variant='shadow' className='text-white'>
                Sign in
              </Chip>
            </Link>
          </div>
          <Button endContent={<RocketIcon />} variant='shadow' type='submit' color='danger' className='w-full mt-8'>
            Create account
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

export default SignUpForm;
