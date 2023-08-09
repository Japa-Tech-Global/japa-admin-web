import React from 'react';
import LogoImage from '../../assets/brand/logo.svg';
import Button from '../../common/Button';
import LabelInput from '../../common/LabelInput/LabelInput';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { appAxios } from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackComponent from '../../common/BackComponent';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const param = useParams();

  const formik = useFormik({
    initialValues: {
      email: param?.email,
      password: '',
      verificationCode: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      verificationCode: yup.string().required('Verification code is required'),
    }),
    enableReinitialize: true,
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.patch('/auth/reset-password', {
        email: formik.values.email,
        password: formik.values.password,
        code: formik.values.verificationCode,
      });
      sendFeedback(response.data?.message, 'success');
      navigate('/login');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/auth/forgot-password', {
        email: param?.email,
      });
      sendFeedback(response.data?.message, 'success');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackComponent
        text='Back to forgot password'
        containerClass='absolute top-10 right-10'
        destination='/forgot-password'
      />
      <img src={LogoImage} alt='Koneqtor' />
      <h1 className='font-bold text-2xl md:text-4xl pt-[52px] pb-5'>Reset Password</h1>
      <p className='pb-6 font-normal'>
        Enter your verification code and your new password
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full md:w-3/5 '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
          disabled
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='verificationCode'
          label='Verification Code'
          className='mb-[22px]'
        />
        <div className='mb-[66px]'>
          <span className='text-sm font-normal '>
            Didn’t receive an OTP?{' '}
            <button
              className='text-primary font-semibold'
              type='button'
              onClick={sendVerificationCode}
            >
              Resend
            </button>
          </span>
        </div>
        <Button type='submit' loading={loading}>
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
