import React from 'react';
import { Footer, FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../libs/client';

export default function Home({ productsData, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers. There are many variations</p>
      </div>
      <div className='products-container'>
        {productsData.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
};
