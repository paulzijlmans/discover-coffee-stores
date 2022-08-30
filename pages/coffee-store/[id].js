import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import coffeeStoresData from '../../data/coffee-stores.json';

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find((store) => {
        return store.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const paths = coffeeStoresData.map((store) => {
    return {
      params: {
        id: store.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

function CoffeeStore({ coffeeStore }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>
      <Link href='/'>Back to home</Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
      <p>{coffeeStore.neighbourhood}</p>
    </div>
  );
}

export default CoffeeStore;
