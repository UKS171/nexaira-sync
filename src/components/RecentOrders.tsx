import { PackageCheck } from "lucide-react";
import { Order } from "@/types";

interface RecentOrdersProps {
    orders: Order[];
}

function formatDate(dateString: string) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export default function RecentOrders({
    orders,
}: RecentOrdersProps) {
    return (
        <section className="border border-[#e4e7ec] bg-white">
            <div className="flex items-center justify-between border-b border-[#e4e7ec] px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-[#172033]">
                        Recent orders
                    </h2>

                    <p className="mt-1 text-xs text-[#667085]">
                        Orders created from customer messages
                    </p>
                </div>

                <span className="text-xs text-[#667085]">
                    {orders.length} total
                </span>
            </div>

            {orders.length === 0 ? (
                <div className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f2f4f7] text-[#667085]">
                        <PackageCheck className="h-5 w-5" />
                    </div>

                    <p className="mt-3 text-sm font-medium text-[#344054]">
                        No orders yet
                    </p>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-[#667085]">
                        Create an order from a customer message and it will
                        appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-[#e4e7ec] bg-[#f9fafb]">
                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                    Order
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                    Product
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                    Quantity
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                    Total
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#667085]">
                                    Created
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-[#f0f1f3] last:border-b-0"
                                >
                                    <td className="px-5 py-4 text-sm font-medium text-[#175cd3]">
                                        {order.id}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-[#172033]">
                                        {order.productName}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[#475467]">
                                        <div className="font-medium text-[#344054]">
                                            {order.quantity}{" "}
                                            {order.quantity === 1 ? "unit" : "units"}
                                        </div>

                                        {order.size && (
                                            <div className="mt-1 text-xs text-[#667085]">
                                                Size {order.size}
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-[#172033]">
                                        Rs {order.total.toLocaleString()}
                                    </td>

                                    <td className="px-5 py-4 text-xs text-[#667085]">
                                        {formatDate(order.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
