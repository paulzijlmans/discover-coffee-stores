import { createApi } from 'unsplash-js';

import coffeeStoresData from '../data/foursquare-api-data.json';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getCoffeeStorePhotos = async () => {
  const unsplashResponse = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  });
  const unsplashResults = unsplashResponse.response.results;
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStorePhotos();
  return coffeeStoresData.results.map((result, index) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : '',
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
};
