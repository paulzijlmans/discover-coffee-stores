import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner/banner';

import styles from '../styles/Home.module.css';

export default function Home() {
  function handleOnBannerBtnClick() {
    console.log('Banner button clicked!');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name='description' content='Discover Coffee Stores' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='hero image'
          />
        </div>
      </main>
    </div>
  );
}
