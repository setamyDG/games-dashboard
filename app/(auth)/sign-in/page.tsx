import Image from 'next/image';
import SignInForm from '@/components/forms/SignInForm';

const imgUrl = '/images/three3.jpeg';

const SignIn = (): JSX.Element => (
  <div className='flex h-screen'>
    <div className='w-3/5 relative hidden md:block'>
      <Image
        src={imgUrl} // Replace with the actual image path
        alt='Cover Image'
        className='object-cover'
        fill
      />
    </div>
    <div className='flex-1'>
      <div className='md:px-16 px-12 h-full flex flex-col gap-4 justify-center'>
        <div className='mb-4'>
          <Image src='/next.svg' alt='logo' width={85} height={85} />
        </div>
        <h1 className='font-bold text-4xl'>Login 🎮</h1>
        <p className='text-xl mb-4'>
          Unleash Your Imagination. Login and <span className='font-bold text-red-600'>Play On!</span>
        </p>
        <SignInForm />
      </div>
    </div>
  </div>
);

export default SignIn;
