interface StatCardProps {
    label: string;
    value: string;
    description: string;
}

export default function StatCard({
    label,
    value,
    description,
}: StatCardProps) {
    return (
        <div className="border border-[#e4e7ec] bg-white p-4 sm:p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#667085] sm:text-xs">
                {label}
            </p>

            <p className="mt-2.5 break-words text-xl font-semibold tracking-tight text-[#172033] sm:mt-3 sm:text-2xl">
                {value}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#667085] sm:text-sm">
                {description}
            </p>
        </div>
    );
}
