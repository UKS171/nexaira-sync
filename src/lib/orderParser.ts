import { Product } from "@/types";

export interface ParsedOrder {
  product: Product;
  quantity: number;
  size?: string;
}

const SIZE_PATTERN = /\b(?:size\s*)?(xs|s|m|l|xl|xxl)\b/i;

export function parseOrderMessage(
  message: string,
  products: Product[]
): ParsedOrder | null {
  const normalizedMessage = message
    .toLowerCase()
    .replace(/[,.!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedMessage) {
    return null;
  }

  // Find quantity.
  // Example: "2 red shirts" -> 2
  const quantityMatch = normalizedMessage.match(/\b(\d+)\b/);
  const quantity = quantityMatch ? Number(quantityMatch[1]) : 1;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return null;
  }

  // Find product by name.
  const product = products.find((item) =>
    normalizedMessage.includes(item.name.toLowerCase())
  );

  if (!product) {
    return null;
  }

  // Find optional size.
  const sizeMatch = normalizedMessage.match(SIZE_PATTERN);
  const size = sizeMatch?.[1]?.toUpperCase();

  return {
    product,
    quantity,
    size,
  };
}
