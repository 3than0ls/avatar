import React from 'react';
import { useForm } from 'react-hook-form';
import validateEmail from '~/utils/validateEmail';
import authService from '~/services/authService';
import { signupSchema } from '~/schemas/authSchemas';
import { yupResolver } from '@hookform/resolvers/yup';

export default function signup() {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm({ resolver: yupResolver(signupSchema) });

  const onSubmit = (e) => {
    const { username, email, password } = e;
    authService.signup({ username, email, password });
  };

  return (
    <div className="w-full py-8 text-center flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 rounded-lg py-8 mx-auto bg-gray-100 text-center flex flex-col items-center"
      >
        <span className="text-4xl mb-4">Create an Account</span>
        <label className="w-1/2 text-2xl mb-2">Username</label>
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
        <input
          name="username"
          placeholder="Enter a username"
          ref={register}
          className={`rounded-lg bg-gray-100 w-1/2 hover:bg-gray-200 outline-none mb-4 p-4 transition-all text-center border-2
            ${errors.name ? 'border-red-600' : 'border-gray-600'}`}
          autoComplete="off"
          autoCorrect="off"
        />

        <label className="w-1/2 text-2xl mb-2">Email</label>
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <input
          name="email"
          type="email"
          placeholder="Enter an email"
          ref={register}
          onChange={(e) => (validateEmail(e.target.value) ? clearErrors('email') : setError('email', {}))}
          className={`rounded-lg bg-gray-100 w-1/2 hover:bg-gray-200 outline-none mb-4 p-4 transition-all text-center border-2
            ${errors.email ? 'border-red-600' : 'border-gray-600'}`}
          autoComplete="off"
          autoCorrect="off"
        />

        <label className="w-1/2 text-2xl mb-2">Password</label>
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        <input
          name="password"
          type="password"
          placeholder="Enter a password"
          ref={register}
          className={`rounded-lg bg-gray-100 w-1/2 hover:bg-gray-200 outline-none mb-4 p-4 transition-all text-center border-2
            ${errors.password ? 'border-red-600' : 'border-gray-600'}`}
          autoComplete="off"
          autoCorrect="off"
        />
        {Object.keys(errors).length > 0 ? (
          <div className="text-red-500 mt-6">Some fields are missing or have errors.</div>
        ) : (
          <input
            type="submit"
            value="Create account"
            className="mx-auto mt-6 w-1/2 cursor-pointer rounded-lg p-4 hover:font-semibold transition duration-500 ease-in-out bg-blue-300 hover:bg-blue-400 text-black text-center"
          />
        )}
      </form>
    </div>
  );
}
