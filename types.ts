import stripe from "stripe";



export interface Song {
  id:string;
  user_id:string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
  
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: stripe.Address;
  payment_method?: stripe.PaymentMethod[stripe.PaymentMethod.Type];
}

export interface Product {
    id:string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: stripe.Metadata;
    
}

export interface Price {
    id:string;
    product_id?:string;
    active?:boolean;
    description?:string;
    unit_amount?:number;
    currency?:string;
    type?:stripe.Price.Type;
    interval?: stripe.Price.Recurring.Interval;
    interval_count?:number;
    trial_period_days?:number | null;
    metadata?:stripe.Metadata;
    products? : Product;
}

export interface ProductWithPrice extends Product  {
  prices?:Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: stripe.Subscription.Status;
  metadata?: stripe.Metadata;
  price_id?: string;
  quantity: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
