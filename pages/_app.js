import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <>
        <Component {...pageProps} />
        <ToastContainer
          position="top-left"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </SessionProvider>
  );
}
