
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Men' | 'Women' | 'Accessories' | 'Occult';
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'cart' | 'checkout';
