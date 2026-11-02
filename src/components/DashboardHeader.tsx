import { Circle } from "lucide-react";

export default function DashboardHeader() {
    return (
        <header className="border-b border-[#e4e7ec] bg-white">
            <div className="mx-auto flex min-h-[64px] max-w-[1400px] items-center justify-between px-4 sm:min-h-[72px] sm:px-6 lg:px-8">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#172033] text-sm font-bold text-white">
                            N
                        </div>

                        <span className="text-sm font-semibold tracking-tight text-[#172033] sm:text-[15px]">
                            NEXAIRA SYNC
                        </span>
                    </div>

                    <p className="mt-1 hidden text-xs text-[#667085] sm:block">
                        Merchant workspace
                    </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#667085]">
                    <Circle className="h-2.5 w-2.5 fill-[#067647] text-[#067647]" />

                    <span className="hidden sm:inline">Workspace active</span>
                    <span className="sm:hidden">Active</span>
                </div>
            </div>
        </header>
    );
}
