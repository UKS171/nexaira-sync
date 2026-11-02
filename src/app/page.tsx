"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import OrderForm from "@/components/OrderForm";
import ProductTable from "@/components/ProductTable";
import RecentOrders from "@/components/RecentOrders";
import StatCard from "@/components/StatCard";
import { initialProducts } from "@/data/products";
import {
  getStoredOrders,
  getStoredProducts,
  saveOrders,
  saveProducts,
} from "@/lib/storage";
import { Order, Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(getStoredProducts(initialProducts));
    setOrders(getStoredOrders());
    setIsLoading(false);
  }, []);

  const totalSales = useMemo(() => {
    return orders.reduce((total, order) => total + order.total, 0);
  }, [orders]);

  const inventoryUnits = useMemo(() => {
    return products.reduce((total, product) => total + product.stock, 0);
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e4e7ec] border-t-[#175cd3]" />
          <p className="mt-3 text-sm text-[#667085]">
            Loading merchant workspace...
          </p>
        </div>
      </div>
    );
  }

  function handleOrderCreated(
    productId: string,
    quantity: number,
    size: string | undefined,
    total: number
  ) {
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    if (quantity <= 0 || quantity > product.stock) {
      return;
    }

    const updatedProducts = products.map((item) => {
      if (item.id !== productId) return item;

      return {
        ...item,
        stock: item.stock - quantity,
      };
    });

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      productId: product.id,
      productName: product.name,
      quantity,
      size,
      total,
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...orders];

    setProducts(updatedProducts);
    setOrders(updatedOrders);

    saveProducts(updatedProducts);
    saveOrders(updatedOrders);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <DashboardHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#175cd3] sm:text-sm sm:normal-case sm:tracking-normal">
            Merchant Dashboard
          </p>

          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#172033] sm:text-3xl">
            Keep your store moving.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667085]">
            Manage products, monitor inventory, and turn customer messages into
            orders from one simple workspace.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <StatCard
            label="Total sales"
            value={`Rs ${totalSales.toLocaleString()}`}
            description={
              orders.length === 0
                ? "No orders recorded yet"
                : `${orders.length} completed order${orders.length === 1 ? "" : "s"
                }`
            }
          />

          <StatCard
            label="Products"
            value={products.length.toString()}
            description="Products currently listed"
          />

          <StatCard
            label="Inventory units"
            value={inventoryUnits.toString()}
            description="Units currently in stock"
          />
        </div>

        {/* Main workspace */}
        <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
            <ProductTable products={products} />

            <OrderForm
              products={products}
              onOrderCreated={handleOrderCreated}
            />
          </div>

          <RecentOrders orders={orders} />
        </div>
      </main>
    </div>
  );
}
