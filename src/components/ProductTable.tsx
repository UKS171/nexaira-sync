import { Product } from "@/types";

interface ProductTableProps {
    products: Product[];
}

function getStockStatus(stock: number) {
    if (stock === 0) {
        return {
            label: "Out of stock",
            className: "bg-[#fef3f2] text-[#b42318]",
        };
    }

    if (stock <= 6) {
        return {
            label: "Low stock",
            className: "bg-[#fffaeb] text-[#b54708]",
        };
    }

    return {
        label: "In stock",
        className: "bg-[#ecfdf3] text-[#067647]",
    };
}

export default function ProductTable({
    products,
}: ProductTableProps) {
    return (
        <section className="border border-[#e4e7ec] bg-white">
            <div className="flex items-center justify-between border-b border-[#e4e7ec] px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-[#172033]">
                        Products
                    </h2>

                    <p className="mt-1 text-xs text-[#667085]">
                        Current inventory available to the merchant
                    </p>
                </div>

                <span className="text-xs text-[#667085]">
                    {products.length} products
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e4e7ec] bg-[#f9fafb]">
                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                Product
                            </th>

                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                Price
                            </th>

                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                Stock
                            </th>

                            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => {
                            const status = getStockStatus(product.stock);

                            return (
                                <tr
                                    key={product.id}
                                    className="border-b border-[#f0f1f3] last:border-b-0"
                                >
                                    <td className="px-5 py-4 text-sm font-medium text-[#172033]">
                                        {product.name}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[#475467]">
                                        Rs {product.price.toLocaleString()}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[#475467]">
                                        {product.stock}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                                        >
                                            {status.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
