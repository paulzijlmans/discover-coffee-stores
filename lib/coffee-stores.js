import coffeeStoresData from '../data/foursquare-api-data.json';

export const fetchCoffeeStores = () => {
  return coffeeStoresData.results;
}