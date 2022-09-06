import cls from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { fetchCoffeeStores } from '../../lib/coffee-stores';

import styles from '../../styles/coffee-store.module.css';
import { isEmpty } from '../../utils';
import { StoreContext } from '../_app';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((store) => {
    return store.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((store) => {
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

function CoffeeStore(initialProps) {
  const router = useRouter();

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.CoffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.CoffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((store) => {
          return store.id.toString() === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  const { address, name, neighbourhood, imgUrl } = coffeeStore;

  function handleUpvoteButton() {
    console.log('handle upvote');
  }

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/places.svg'
                width={24}
                height={24}
                alt='icon'
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width={24}
                height={24}
                alt='icon'
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width={24}
              height={24}
              alt='icon'
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStore;
