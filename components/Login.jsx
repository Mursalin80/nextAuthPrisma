import { signIn } from 'next-auth/react';
import { useRef } from 'react';
import Image from 'next/image';

const login = ({ csrfToken, providers }) => {
  let handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    signIn('credentials', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8  h-full sm:w-full">
      <div className="w-full max-w-md space-y-8 bg-slate-300 m-2 p-4 rounded-lg ">
        <div>
          <Image
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={150}
            height={125}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          // method="post"
          // action="/api/auth/callback/credentials"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-login" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="email-login"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="passwordLogin" className="sr-only">
                Password
              </label>
              <input
                ref={passwordRef}
                id="passwordLogin"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        <>
          {providers.map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="group relative flex w-full justify-center rounded-md border border-transparent  bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                  <Image
                    src={`/${provider.id}.svg`}
                    height={25}
                    width={25}
                    alt={provider.name}
                  />
                </span>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default login;
