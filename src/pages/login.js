import React from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '~/schemas/authSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseContext } from '~/firebase';

export default function login() {
  const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(loginSchema) });
  const [generalError, setGeneralError] = React.useState('');
  const { firebase } = React.useContext(FirebaseContext);

  const onSubmit = React.useCallback(async (e) => {
    try {
      const { email, password } = e;
      await firebase.signIn({ email, password });
      window.location.href = '/';
    } catch (e) {
      setGeneralError('Username/Password not found or does not exist.');
    }
  });

  return (
    <div className="w-full py-8 text-center flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 rounded-lg py-8 mx-auto bg-gray-100 text-center flex flex-col items-center"
      >
        {generalError && <div className="text-red-500 my-2">{generalError}</div>}
        <span className="text-4xl mb-4">Log In</span>
        <label className="w-1/2 text-2xl mb-2">Username</label>
        <label className="w-1/2 text-2xl mb-2">Email</label>
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <input
          name="email"
          type="email"
          placeholder="Enter an email"
          ref={register}
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
            value="Log in"
            className="mx-auto mt-6 w-1/2 cursor-pointer rounded-lg p-4 hover:font-semibold transition duration-500 ease-in-out bg-blue-300 hover:bg-blue-400 text-black text-center"
          />
        )}
      </form>
    </div>
  );
}
