import React from 'react';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useAppDispatch } from '../../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/slices/user';
import Checkbox from '../../common/Checkbox';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });
  const submitValues = async () => {
    // try {
    //   setLoading(true);
    //   const response = await appAxios.post('/auth/login', {
    //     email: formik.values.email,
    //     password: formik.values.password,
    //   });
    //   const userObject = response.data?.data;
    //   dispatch(updateUser({ user: userObject }));
    //   if (!userObject.isVerified) {
    //     // Send verification code
    //     sendFeedback('Verify your account to continue', 'info');
    //     await appAxios.get('/auth/send-verification');
    //     return navigate('/auth/verify-account');
    //   }
    //   sendFeedback(response.data?.message, 'success');
    //   return navigate('/dashboard');
    // } catch (error: any) {
    //   sendCatchFeedback(error);
    // } finally {
    //   setLoading(false);
    // }
    return navigate('/dashboard');
  };

  return (
    <>
      <p className='md:text-lg mb-[3px]'>Welcome back</p>
      <h1 className='font-medium text-xl md:text-[26px] mb-[85px] font-poppins'>
        Log in
      </h1>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className='mb-[32px]'
        />
        <div className='mb-[72px] flex justify-between items-center'>
          <Checkbox id='remember' label='Remember me' />
          <Link to='/auth/forgot-password' className='text-sm font-normal text-primary'>
            Forgot password?
          </Link>
        </div>

        <Button type='submit' loading={loading}>
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
