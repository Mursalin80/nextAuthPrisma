import { getProviders, getCsrfToken } from 'next-auth/react';

import Navbar from '../components/Navbar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const signin = ({ csrfToken, providers }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center md:flex-row flex-col ">
        <Login csrfToken={csrfToken} providers={providers} />
        <SignUp csrfToken={csrfToken} />
      </div>
    </div>
  );
};

export default signin;

export async function getServerSideProps(context) {
  let pro = await getProviders();
  let providers = Object.values(pro).filter((pro) => pro.id !== 'credentials');

  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
      providers,
    },
  };
}
