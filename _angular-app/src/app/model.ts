export interface Category {
  id?: number;
  name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
}

export interface ProductInputs {
  id?: number;
  amount: number;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
  product: Product;
}

export interface ProductOutputs {
  id?: number;
  amount: number;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
  product: Product;
}

export interface ProductPhoto {
  id?: number;
  photo_url: string;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
  product?: Product;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: { date: string };
  readonly updated_at?: { date: string };
}

export interface ProductCategory {
  product: Product;
  categories: Category[];
}

export interface User{
  id?: number;
  name: string;
  email: string;
  password?: string;
  readonly created_at?: {date: string};
  readonly updated_at?: {date: string};
}
