import Image from 'next/image';
import { SignUpForm } from '@/components/forms/SignUpForm';

const SignUp = (): JSX.Element => (
  <div className='flex h-screen'>
    <div className='w-3/5 relative hidden md:block'>
      <Image
        src='/images/one1.jpeg' // Replace with the actual image path
        alt='Cover Image'
        fill
        className='object-cover'
        priority
      />
    </div>
    <div className='flex-1'>
      <div className='md:px-16 px-12 h-full flex flex-col gap-4 justify-center'>
        <SignUpForm />
      </div>
    </div>
  </div>
);

export default SignUp;
