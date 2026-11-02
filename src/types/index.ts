export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  size?: string;
  total: number;
  createdAt: string;
}
