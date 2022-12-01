import React from 'react';
import { useSession } from 'next-auth/react';
import { BarLoader } from 'react-spinner-animated';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';

import 'react-spinner-animated/dist/index.css';

const Profile = () => {
  let { data, status } = useSession();
  let router = useRouter();

  if (status === 'loading') {
    return (
      <div className="bg-gray-300 border-4 border-cyan-300 p-4  rounded-xl">
        <BarLoader
          text={'Loading...'}
          center={false}
          width={'500px'}
          height={'300px'}
        />
      </div>
    );
  }
  if (status !== 'authenticated') {
    router.push('/');
    return;
  }
  return (
    <div>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="container mx-auto w-9/12 mt-3">
        <div className="bg-gray-300 border-4 border-cyan-300 p-4  rounded-xl">
          <div className="flex justify-around bg-gray-400 m-2 p-4 rounded-3xl ">
            <Image
              src={data.user.image}
              width={100}
              height={100}
              className="rounded-3xl"
            />
            <p className="text-6xl text-yellow-100 ">{data.user.name}</p>
          </div>
          <pre>{JSON.stringify(data.user, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;
