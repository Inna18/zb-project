import dynamic from 'next/dynamic';

const Details = dynamic(
  () => import('@/app/components/templates/DetailsTemplate'),
  { ssr: false }
);

export default Details;
