import SanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
  projectId: 'defmd2mg',
  dataset: 'production',
  apiVersion: '2022-10-14',
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

export const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
