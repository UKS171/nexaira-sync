"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Info, XCircle } from "lucide-react";
import { Product } from "@/types";
import { parseOrderMessage } from "@/lib/orderParser";

interface OrderFormProps {
    products: Product[];
    onOrderCreated: (
        productId: string,
        quantity: number,
        size: string | undefined,
        total: number
    ) => void;
}

export default function OrderForm({
    products,
    onOrderCreated,
}: OrderFormProps) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!message.trim()) {
            setError("Please enter a customer message.");
            return;
        }

        const parsedOrder = parseOrderMessage(message, products);

        if (!parsedOrder) {
            setError(
                'We could not identify the order. Try something like "2 red shirts, size L".'
            );
            return;
        }

        const { product, quantity, size } = parsedOrder;

        // Validate quantity before creating the order.
        if (quantity <= 0) {
            setError("Order quantity must be greater than 0.");
            return;
        }

        // Check whether enough inventory is available.
        if (quantity > product.stock) {
            setError(
                `Only ${product.stock} ${product.stock === 1 ? "unit is" : "units are"
                } available for ${product.name}.`
            );
            return;
        }

        const total = product.price * quantity;

        onOrderCreated(product.id, quantity, size, total);

        const sizeText = size ? `, Size ${size}` : "";

        setSuccess(
            `Order created: ${quantity} × ${product.name}${sizeText} for Rs ${total.toLocaleString()}.`
        );

        setMessage("");
    }

    return (
        <section className="border border-[#e4e7ec] bg-white">
            <div className="border-b border-[#e4e7ec] px-5 py-4">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#eef4ff] text-[#175cd3]">
                        <ArrowRight className="h-4 w-4" />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-[#172033]">
                            Create an order
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-[#667085]">
                            Enter the customer's message and we'll extract the product,
                            quantity, and size.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
                <label
                    htmlFor="customer-message"
                    className="block text-sm font-medium text-[#344054]"
                >
                    Customer message
                </label>

                <textarea
                    id="customer-message"
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setError("");
                        setSuccess("");
                    }}
                    placeholder="Example: 2 red shirts, size L"
                    rows={4}
                    className="mt-2 w-full resize-none border border-[#d0d5dd] bg-white px-3 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#98a2b3] focus:border-[#175cd3] focus:ring-2 focus:ring-[#175cd3]/10"
                />

                <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-[#667085]">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                    <span>Example: "2 red shirts, size L"</span>
                </div>

                {error && (
                    <div className="mt-4 flex items-start gap-2 border border-[#fecdca] bg-[#fef3f2] px-3 py-3 text-sm text-[#b42318]">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mt-4 flex items-start gap-2 border border-[#abefc6] bg-[#ecfdf3] px-3 py-3 text-sm text-[#067647]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                <div className="mt-5">
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="inline-flex items-center justify-center bg-[#175cd3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1246a5] disabled:cursor-not-allowed disabled:bg-[#d0d5dd]"
                    >
                        Create order
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            </form>
        </section>
    );
}
