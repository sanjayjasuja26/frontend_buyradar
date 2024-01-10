export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  country_id_origin: number;
  deal_type: string;
  is_eco: number;
  ocean_waste_saving: number;
  trees_saving: number;
  co2_saving: number;
  plastic_saving: number;
  reviews_count: number;
  image_url: string;
  currency_symbol: string;
  minPrice: number;
  maxPrice: number;
  ratingAvg: number;
  soonest_pickup_date: string;
  soonest_delivery_date: string;
  supportLocalEconomy: boolean;
  countryOforigin: boolean;
  product_main_image: string;
  isWishlist: boolean;
  unique_id?: number;
}
