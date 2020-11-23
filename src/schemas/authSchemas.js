import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Not a valid email'),
  password: yup.string().required('Password is required'),
});

export const signupSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username should be minimum of 1 character')
    .max(32, 'Name should be maximum of 32 characters'),
  email: yup.string().required('Email is required').email('Not a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password should be at least 8 characters.'),
});
