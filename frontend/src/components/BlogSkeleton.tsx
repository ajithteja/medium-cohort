import { Circle } from "./BlogCard"

export const BlogSkeleton = ({size}: {size: "small" |"big"}) => {
    return <div role="status" className="animate-pulse">
        <div className="border-b border-slate-400 pb-4 mb-2 w-screen max-w-screen-md">
            <div className="display flex">
                <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600`}>
                    <span className={`${size === "small" ? "text-sm" : "text-md"} bg-gray-200 rounded-full dark:bg-gray-700 font-medium text-gray-600 dark:text-gray-300"`}></span>
                </div>
                <div className="flex items-center ml-3">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-0"></div>
                    <div className="flex justify-center flex-col pl-2 pr-2 pt-1">
                            <Circle />
                        </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-0"></div>
            
                </div>
                </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px] mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-0"></div>
            </div>
        </div>
    </div>
    
    
}