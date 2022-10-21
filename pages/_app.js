import Router from 'next/router';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import Loader from '../components/Loader';
import { StateContext } from '../context/StateContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}
