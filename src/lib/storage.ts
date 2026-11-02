import { Order, Product } from "@/types";

const PRODUCTS_KEY = "nexaira-products";
const ORDERS_KEY = "nexaira-orders";

export function getStoredProducts(initialProducts: Product[]): Product[] {
  if (typeof window === "undefined") {
    return initialProducts;
  }

  const stored = localStorage.getItem(PRODUCTS_KEY);

  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));

    return initialProducts;
  }

  try {
    return JSON.parse(stored);
  } catch {
    return initialProducts;
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(ORDERS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
